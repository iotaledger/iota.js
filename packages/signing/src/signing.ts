/** @module signing */
import { fromValue, TRYTE_WIDTH } from '@iota/converter'
import Kerl from '@iota/kerl'
import { padTrits } from '@iota/pad'
import * as Promise from 'bluebird'
import * as errors from '../../errors'
import '../../typed-array'
import { NativeGenerateSignatureFunction } from '../../types'
import { add } from './add'

export const MIN_TRYTE_VALUE = -13
export const MAX_TRYTE_VALUE = 13
export const NUMBER_OF_SECURITY_LEVELS = 3
export const HASH_LENGTH = 243
export const FRAGMENT_LENGTH = (HASH_LENGTH / NUMBER_OF_SECURITY_LEVELS / TRYTE_WIDTH) * HASH_LENGTH
export const NUMBER_OF_FRAGMENT_CHUNKS = FRAGMENT_LENGTH / HASH_LENGTH
export const NORMALIZED_FRAGMENT_LENGTH = HASH_LENGTH / TRYTE_WIDTH / NUMBER_OF_SECURITY_LEVELS

/**
 * @method subseed
 *
 * @param {Int8Array} seed - Seed trits
 * @param {number} index - Private key index
 *
 * @return {Int8Array} subseed trits
 */
export function subseed(seed: Int8Array, index: number): Int8Array {
    if (!Number.isInteger(index) || index < 0) {
        throw new Error(errors.ILLEGAL_SUBSEED_INDEX)
    }

    const pad = padTrits(Math.ceil(seed.length / HASH_LENGTH) * HASH_LENGTH)
    const subseedPreimage: Int8Array = add(pad(seed), fromValue(index))
    const subseedTrits = new Int8Array(HASH_LENGTH)

    const sponge = new Kerl()
    sponge.absorb(subseedPreimage, 0, subseedPreimage.length)
    sponge.squeeze(subseedTrits, 0, HASH_LENGTH)

    return subseedTrits
}

/**
 * @method key
 *
 * @param {Int8Array} subseedTrits - Subseed trits
 * @param {number} numberOfFragments - Number of private key fragments
 *
 * @return {Int8Array} Private key trits
 */
