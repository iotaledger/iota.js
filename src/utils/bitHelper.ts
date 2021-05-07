// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */

/**
 * Bit manipulation methods.
 * @internal
 */
export class BitHelper {
    /**
     * Combine unsigned bytes to unsigned 32-bit.
     * @param bytes The byte array.
     * @param startIndex The start index to convert.
     * @returns The 32 bit number.
     * @internal
     */
    public static u8To32LittleEndian(bytes: Uint8Array, startIndex: number): number {
        return bytes[startIndex] |
            (bytes[startIndex + 1] << 8) |
            (bytes[startIndex + 2] << 16) |
            (bytes[startIndex + 3] << 24);
    }

    /**
     * Write a 32 bit unsigned into a byte array.
     * @param bytes The array to write in to.
     * @param startIndex The index to start writing at.
     * @param value The 32 bit value.
     * @internal
     */
     public static u32To8LittleEndian(bytes: Uint8Array, startIndex: number, value: number): void {
        bytes[startIndex] = value;
        value >>>= 8;
        bytes[startIndex + 1] = value;
        value >>>= 8;
        bytes[startIndex + 2] = value;
        value >>>= 8;
        bytes[startIndex + 3] = value;
    }

    /**
     * Rotate the 32 bit number.
     * @param value The value to rotate,
     * @param bits The number of bits to rotate by.
     * @returns The rotated number.
     * @internal
     */
     public static rotate(value: number, bits: number): number {
        return (value << bits) | (value >>> (32 - bits));
    }
}
