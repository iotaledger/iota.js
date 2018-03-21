import { addChecksum } from '../utils'
import { trits, trytes } from './Converter'
import { address, digests, key } from './Signing'

/**
 *  Generates a new address
 *
 *	@method generateAddress
 *  @param {string} seed
 *  @param {int} index
 *  @param {int} [security=2] - Security level of the private key
 *  @param {bool} [checksum=false] - Flag to add 9trytes checksum
 *  @returns {string} address
 */
export const generateAddress = (
    seed: string,
    index: number,
    security: number = 2,
    checksum: boolean = false
): string => {
    while (seed.length % 81 !== 0) {
        seed += 9
    }

    const keyTrits = key(trits(seed), index, security)
    const digestsTrits = digests(keyTrits)
    const addressTrytes = trytes(address(digestsTrits))

    return checksum ? addChecksum(addressTrytes) : addressTrytes
}
