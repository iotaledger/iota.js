import { addChecksum } from '@iota/checksum'
import { trits, trytes } from '@iota/converter'
import { address, digests, key, subseed } from '@iota/signing'
import { securityLevelValidator, seedValidator, validate } from '../../guards'
import { Hash } from '../../types'

/**
 * Generates an address, according to the given seed, index, and security level.
 * 
 * **Note:** This method does not check if the address is [spent](https://docs.iota.org/docs/getting-started/0.1/clients/addresses#spent-addresses).
 * 
 * ## Related methods
 * 
 * To generate an address that has a lower probability of being spent, use the [`getNewAddress()`]{@link #module_core.getNewAddress} method.
 * 
 * @method generateAddress
 * 
 * @summary Generates an address with a specific index and security level.
 *
 * @memberof module:core
 *
 * @param {string} seed The seed to use to generate the address
 * @param {number} index - The key index to use to generate the address
 * @param {number} [security=2] - The [security level](https://docs.iota.org/docs/getting-started/0.1/clients/security-levels) to use to generate the address
 * @param {boolean} [checksum=false] - Whether to add the [checksum](https://docs.iota.org/docs/getting-started/0.1/clients/checksums)
 * 
 * @example
 * ```js
 * const myAddress = generateAddress(seed, 0);
 * ```
 *
 * @returns {Hash} address - An 81-tryte address
 * 
 * @throws {errors.INVALID_SEED}: Make sure that the seed contains only trytes
 * 
 * @throws {errors.INVALID_SECURITY_LEVEL}: Make sure that the security level is a number between 1 and 3
 */
export const generateAddress = (seed: string, index: number, security: number = 2, checksum: boolean = false): Hash => {
    while (seed.length % 81 !== 0) {
        seed += 9
    }

    validate(seedValidator(seed), securityLevelValidator(security))

    const keyTrits = key(subseed(trits(seed), index), security)
    const digestsTrits = digests(keyTrits)
    const addressTrytes = trytes(address(digestsTrits))

    return checksum ? addChecksum(addressTrytes) : addressTrytes
}
