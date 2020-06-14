import { TRYTE_ALPHABET } from './'
import * as errors from './errors'

/**
 * This method converts ASCII characters to [trytes](https://docs.iota.org/docs/getting-started/0.1/introduction/ternary).
 *
 * ## Related methods
 *
 * To convert trytes to ASCII characters, use the [`trytesToAscii()`]{@link #module_converter.trytesToAscii} method.
 *
 * @method asciiToTrytes
 *
 * @summary Converts ASCII characters to trytes.
 *
 * @memberof module:converter
 *
 * @param {string} input - ASCII input
 *
 * @example
 * ```js
 * let trytes = Converter.asciiToTrytes('Hello, where is my coffee?');
 * ```
 *
 * @return {string} Trytes
 *
 * @throws {errors.INVALID_ASCII_CHARS}: Make sure that the `input` argument contains only valid ASCII characters.
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
 * This method converts trytes to ASCII characters.
 *
 * Because each ASCII character is represented as 2 trytes, the given trytes must be of an even length.
 *
 * ## Related methods
 *
 * To convert ASCII characters to trytes, use the [`asciiToTrytes()`]{@link #module_converter.asciiToTrytes} method.
 *
 * @method trytesToAscii
 *
 * @summary Converts trytes to ASCII characters.
 *
 * @memberof module:converter
 *
 * @param {string} trytes - An even number of trytes
 *
 * @example
 * ```js
 * let message = Converter.trytesToAscii('IOTA');
 * ```
 *
 * @return {string} ASCII characters
 *
 * @throws {errors.INVALID_TRYTES}: Make sure that the `trytes` argument contains only valid trytes (A-Z or 9).
 * @throws {errors.INVALID_ODD_LENGTH}: Make sure that the `trytes` argument contains an even number of trytes.
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
        const charCode = TRYTE_ALPHABET.indexOf(trytes[i]) + TRYTE_ALPHABET.indexOf(trytes[i + 1]) * 27

        if (charCode) {
            ascii += String.fromCharCode(charCode)
        }
    }

    return ascii
}
