import { Trytes } from '../api/types'
import { Kerl, trits, trytes } from '../crypto'
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
export function addChecksum(addresses: Trytes, checksumLength?: number, isAddress?: boolean): Trytes
export function addChecksum(addresses: Trytes[], checksumLength?: number, isAddress?: boolean): Trytes[]
export function addChecksum(addresses: Trytes | Trytes[], checksumLength: number = 9, isAddress: boolean = true) {
    const addressesWithChecksum = asArray(addresses)
        .map(address => {
            const hasChecksum = isTrytes(address, 90)

            if (!(hasChecksum || isTrytes(address, 81)) && isAddress) {
                throw new Error(errors.INVALID_ADDRESS)
            }

            if (hasChecksum) {
                return address 
            }
          
            const kerl = new Kerl()
            kerl.initialize()
        
            let paddedTrytes = address 
          
            while (paddedTrytes.length % 81 !== 0) {
                paddedTrytes = paddedTrytes.concat('9')
            }

            const addressTrits: Int8Array = trits(paddedTrytes)
            const checksumTrits: Int8Array = new Int8Array(Kerl.HASH_LENGTH)
          
            kerl.absorb(addressTrits, 0, addressTrits.length)
            kerl.squeeze(checksumTrits, 0, Kerl.HASH_LENGTH)
                    
            return address.concat(trytes(checksumTrits.slice(243 - checksumLength * 3, 243)))
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
export function removeChecksum(addresses: Trytes): Trytes
export function removeChecksum(addresses: Trytes[]): Trytes[]
export function removeChecksum(addresses: Trytes | Trytes[]) {
    const addressesNoChecksum = asArray(addresses)
        .map(address => {
            if (!(isTrytes(address, 90) || isTrytes(address, 81))) {
                throw new Error(errors.INVALID_ADDRESS)
            }

            return address.slice(0, 81)
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
export const isValidChecksum = (addressWithChecksum: Trytes): boolean =>
    addressWithChecksum === addChecksum(removeChecksum(addressWithChecksum))

/* removeChecksum() alias */
export const noChecksum = removeChecksum
