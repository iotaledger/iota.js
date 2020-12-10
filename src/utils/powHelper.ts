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
     * @internal
     */
    public static trailingZeros(powDigest: Uint8Array, nonce: bigint): number {
        // allocate exactly one Curl block
        const buf = new Int8Array(243);

        const n = B1T6.encode(buf, 0, powDigest);

        // add the nonce to the trit buffer
        PowHelper.encodeNonce(buf, n, nonce);

        const curl = new Curl();
        curl.absorb(buf, 0, buf.length);

        const digest = new Int8Array(243);
        curl.squeeze(digest, 0, digest.length);

        return PowHelper.trinaryTrailingZeros(digest);
    }

    /**
     * Find the number of trailing zeros.
     * @param trits The trits to look for zeros.
     * @returns The number of trailing zeros.
     * @internal
     */
    public static trinaryTrailingZeros(trits: Int8Array): number {
        let z: number = 0;
        for (let i = trits.length - 1; i >= 0 && trits[i] === 0; i--) {
            z++;
        }
        return z;
    }

    /**
     * Encodes nonce as 48 trits using the b1t6 encoding.
     * @param dst The destination buffer.
     * @param startIndex The start index;
     * @param nonce The nonce to encode.
     * @internal
     */
    public static encodeNonce(dst: Int8Array, startIndex: number, nonce: bigint): void {
        const arr = new Uint8Array(8);
        BigIntHelper.write8(nonce, arr, 0);
        B1T6.encode(dst, startIndex, arr);
    }
}
