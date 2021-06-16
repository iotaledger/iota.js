// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Blake2b } from "../crypto/blake2b";
import type { IPowProvider } from "../models/IPowProvider";
import { PowHelper } from "../utils/powHelper";

/**
 * Local POW Provider.
 * WARNING - This is really slow.
 */
export class LocalPowProvider implements IPowProvider {
    /**
     * Perform pow on the message and return the nonce of at least targetScore.
     * @param message The message to process.
     * @param targetScore The target score.
     * @returns The nonce.
     */
    public async pow(message: Uint8Array, targetScore: number): Promise<bigint> {
        const powRelevantData = message.slice(0, -8);
        const powDigest = Blake2b.sum256(powRelevantData);
        const targetZeros = PowHelper.calculateTargetZeros(message, targetScore);
        return PowHelper.performPow(powDigest, targetZeros, BigInt(0));
    }
}
