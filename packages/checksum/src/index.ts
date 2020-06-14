/** @module checksum */

import { trits, trytes } from '@iota/converter'
import Kerl from '@iota/kerl'
import { INVALID_ADDRESS, INVALID_CHECKSUM, INVALID_TRYTES } from '../../errors'
import { isTrytes } from '../../guards'
import { Trytes } from '../../types'

export const errors = {
    INVALID_ADDRESS,
    INVALID_CHECKSUM,
    INVALID_TRYTES,
    INVALID_CHECKSUM_LENGTH: 'Invalid checksum length',
}

const HASH_TRYTES_LENGTH = 81
const ADDRESS_CHECKSUM_TRYTES_LENGTH = 9
const ADDRESS_WITH_CHECKSUM_TRYTES_LENGTH = HASH_TRYTES_LENGTH + ADDRESS_CHECKSUM_TRYTES_LENGTH
const MIN_CHECKSUM_TRYTES_LENGTH = 3

/**
 * This method takes 81 trytes, which could be an address or a seed, generates the [checksum](https://docs.iota.org/docs/getting-started/0.1/clients/checksums) and appends it to the trytes.
 * 
 * To generate a checksum that is less than 9 trytes long, make sure to set the `isAddress` argument to false.
 * 
 * ## Related methods
 * 
 * To generate an address, use the [`getNewAddress()`]{@link #module_core.getNewAddress} method.
 * 
 * @method addChecksum
 * 
 * @summary Generates a checksum and appends it to the given trytes.
 *  
 * @memberof module:checksum
 *
 * @param {string} input - 81 trytes to which to append the checksum
 *
 * @param {number} [checksumLength=9] - Length of the checksum to generate
 *
 * @param {boolean} [isAddress=true] - Whether the input is an address
 * 
 * @example
 * ```js
 * let addressWithChecksum = Checksum.addChecksum('ADDRESS...');
 * ```
 *
 * @returns {string} The original trytes with an appended checksum.
 * 
 * @throws {errors.INVALID_ADDRESS}: Make sure that the given address is 90 trytes long.
 * @throws {errors.INVALID_TRYTES}: Make sure that the `input` argument contains only [trytes](https://docs.iota.org/docs/getting-started/0.1/introduction/ternary)
 * @throws {errors.INVALID_CHECKSUM_LENGTH}: Make sure that the `checksumLength` argument is a number greater than or equal to 3. If the `isAddress` argument is set to true, make sure that the `checksumLength` argument is 9.
 */
export function addChecksum(input: Trytes, checksumLength = ADDRESS_CHECKSUM_TRYTES_LENGTH, isAddress = true): Trytes {
    if (!isTrytes(input)) {
        throw new Error(errors.INVALID_TRYTES)
    }

    if (isAddress && input.length !== HASH_TRYTES_LENGTH) {
        if (input.length === ADDRESS_WITH_CHECKSUM_TRYTES_LENGTH) {
            return input
        }

        throw new Error(errors.INVALID_ADDRESS)
    }

    if (
        !Number.isInteger(checksumLength) ||
        checksumLength < MIN_CHECKSUM_TRYTES_LENGTH ||
        (isAddress && checksumLength !== ADDRESS_CHECKSUM_TRYTES_LENGTH)
    ) {
        throw new Error(errors.INVALID_CHECKSUM_LENGTH)
    }

    let paddedInputTrytes = input

    while (paddedInputTrytes.length % HASH_TRYTES_LENGTH !== 0) {
        paddedInputTrytes += '9'
    }

    const inputTrits = trits(paddedInputTrytes)
    const checksumTrits = new Int8Array(Kerl.HASH_LENGTH)

    const kerl = new Kerl()
    kerl.initialize()

    kerl.absorb(inputTrits, 0, inputTrits.length)
    kerl.squeeze(checksumTrits, 0, Kerl.HASH_LENGTH)

    return input.concat(trytes(checksumTrits.slice(243 - checksumLength * 3, 243)))
}

/**
 * This method takes an address of 90 trytes, and removes the last 9 trytes to return the address without a checksum.
 * 
 * ## Related methods
 * 
 * To generate an address, use the [`getNewAddress()`]{@link #module_core.getNewAddress} method.
 * To add a checksum to an address, use the [`addChecksum()`]{@link #module_checksum.addChecksum} method.
 * 
 * @method removeChecksum
 * 
 * @summary Removes the checksum from the given address.
 *  
 * @memberof module:checksum
 *
 * @param {string} input - Address from which to remove the checksum
 * 
 * @example
 * ```js
 * let addressWithoutChecksum = Checksum.removeChecksum('ADDRESS...');
 * ```
 *
 * @returns {string} The original address without the appended checksum.
 * 
 * @throws {errors.INVALID_ADDRESS}: Make sure that the given address is 90 trytes long.
 */
export function removeChecksum(input: Trytes): Trytes {
    if (!isTrytes(input, HASH_TRYTES_LENGTH) && !isTrytes(input, ADDRESS_WITH_CHECKSUM_TRYTES_LENGTH)) {
        throw new Error(errors.INVALID_ADDRESS)
    }

    return input.slice(0, HASH_TRYTES_LENGTH)
}

/**
 * This method takes an address of 90 trytes, and checks if the checksum is valid.
 * 
 * ## Related methods
 * 
 * To generate an address, use the [`getNewAddress()`]{@link #module_core.getNewAddress} method.
 * To add a checksum to an address, use the [`addChecksum()`]{@link #module_checksum.addChecksum} method.
 * 
 * @method isValidChecksum
 * 
 * @summary Validates the checksum of an address.
 *  
 * @memberof module:checksum
 *
 * @param {string} addressWithChecksum - Address with a checksum
 * 
 * @example
 * ```js
 * let valid = Checksum.isValidChecksum('ADDRESS...');
 * ```
 *
 * @returns {boolean} Whether the checksum is valid.
 * 
 * @throws {errors.INVALID_ADDRESS}: Make sure that the given address is 90 trytes long.
 */
export const isValidChecksum = (addressWithChecksum: Trytes): boolean =>
    addressWithChecksum === addChecksum(removeChecksum(addressWithChecksum))
