// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/**
 * Perform the POW on a message.
 */
export interface IPowProvider {
    /**
     * Perform pow on the message and return the nonce of at least targetScore.
     * @param message The message to process.
     * @param targetScore The target score.
     * @returns The nonce.
     */
    pow(message: Uint8Array, targetScore: number): Promise<bigint>;
}
