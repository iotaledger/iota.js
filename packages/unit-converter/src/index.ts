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
 * Converts accross IOTA units. Valid unit names are:
 * `i`, `Ki`, `Mi`, `Gi`, `Ti`, `Pi`
 *
 * @method convertUnits
 *
 * @param {string | int | float} value
 *
 * @param {string} fromUnit - Name of original value unit
 *
 * @param {string} toUnit - Name of unit wich we convert to
 *
 * @return {Number}
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
