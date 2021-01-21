// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
import { Blake2b } from "../crypto/blake2b";
import { Curl } from "../crypto/curl";
import { B1T6 } from "../encoding/b1t6";
import { BigIntHelper } from "./bigIntHelper";

/**
 * Helper methods for POW.
 */
export class PowHelper {
    /**
     * Perform the score calculation.
     * @param message The data to perform the score on
     * @returns The score for the data.
     */
    public static score(message: Uint8Array): number {
        // the PoW digest is the hash of msg without the nonce
        const powRelevantData = message.slice(0, -8);

        const powDigest = Blake2b.sum256(powRelevantData);

        const nonce = BigIntHelper.read8(message, message.length - 8);

        const zeros = PowHelper.trailingZeros(powDigest, nonce);

        return Math.pow(3, zeros) / message.length;
    }

    /**
     * Calculate the trailing zeros.
     * @param powDigest The pow digest.
     * @param nonce The nonce.
     * @returns The trailing zeros.
     */
    public static trailingZeros(powDigest: Uint8Array, nonce: bigint): number {
        const buf = new Int8Array(Curl.HASH_LENGTH);
        const digestTritsLen = B1T6.encode(buf, 0, powDigest);
        const biArr = new Uint8Array(8);

        BigIntHelper.write8(nonce, biArr, 0);
        B1T6.encode(buf, digestTritsLen, biArr);

        const curl = new Curl();
        curl.absorb(buf, 0, Curl.HASH_LENGTH);

        const hash = new Int8Array(Curl.HASH_LENGTH);
        curl.squeeze(hash, 0, Curl.HASH_LENGTH);

        return PowHelper.trinaryTrailingZeros(hash);
    }

    /**
     * Find the number of trailing zeros.
     * @param trits The trits to look for zeros.
     * @returns The number of trailing zeros.
     */
    public static trinaryTrailingZeros(trits: Int8Array): number {
        let z: number = 0;
        for (let i = trits.length - 1; i >= 0 && trits[i] === 0; i--) {
            z++;
        }
        return z;
    }
}
