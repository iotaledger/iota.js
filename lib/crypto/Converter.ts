import { TritArray } from './types'

/**
 *
 *   Conversion functions
 *
 **/

const RADIX = 3
const RADIX_BYTES = 256
const MAX_TRIT_VALUE = 1
const MIN_TRIT_VALUE = -1
const BYTE_HASH_LENGTH = 48

// All possible tryte values
const trytesAlphabet = '9ABCDEFGHIJKLMNOPQRSTUVWXYZ'

// map of all trits representations
const trytesTrits = [
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
 *   Converts trytes into trits
 *
 *   @method trits
 *   @param {String|Int} input Tryte value to be converted. Can either be string or int
 *   @param {Array} state (optional) state to be modified
 *   @returns {Array} trits
 **/
function trits(input: string | number, state?: TritArray): TritArray {
    const result = state || []

    if (typeof input === 'number') {
        if (!Number.isInteger(input)) {
            throw new Error('Illegal input: must be tryte string or integer')
        }

        let absoluteValue = input < 0 ? -input : input

        while (absoluteValue > 0) {
            let remainder = absoluteValue % 3
            absoluteValue = Math.floor(absoluteValue / 3)

            if (remainder > 1) {
                remainder = -1
                absoluteValue++
            }

            result[result.length] = remainder
        }
        if (input < 0) {
            for (let i = 0; i < result.length; i++) {
                result[i] = -result[i]
            }
        }
    } else {
        for (let i = 0; i < input.length; i++) {
            const index = trytesAlphabet.indexOf(input.charAt(i))
            result[i * 3] = trytesTrits[index][0]
            result[i * 3 + 1] = trytesTrits[index][1]
            result[i * 3 + 2] = trytesTrits[index][2]
        }
    }

    return result
}

/**
 *   Converts trits into trytes
 *
 *   @method trytes
 *   @param {Array} trits
 *   @returns {String} trytes
 **/
// tslint:disable-next-line no-shadowed-variable
function trytes(trits: TritArray): string {
    let result = ''

    for (let i = 0; i < trits.length; i += 3) {
        // Iterate over all possible tryte values to find correct trit representation
        for (let j = 0; j < trytesAlphabet.length; j++) {
            if (
                trytesTrits[j][0] === trits[i] &&
                trytesTrits[j][1] === trits[i + 1] &&
                trytesTrits[j][2] === trits[i + 2]
            ) {
                result += trytesAlphabet.charAt(j)
                break
            }
        }
    }

    return result
}

/**
 *   Converts trits into an integer value
 *
 *   @method value
 *   @param {Array} trits
 *   @returns {int} value
 **/
// tslint:disable-next-line no-shadowed-variable
function value(trits: TritArray): number {
    let returnValue = 0

    for (let i = trits.length; i-- > 0; ) {
        returnValue = returnValue * 3 + trits[i]
    }

    return returnValue
}

/**
 *   Converts an integer value to trits
 *
 *   @method value
 *   @param {Int} val
 *   @returns {Array} trits
 **/
function fromValue(val: number): TritArray {
    const destination = []
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
            destination[j] = destination[j] === 0 ? 0 : -destination[j]
        }
    }

    return destination
}

export default {
    trits,
    trytes,
    value,
    fromValue,
}
