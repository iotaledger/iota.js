import Converter from './Converter'
import Signing from './Signing'
import { addChecksum } from '../../utils'

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
): string  => {		
		const key = Signing.key(Converter.trits(seed), index, security)
  	const digests = Signing.digests(key)
    const address = Converter.trytes(Signing.address(digests))
   	return checksum
				? addChecksum(address)
				: address
}
