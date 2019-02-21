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
 * Generates and appends the 9-tryte checksum of the given trytes, usually an address.
 *
 * @method addChecksum
 *
 * @param {string} input - Input trytes
 *
 * @param {number} [checksumLength=9] - Checksum trytes length
 *
 * @param {boolean} [isAddress=true] - Flag to denote if given input is address. Defaults to `true`.
 *
 * @returns {string} Address (with checksum)
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
 * Removes the 9-trytes checksum of the given input.
 *
 * @method removeChecksum
 *
 * @param {string} input - Input trytes
 *
 * @return {string} Trytes without checksum
 */
export function removeChecksum(input: Trytes): Trytes {
    if (!isTrytes(input, HASH_TRYTES_LENGTH) && !isTrytes(input, ADDRESS_WITH_CHECKSUM_TRYTES_LENGTH)) {
        throw new Error(errors.INVALID_ADDRESS)
    }

    return input.slice(0, HASH_TRYTES_LENGTH)
}

/**
 * Validates the checksum of the given address trytes.
 *
 * @method isValidChecksum
 *
 * @param {string} addressWithChecksum
 *
 * @return {boolean}
 */
export const isValidChecksum = (addressWithChecksum: Trytes): boolean =>
    addressWithChecksum === addChecksum(removeChecksum(addressWithChecksum))
