import { addChecksum } from '@iota/utils'
import { address, digests, key, trits, trytes } from '@iota/crypto'
import { Hash } from './'

/**
 * Generates a new address
 *
 * @method generateAddress
 * 
 * @param {string} seed
 * @param {number} index - Private key index
 * @param {number} [security=2] - Security level of the private key
 * @param {boolean} [checksum=false] - Flag to add 9trytes checksum
 * 
 * @returns {Hash} Address trytes
 */
export const generateAddress = (
    seed: string,
    index: number,
    security: number = 2,
    checksum: boolean = false
): Hash => {
    while (seed.length % 81 !== 0) {
        seed += 9
    }

    const keyTrits = key(trits(seed), index, security)
    const digestsTrits = digests(keyTrits)
    const addressTrytes = trytes(address(digestsTrits))

    return checksum ? addChecksum(addressTrytes) : addressTrytes
}
