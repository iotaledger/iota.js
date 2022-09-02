// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

declare global {
    interface Window {
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        Iota: any;
    }
  }
/**
 * The Browser PoW Worker.
 */
export class BrowserPowWorker {
    /**
     * The number of CPUs to utilise.
     * @internal
     */
    private readonly _numCpus: number;

    /**
     * Create a new instance of the Browser PoW Worker.
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
    public async doBrowserPow(powDigest: Uint8Array, targetZeros: number): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const chunkSize = BigInt("18446744073709551615") / BigInt(this._numCpus);
            const workers: Worker[] = [];

            for (let i = 0; i < this._numCpus; i++) {
                const worker = this.createWorker();
                const scriptURLs = [...window.document.querySelectorAll("script")].map(element => element.src);

                worker.postMessage([
                    powDigest,
                    targetZeros,
                    (chunkSize * BigInt(i)).toString(),
                    scriptURLs
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
                addEventListener("message", e => {
                    const [powDigest, targetZeros, startIndex, scripts] = [...e.data];
                    /* eslint-disable @typescript-eslint/no-unsafe-argument */
                    for (const script of scripts) {
                        if (script) {
                            importScripts(script);
                        }
                    }
                    const nonce = self.Iota.PowHelper
                        .performPow(
                            powDigest,
                            targetZeros,
                            startIndex)
                        .toString();

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
