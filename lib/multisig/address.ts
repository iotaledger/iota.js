import { Converter, Curl, Kerl, Signing } from '../crypto'
import inputValidator from '../utils/inputValidator'
import Utils from '../utils/utils'

export default class Address {
    private kerl: Kerl

    constructor(digests?: string | string[]) {
        this.kerl = new Kerl()
        this.kerl.initialize()

        if (digests) {
            this.absorb(digests)
        }
    }

    /**
     *   Absorbs key digests
     *
     *   @method absorb
     *   @param {string|array} digest digest trytes
     *   @return {object} address instance
     *
     **/
    public absorb(digest: string | string[]) {
        // Construct array
        const digests = Array.isArray(digest) ? digest : [digest]

        // Add digests
        for (let i = 0; i < digests.length; i++) {
            // Get trits of digest
            const digestTrits = Converter.trits(digests[i])

            // Absorb digest
            this.kerl.absorb(digestTrits, 0, digestTrits.length)
        }

        return this
    }
    /**
     *   Finalizes and returns the multisig address in trytes
     *
     *   @method finalize
     *   @param {string} digest digest trytes, optional
     *   @return {string} address trytes
     *
     **/
    public finalize(digest?: string) {
        // Absorb last digest if provided
        if (digest) {
            this.absorb(digest)
        }

        // Squeeze the address trits
        const addressTrits: number[] = []
        this.kerl.squeeze(addressTrits, 0, Curl.HASH_LENGTH)

        // Convert trits into trytes and return the address
        return Converter.trytes(addressTrits)
    }
}
