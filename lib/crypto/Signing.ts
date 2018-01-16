import errors from '../errors/inputErrors'

import add from './add'
import Bundle from './Bundle'
import Converter from './Converter'
import Curl from './Curl'
import Kerl from './Kerl'
import { TritArray } from './types'

/**
 *           Signing related functions
 *
 **/
function key(seed: TritArray, index: number, length: number) {
    const filledSeed = new Int8Array(243)

    for (let i = 0; i < seed.length; i++) {
        filledSeed[i] = seed[i]
    }

    const indexTrits = Converter.fromValue(index)
    const subseed = add(seed.slice(), indexTrits)

    const kerl = new Kerl()

    kerl.initialize()
    kerl.absorb(subseed, 0, subseed.length)
    kerl.squeeze(subseed, 0, subseed.length)

    kerl.reset()
    kerl.absorb(subseed, 0, subseed.length)

    const result = []
    let offset = 0
    const buffer: number[] = []

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
 *
 *
 **/
// tslint:disable-next-line no-shadowed-variable
function digests(key: number[]) {
    const result = []
    let buffer: number[] = []

    for (let i = 0; i < Math.floor(key.length / 6561); i++) {
        const keyFragment = key.slice(i * 6561, (i + 1) * 6561)

        for (let j = 0; j < 27; j++) {
            buffer = keyFragment.slice(j * 243, (j + 1) * 243)

            for (let k = 0; k < 26; k++) {
                const kKerl = new Kerl()

                kKerl.initialize()
                kKerl.absorb(buffer, 0, buffer.length)
                kKerl.squeeze(buffer, 0, Curl.HASH_LENGTH)
            }

            for (let k = 0; k < 243; k++) {
                keyFragment[j * 243 + k] = buffer[k]
            }
        }

        const kerl = new Kerl()

        kerl.initialize()
        kerl.absorb(keyFragment, 0, keyFragment.length)
        kerl.squeeze(buffer, 0, Curl.HASH_LENGTH)

        for (let j = 0; j < 243; j++) {
            result[i * 243 + j] = buffer[j]
        }
    }
    return result
}

/**
 *
 *
 **/
// tslint:disable-next-line no-shadowed-variable
function address(digests: number[]) {
    const addressTrits: number[] = []
    const kerl = new Kerl()

    kerl.initialize()
    kerl.absorb(digests, 0, digests.length)
    kerl.squeeze(addressTrits, 0, Curl.HASH_LENGTH)

    return addressTrits
}

/**
 *
 *
 **/
// tslint:disable-next-line no-shadowed-variable
function digest(normalizedBundleFragment: number[], signatureFragment: TritArray) {
    let buffer: TritArray = []
    const kerl = new Kerl()

    kerl.initialize()

    for (let i = 0; i < 27; i++) {
        buffer = signatureFragment.slice(i * 243, (i + 1) * 243)

        for (let j = normalizedBundleFragment[i] + 13; j-- > 0; ) {
            const jKerl = new Kerl()

            jKerl.initialize()
            jKerl.absorb(buffer, 0, buffer.length)
            jKerl.squeeze(buffer, 0, Curl.HASH_LENGTH)
        }

        kerl.absorb(buffer, 0, buffer.length)
    }

    kerl.squeeze(buffer, 0, Curl.HASH_LENGTH)
    return buffer
}

/**
 *
 *
 **/
function signatureFragment(normalizedBundleFragment: number[], keyFragment: number[]) {
    const sigFragment = keyFragment.slice()
    let hash = []

    const kerl = new Kerl()

    for (let i = 0; i < 27; i++) {
        hash = sigFragment.slice(i * 243, (i + 1) * 243)

        for (let j = 0; j < 13 - normalizedBundleFragment[i]; j++) {
            kerl.initialize()
            kerl.reset()
            kerl.absorb(hash, 0, hash.length)
            kerl.squeeze(hash, 0, Curl.HASH_LENGTH)
        }

        for (let j = 0; j < 243; j++) {
            sigFragment[i * 243 + j] = hash[j]
        }
    }

    return sigFragment
}

/**
 *
 *
 **/
function validateSignatures(expectedAddress: string, signatureFragments: string[], bundleHash: string) {
    if (!bundleHash) {
        throw errors.invalidBundleHash()
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
    const digests: number[] = []

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
