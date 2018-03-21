import * as errors from '../errors'

const RADIX = 3
const MAX_TRIT_VALUE = 1
const MIN_TRIT_VALUE = -1

// All possible tryte values
const ALPHABET = '9ABCDEFGHIJKLMNOPQRSTUVWXYZ'

// Trytes to trits LUT
const LUT = [
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
 * Converts trytes into trits
 *
 * @method trits
 * @param {String|Int} input Tryte value to be converted. Can either be string or int
 * @param {Array} state (optional) state to be modified
 * @return {Int8Array} trits
 */
export function trits(input: string | number, state?: Int8Array): Int8Array {
    if (typeof input === 'number' && Number.isInteger(input)) {
        return fromValue(input)
    } else if (typeof input === 'string') {
        const result = state || new Int8Array(input.length * 3)

        for (let i = 0; i < input.length; i++) {
            const index = ALPHABET.indexOf(input.charAt(i))
          
            result[i * 3] = LUT[index][0]
            result[i * 3 + 1] = LUT[index][1]
            result[i * 3 + 2] = LUT[index][2]
        }
      
        return result
    } else {
        throw new Error(errors.ILLEGAL_TRIT_CONVERSION_INPUT)
    }
}

/**
 * Converts trits into trytes
 *
 * @method trytes
 * @param {Int8Array} trits
 * @returns {String} trytes
 */
// tslint:disable-next-line no-shadowed-variable
export function trytes (trits: Int8Array): string {
    if (!(trits instanceof Int8Array)) {
        throw new Error(errors.ILLEGAL_TRYTE_CONVERSION_INPUT)
    }
    
    let result = ''

    for (let i = 0; i < trits.length; i += 3) {
        // Iterate over all possible tryte values to find correct trit representation
        for (let j = 0; j < ALPHABET.length; j++) {
            if (
                LUT[j][0] === trits[i] &&
                LUT[j][1] === trits[i + 1] &&
                LUT[j][2] === trits[i + 2]
            ) {
                result += ALPHABET.charAt(j)
                break
            }
        }
    }

    return result
}

/**
 * Converts trits into an integer value
 *
 * @method value
 * @param {Int8Array} trits
 * @returns {int} value
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
 *   Converts an integer value to trits
 *
 * @method value
 * @param {Int} val
 * @returns {Int8Array} trits
 */
export function fromValue(val: number): Int8Array { 
    const destination = new Int8Array(val ? (1 + Math.floor(Math.log(2 * Math.max(1, Math.abs(val))) / Math.log(3))) : 0)
    let absoluteValue = val < 0 ? -val : val
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

    if (val < 0) {
        for (let j = 0; j < destination.length; j++) {
            // switch values
            destination[j] = -destination[j]
        }
    }

    return destination
}
