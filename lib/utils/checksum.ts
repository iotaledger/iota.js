import { Hash } from '../api/types'
import { Converter, Kerl } from '../crypto'
import * as errors from '../errors'
import { asArray, isTrytes } from './'

/**
*   Generates the 9-tryte checksum of an address
*
*   @method addChecksum
*   @param {string | list} inputValue
*   @param {int} checksumLength
@   @param {bool} isAddress default is true
*   @returns {string | list} address (with checksum)
**/
export function addChecksum(addresses: Hash, checksumLength?: number, isAddress?: boolean): Hash
export function addChecksum(addresses: Hash[], checksumLength?: number, isAddress?: boolean): Hash[]
export function addChecksum(addresses: Hash | Hash[], checksumLength: number = 9, isAddress: boolean = true) {
    const addressesWithChecksum = asArray(addresses)
        .map(trytes => {
            const hasChecksum = isTrytes(trytes, 90)

            if (!(hasChecksum || isTrytes(trytes, 81))) {
                throw new Error(errors.INVALID_ADDRESS)
            }

            if (hasChecksum) {
                return trytes
            }
          
            const kerl = new Kerl()
            kerl.initialize()

            const addressTrits: Int8Array = Converter.trits(trytes)
            const checksumTrits: Int8Array = new Int8Array(Kerl.HASH_LENGTH)
          
            kerl.absorb(addressTrits, 0, addressTrits.length)
            kerl.squeeze(checksumTrits, 0, Kerl.HASH_LENGTH)
          
            // First 9 trytes as checksum            
            return trytes.concat(Converter.trytes(checksumTrits.slice(243 - checksumLength * 3, 243)))
        })
    
    return Array.isArray(addresses) ? addressesWithChecksum : addressesWithChecksum[0]
}

/**
 *   Removes the 9-tryte checksum of an address
 *
 *   @method noChecksum
 *   @param {string | list} address
 *   @returns {string | list} address (without checksum)
 **/
export function removeChecksum(addresses: Hash): Hash
export function removeChecksum(addresses: Hash[]): Hash[]
export function removeChecksum(addresses: Hash | Hash[]) {
    const addressesNoChecksum = asArray(addresses)
        .map(trytes => {
            if (!(isTrytes(trytes, 90) || isTrytes(trytes, 81))) {
                throw new Error(errors.INVALID_ADDRESS)
            }

            return trytes.slice(0, 81)
        })

    // return either string or the list
    if (typeof addresses === 'string') {
        return addressesNoChecksum[0]
    } else {
        return addressesNoChecksum
    }
}

/**
 *   Validates the checksum of an address
 *
 *   @method isValidChecksum
 *   @param {string} addressWithChecksum
 *   @returns {bool}
 **/
export const isValidChecksum = (addressWithChecksum: Hash): boolean =>
    addressWithChecksum === addChecksum(removeChecksum(addressWithChecksum))

/* removeChecksum() alias */
export const noChecksum = removeChecksum
