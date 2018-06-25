import { trits, trytes } from '@iota/converter'
import Kerl from '@iota/kerl'
import { asArray } from '../../types'

/**
 * @class Address
 * @memberof module:multisig
 */
export default class Address {
    private kerl: Kerl

    constructor(digests?: string | ReadonlyArray<string>) {
        this.kerl = new Kerl()
        this.kerl.initialize()

        if (digests) {
            this.absorb(digests)
        }
    }

    /**
     * Absorbs key digests
     *
     * @member absorb
     *
     * @memberof Address
     *
     * @param {string|array} digest digest trytes
     *
     * @return {object} address instance
     */
    public absorb(digests: string | ReadonlyArray<string>) {
        // Construct array
        const digestsArray = asArray(digests)

        // Add digests
        for (let i = 0; i < digestsArray.length; i++) {
            // Get trits of digest
            const digestTrits = trits(digestsArray[i])

            // Absorb digest
            this.kerl.absorb(digestTrits, 0, digestTrits.length)
        }

        return this
    }
    /**
     * Finalizes and returns the multisig address in trytes
     *
     * @member finalize
     *
     * @memberof Address
     *
     * @param {string} digest digest trytes, optional
     *
     * @return {string} address trytes
     */
    public finalize(digest?: string) {
        // Absorb last digest if provided
        if (digest) {
            this.absorb(digest)
        }

        // Squeeze the address trits
        const addressTrits: Int8Array = new Int8Array(Kerl.HASH_LENGTH)
        this.kerl.squeeze(addressTrits, 0, Kerl.HASH_LENGTH)

        // Convert trits into trytes and return the address
        return trytes(addressTrits)
    }
}
