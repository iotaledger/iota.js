import { TRYTE_ALPHABET } from './'
import * as errors from './errors'

/**
 * Converts an ascii encoded string to trytes.
 *
 * ### How conversion works:
 *
 * An ascii value of `1 Byte` can be represented in `2 Trytes`:
 *
 * 1. We get the decimal unicode value of an individual ASCII character.
 *
 * 2. From the decimal value, we then derive the two tryte values by calculating the tryte equivalent
 * (e.g.: `100` is expressed as `19 + 3 * 27`), given that tryte alphabet contains `27` trytes values:
 *   a. The first tryte value is the decimal value modulo `27` (which is the length of the alphabet).
 *   b. The second value is the remainder of `decimal value - first value` devided by `27`.
 *
 * 3. The two values returned from Step 2. are then input as indices into the available
 * trytes alphabet (`9ABCDEFGHIJKLMNOPQRSTUVWXYZ`), to get the correct tryte value.
 *
 * ### Example:
 *
 * Lets say we want to convert ascii character `Z`.
 *
 * 1. `Z` has a decimal unicode value of `90`.
 *
 * 2. `90` can be represented as `9 + 3 * 27`. To make it simpler:
 *   a. First value is `90 % 27 = 9`.
 *   b. Second value is `(90 - 9) / 27 = 3`.
 *
 * 3. Our two values are `9` and `3`. To get the tryte value now we simply insert it as indices
 * into the tryte alphabet:
 *   a. The first tryte value is `'9ABCDEFGHIJKLMNOPQRSTUVWXYZ'[9] = I`
 *   b. The second tryte value is `'9ABCDEFGHIJKLMNOPQRSTUVWXYZ'[3] = C`
 *
 * Therefore ascii character `Z` is represented as `IC` in trytes.
 *
 * @method asciiToTrytes
 *
 * @memberof module:converter
 *
 * @param {string} input - ascii input
 *
 * @return {string} string of trytes
 */
export const asciiToTrytes = (input: string): string => {
    // If input is not an ascii string, throw error
    if (!/^[\x00-\x7F]*$/.test(input)) {
        throw new Error(errors.INVALID_ASCII_CHARS)
    }

    let trytes = ''

    for (let i = 0; i < input.length; i++) {
        const dec = input[i].charCodeAt(0)

        trytes += TRYTE_ALPHABET[dec % 27]
        trytes += TRYTE_ALPHABET[(dec - (dec % 27)) / 27]
    }

    return trytes
}

/**
 * Converts trytes of _even_ length to an ascii string
 *
 * @method trytesToAscii
 *
 * @memberof module:converter
 *
 * @param {string} trytes - trytes
 *
 * @return {string} string in ascii
 */
export const trytesToAscii = (trytes: string): string => {
    if (typeof trytes !== 'string' || !new RegExp(`^[9A-Z]{1,}$`).test(trytes)) {
        throw new Error(errors.INVALID_TRYTES)
    }

    if (trytes.length % 2) {
        throw new Error(errors.INVALID_ODD_LENGTH)
    }

    let ascii = ''

    for (let i = 0; i < trytes.length; i += 2) {
        ascii += String.fromCharCode(TRYTE_ALPHABET.indexOf(trytes[i]) + TRYTE_ALPHABET.indexOf(trytes[i + 1]) * 27)
    }

    return ascii
}
