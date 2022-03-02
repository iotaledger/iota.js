// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable no-bitwise */
/* eslint-disable newline-per-chained-call */
/* eslint-disable no-mixed-operators */
import bigInt, { BigInteger } from "big-integer";

/**
 * Helper methods for hex conversions.
 */
export class HexHelper {
    /**
     * Convert the big int to hex string.
     * @param value The big int value to convert.
     * @returns The hex encoded big int.
     */
    public static fromBigInt(value: BigInteger): string {
        return `0x${value.toString(16)}`;
    }

    /**
     * Convert the hex string to a big int.
     * @param hex The hex value to convert.
     * @returns The big int.
     */
    public static toBigInt(hex: string): BigInteger {
        return bigInt(hex.replace(/^0x/, ""), 16);
    }

    /**
     * Convert the number to hex string.
     * @param value The number value to convert.
     * @returns The hex encoded number.
     */
    public static fromNumber(value: number): string {
        return `0x${value.toString(16)}`;
    }

    /**
     * Convert the hex string to a number.
     * @param hex The hex value to convert.
     * @returns The number.
     */
    public static toNumber(hex: string): number {
        return Number.parseInt(hex.replace(/^0x/, ""), 16);
    }
}
