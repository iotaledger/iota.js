// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import bigInt, { BigInteger } from "big-integer";

/**
 * Helper methods for hex conversions.
 */
export class HexHelper {
    /**
     * Const defining the maximum value for a 256 bit int.
     */
    public static readonly BIG_INT_MAX_256_BIT: BigInteger = bigInt("ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff", 16);

    /**
     * Convert the big int 256 bit to hex string.
     * @param value The big int value to convert.
     * @returns The hex encoded big int.
     */
    public static fromBigInt256(value: BigInteger): string {
        if (value.gt(HexHelper.BIG_INT_MAX_256_BIT)) {
            return HexHelper.addPrefix(HexHelper.BIG_INT_MAX_256_BIT.toString(16));
        }
        return HexHelper.addPrefix(value.toString(16));
    }

    /**
     * Convert the hex string to a big int.
     * @param hex The hex value to convert.
     * @returns The big int.
     */
    public static toBigInt256(hex: string): BigInteger {
        const bi = bigInt(HexHelper.stripPrefix(hex), 16);

        if (bi.greater(HexHelper.BIG_INT_MAX_256_BIT)) {
            return HexHelper.BIG_INT_MAX_256_BIT;
        }

        return bi;
    }

    /**
     * Strip the 0x prefix if it exists.
     * @param hex The hex value to strip.
     * @returns The stripped hex without the prefix.
     */
    public static stripPrefix(hex: string): string {
        return hex.replace(/^0x/, "");
    }

    /**
     * Add the 0x prefix if it does not exist.
     * @param hex The hex value to add the prefix to.
     * @returns The hex with the prefix.
     */
    public static addPrefix(hex: string): string {
        return hex.startsWith("0x") ? hex : `0x${hex}`;
    }

    /**
     * Does the hex string have the prefix.
     * @param hex The hex value to check for the prefix.
     * @returns True if the hex string has the prefix.
     */
    public static hasPrefix(hex: string): boolean {
        return hex.startsWith("0x");
    }
}
