"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitsHelper = void 0;
/**
 * Class to help with units formatting.
 */
var UnitsHelper = /** @class */ (function () {
    function UnitsHelper() {
    }
    /**
     * Format the value in the best units.
     * @param value The value to format.
     * @param decimalPlaces The number of decimal places to display.
     * @returns The formated value.
     */
    UnitsHelper.formatBest = function (value, decimalPlaces) {
        if (decimalPlaces === void 0) { decimalPlaces = 2; }
        return UnitsHelper.formatUnits(value, UnitsHelper.calculateBest(value), decimalPlaces);
    };
    /**
     * Format the value in the best units.
     * @param value The value to format.
     * @param unit The unit to format with.
     * @param decimalPlaces The number of decimal places to display.
     * @returns The formated value.
     */
    UnitsHelper.formatUnits = function (value, unit, decimalPlaces) {
        if (decimalPlaces === void 0) { decimalPlaces = 2; }
        if (!UnitsHelper.UNIT_MAP[unit]) {
            throw new Error("Unrecognized unit " + unit);
        }
        if (!value) {
            return "0 " + unit;
        }
        return unit === "i"
            ? value + " i"
            : UnitsHelper.convertUnits(value, "i", unit).toFixed(decimalPlaces) + " " + unit;
    };
    /**
     * Format the value in the best units.
     * @param value The value to format.
     * @returns The best units for the value.
     */
    UnitsHelper.calculateBest = function (value) {
        var bestUnits = "i";
        if (!value) {
            return bestUnits;
        }
        var checkLength = Math.abs(value).toString().length;
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
    };
    /**
     * Convert the value to different units.
     * @param value The value to convert.
     * @param fromUnit The form unit.
     * @param toUnit The to unit.
     * @returns The formatted unit.
     */
    UnitsHelper.convertUnits = function (value, fromUnit, toUnit) {
        if (!value) {
            return 0;
        }
        if (!UnitsHelper.UNIT_MAP[fromUnit]) {
            throw new Error("Unrecognized fromUnit " + fromUnit);
        }
        if (!UnitsHelper.UNIT_MAP[toUnit]) {
            throw new Error("Unrecognized toUnit " + toUnit);
        }
        if (fromUnit === "i" && value % 1 !== 0) {
            throw new Error("If fromUnit is 'i' the value must be an integer value");
        }
        if (fromUnit === toUnit) {
            return Number(value);
        }
        var multiplier = value < 0 ? -1 : 1;
        var scaledValue = Math.abs(Number(value)) *
            UnitsHelper.UNIT_MAP[fromUnit].val /
            UnitsHelper.UNIT_MAP[toUnit].val;
        var numDecimals = UnitsHelper.UNIT_MAP[toUnit].dp;
        // We cant use toFixed to just convert the new value to a string with
        // fixed decimal places as it will round, which we don't want
        // instead we want to convert the value to a string and manually
        // truncate the number of digits after the decimal
        // Unfortunately large numbers end up in scientific notation with
        // the regular toString() so we use a custom conversion.
        var fixed = scaledValue.toString();
        if (fixed.includes("e")) {
            fixed = scaledValue.toFixed(Number.parseInt(fixed.split("-")[1], 10));
        }
        // Now we have the number as a full string we can split it into
        // whole and decimals parts
        var parts = fixed.split(".");
        if (parts.length === 1) {
            parts.push("0");
        }
        // Now truncate the decimals by the number allowed on the toUnit
        parts[1] = parts[1].slice(0, numDecimals);
        // Finally join the parts and convert back to a real number
        return Number.parseFloat(parts[0] + "." + parts[1]) * multiplier;
    };
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
    return UnitsHelper;
}());
exports.UnitsHelper = UnitsHelper;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdHNIZWxwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvdW5pdHNIZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBSUE7O0dBRUc7QUFDSDtJQUFBO0lBZ0lBLENBQUM7SUFuSEc7Ozs7O09BS0c7SUFDVyxzQkFBVSxHQUF4QixVQUF5QixLQUFhLEVBQUUsYUFBeUI7UUFBekIsOEJBQUEsRUFBQSxpQkFBeUI7UUFDN0QsT0FBTyxXQUFXLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQzNGLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDVyx1QkFBVyxHQUF6QixVQUEwQixLQUFhLEVBQUUsSUFBVyxFQUFFLGFBQXlCO1FBQXpCLDhCQUFBLEVBQUEsaUJBQXlCO1FBQzNFLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXFCLElBQU0sQ0FBQyxDQUFDO1NBQ2hEO1FBRUQsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLE9BQU8sT0FBSyxJQUFNLENBQUM7U0FDdEI7UUFFRCxPQUFPLElBQUksS0FBSyxHQUFHO1lBQ2YsQ0FBQyxDQUFJLEtBQUssT0FBSTtZQUNkLENBQUMsQ0FBSSxXQUFXLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxTQUFJLElBQU0sQ0FBQztJQUN6RixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNXLHlCQUFhLEdBQTNCLFVBQTRCLEtBQWE7UUFDckMsSUFBSSxTQUFTLEdBQVUsR0FBRyxDQUFDO1FBRTNCLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDUixPQUFPLFNBQVMsQ0FBQztTQUNwQjtRQUVELElBQU0sV0FBVyxHQUFHLElBQUks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