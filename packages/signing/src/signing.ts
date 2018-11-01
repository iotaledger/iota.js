/** @module signing */

import { fromValue, trits, trytes, value } from '@iota/converter'
import Kerl from '@iota/kerl'
import { padTrits } from '@iota/pad'
import '../../typed-array'
import { Hash } from '../../types'
import add from './add'
import * as errors from './errors'

/**
 * @method subseed
 *
 * @param {Int8Array} seed - Seed trits
 * @param {number} index - Private key index
 *
 * @return {Int8Array} subseed trits
 */
export function subseed(seed: Int8Array, index: number): Int8Array {
    if (index < 0) {
        throw new Error(errors.ILLEGAL_KEY_INDEX)
    }

    if (seed.length % 3 !== 0) {
        throw new Error(errors.ILLEGAL_SEED_LENGTH)
    }

    const indexTrits = fromValue(index)
    let subseedTrits: Int8Array = add(seed, indexTrits)

    while (subseedTrits.length % 243 !== 0) {
        subseedTrits = padTrits(subseedTrits.length + 3)(subseedTrits)
    }

    const kerl = new Kerl()

    kerl.initialize()
    kerl.absorb(subseedTrits, 0, subseedTrits.length)
    kerl.squeeze(subseedTrits, 0, subseedTrits.length)

    return subseedTrits
}

/**
 * @method key
 *
 * @param {Int8Array} subseedTrits - Subseed trits
 * @param {number} length - Private key length
 *
 * @return {Int8Array} Private key trits
 */
export function key(subseedTrits: Int8Array, length: number): Int8Array {
    if (subseedTrits.length % 3 !== 0) {
        throw new Error(errors.ILLEGAL_SUBSEED_LENGTH)
    }

    const kerl = new Kerl()

    kerl.initialize()
    kerl.absorb(subseedTrits, 0, subseedTrits.length)

    const buffer = new Int8Array(Kerl.HASH_LENGTH)
    const result = new Int8Array(length * 27 * 243)
    let offset = 0

    while (length-- > 0) {
        for (let i = 0; i < 27; i++) {
            kerl.squeeze(buffer, 0, subseedTrits.length)
            for (let j = 0; j < 243; j++) {
                result[offset++] = buffer[j]
            }
        }
    }
    return result
}

/**
 * @method digests
 *
 * @param {Int8Array} key - Private key trits
 *
 * @return {Int8Array}
 */
// tslint:disable-next-line no-shadowed-variable
export function digests(key: Int8Array): Int8Array {
    const l = Math.floor(key.length / 6561)
    const result = new Int8Array(l * 243)
    let buffer = new Int8Array(Kerl.HASH_LENGTH)

    for (let i = 0; i < l; i++) {
        const keyFragment = key.slice(i * 6561, (i + 1) * 6561)

        for (let j = 0; j < 27; j++) {
            buffer = keyFragment.slice(j * 243, (j + 1) * 243)

            for (let k = 0; k < 26; k++) {
                const keyFragmentKerl = new Kerl()

                keyFragmentKerl.initialize()
                keyFragmentKerl.absorb(buffer, 0, buffer.length)
                keyFragmentKerl.squeeze(buffer, 0, Kerl.HASH_LENGTH)
            }

            for (let k = 0; k < 243; k++) {
                keyFragment[j * 243 + k] = buffer[k]
            }
        }

        const digestsKerl = new Kerl()

        digestsKerl.initialize()
        digestsKerl.absorb(keyFragment, 0, keyFragment.length)
        digestsKerl.squeeze(buffer, 0, Kerl.HASH_LENGTH)

        for (let j = 0; j < 243; j++) {
            result[i * 243 + j] = buffer[j]
        }
    }
    return result
}

/**
 * @method address
 *
 * @param {Int8Array} digests - Digests trits
 *
 * @return {Int8Array} Address trits
 */
// tslint:disable-next-line no-shadowed-variable
export function address(digests: Int8Array): Int8Array {
    const addressTrits = new Int8Array(Kerl.HASH_LENGTH)
    const kerl = new Kerl()

    kerl.initialize()
    kerl.absorb(digests.slice(), 0, digests.length)
    kerl.squeeze(addressTrits, 0, Kerl.HASH_LENGTH)

    return addressTrits
}

