// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Worker, WorkerOptions } from "worker_threads";

/**
 * The Node PoW Worker.
 */
export class NodePowWorker {
    /**
     * The number of CPUs to utilise.
     * @internal
     */
    private readonly _numCpus: number;

    /**
     * Create a new instance of the Node PoW Worker.
     * @param numCpus The number of cpus, defaults to max CPUs.
     */
    constructor(numCpus: number) {
        this._numCpus = numCpus;
    }

    /**
     * Perform pow on the block and return the nonce of at least targetScore.
     * @param powDigest The block pow digest.
     * @param targetZeros The target zeros.
     * @returns The nonce.
     */
    public async doNodePow(powDigest: Uint8Array, targetZeros: number): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const chunkSize = BigInt("18446744073709551615") / BigInt(this._numCpus);
            const workers: Worker[] = [];
            let hasFinished = false;

            for (let i = 0; i < this._numCpus; i++) {
                const worker = this.createWorker({
                    workerData: { powDigest, targetZeros, startIndex: (chunkSize * BigInt(i)).toString() },
                    eval: true
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

    /**
     * Create ne instance of the Worker.
     * @param options The worker options.
     * @returns The Worker.
     */
    public createWorker(options: WorkerOptions): Worker {
        const worker = new Worker(`
            const { PowHelper } = require("@iota/iota.js");
            const { workerData, parentPort } = require("worker_threads");

            if (workerData && parentPort) {
                const nonce = PowHelper
                .performPow(
                    workerData.powDigest,
                    workerData.targetZeros,
                    workerData.startIndex)
                .toString();
                parentPort.postMessage(nonce);
            }`,
            options
        );
        return worker;
    }
}