export function key(subseedTrits: Int8Array, numberOfFragments: number): Int8Array {
    if (subseedTrits.length !== Kerl.HASH_LENGTH) {
        throw new Error(errors.ILLEGAL_SUBSEED_LENGTH)
    }

    if ([1, 2, 3].indexOf(numberOfFragments) === -1) {
        throw new Error(errors.ILLEGAL_NUMBER_OF_FRAGMENTS)
    }

    const keyTrits = new Int8Array(FRAGMENT_LENGTH * numberOfFragments)

    const sponge = new Kerl()
    sponge.absorb(subseedTrits, 0, subseedTrits.length)
    sponge.squeeze(keyTrits, 0, keyTrits.length)

    return keyTrits
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
    if (key.length === 0 || key.length % FRAGMENT_LENGTH !== 0) {
        throw new Error(errors.ILLEGAL_KEY_LENGTH)
    }

    const numberOfFragments = key.length / FRAGMENT_LENGTH
    const digestsTrits = new Int8Array(numberOfFragments * HASH_LENGTH)
    const sponge = new Kerl()

    for (let i = 0; i < numberOfFragments; i++) {
        const buffer = key.slice(i * FRAGMENT_LENGTH, (i + 1) * FRAGMENT_LENGTH)

        for (let j = 0; j < NUMBER_OF_FRAGMENT_CHUNKS; j++) {
            for (let k = 0; k < MAX_TRYTE_VALUE - MIN_TRYTE_VALUE; k++) {
                sponge.reset()
                sponge.absorb(buffer, j * HASH_LENGTH, HASH_LENGTH)
                sponge.squeeze(buffer, j * HASH_LENGTH, HASH_LENGTH)
            }
        }

        sponge.reset()
        sponge.absorb(buffer, 0, buffer.length)
        sponge.squeeze(digestsTrits, i * HASH_LENGTH, HASH_LENGTH)
    }

    return digestsTrits
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
    if (digests.length === 0 || digests.length % HASH_LENGTH !== 0) {
        throw new Error(errors.ILLEGAL_DIGESTS_LENGTH)
    }

    const addressTrits = new Int8Array(HASH_LENGTH)

    const sponge = new Kerl()
    sponge.absorb(digests.slice(), 0, digests.length)
    sponge.squeeze(addressTrits, 0, HASH_LENGTH)

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
export function digest(
    normalizedBundleFragment: Int8Array,
    signatureFragment: Int8Array, // tslint:disable-line
    normalizedBundleFragmentOffset = 0,
    signatureFragmentOffset = 0
): Int8Array {
    if (normalizedBundleFragment.length - normalizedBundleFragmentOffset < NORMALIZED_FRAGMENT_LENGTH) {
        throw new Error(errors.ILLEGAL_NORMALIZED_FRAGMENT_LENGTH)
    }

    if (signatureFragment.length - signatureFragmentOffset < FRAGMENT_LENGTH) {
        throw new Error(errors.ILLEGAL_SIGNATURE_FRAGMENT_LENGTH)
    }

    const buffer = signatureFragment.slice(signatureFragmentOffset, signatureFragmentOffset + FRAGMENT_LENGTH)
    const digestTrits = new Int8Array(HASH_LENGTH)
    const sponge = new Kerl()

    for (let j = 0; j < NUMBER_OF_FRAGMENT_CHUNKS; j++) {
        for (let k = normalizedBundleFragment[normalizedBundleFragmentOffset + j] - MIN_TRYTE_VALUE; k-- > 0; ) {
            sponge.reset()
            sponge.absorb(buffer, j * HASH_LENGTH, HASH_LENGTH)
            sponge.squeeze(buffer, j * HASH_LENGTH, HASH_LENGTH)
        }
    }

    sponge.reset()
    sponge.absorb(buffer, 0, buffer.length)
    sponge.squeeze(digestTrits, 0, digestTrits.length)

    return digestTrits
}

/**
 * @method signatureFragment
 *
 * @param {array} normalizeBundleFragment - normalized bundle fragment
 * @param {keyFragment} keyFragment - key fragment trits
 *
 * @return {Int8Array} Signature Fragment trits
 */
export function signatureFragment(
    normalizedBundleFragment: Int8Array,
    keyFragment: Int8Array,
    normalizedBundleFragmentOffset = 0,
    keyFragmentOffset = 0
): Int8Array {
    if (normalizedBundleFragment.length - normalizedBundleFragmentOffset < NORMALIZED_FRAGMENT_LENGTH) {
        throw new Error(errors.ILLEGAL_NORMALIZED_FRAGMENT_LENGTH)
    }

    if (keyFragment.length - keyFragmentOffset < FRAGMENT_LENGTH) {
        throw new Error(errors.ILLEGAL_KEY_FRAGMENT_LENGTH)
    }

    const signatureFragmentTrits = keyFragment.slice(keyFragmentOffset, keyFragmentOffset + FRAGMENT_LENGTH)
    const sponge = new Kerl()

    for (let j = 0; j < NUMBER_OF_FRAGMENT_CHUNKS; j++) {
        for (let k = 0; k < MAX_TRYTE_VALUE - normalizedBundleFragment[normalizedBundleFragmentOffset + j]; k++) {
            sponge.reset()
            sponge.absorb(signatureFragmentTrits, j * HASH_LENGTH, HASH_LENGTH)
            sponge.squeeze(signatureFragmentTrits, j * HASH_LENGTH, HASH_LENGTH)
        }
    }

    return signatureFragmentTrits
}

export function signatureFragments(
    seed: Int8Array,
    index: number,
    numberOfFragments: number,
    bundle: Int8Array,
    nativeGenerateSignatureFunction?: NativeGenerateSignatureFunction
): Promise<Int8Array> {
    if (nativeGenerateSignatureFunction && typeof nativeGenerateSignatureFunction === 'function') {
        return nativeGenerateSignatureFunction(
            Array.prototype.slice.call(seed),
            index,
            numberOfFragments,
            Array.prototype.slice.call(bundle)
        ).then(nativeSignature => new Int8Array(nativeSignature))
    }

    const normalizedBundleHash = normalizedBundle(bundle)
    const keyTrits = key(subseed(seed, index), numberOfFragments)
    const signature = new Int8Array(numberOfFragments * FRAGMENT_LENGTH)

    for (let i = 0; i < numberOfFragments; i++) {
        signature.set(
            signatureFragment(
                normalizedBundleHash.slice(i * NORMALIZED_FRAGMENT_LENGTH, (i + 1) * NORMALIZED_FRAGMENT_LENGTH),
                keyTrits.slice(i * FRAGMENT_LENGTH, (i + 1) * FRAGMENT_LENGTH)
            ),
            i * FRAGMENT_LENGTH
        )
    }

    return Promise.resolve(signature)
}

/**
 * @method validateSignatures
 *
 * @param {Int8Array} expectedAddress - Expected address trytes
 * @param {Array<Int8Array>} signatureFragments - Array of signatureFragments
 * @param {Int8Array} bundle - Bundle hash
 *
 * @return {boolean}
 */
export function validateSignatures(
    expectedAddress: Int8Array,
    signatureFragments: ReadonlyArray<Int8Array>, // tslint:disable-line
    bundle: Int8Array
): boolean {
    if (bundle.length !== HASH_LENGTH) {
        throw new Error(errors.ILLEGAL_BUNDLE_HASH_LENGTH)
    }

    const normalizedBundleFragments = []
    const normalizedBundleHash = normalizedBundle(bundle)

    // Split hash into 3 fragments
    for (let i = 0; i < NUMBER_OF_SECURITY_LEVELS; i++) {
        normalizedBundleFragments[i] = normalizedBundleHash.slice(
            i * NUMBER_OF_FRAGMENT_CHUNKS,
            (i + 1) * NUMBER_OF_FRAGMENT_CHUNKS
        )
    }

    // Get digests
    const digestsTrits = new Int8Array(signatureFragments.length * HASH_LENGTH)

    for (let i = 0; i < signatureFragments.length; i++) {
        const digestBuffer = digest(normalizedBundleFragments[i % NUMBER_OF_SECURITY_LEVELS], signatureFragments[i])

        for (let j = 0; j < HASH_LENGTH; j++) {
            digestsTrits[i * HASH_LENGTH + j] = digestBuffer[j]
        }
    }

    const actualAddress = address(digestsTrits)
    return expectedAddress.every((trit, i) => trit === actualAddress[i])
}

/**
 * Normalizes the bundle hash, with resulting digits summing to zero.
 *
 * @method normalizedBundle
 *
 * @param {Int8Array} bundle - Bundle hash to be normalized
 *
 * @return {Int8Array} Normalized bundle hash
 */
export const normalizedBundle = (bundle: Int8Array): Int8Array => {
    if (bundle.length !== HASH_LENGTH) {
        throw new Error(errors.ILLEGAL_BUNDLE_HASH_LENGTH)
    }

    const output = new Int8Array(HASH_LENGTH / TRYTE_WIDTH)

    for (let i = 0; i < NUMBER_OF_SECURITY_LEVELS; i++) {
        let sum = 0
        for (let j = i * NORMALIZED_FRAGMENT_LENGTH; j < (i + 1) * NORMALIZED_FRAGMENT_LENGTH; j++) {
            sum += output[j] =
                bundle[j * TRYTE_WIDTH] + bundle[j * TRYTE_WIDTH + 1] * 3 + bundle[j * TRYTE_WIDTH + 2] * 9
        }

        if (sum >= 0) {
            while (sum-- > 0) {
                for (let j = i * NORMALIZED_FRAGMENT_LENGTH; j < (i + 1) * NORMALIZED_FRAGMENT_LENGTH; j++) {
                    if (output[j] > MIN_TRYTE_VALUE) {
                        output[j]--
                        break
                    }
                }
            }
        } else {
            while (sum++ < 0) {
                for (let j = i * NORMALIZED_FRAGMENT_LENGTH; j < (i + 1) * NORMALIZED_FRAGMENT_LENGTH; j++) {
                    if (output[j] < MAX_TRYTE_VALUE) {
                        output[j]++
                        break
                    }
                }
            }
        }
    }

    return output
}