/**
 * @method digest
 *
 * @param {array} normalizedBundleFragment - Normalized bundle fragment
 * @param {Int8Array} signatureFragment - Signature fragment trits
 *
 * @return {Int8Array} Digest trits
 */
// tslint:disable-next-line no-shadowed-variable
export function digest(normalizedBundleFragment: Int8Array, signatureFragment: Int8Array): Int8Array {
    const digestKerl = new Kerl()

    digestKerl.initialize()

    let buffer = new Int8Array(Kerl.HASH_LENGTH)

    for (let i = 0; i < 27; i++) {
        buffer = signatureFragment.slice(i * 243, (i + 1) * 243)

        for (let j = normalizedBundleFragment[i] + 13; j-- > 0; ) {
            const signatureFragmentKerl = new Kerl()

            signatureFragmentKerl.initialize()
            signatureFragmentKerl.absorb(buffer, 0, Kerl.HASH_LENGTH)
            signatureFragmentKerl.squeeze(buffer, 0, Kerl.HASH_LENGTH)
        }

        digestKerl.absorb(buffer, 0, Kerl.HASH_LENGTH)
    }

    digestKerl.squeeze(buffer, 0, Kerl.HASH_LENGTH)
    return buffer
}

/**
 * @method signatureFragment
 *
 * @param {array} normalizeBundleFragment - normalized bundle fragment
 * @param {keyFragment} keyFragment - key fragment trits
 *
 * @return {Int8Array} Signature Fragment trits
 */
export function signatureFragment(normalizedBundleFragment: Int8Array, keyFragment: Int8Array): Int8Array {
    const sigFragment = keyFragment.slice()

    const kerl = new Kerl()

    for (let i = 0; i < 27; i++) {
        const hash = sigFragment.slice(i * 243, (i + 1) * 243)

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
 *
 * @param {string} expectedAddress - Expected address trytes
 * @param {array} signatureFragments - Array of signatureFragments trytes
 * @param {string} bundleHash - Bundle hash trytes
 *
 * @return {boolean}
 */
export function validateSignatures(
    expectedAddress: string,
    signatureFragments: ReadonlyArray<string>,
    bundleHash: string
): boolean {
    if (!bundleHash) {
        throw new Error(errors.INVALID_BUNDLE_HASH)
    }

    const normalizedBundleFragments = []
    const normalizedBundle = normalizedBundleHash(bundleHash)

    // Split hash into 3 fragments
    for (let i = 0; i < 3; i++) {
        normalizedBundleFragments[i] = normalizedBundle.slice(i * 27, (i + 1) * 27)
    }

    // Get digests
    // tslint:disable-next-line no-shadowed-variable
    const digests = new Int8Array(signatureFragments.length * 243)

    for (let i = 0; i < signatureFragments.length; i++) {
        const digestBuffer = digest(normalizedBundleFragments[i % 3], trits(signatureFragments[i]))

        for (let j = 0; j < 243; j++) {
            digests[i * 243 + j] = digestBuffer[j]
        }
    }

    return expectedAddress === trytes(address(digests))
}

/**
 * Normalizes the bundle hash, with resulting digits summing to zero.
 *
 * @method normalizedBundleHash
 *
 * @param {Hash} bundlehash - Bundle hash trytes
 *
 * @return {Int8Array} Normalized bundle hash
 */
export const normalizedBundleHash = (bundleHash: Hash): Int8Array => {
    const normalizedBundle = new Int8Array(81)

    for (let i = 0; i < 3; i++) {
        let sum = 0
        for (let j = 0; j < 27; j++) {
            sum += normalizedBundle[i * 27 + j] = value(trits(bundleHash.charAt(i * 27 + j)))
        }

        if (sum >= 0) {
            while (sum-- > 0) {
                for (let j = 0; j < 27; j++) {
                    if (normalizedBundle[i * 27 + j] > -13) {
                        normalizedBundle[i * 27 + j]--
                        break
                    }
                }
            }
        } else {
            while (sum++ < 0) {
                for (let j = 0; j < 27; j++) {
                    if (normalizedBundle[i * 27 + j] < 13) {
                        normalizedBundle[i * 27 + j]++
                        break
                    }
                }
            }
        }
    }

    return normalizedBundle
}
