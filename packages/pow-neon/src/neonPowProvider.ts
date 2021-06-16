// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
import type { IPowProvider } from "@iota/iota.js";
import os from "os";
import module from "../native/";

/**
 * Neon POW Provider.
 */
export class NeonPowProvider implements IPowProvider {
    /**
     * The number of CPUs to utilise.
     * @internal
     */
    private readonly _numCpus: number;

    /**
     * Create a new instance of NeonPowProvider.
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
    public async pow(message: Uint8Array, targetScore: number): Promise<bigint> {
        const powRelevantData = message.slice(0, -8);

        const nonceArr = module.doPow(powRelevantData.buffer, targetScore, this._numCpus);

        return BigInt(nonceArr[0]) | (BigInt(nonceArr[1]) << BigInt(32));
    }
}
