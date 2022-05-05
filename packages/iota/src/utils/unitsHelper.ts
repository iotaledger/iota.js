// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { Magnitudes } from "../models/magnitudes";

/**
 * Class to help with units formatting.
 */
export class UnitsHelper {
    /**
     * Map units.
     */
    public static readonly MAGNITUDE_MAP: { [magnitude in Magnitudes]: { val: number; dp: number } } = {
        "": { val: 1, dp: 0 },
        K: { val: 1000, dp: 3 },
        M: { val: 1000000, dp: 6 },
        G: { val: 1000000000, dp: 9 },
        T: { val: 1000000000000, dp: 12 },
        P: { val: 1000000000000000, dp: 15 }
    };

    /**
     * Format the value in the best units.
     * @param value The value to format.
     * @param decimalPlaces The number of decimal places to display.
     * @returns The formated value.
     */
    public static formatBest(value: number, decimalPlaces: number = 2): string {
        return UnitsHelper.formatUnits(value, UnitsHelper.calculateBest(value), decimalPlaces);
    }

    /**
     * Format the value in the best units.
     * @param value The value to format.
     * @param magnitude The magnitude to format with.
     * @param decimalPlaces The number of decimal places to display.
     * @returns The formated value.
     */
    public static formatUnits(value: number, magnitude: Magnitudes, decimalPlaces: number = 2): string {
        if (!UnitsHelper.MAGNITUDE_MAP[magnitude]) {
            throw new Error(`Unrecognized unit ${magnitude}`);
        }

        if (!value) {
            return "0";
        }

        return magnitude === ""
            ? `${value}`
            : `${UnitsHelper.convertUnits(value, "", magnitude).toFixed(decimalPlaces)} ${magnitude}`;
    }

    /**
     * Format the value in the best units.
     * @param value The value to format.
     * @returns The best units for the value.
     */
    public static calculateBest(value: number): Magnitudes {
        let bestUnits: Magnitudes = "";

        if (!value) {
            return bestUnits;
        }

        const checkLength = Math.abs(value).toString().length;

        if (checkLength > UnitsHelper.MAGNITUDE_MAP.P.dp) {
            bestUnits = "P";
        } else if (checkLength > UnitsHelper.MAGNITUDE_MAP.T.dp) {
            bestUnits = "T";
        } else if (checkLength > UnitsHelper.MAGNITUDE_MAP.G.dp) {
            bestUnits = "G";
        } else if (checkLength > UnitsHelper.MAGNITUDE_MAP.M.dp) {
            bestUnits = "M";
        } else if (checkLength > UnitsHelper.MAGNITUDE_MAP.K.dp) {
            bestUnits = "K";
        }

        return bestUnits;
    }

    /**
     * Convert the value to different units.
     * @param value The value to convert.
     * @param from The from magnitude.
     * @param to The to magnitude.
     * @returns The formatted unit.
     */
    public static convertUnits(value: number, from: Magnitudes, to: Magnitudes): number {
        if (!value) {
            return 0;
        }
        if (!UnitsHelper.MAGNITUDE_MAP[from]) {
            throw new Error(`Unrecognized fromUnit ${from}`);
        }
        if (!UnitsHelper.MAGNITUDE_MAP[to]) {
            throw new Error(`Unrecognized toUnit ${to}`);
        }

        if (from === to) {
            return Number(value);
        }

        const multiplier = value < 0 ? -1 : 1;
        const scaledValue =
            (Math.abs(Number(value)) * UnitsHelper.MAGNITUDE_MAP[from].val) / UnitsHelper.MAGNITUDE_MAP[to].val;
        const numDecimals = UnitsHelper.MAGNITUDE_MAP[to].dp;

        // We cant use toFixed to just convert the new value to a string with
        // fixed decimal places as it will round, which we don't want
        // instead we want to convert the value to a string and manually
        // truncate the number of digits after the decimal
        // Unfortunately large numbers end up in scientific notation with
        // the regular toString() so we use a custom conversion.
        let fixed = scaledValue.toString();
        if (fixed.includes("e")) {
            fixed = scaledValue.toFixed(Number.parseInt(fixed.split("-")[1], 10));
        }

        // Now we have the number as a full string we can split it into
        // whole and decimals parts
        const parts = fixed.split(".");
        if (parts.length === 1) {
            parts.push("0");
        }

        // Now truncate the decimals by the number allowed on the toUnit
        parts[1] = parts[1].slice(0, numDecimals);

        // Finally join the parts and convert back to a real number
        return Number.parseFloat(`${parts[0]}.${parts[1]}`) * multiplier;
    }
}
