import * as errors from './errors'

const RADIX = 3
const MAX_TRIT_VALUE = 1
const MIN_TRIT_VALUE = -1

// All possible tryte values
export const TRYTE_ALPHABET = '9ABCDEFGHIJKLMNOPQRSTUVWXYZ'

// Trytes to trits look up table
export const TRYTES_TRITS_LUT: ReadonlyArray<ReadonlyArray<number>> = [
    [0, 0, 0],
    [1, 0, 0],
    [-1, 1, 0],
    [0, 1, 0],
    [1, 1, 0],
    [-1, -1, 1],
    [0, -1, 1],
    [1, -1, 1],
    [-1, 0, 1],
    [0, 0, 1],
    [1, 0, 1],
    [-1, 1, 1],
    [0, 1, 1],
    [1, 1, 1],
    [-1, -1, -1],
    [0, -1, -1],
    [1, -1, -1],
    [-1, 0, -1],
    [0, 0, -1],
    [1, 0, -1],
    [-1, 1, -1],
    [0, 1, -1],
    [1, 1, -1],
    [-1, -1, 0],
    [0, -1, 0],
    [1, -1, 0],
    [-1, 0, 0],
]

/**
 * Converts trytes or values to trits
 *
 * @method trits
 *
 * @memberof module:converter
 *
 * @param {String|Number} input - Tryte string or value to be converted.
 *
 * @return {Int8Array} trits
 */
export function trits(input: string | number): Int8Array {
    if (typeof input === 'number' && Number.isInteger(input)) {
        return fromValue(input)
    } else if (typeof input === 'string') {
        const result = new Int8Array(input.length * 3)

        for (let i = 0; i < input.length; i++) {
            const index = TRYTE_ALPHABET.indexOf(input.charAt(i))

            result[i * 3] = TRYTES_TRITS_LUT[index][0]
            result[i * 3 + 1] = TRYTES_TRITS_LUT[index][1]
            result[i * 3 + 2] = TRYTES_TRITS_LUT[index][2]
        }

        return result
    } else {
        throw new Error(errors.INVALID_TRYTES)
    }
}

/**
 * @method trytesToTrits
 *
 * @memberof module:converter
 *
 * @ignore
 *
 * @alias trits
 */
export const trytesToTrits = trits

/**
 * Converts trits to trytes
 *
 * @method trytes
 *
 * @memberof module:converter
 *
 * @param {Int8Array} trits
 *
 * @return {String} trytes
 */
// tslint:disable-next-line no-shadowed-variable
export function trytes(trits: Int8Array): string {
    if (!(trits instanceof Int8Array) && !Array.isArray(trits)) {
        throw new Error(errors.INVALID_TRITS)
    }

    let result = ''

    for (let i = 0; i < trits.length; i += 3) {
        // Iterate over all possible tryte values to find correct trit representation
        for (let j = 0; j < TRYTE_ALPHABET.length; j++) {
            if (
                trits[i] === TRYTES_TRITS_LUT[j][0] &&
                trits[i + 1] === TRYTES_TRITS_LUT[j][1] &&
                trits[i + 2] === TRYTES_TRITS_LUT[j][2]
            ) {
                result += TRYTE_ALPHABET.charAt(j)
                break
            }
        }
    }

    return result
}

/**
 * @method tritsToTrytes
 *
 * @memberof module:converter
 *
 * @ignore
 *
 * @alias trytes
 */
export const tritsToTrytes = trytes

/**
 * Converts trits into an integer value
 *
 * @method value
 *
 * @memberof module:converter
 *
 * @param {Int8Array} trits
 *
 * @return {Number}
 */
// tslint:disable-next-line no-shadowed-variable
export function value(trits: Int8Array): number {
    let returnValue = 0

    for (let i = trits.length; i-- > 0; ) {
        returnValue = returnValue * 3 + trits[i]
    }

    return returnValue
}

/**
 * @method tritsToValue
 *
 * @memberof module:converter
 *
 * @ignore
 *
 * @alias value
 */
export const tritsToValue = value

/**
 * Converts an integer value to trits
 *
 * @method fromValue
 *
 * @memberof module:converter
 *
 * @param {Number} value
 *
 * @return {Int8Array} trits
 */
// tslint:disable-next-line no-shadowed-variable
export function fromValue(value: number): Int8Array {
    const destination = new Int8Array(
        value ? 1 + Math.floor(Math.log(2 * Math.max(1, Math.abs(value))) / Math.log(3)) : 0
    )
    let absoluteValue = value < 0 ? -value : value
    let i = 0

    while (absoluteValue > 0) {
        let remainder = absoluteValue % RADIX
        absoluteValue = Math.floor(absoluteValue / RADIX)

        if (remainder > MAX_TRIT_VALUE) {
            remainder = MIN_TRIT_VALUE
            absoluteValue++
        }

        destination[i] = remainder
        i++
    }

    if (value < 0) {
        for (let j = 0; j < destination.length; j++) {
            destination[j] = -destination[j]
        }
    }

    return destination
}

/**
 * @method valueToTrits
 *
 * @memberof module:converter
 *
 * @ignore
 *
 * @alias fromValue
 */
export const valueToTrits = fromValue
