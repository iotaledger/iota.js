import type { Units } from "../models/units";
/**
 * Class to help with units formatting.
 */
export declare class UnitsHelper {
    /**
     * Map units.
     */
    static readonly UNIT_MAP: {
        [unit in Units]: {
            val: number;
            dp: number;
        };
    };
    /**
     * Format the value in the best units.
     * @param value The value to format.
     * @param decimalPlaces The number of decimal places to display.
     * @returns The formated value.
     */
    static formatBest(value: number, decimalPlaces?: number): string;
    /**
     * Format the value in the best units.
     * @param value The value to format.
     * @param unit The unit to format with.
     * @param decimalPlaces The number of decimal places to display.
     * @returns The formated value.
     */
    static formatUnits(value: number, unit: Units, decimalPlaces?: number): string;
    /**
     * Format the value in the best units.
     * @param value The value to format.
     * @returns The best units for the value.
     */
    static calculateBest(value: number): Units;
    /**
     * Convert the value to different units.
     * @param value The value to convert.
     * @param fromUnit The form unit.
     * @param toUnit The to unit.
     * @returns The formatted unit.
     */
    static convertUnits(value: number, fromUnit: Units, toUnit: Units): number;
}
