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
 * This method derives a subseed from a seed and a private key index.
 * 
 * You can use the subseed to [derive private keys and their addresses](https://docs.iota.org/docs/client-libraries/0.1/how-to-guides/js/derive-addresses-from-private-keys).
 * 
 * **Note:** If the given seed is less then 243 trits, 0 trits are appended to it until it is 243 trits long.
 * 
 * ## Related methods
 * 
 * To convert a seed from trytes to trits, use the [`trytesToTrits()`]{@link #module_converter.trytesToTrits} method.
 * 
 * To derive a private key from the subseed, use the [`key()`]{@link #module_signing.key} method.
 * 
 * @method subseed
 * 
 * @summary Generates a subseed.
 *  
 * @memberof module:signing
 *
 * @param {Int8Array} seed - A 243-trit seed to use to derive the subseed
 * @param {number} index - The private key index to use to derive the subseed
 * 
 * @example
 * ```js
 * const seed = 'MYSUPERSECRETSEED...';
 * const subseed = Sign.subseed(Converter.trytesToTrits(seed), 0);
 * ```
 *
 * @return {Int8Array} subseed - A subseed in trits
 * 
 * @throws {errors.ILLEGAL_SUBSEED_INDEX}: Make sure that the `index` argument is a number greater than 0.
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
 * This method derives a private key from a subseed.
 * 
 * You can use the private key to [derive an address](https://docs.iota.org/docs/client-libraries/0.1/how-to-guides/js/derive-addresses-from-private-keys) and to sign bundles that withdraw from that address.
 * 
 * ## Related methods
 * 
 * To generate a subseed, use the [`subseed()`]{@link #module_signing.subseed} method.
 * 
 * @method key
 * 
 * @summary Generates a private key.
 *  
 * @memberof module:signing
 *
 * @param {Int8Array} subseedTrits - A subseed in trits
 * @param {number} numberOfFragments - The security level that you want the private key to have
 * 
 * @example
 * ```js
 * const seed = 'MYSUPERSECRETSEED...';
 * const subseed = Signing.subseed(Converter.trytesToTrits(seed), 0);
 * 
 * const privateKey = Signing.key(subseed, 2);
 * ```
 *
 * @return {Int8Array} privateKey - A private key in trits.
 * 
 * @throws {errors.ILLEGAL_SUBSEED_LENGTH}: Make sure that the `subseedTrits` argument contains 243 trits.
 * @throws {errors.ILLEGAL_NUMBER_OF_FRAGMENTS}: Make sure that the `numberOfFragments` argument is a valid security level (between 1 and 3).
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
 * This method derives key digests from a private key.
 * 
 * You can use the key digests to [generate an address](https://docs.iota.org/docs/client-libraries/0.1/how-to-guides/js/derive-addresses-from-private-keys).
 * 
 * ## Related methods
 * 
 * To generate a private key, use the [`key()`]{@link #module_signing.key} method.
 * 
 * @method digests
 * 
 * @summary Generates key digests for a given private key.
 *  
 * @memberof module:signing
 *
 * @param {Int8Array} key - Private key in trits
 * 
 * @example
 * ```js
 * const seed = 'MYSUPERSECRETSEED...';
 * const subseed = Signing.subseed(Converter.trytesToTrits(seed), 0);
 * 
 * const privateKey = Signing.key(subseed, 2);
 * 
 * const digests = Signing.digests(privateKey);
 * ```
 *
 * @return {Int8Array} digests - Key digests in trits
 * 
 * @throws {errors.ILLEGAL_KEY_LENGTH}: Make sure that the `key` argument contains 2,187, 4,374, or 6,561 trits.
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
 * This method derives a 243-trit address from the given key digests.
 * 
 * ## Related methods
 * 
 * To generate a private key, use the [`key()`]{@link #module_signing.key} method.
 * 
 * @method address
 * 
 * @summary Derives an address from the given key digests.
 *  
 * @memberof module:signing
 *
 * @param {Int8Array} digests - Key digests in trits
 * 
 * @example
 * ```js
 * const seed = 'MYSUPERSECRETSEED...';
 * const subseed = Signing.subseed(Converter.trytesToTrits(seed), 0);
 * 
 * const privateKey = Signing.key(subseed, 2);
 * 
 * const digests = Signing.digests(privateKey);
 * 
 * const address = Signing.address(digests);
 * ```
 *
 * @return {Int8Array} address - Address in trits
 * 
 * @throws {errors.ILLEGAL_DIGESTS_LENGTH}: Make sure that the `digests` argument contains a multiple of 243 trits.
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
 * @ignore
 *
 * @param {array} normalizedBundleFragment - Normalized bundle fragments in trits
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
 * @ignore
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
 * This method validates a signature by doing the following:
 * 
 * - Normalizing the bundle hash
 * - Deriving the key digests of the address, using the normalized bundle hash and the signature
 * -.Deriving an address from the key digests
 * - Comparing the derived address to the `expectedAddress` argument to find out if they match
 * 
 * If the addresses match, the signature is valid.
 * 
 * For more information about signatures see the [documentation portal](https://docs.iota.org/docs/getting-started/0.1/clients/signatures).
 * 
 * ## Related methods
 * 
 * To convert trytes such as bundle hashes and addresses to trits, use the [`trytesToTrits()`]{@link #module_converter.trytesToTrits} method.
 * 
 * @method validateSignatures
 * 
 * @summary Validates the given signature, using the given bundle and address.
 *  
 * @memberof module:signing
 *
 * @param {Int8Array} expectedAddress - Input address in trits
 * @param {Array<Int8Array>} signatureFragments - Signature fragments in trits
 * @param {Int8Array} bundle - Bundle hash in trits
 * 
 * @example
 * ```js
 * let valid = Signing.validateSignatures(expectedAddress, signatureFragments, bundle);
 * ```
 * 
 * @return {boolean} valid - Whether the signatures are valid.
 * 
 * @throws {errors.ILLEGAL_BUNDLE_HASH_LENGTH}: Make sure that the `bundle` argument contains a 243-trit bundle hash.
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
 * This method normalizes the given bundle hash to make sure that only around half of the private key is revealed when the bundle hash is signed.
 * 
 * For more information about signatures see the [documentation portal](https://docs.iota.org/docs/getting-started/0.1/clients/signatures).
 * 
 * To find out more about why the bundle hash is normalized, see [this answer on StackExchange](https://iota.stackexchange.com/questions/1588/why-is-the-bundle-hash-normalized).
 * 
 * ## Related methods
 * 
 * To convert a bundle hash from trytes to trits, use the [`trytesToTrits()`]{@link #module_converter.trytesToTrits} method.
 * 
 * @method normalizedBundle
 * 
 * @summary Normalizes the bundle hash.
 *  
 * @memberof module:signing
 *
 * @param {Int8Array} bundle - Bundle hash in trits
 * 
 * @example
 * ```js
 * let normalizedBundleHash = Signing.normalizedBundle(bundle);
 * ```
 * 
 * @return {Int8Array} Normalized bundle hash in trits
 * 
 * @throws {errors.ILLEGAL_BUNDLE_HASH_LENGTH}: Make sure that the `bundle` argument contains a 243-trit bundle hash.
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
