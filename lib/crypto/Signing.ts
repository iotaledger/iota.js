import * as errors from '../errors'

import add from './add'
import Bundle from './Bundle'
import Converter from './Converter'
import Kerl from './Kerl'

/**
 * @method key
 * @param {Int8Array} seed - seed trits
 * @param {number} index - key index
 * @param {numebr} length - key length
 * @return {Int8Array}
 */
function key(seed: Int8Array, index: number, length: number): Int8Array {
    const indexTrits = Converter.fromValue(index)
    const subseed = add(seed.slice(), indexTrits)

    const kerl = new Kerl()

    kerl.initialize()
    kerl.absorb(subseed, 0, subseed.length)
    kerl.squeeze(subseed, 0, subseed.length)

    kerl.reset()
    kerl.absorb(subseed, 0, subseed.length)

    const buffer = new Int8Array(Kerl.HASH_LENGTH)
    const result = new Int8Array(length * 27 * 243)
    let offset = 0

    while (length-- > 0) {
        for (let i = 0; i < 27; i++) {
            kerl.squeeze(buffer, 0, subseed.length)
            for (let j = 0; j < 243; j++) {
                result[offset++] = buffer[j]
            }
        }
    }
    return result
}

/**
 * @method digests
 * @param {Int8Array} key - private key trits
 * @return {Int8Array} 
 */
// tslint:disable-next-line no-shadowed-variable
function digests(key: Int8Array): Int8Array {
    const l = Math.floor(key.length / 6561)
    const result = new Int8Array(l * 243)
    let buffer = new Int8Array(Kerl.HASH_LENGTH)

    for (let i = 0; i < l; i++) {
        const keyFragment = key.slice(i * 6561, (i + 1) * 6561)

        for (let j = 0; j < 27; j++) {
            buffer = keyFragment.slice(j * 243, (j + 1) * 243)

            for (let k = 0; k < 26; k++) {
                const kKerl = new Kerl()

                kKerl.initialize()
                kKerl.absorb(buffer, 0, buffer.length)
                kKerl.squeeze(buffer, 0, Kerl.HASH_LENGTH)
            }

            for (let k = 0; k < 243; k++) {
                keyFragment[j * 243 + k] = buffer[k]
            }
        }

        const kerl = new Kerl()

        kerl.initialize()
        kerl.absorb(keyFragment, 0, keyFragment.length)
        kerl.squeeze(buffer, 0, Kerl.HASH_LENGTH)

        for (let j = 0; j < 243; j++) {
            result[i * 243 + j] = buffer[j]
        }
    }
    return result
}

/**
 * @method address
 * @param {Int8Array} digests - digests trits
 * @return {Int8Array}
 **/
// tslint:disable-next-line no-shadowed-variable
function address(digests: Int8Array): Int8Array {
    const addressTrits = new Int8Array(Kerl.HASH_LENGTH)
    const kerl = new Kerl()

    kerl.initialize()
    kerl.absorb(digests, 0, digests.length)
    kerl.squeeze(addressTrits, 0, Kerl.HASH_LENGTH)

    return addressTrits
}

/**
 * @method digest
 * @param {array} normalizedBundleFragment - normalized bundle fragment
 * @param {Int8Array} signatureFragment - signature fragment trits
 * @return {Int8Array}
 **/
// tslint:disable-next-line no-shadowed-variable
function digest(normalizedBundleFragment: Int8Array, signatureFragment: Int8Array): Int8Array {
    let buffer = new Int8Array(Kerl.HASH_LENGTH)
    const kerl = new Kerl()

    kerl.initialize()

    for (let i = 0; i < 27; i++) {
        buffer = signatureFragment.slice(i * 243, (i + 1) * 243)

        for (let j = normalizedBundleFragment[i] + 13; j-- > 0; ) {
            const jKerl = new Kerl()

            jKerl.initialize()
            jKerl.absorb(buffer, 0, Kerl.HASH_LENGTH)
            jKerl.squeeze(buffer, 0, Kerl.HASH_LENGTH)
        }

        kerl.absorb(buffer, 0, Kerl.HASH_LENGTH)
    }

    kerl.squeeze(buffer, 0, Kerl.HASH_LENGTH)
    return buffer
}

/**
 * @method signatureFragment
 * @param {array} normalizeBundleFragment - normalized bundle fragment
 * @param {keyFragment} keyFragment - key fragment trits
 * @return {Int8Array}
 */
function signatureFragment(normalizedBundleFragment: Int8Array, keyFragment: Int8Array): Int8Array {
    const sigFragment: Int8Array = keyFragment.slice()
    let hash: Int8Array = new Int8Array(Kerl.HASH_LENGTH)

    const kerl = new Kerl()

    for (let i = 0; i < 27; i++) {
        hash = sigFragment.slice(i * 243, (i + 1) * 243)

        for (let j = 0; j < 13 - normalizedBundleFragment[i]; j++) {
            kerl.initialize()
            kerl.reset()
            kerl.absorb(hash, 0, Kerl.HASH_LENGTH)
            kerl.squeeze(hash, 0, Kerl.HASH_LENGTH)
        }

        for (let j = 0; j < 243; j++) {
            sigFragment[i * 243 + j] = hash[j]
        }
    }

    return sigFragment
}

/**
 * @method validateSignatures
 * @param {string} expectedAddress - expected address in trytes
 * @param {array} signatureFragments - array of signatureFragments in trytes
 * @param {string} bundleHash - bundle hash in trytes
 * @return {boolean}
 */
export function validateSignatures(expectedAddress: string, signatureFragments: string[], bundleHash: string): boolean {
    if (!bundleHash) {
        throw new Error(errors.INVALID_BUNDLE_HASH)
    }

    const bundle = new Bundle()

    const normalizedBundleFragments = []
    const normalizedBundleHash = bundle.normalizedBundle(bundleHash)

    // Split hash into 3 fragments
    for (let i = 0; i < 3; i++) {
        normalizedBundleFragments[i] = normalizedBundleHash.slice(i * 27, (i + 1) * 27)
    }

    // Get digests
    // tslint:disable-next-line no-shadowed-variable
    const digests: Int8Array = new Int8Array(signatureFragments.length * 243)

    for (let i = 0; i < signatureFragments.length; i++) {
        const digestBuffer = digest(normalizedBundleFragments[i % 3], Converter.trits(signatureFragments[i]))

        for (let j = 0; j < 243; j++) {
            digests[i * 243 + j] = digestBuffer[j]
        }
    }

    const calculatedAddress = Converter.trytes(address(digests))

    return expectedAddress === calculatedAddress
}

export default {
    key,
    digests,
    address,
    digest,
    signatureFragment,
    validateSignatures,
}
