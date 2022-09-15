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
        console.log("pow");
        const powRelevantData = block.slice(0, -8);
        const powDigest = Blake2b.sum256(powRelevantData);
        const targetZeros = PowHelper.calculateTargetZeros(block, targetScore);

        return new Promise<string>((resolve, reject) => {
            const chunkSize = BigInt("18446744073709551615") / BigInt(this._numCpus);
            const workers: Worker[] = [];
            const scriptURLs = [...window.document.querySelectorAll("script")].map(element => element.src);
            console.log(scriptURLs);
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
                    console.log("init worker");
                    self.addEventListener("message", e => {
                        console.log("loading scripts");
                        let start = Date.now();
                        importScripts(
                            "https://cdn.jsdelivr.net/npm/big-integer@1.6.50/BigInteger.js",
                            "file:///home/bran/src/iota/iota-js/stardust/packages/crypto/dist/cjs/index-browser.js",
                            "https://cdn.jsdelivr.net/npm/@iota/util.js@1.9.0-stardust.5/dist/cjs/index-browser.min.js",
                            "https://cdn.jsdelivr.net/npm/@iota/iota.js@1.9.0-stardust.25/dist/cjs/index-browser.min.js"
                        );

                        console.log("scripts loaded", Date.now() - start);
                        const [powDigest, targetZeros, startIndex, powInterval] = [...e.data];
                        console.log("starting pow");

                        start = Date.now();
                        console.log("powInterval", powInterval);

                        const nonce = self.IotaCrypto.PowHelper.performPow(
                            powDigest,
                            targetZeros,
                            startIndex,
                            powInterval).toString();
                        console.log("pow done", Date.now() - start, nonce);

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

