// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */

/**
 * Class to help with base58 Encoding/Decoding.
 */
export class Base58 {
    /**
     * Alphabet table for encoding.
     * @internal
     */
    private static readonly _ALPHABET: string = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

    /**
     * Reverse map for decoding.
     * @internal
     */
    private static readonly _ALPHABET_REVERSE: number[] = [
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8,
        -1, -1, -1, -1, -1, -1, -1, 9, 10, 11, 12, 13, 14, 15, 16, -1, 17, 18, 19, 20, 21, -1, 22, 23, 24, 25, 26, 27,
        28, 29, 30, 31, 32, -1, -1, -1, -1, -1, -1, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, -1, 44, 45, 46, 47, 48,
        49, 50, 51, 52, 53, 54, 55, 56, 57, -1, -1, -1, -1, -1
    ];

    /**
     * Convert the base 58 string to a byte array.
     * @param base58 The base58 string to convert.
     * @returns The byte array.
     * @throws If the input string contains a character not in the Base58 alphabet.
     */
    public static decode(base58: string): Uint8Array {
        let zeroes = 0;
        for (let i = 0; i < base58.length; i++) {
            if (base58[i] !== "1") {
                break;
            }

            zeroes += 1;
        }

        const size = Math.trunc((base58.length * 733) / 1000) + 1;
        const b256 = size <= 128 ? new Uint8Array(128).fill(0) : Buffer.alloc(size);

        let length = 0;

        for (let i = zeroes; i < base58.length; i++) {
            const ch = base58.charCodeAt(i);

            if (ch & 0xff80) {
                throw new Error(`"Invalid character found '${ch}'`);
            }

            const val = Base58._ALPHABET_REVERSE[ch];
            if (val === -1) {
                throw new Error(`"Invalid character found '${ch}'`);
            }

            let carry = val;
            let j = 0;

            for (let k = size - 1; k >= 0; k--, j++) {
                if (carry === 0 && j >= length) {
                    break;
                }

                carry += b256[k] * 58;
                b256[k] = carry;
                carry >>>= 8;
            }

            length = j;
        }

        const out = new Uint8Array(zeroes + length);

        let j;
        for (j = 0; j < zeroes; j++) {
            out[j] = 0;
        }

        let i = size - length;
        while (i < size) {
            out[j++] = b256[i++];
        }

        return out;
    }

    /**
     * Convert a byte array to base 58.
     * @param bytes The byte array to encode.
     * @returns The data as base58 string.
     */
    public static encode(bytes: Uint8Array): string {
        let zeroes = 0;

        for (let i = 0; i < bytes.length; i++) {
            if (bytes[i] !== 0) {
                break;
            }

            zeroes += 1;
        }

        const size = Math.trunc(((bytes.length - zeroes) * 138) / 100) + 1;
        const b58 = size <= 128 ? new Uint8Array(128).fill(0) : Buffer.alloc(size);

        let length = 0;

        for (let i = zeroes; i < bytes.length; i++) {
            let carry = bytes[i];
            let j = 0;

            for (let k = size - 1; k >= 0; k--, j++) {
                if (carry === 0 && j >= length) {
                    break;
                }

                carry += b58[k] * 256;
                b58[k] = carry % 58;
                carry = Math.trunc(carry / 58);
            }

            length = j;
        }

        let i = size - length;
        while (i < size && b58[i] === 0) {
            i += 1;
        }

        let str = "";

        for (let j = 0; j < zeroes; j++) {
            str += "1";
        }

        while (i < size) {
            str += Base58._ALPHABET[b58[i++]];
        }

        return str;
    }
}
