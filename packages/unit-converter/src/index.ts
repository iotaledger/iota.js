/** @module unit-converter */
import BigNumber from 'bignumber.js'

export enum Unit {
    i = 'i',
    Ki = 'Ki',
    Mi = 'Mi',
    Gi = 'Gi',
    Ti = 'Ti',
    Pi = 'Pi',
}

export interface UnitMap {
    readonly [unit: string]: {
        readonly val: BigNumber
        readonly dp: number
    }
}

// Map of IOTA Units based off of the standard System of Units
export const unitMap: UnitMap = {
    i: { val: new BigNumber(10).pow(0), dp: 0 },
    Ki: { val: new BigNumber(10).pow(3), dp: 3 },
    Mi: { val: new BigNumber(10).pow(6), dp: 6 },
    Gi: { val: new BigNumber(10).pow(9), dp: 9 },
    Ti: { val: new BigNumber(10).pow(12), dp: 12 },
    Pi: { val: new BigNumber(10).pow(15), dp: 15 }, // For the very, very rich
}

/**
 * This method converts a value of [IOTA tokens](https://docs.iota.org/docs/getting-started/0.1/clients/token) from a given unit to another given unit. 
 * 
 * Valid unit names include the following:
 * - `i`: 1
 * - `Ki`: 1,000
 * - `Mi`: 1,000,000
 * - `Gi`: 1,000,000,000
 * - `Ti`: 1,000,000,000,000
 * - `Pi`: 1,000,000,000,000,000
 * 
 * @method convertUnits
 * 
 * @summary Converts a value of IOTA tokens from one unit to another.
 *  
 * @memberof module:unit-converter
 *
 * @param {String | integer | float} value - Number of IOTA tokens
 * @param {String} fromUnit - Unit of the `value` argument
 * @param {String} toUnit - Unit to which to convert the value to
 * 
 * @example
 * ```js
 * let newUnit = UnitConverter.convertUnits(100, 'Ti', 'Pi');
 * ```
 * 
 * @return {number} newUnit - The number of units of IOTA tokens 
 */
export const convertUnits = (value: string | number, fromUnit: Unit, toUnit: Unit) => {
    // Check if wrong unit provided
    if (!unitMap[fromUnit] || !unitMap[toUnit]) {
        throw new Error('Invalid unit provided.')
    }

    const valueBn = new BigNumber(value)

    if (valueBn.dp() > unitMap[fromUnit].dp) {
        throw new Error('Input value exceeded max fromUnit precision.')
    }

    return valueBn
        .times(unitMap[fromUnit].val)
        .dividedBy(unitMap[toUnit].val)
        .toNumber()
}
