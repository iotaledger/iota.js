// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Blake2b, PowHelper } from "@iota/crypto.js";
import type { IPowProvider } from "@iota/iota.js";

declare global {
    interface Window {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        IotaCrypto: any;
    }
}

/**
 * Browser POW Provider.
 */
export class BrowserPowProvider implements IPowProvider {
    /**
     * The number of CPUs to utilise.
     * @internal
     */
    private readonly _numCpus: number;

    /**
     * Create a new instance of BrowserPowProvider.
     * @param numCpus The number of cpus, defaults to max CPUs.
     */
    constructor(numCpus?: number) {
        this._numCpus = numCpus ?? window.navigator.hardwareConcurrency;
    }

    /**
     * Perform pow on the block and return the nonce of at least targetScore.
     * @param block The block to process.
     * @param targetScore The target score.
     * @param powInterval The time in seconds that pow should work before aborting.
     * @returns The nonce.
     */
    public async pow(block: Uint8Array, targetScore: number, powInterval?: number): Promise<string> {
        const powRelevantData = block.slice(0, -8);
        const powDigest = Blake2b.sum256(powRelevantData);
        const targetZeros = PowHelper.calculateTargetZeros(block, targetScore);

        return new Promise<string>((resolve, reject) => {
            const chunkSize = BigInt("18446744073709551615") / BigInt(this._numCpus);
            const workers: Worker[] = [];

            for (let i = 0; i < this._numCpus; i++) {
                const worker = this.createWorker();

                worker.postMessage([
                    powDigest,
                    targetZeros,
                    (chunkSize * BigInt(i)).toString(),
                    powInterval
                ]);
                workers.push(worker);

                worker.addEventListener("message", async (e: MessageEvent) => {
                    for (let j = 0; j < workers.length; j++) {
                        workers[j].terminate();
                    }
                    resolve(e.data as string);
                });
                worker.addEventListener("error", async (err: ErrorEvent) => {
                    reject(err.message);
                });
            }
        });
    }

    /**
     * Create new instance of the Worker.
     * @returns The Worker.
     */
     public createWorker(): Worker {
        const blob = new Blob([
                "(",
                (() => {
                    self.addEventListener("message", e => {
                        importScripts(
                            "https://cdn.jsdelivr.net/npm/@iota/crypto.js@next/dist/cjs/index-bundle.min.js"
                        );

                        const [powDigest, targetZeros, startIndex, powInterval] = [...e.data];

                        const nonce = self.IotaCrypto.PowHelper.performPow(
                            powDigest,
                            targetZeros,
                            startIndex,
                            powInterval).toString();

                        postMessage(nonce);
                    });
                }).toString(),
                ")()"
            ],
            { type: "application/javascript" }
        );

        const blobURL = URL.createObjectURL(blob);
        const worker = new Worker(blobURL);

        URL.revokeObjectURL(blobURL);

        return worker;
    }
}

