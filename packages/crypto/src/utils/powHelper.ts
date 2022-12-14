// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
import { BigIntHelper } from "@iota/util.js";
import bigInt, { BigInteger } from "big-integer";
import { B1T6 } from "../encoding/b1t6";
import { Blake2b } from "../hashes/blake2b";
import { Curl } from "../hashes/curl";

/**
 * Helper methods for POW.
 */
export class PowHelper {
    /**
     * LN3 Const see https://oeis.org/A002391.
     * 1.098612288668109691395245236922525704647490557822749451734694333 .
     */
    public static readonly LN3: number = 1.0986122886681098;

    /**
     * Perform the score calculation.
     * @param block The data to perform the score on.
     * @returns The score for the data.
     */
    public static score(block: Uint8Array): number {
        // the PoW digest is the hash of block without the nonce
        const powRelevantData = block.slice(0, -8);

        const powDigest = Blake2b.sum256(powRelevantData);

        const nonce = BigIntHelper.read8(block, block.length - 8);

        const zeros = PowHelper.trailingZeros(powDigest, nonce);

        return Math.pow(3, zeros) / block.length;
    }

    /**
     * Calculate the number of zeros required to get target score.
     * @param block The block to process.
     * @param targetScore The target score.
     * @returns The number of zeros to find.
     */
    public static calculateTargetZeros(block: Uint8Array, targetScore: number): number {
        return Math.ceil(Math.log(block.length * targetScore) / this.LN3);
    }

    /**
     * Calculate the trailing zeros.
     * @param powDigest The pow digest.
     * @param nonce The nonce.
     * @returns The trailing zeros.
     */
    public static trailingZeros(powDigest: Uint8Array, nonce: BigInteger): number {
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
     * @param endPos The end position to start looking for zeros.
     * @returns The number of trailing zeros.
     */
    public static trinaryTrailingZeros(trits: Int8Array, endPos: number = trits.length): number {
        let z: number = 0;
        for (let i = endPos - 1; i >= 0 && trits[i] === 0; i--) {
            z++;
        }
        return z;
    }

    /**
     * Perform the hash on the data until we reach target number of zeros.
     * @param powDigest The pow digest.
     * @param targetZeros The target number of zeros.
     * @param startIndex The index to start looking from.
     * @param powInterval The time in seconds that pow should work before aborting.
     * @returns The nonce.
     */
    public static performPow(
        powDigest: Uint8Array,
        targetZeros: number,
        startIndex: string,
        powInterval?: number
    ): string {
        let nonce = bigInt(startIndex);
        let returnNonce;

        const buf: Int8Array = new Int8Array(Curl.HASH_LENGTH);
        const digestTritsLen = B1T6.encode(buf, 0, powDigest);
        const biArr = new Uint8Array(8);

        let end = Number.POSITIVE_INFINITY;
        if (powInterval) {
            end = Date.now() + (powInterval * 1000);
        }

        do {
            BigIntHelper.write8(nonce, biArr, 0);
            B1T6.encode(buf, digestTritsLen, biArr);

            const curlState = new Int8Array(Curl.STATE_LENGTH);
            curlState.set(buf, 0);
            Curl.transform(curlState, 81);

            if (PowHelper.trinaryTrailingZeros(curlState, Curl.HASH_LENGTH) >= targetZeros) {
                returnNonce = nonce;
            } else {
                nonce = nonce.plus(1);
            }
        } while (returnNonce === undefined && Date.now() <= end);

        return returnNonce ? returnNonce.toString() : "0";
    }
}