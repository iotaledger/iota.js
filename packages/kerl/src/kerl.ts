/* tslint:disable variable-name no-conditional-assignment */
import * as CryptoJS from 'crypto-js'
import '../../typed-array'
import * as errors from './errors'
import { tritsToWords, wordsToTrits } from './word-converter'

const BIT_HASH_LENGTH = 384
const HASH_LENGTH = 243

/**
 * @class kerl
 * @ignore
 */
export default class Kerl {
    public static BIT_HASH_LENGTH = BIT_HASH_LENGTH
    public static HASH_LENGTH = HASH_LENGTH

    private k: any

    /**
     * @constructor
     * @ignore
     */
    constructor() {
        this.k = (CryptoJS.algo as any).SHA3.create()
        this.k.init({
            outputLength: BIT_HASH_LENGTH,
        })
    }

    public initialize(state?: any) {
        /* empty */
    }

    /**
     * Resets the internal state
     *
     * @method reset
     *
     * @ignore
     */
    public reset() {
        this.k.reset()
    }

    /**
     * Absorbs trits given an offset and length
     *
     * @method absorb
     *
     * @ignore
     *
     * @param {Int8Array} trits
     * @param {number} offset
     * @param {number} length
     **/
    public absorb(trits: Int8Array, offset: number, length: number) {
        if (length && length % 243 !== 0) {
            throw new Error(errors.ILLEGAL_TRITS_LENGTH)
        }

        do {
            const limit = length < Kerl.HASH_LENGTH ? length : Kerl.HASH_LENGTH

            const trit_state = trits.slice(offset, offset + limit)
            offset += limit

            // convert trit state to words
            const wordsToAbsorb = tritsToWords(trit_state)

            // absorb the trit stat as wordarray
            this.k.update(CryptoJS.lib.WordArray.create(wordsToAbsorb))
        } while ((length -= Kerl.HASH_LENGTH) > 0)
    }

    /**
     * Squeezes trits given an offset and length
     *
     * @method squeeze
     *
     * @ignore
     *
     * @param {Int8Array} trits
     * @param {number} offset
     * @param {number} length
     **/
    public squeeze(trits: Int8Array, offset: number, length: number) {
        if (length && length % 243 !== 0) {
            throw new Error(errors.ILLEGAL_TRITS_LENGTH)
        }
        do {
            // get the hash digest
            const kCopy = this.k.clone()
            const final = kCopy.finalize()

            // Convert words to trits and then map it into the internal state
            const trit_state = wordsToTrits(final.words)

            let i = 0
            const limit = length < Kerl.HASH_LENGTH ? length : Kerl.HASH_LENGTH

            while (i < limit) {
                trits[offset++] = trit_state[i++]
            }

            this.reset()

            for (i = 0; i < final.words.length; i++) {
                final.words[i] = final.words[i] ^ 0xffffffff
            }

            this.k.update(final)
        } while ((length -= Kerl.HASH_LENGTH) > 0)
    }
}
