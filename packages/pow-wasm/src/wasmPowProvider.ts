// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
import { Blake2b, PowHelper } from "@iota/crypto.js";
import type { IPowProvider } from "@iota/types";
import os from "os";
import path from "path";
import { Worker } from "worker_threads";

/**
 * Wasm POW Provider.
 */
export class WasmPowProvider implements IPowProvider {
    /**
     * The number of CPUs to utilise.
     * @internal
     */
    private readonly _numCpus: number;

    /**
     * Create a new instance of NodePowProvider.
     * @param numCpus The number of cpus, defaults to max CPUs.
     */
    constructor(numCpus?: number) {
        this._numCpus = numCpus ?? os.cpus().length;
    }

    /**
     * Perform pow on the message and return the nonce of at least targetScore.
     * @param message The message to process.
     * @param targetScore The target score.
     * @returns The nonce.
     */
    public async pow(message: Uint8Array, targetScore: number): Promise<string> {
        const powRelevantData = message.slice(0, -8);

        const powDigest = Blake2b.sum256(powRelevantData);

        const targetZeros = PowHelper.calculateTargetZeros(message, targetScore);

        return new Promise<string>((resolve, reject) => {
            const chunkSize = BigInt("18446744073709551615") / BigInt(this._numCpus);
            const workers: Worker[] = [];
            let hasFinished = false;
            for (let i = 0; i < this._numCpus; i++) {
                const worker = new Worker(path.join(__dirname, "pow-wasm.js"), {
                    workerData: { powDigest, targetZeros, startIndex: (chunkSize * BigInt(i)).toString() }
                });

                workers.push(worker);

                worker.on("message", async (msg: string) => {
                    hasFinished = true;
                    for (let j = 0; j < workers.length; j++) {
                        await workers[j].terminate();
                    }
                    resolve(msg);
                });

                worker.on("error", err => {
                    reject(err);
                });

                worker.on("exit", code => {
                    if (!hasFinished && code !== 0) {
                        reject(new Error(`Worker stopped with exit code ${code}`));
                    }
                });
            }
        });
    }
}
