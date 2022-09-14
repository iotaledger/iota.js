// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Blake2b } from "@iota/crypto.js";
import type { IPowProvider } from "../models/IPowProvider";
import { PowHelper } from "../utils/powHelper";
import { BrowserPowWorker } from "./browserPowWorker";

/**
 * Local Browser PoW Provider.
 */
export class LocalBrowserPowProvider implements IPowProvider {
    /**
     * The number of CPUs to utilise.
     * @internal
     */
    private readonly _numCpus: number;

    /**
     * The environment.
     * @internal
     */
    private readonly _isBrowser: boolean;

    /**
     * Create a new instance of LocalBrowserPowProvider.
     * @param numCpus The number of cpus, defaults to max CPUs.
     */
    constructor(numCpus?: number) {
        this._isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";
        this._numCpus = numCpus ?? (this._isBrowser ? window.navigator.hardwareConcurrency : 1);
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

        if (this._isBrowser) {
            const browserWorker = new BrowserPowWorker(this._numCpus);
            return browserWorker.doBrowserPow(powDigest, targetZeros, powInterval);
        }
        return "0";
    }
}
