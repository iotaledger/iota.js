import BigNumber from 'bignumber.js'
import * as errors from '../errors'

export enum Unit {
    i = 'i',
    Ki = 'Ki',
    Mi = 'Mi',
    Gi = 'Gi',
    Ti = 'Ti',
    Pi = 'Pi',
}

/**
 *   Map of IOTA Units based off of the standard System of Units
 **/
export const unitMap = {
    i: { val: new BigNumber(10).pow(0), dp: 0 },
    Ki: { val: new BigNumber(10).pow(3), dp: 3 },
    Mi: { val: new BigNumber(10).pow(6), dp: 6 },
    Gi: { val: new BigNumber(10).pow(9), dp: 9 },
    Ti: { val: new BigNumber(10).pow(12), dp: 12 },
    Pi: { val: new BigNumber(10).pow(15), dp: 15 }, // For the very, very rich
}

/**
 *   converts IOTA units
 *
 *   @method convertUnits
 *   @param {string || int || float} value
 *   @param {string} fromUnit
 *   @param {string} toUnit
 *   @returns {integer} converted
 **/
export const convertUnits = (value: string | number, fromUnit: Unit, toUnit: Unit) => {
    // Check if wrong unit provided
    if (unitMap[fromUnit] === undefined || unitMap[toUnit] === undefined) {
        throw new Error('Invalid unit provided')
    }

    const valueBn = new BigNumber(value)

    if (valueBn.dp() > unitMap[fromUnit].dp) {
        throw new Error('Input value exceeded max fromUnit precision.')
    }

    const valueRaw = valueBn.times(unitMap[fromUnit].val)
    const valueScaled = valueRaw.dividedBy(unitMap[toUnit].val)

    return valueScaled.toNumber()
}
