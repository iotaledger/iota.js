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
     * LN3 Const see https://oeis.org/A002391.
     */
    public static readonly LN3: number = 1.098612288668109691395245236922525704647490557822749451734694333;

    /**
     * Perform the score calculation.
     * @param message The data to perform the score on.
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
     * Calculate the number of zeros required to get target score.
     * @param message The message to process.
     * @param targetScore The target score.
     * @returns The number of zeros to find.
     */
    public static calculateTargetZeros(message: Uint8Array, targetScore: number): number {
        return Math.ceil(Math.log(message.length * targetScore) / this.LN3);
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
     * @returns The nonce.
     */
    public static performPow(powDigest: Uint8Array, targetZeros: number, startIndex: bigint): bigint {
        let nonce = BigInt(startIndex);
        let returnNonce;

        const buf: Int8Array = new Int8Array(Curl.HASH_LENGTH);
        const digestTritsLen = B1T6.encode(buf, 0, powDigest);
        const biArr = new Uint8Array(8);

        do {
            BigIntHelper.write8(nonce, biArr, 0);
            B1T6.encode(buf, digestTritsLen, biArr);

            const curlState = new Int8Array(Curl.STATE_LENGTH);
            curlState.set(buf, 0);
            Curl.transform(curlState, 81);

            if (PowHelper.trinaryTrailingZeros(curlState, Curl.HASH_LENGTH) >= targetZeros) {
                returnNonce = nonce;
            } else {
                nonce++;
            }
        } while (returnNonce === undefined);

        return returnNonce ?? BigInt(0);
    }
}
