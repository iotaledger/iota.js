// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
/* eslint-disable newline-per-chained-call */
/* eslint-disable no-mixed-operators */
import bigInt, { BigInteger } from "big-integer";
import { Converter } from "./converter";
import { RandomHelper } from "./randomHelper";

/**
 * Helper methods for bigints.
 */
export class BigIntHelper {
    /**
     * Load 3 bytes from array as bigint.
     * @param data The input array.
     * @param byteOffset The start index to read from.
     * @returns The bigint.
     */
    public static read3(data: Uint8Array, byteOffset: number): BigInteger {
        const v0 = (data[byteOffset + 0] + (data[byteOffset + 1] << 8) + (data[byteOffset + 2] << 16)) >>> 0;

        return bigInt(v0);
    }

    /**
     * Load 4 bytes from array as bigint.
     * @param data The input array.
     * @param byteOffset The start index to read from.
     * @returns The bigint.
     */
    public static read4(data: Uint8Array, byteOffset: number): BigInteger {
        const v0 =
            (data[byteOffset + 0] +
                (data[byteOffset + 1] << 8) +
                (data[byteOffset + 2] << 16) +
                (data[byteOffset + 3] << 24)) >>>
            0;

        return bigInt(v0);
    }

    /**
     * Load 8 bytes from array as bigint.
     * @param data The data to read from.
     * @param byteOffset The start index to read from.
     * @returns The bigint.
     */
    public static read8(data: Uint8Array, byteOffset: number): BigInteger {
        const bytes = data.slice(byteOffset, byteOffset + 8);

        // convert to little endian hex by reversing the bytes
        const hex = Converter.bytesToHex(bytes, false, undefined, undefined, true);

        return bigInt(hex, 16);
    }

    /**
     * Load 32 bytes (256 bits) from array as bigint.
     * @param data The data to read from.
     * @param byteOffset The start index to read from.
     * @returns The bigint.
     */
    public static read32(data: Uint8Array, byteOffset: number): BigInteger {
        const bytes = data.slice(byteOffset, byteOffset + 32);

        // convert to little endian hex by reversing the bytes
        const hex = Converter.bytesToHex(bytes, false, undefined, undefined, true);

        return bigInt(hex, 16);
    }

    /**
     * Convert a big int to bytes.
     * @param value The bigint.
     * @param data The buffer to write into.
     * @param byteOffset The start index to write from.
     */
    public static write8(value: BigInteger, data: Uint8Array, byteOffset: number): void {
        let hex = value.toString(16);
        // Hex is twice the length of the bytes for padding
        hex = hex.padStart(16, "0");
        // Reverse so little endian
        const littleEndian = Converter.hexToBytes(hex, true);
        data.set(littleEndian, byteOffset);
    }

    /**
     * Convert a big int 32 bytes (256 bits) to bytes.
     * @param value The bigint.
     * @param data The buffer to write into.
     * @param byteOffset The start index to write from.
     */
    public static write32(value: BigInteger, data: Uint8Array, byteOffset: number): void {
        let hex = value.toString(16);
        // Hex is twice the length of the bytes for padding
        hex = hex.padStart(64, "0");
        // Reverse so little endian
        const littleEndian = Converter.hexToBytes(hex, true);
        data.set(littleEndian, byteOffset);
    }

    /**
     * Generate a random bigint.
     * @param length The length of the bigint to generate.
     * @returns The bigint.
     */
    public static random(length: number = 8): BigInteger {
        return bigInt(Converter.bytesToHex(RandomHelper.generate(length)), 16);
    }
}
