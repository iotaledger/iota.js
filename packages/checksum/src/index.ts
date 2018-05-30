import { trits, trytes } from '@iota/converter'
import Kerl from '@iota/kerl'
import { errors, isTrytes } from '@iota/validators'
import { asArray, Trytes } from '../../types'

/**
* Generates and appends the 9-tryte checksum of the given trytes, usually an address.
*
* @method addChecksum
* 
* @param {string | string[]} input - Input trytes
* 
* @param {number} [checksumLength] - Checksum trytes length
* 
* @param {boolean} [isAddress] - default is true
*
* @returns {string | list} address (with checksum)
*/
export function addChecksum(input: Trytes, checksumLength?: number, isAddress?: boolean): Trytes
export function addChecksum(input: Trytes[], checksumLength?: number, isAddress?: boolean): Trytes[]
export function addChecksum(input: Trytes | Trytes[], checksumLength: number = 9, isAddress: boolean = true) {
    const withChecksum = asArray(input)
        .map(inputTrytes => {
            const hasChecksum = isTrytes(inputTrytes, 90)

            if (!(hasChecksum || isTrytes(inputTrytes, 81)) && isAddress) {
                throw new Error(errors.INVALID_ADDRESS)
            }

            if (hasChecksum) {
                return inputTrytes
            }

            const kerl = new Kerl()
            kerl.initialize()

            let paddedTrytes = inputTrytes

            while (paddedTrytes.length % 81 !== 0) {
                paddedTrytes = paddedTrytes.concat('9')
            }

            const inputTrits: Int8Array = trits(paddedTrytes)
            const checksumTrits: Int8Array = new Int8Array(Kerl.HASH_LENGTH)

            kerl.absorb(inputTrits, 0, inputTrits.length)
            kerl.squeeze(checksumTrits, 0, Kerl.HASH_LENGTH)

            return inputTrytes.concat(trytes(checksumTrits.slice(243 - checksumLength * 3, 243)))
        })

    return Array.isArray(input) ? withChecksum : withChecksum[0]
}

/**
 * Removes the 9-tryte checksum of the given input
 *
 * @method noChecksum
 * 
 * @param {string | string[]} input - Input trytes
 * 
 * @return {string | string[]} Trytes without checksum
 */
export function removeChecksum(input: Trytes): Trytes
export function removeChecksum(input: Trytes[]): Trytes[]
export function removeChecksum(input: Trytes | Trytes[]) {
    const noChecksum = asArray(input)
        .map(inputTrytes => {
            if (!(isTrytes(inputTrytes, 90) || isTrytes(inputTrytes, 81))) {
                throw new Error(errors.INVALID_ADDRESS)
            }

            return inputTrytes.slice(0, 81)
        })

    // return either string or the list
    return Array.isArray(input) ? noChecksum[0] : noChecksum
}

/**
 * @method noChecksum
 * 
 * @alias removeChecksum
 */
export const noChecksum = removeChecksum

/**
 * Validates the checksum of the given trytes
 *
 * @method isValidChecksum
 * 
 * @param {string} addressWithChecksum
 * 
 * @return {boolean}
 */
export const isValidChecksum = (addressWithChecksum: Trytes): boolean =>
    addressWithChecksum === addChecksum(removeChecksum(addressWithChecksum))