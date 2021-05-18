// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
/**
 * Class implements the b1t6 encoding encoding which uses a group of 6 trits to encode each byte.
 */
export class B1T6 {
    /**
     * Trytes to trits lookup table.
     * @internal
     */
    private static readonly TRYTE_VALUE_TO_TRITS: number[][] = [
        [-1, -1, -1], [0, -1, -1], [1, -1, -1], [-1, 0, -1], [0, 0, -1], [1, 0, -1],
        [-1, 1, -1], [0, 1, -1], [1, 1, -1], [-1, -1, 0], [0, -1, 0], [1, -1, 0],
        [-1, 0, 0], [0, 0, 0], [1, 0, 0], [-1, 1, 0], [0, 1, 0], [1, 1, 0],
        [-1, -1, 1], [0, -1, 1], [1, -1, 1], [-1, 0, 1], [0, 0, 1], [1, 0, 1],
        [-1, 1, 1], [0, 1, 1], [1, 1, 1]
    ];

    /**
     * Trites per tryte.
     * @internal
     */
    private static readonly TRITS_PER_TRYTE: number = 3;

    /**
     * The encoded length of the data.
     * @param data The data.
     * @returns The encoded length.
     */
    public static encodedLen(data: Uint8Array): number {
        return data.length * B1T6.TRITS_PER_TRYTE;
    }

    /**
     * Encode a byte array into trits.
     * @param dst The destination array.
     * @param startIndex The start index to write in the array.
     * @param src The source data.
     * @returns The length of the encode.
     */
    public static encode(dst: Int8Array, startIndex: number, src: Uint8Array): number {
        let j = 0;
        for (let i = 0; i < src.length; i++) {
            // Convert to signed 8 bit value
            const v = (src[i] << 24 >> 24) + 364;

            const rem = Math.trunc(v % 27);
            const quo = Math.trunc(v / 27);

            dst[startIndex + j] = B1T6.TRYTE_VALUE_TO_TRITS[rem][0];
            dst[startIndex + j + 1] = B1T6.TRYTE_VALUE_TO_TRITS[rem][1];
            dst[startIndex + j + 2] = B1T6.TRYTE_VALUE_TO_TRITS[rem][2];
            dst[startIndex + j + 3] = B1T6.TRYTE_VALUE_TO_TRITS[quo][0];
            dst[startIndex + j + 4] = B1T6.TRYTE_VALUE_TO_TRITS[quo][1];
            dst[startIndex + j + 5] = B1T6.TRYTE_VALUE_TO_TRITS[quo][2];

            j += 6;
        }
        return j;
    }
}
