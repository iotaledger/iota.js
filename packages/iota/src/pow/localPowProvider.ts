// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Blake2b, PowHelper } from "@iota/crypto.js";
import type { IPowProvider } from "../models/IPowProvider";

/**
 * Local POW Provider.
 * WARNING - This is really slow.
 */
export class LocalPowProvider implements IPowProvider {
    /**
     * Perform pow on the block and return the nonce of at least targetScore.
     * @param block The block to process.
     * @param targetScore The target score.
     * @returns The nonce.
     */
    public async pow(block: Uint8Array, targetScore: number): Promise<string> {
        const powRelevantData = block.slice(0, -8);
        const powDigest = Blake2b.sum256(powRelevantData);
        const targetZeros = PowHelper.calculateTargetZeros(block, targetScore);
        return PowHelper.performPow(powDigest, targetZeros, "0").toString();
    }
}
