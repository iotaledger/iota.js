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
     * Minimum tryte value.
     * @internal
     */
    private static readonly MIN_TRYTE_VALUE: number = -13;

    /**
     * Radix for trytes.
     * @internal
     */
    private static readonly TRYTE_RADIX: number = 27;

    /**
     * Half radix for trytes to save recalculating.
     * @internal
     */
    private static readonly TRYTE_RADIX_HALF: number = 13;

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
            const { t1, t2 } = B1T6.encodeGroup(src[i]);
            B1T6.storeTrits(dst, startIndex + j, t1);
            B1T6.storeTrits(dst, startIndex + j + B1T6.TRITS_PER_TRYTE, t2);
            j += 6;
        }
        return j;
    }

    /**
     * Encode a group to trits.
     * @param b The value to encode.
     * @returns The trit groups.
     * @internal
     */
    private static encodeGroup(b: number): { t1: number; t2: number } {
        const v = (b << 24 >> 24) + (B1T6.TRYTE_RADIX_HALF * B1T6.TRYTE_RADIX) + B1T6.TRYTE_RADIX_HALF;
        const quo = Math.trunc(v / 27);
        const rem = Math.trunc(v % 27);
        return {
            t1: rem + B1T6.MIN_TRYTE_VALUE,
            t2: quo + B1T6.MIN_TRYTE_VALUE
        };
    }

    /**
     * Store the trits in the dest array.
     * @param trits The trits array.
     * @param startIndex The start index in the array to write.
     * @param value The value to write.
     * @internal
     */
    private static storeTrits(trits: Int8Array, startIndex: number, value: number): void {
        const idx = value - B1T6.MIN_TRYTE_VALUE;

        trits[startIndex] = B1T6.TRYTE_VALUE_TO_TRITS[idx][0];
        trits[startIndex + 1] = B1T6.TRYTE_VALUE_TO_TRITS[idx][1];
        trits[startIndex + 2] = B1T6.TRYTE_VALUE_TO_TRITS[idx][2];
    }
}
