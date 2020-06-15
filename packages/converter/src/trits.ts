import '../../typed-array'
import * as errors from './errors'

const RADIX = 3
const MAX_TRIT_VALUE = (RADIX - 1) / 2
const MIN_TRIT_VALUE = -MAX_TRIT_VALUE

export const TRYTE_WIDTH = MAX_TRIT_VALUE - MIN_TRIT_VALUE + 1

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
 * @ignore
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
        const result = new Int8Array(input.length * TRYTE_WIDTH)

        for (let i = 0; i < input.length; i++) {
            const index = TRYTE_ALPHABET.indexOf(input.charAt(i))

            if (index === -1) {
                throw new Error(errors.INVALID_TRYTES)
            }

            for (let j = 0; j < TRYTE_WIDTH; j++) {
                result[i * TRYTE_WIDTH + j] = TRYTES_TRITS_LUT[index][j]
            }
        }

        return result
    } else {
        throw new Error(errors.INVALID_TRYTES)
    }
}

/**
 * This method converts [trytes](https://docs.iota.org/docs/getting-started/0.1/introduction/ternary) to trits.
 * 
 * ## Related methods
 * 
 * To convert ASCII characters to trytes, use the [`asciiToTrytes()`]{@link #module_converter.asciiToTrytes} method.
 * 
 * @method trytesToTrits
 * 
 * @summary Converts trytes to trits.
 *  
 * @memberof module:converter
 *
 * @param {String|number} input - Trytes
 * 
 * @example
 * ```js
 * let trits = Converter.trytesToTrits('IOTA');
 * ```
 * 
 * @return {Int8Array} trits 
 * 
 * @throws {errors.INVALID_TRYTES}: Make sure that the `input` argument contains only valid trytes (A-Z or 9).
 */
export const trytesToTrits = trits

/**
 * Converts trits to trytes
 *
 * @method trytes
 *
 * @memberof module:converter
 * 
 * @ignore
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

    for (let i = 0; i < trits.length / TRYTE_WIDTH; i++) {
        let j = 0
        for (let k = 0; k < TRYTE_WIDTH; k++) {
            j += trits[i * TRYTE_WIDTH + k] * TRYTE_WIDTH ** k
        }
        if (j < 0) {
            j += TRYTE_ALPHABET.length
        }

        result += TRYTE_ALPHABET.charAt(j)
    }

    return result
}

/**
 * This method converts [trits](https://docs.iota.org/docs/getting-started/0.1/introduction/ternary) to trytes.
 * 
 * ## Related methods
 * 
 * To convert trytes to ASCII characters, use the [`trytesToAscii()`]{@link #module_converter.trytesToAscii} method.
 * 
 * @method tritsToTrytes
 * 
 * @summary Converts trits to trytes.
 *  
 * @memberof module:converter
 *
 * @param {String|number} input - Trits
 * 
 * @example
 * ```js
 * let trytes = Converter.tritsToTrytes(trits);
 * ```
 * 
 * @return {Int8Array} trytes 
 * 
 * @throws {errors.INVALID_TRITS}: Make sure that the `input` argument contains an array of trits.
 */
export const tritsToTrytes = trytes

/**
 * Converts trits into an integer value
 *
 * @method value
 * 
 * @ignore
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
        returnValue = returnValue * RADIX + trits[i]
    }

    return returnValue
}

/**
 * This method converts [trits](https://docs.iota.org/docs/getting-started/0.1/introduction/ternary) to a number.
 * 
 * ## Related methods
 * 
 * To convert trytes to trits, use the [`trytesToTrits()`]{@link #module_converter.trytesToTrits} method.
 * To convert trits to trytes, use the [`tritsToTrytes()`]{@link #module_converter.tritsToTrytes} method.
 *
 * @method tritsToValue
 * 
 * @summary Converts trits to a number.
 *  
 * @memberof module:converter
 *
 * @param {String|number} input - Trits
 * 
 * @example
 * ```js
 * let number = Converter.tritsToValue(trits);
 * ```
 * 
 * @return {Int8Array} number
 */
export const tritsToValue = value

/**
 * Converts an integer value to trits
 *
 * @method fromValue
 * 
 * @ignore
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
        value ? 1 + Math.floor(Math.log(2 * Math.max(1, Math.abs(value))) / Math.log(RADIX)) : 0
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
 * This method converts a number to [trits](https://docs.iota.org/docs/getting-started/0.1/introduction/ternary).
 * 
 * ## Related methods
 * 
 * To convert trits to trytes, use the [`tritsToTrytes()`]{@link #module_converter.tritsToTrytes} method.
 * 
 * @method valueToTrits
 * 
 * @summary Converts trits to a number.
 *  
 * @memberof module:converter
 *
 * @param {String|number} input - Number
 * 
 * @example
 * ```js
 * let trits = Converter.valueToTrits(9);
 * ```
 * 
 * @return {Int8Array} trits
 */
export const valueToTrits = fromValue
