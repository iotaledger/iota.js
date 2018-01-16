/* tslint:disable variable-name no-conditional-assignment */

import * as CryptoJS from 'crypto-js'

import Converter from './Converter'
import Curl from './Curl'
import { TritArray } from './types'
import WConverter from './WConverter'

const BIT_HASH_LENGTH = 384

export default class Kerl {
    public static BIT_HASH_LENGTH = BIT_HASH_LENGTH
    public static HASH_LENGTH = Curl.HASH_LENGTH

    private k: any

    constructor() {
        this.k = (CryptoJS as any).algo.SHA3.create()
        this.k.init({
            outputLength: BIT_HASH_LENGTH,
        })
    }

    public initialize(state?: any) {
        /* empty */
    }

    public reset() {
        this.k.reset()
    }

    public absorb(trits: TritArray, offset: number, length: number) {
        if (length && length % 243 !== 0) {
            throw new Error('Illegal length provided')
        }

        do {
            const limit = length < Curl.HASH_LENGTH ? length : Curl.HASH_LENGTH

            const trit_state = trits.slice(offset, offset + limit)
            offset += limit

            // convert trit state to words
            const wordsToAbsorb = WConverter.trits_to_words(trit_state)

            // absorb the trit stat as wordarray
            this.k.update(CryptoJS.lib.WordArray.create(wordsToAbsorb))
        } while ((length -= Curl.HASH_LENGTH) > 0)
    }

    public squeeze(trits: TritArray, offset: number, length: number) {
        if (length && length % 243 !== 0) {
            throw new Error('Illegal length provided')
        }
        do {
            // get the hash digest
            const kCopy = this.k.clone()
            const final = kCopy.finalize()

            // Convert words to trits and then map it into the internal state
            const trit_state = WConverter.words_to_trits(final.words)

            let i = 0
            const limit = length < Curl.HASH_LENGTH ? length : Curl.HASH_LENGTH

            while (i < limit) {
                trits[offset++] = trit_state[i++]
            }

            this.reset()

            for (i = 0; i < final.words.length; i++) {
                final.words[i] = final.words[i] ^ 0xffffffff
            }

            this.k.update(final)
        } while ((length -= Curl.HASH_LENGTH) > 0)
    }
}
