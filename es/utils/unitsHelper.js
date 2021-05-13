"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitsHelper = void 0;
/**
 * Class to help with units formatting.
 */
class UnitsHelper {
    /**
     * Format the value in the best units.
     * @param value The value to format.
     * @param decimalPlaces The number of decimal places to display.
     * @returns The formated value.
     */
    static formatBest(value, decimalPlaces = 2) {
        return UnitsHelper.formatUnits(value, UnitsHelper.calculateBest(value), decimalPlaces);
    }
    /**
     * Format the value in the best units.
     * @param value The value to format.
     * @param unit The unit to format with.
     * @param decimalPlaces The number of decimal places to display.
     * @returns The formated value.
     */
    static formatUnits(value, unit, decimalPlaces = 2) {
        if (!UnitsHelper.UNIT_MAP[unit]) {
            throw new Error(`Unrecognized unit ${unit}`);
        }
        if (!value) {
            return `0 ${unit}`;
        }
        return unit === "i"
            ? `${value} i`
            : `${UnitsHelper.convertUnits(value, "i", unit).toFixed(decimalPlaces)} ${unit}`;
    }
    /**
     * Format the value in the best units.
     * @param value The value to format.
     * @returns The best units for the value.
     */
    static calculateBest(value) {
        let bestUnits = "i";
        if (!value) {
            return bestUnits;
        }
        const checkLength = Math.abs(value).toString().length;
        if (checkLength > UnitsHelper.UNIT_MAP.Pi.dp) {
            bestUnits = "Pi";
        }
        else if (checkLength > UnitsHelper.UNIT_MAP.Ti.dp) {
            bestUnits = "Ti";
        }
        else if (checkLength > UnitsHelper.UNIT_MAP.Gi.dp) {
            bestUnits = "Gi";
        }
        else if (checkLength > UnitsHelper.UNIT_MAP.Mi.dp) {
            bestUnits = "Mi";
        }
        else if (checkLength > UnitsHelper.UNIT_MAP.Ki.dp) {
            bestUnits = "Ki";
        }
        return bestUnits;
    }
    /**
     * Convert the value to different units.
     * @param value The value to convert.
     * @param fromUnit The form unit.
     * @param toUnit The to unit.
     * @returns The formatted unit.
     */
    static convertUnits(value, fromUnit, toUnit) {
        if (!value) {
            return 0;
        }
        if (!UnitsHelper.UNIT_MAP[fromUnit]) {
            throw new Error(`Unrecognized fromUnit ${fromUnit}`);
        }
        if (!UnitsHelper.UNIT_MAP[toUnit]) {
            throw new Error(`Unrecognized toUnit ${toUnit}`);
        }
        if (fromUnit === "i" && value % 1 !== 0) {
            throw new Error("If fromUnit is 'i' the value must be an integer value");
        }
        if (fromUnit === toUnit) {
            return Number(value);
        }
        const multiplier = value < 0 ? -1 : 1;
        const scaledValue = Math.abs(Number(value)) *
            UnitsHelper.UNIT_MAP[fromUnit].val /
            UnitsHelper.UNIT_MAP[toUnit].val;
        const numDecimals = UnitsHelper.UNIT_MAP[toUnit].dp;
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
exports.UnitsHelper = UnitsHelper;
/**
 * Map units.
 */
UnitsHelper.UNIT_MAP = {
    i: { val: 1, dp: 0 },
    Ki: { val: 1000, dp: 3 },
    Mi: { val: 1000000, dp: 6 },
    Gi: { val: 1000000000, dp: 9 },
    Ti: { val: 1000000000000, dp: 12 },
    Pi: { val: 1000000000000000, dp: 15 }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdHNIZWxwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvdW5pdHNIZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBSUE7O0dBRUc7QUFDSCxNQUFhLFdBQVc7SUFhcEI7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQWEsRUFBRSxnQkFBd0IsQ0FBQztRQUM3RCxPQUFPLFdBQVcsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDM0YsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNJLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBYSxFQUFFLElBQVcsRUFBRSxnQkFBd0IsQ0FBQztRQUMzRSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQ2hEO1FBRUQsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLE9BQU8sS0FBSyxJQUFJLEVBQUUsQ0FBQztTQUN0QjtRQUVELE9BQU8sSUFBSSxLQUFLLEdBQUc7WUFDZixDQUFDLENBQUMsR0FBRyxLQUFLLElBQUk7WUFDZCxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO0lBQ3pGLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFhO1FBQ3JDLElBQUksU0FBUyxHQUFVLEdBQUcsQ0FBQztRQUUzQixJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1IsT0FBTyxTQUFTLENBQUM7U0FDcEI7UUFFRCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxD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