import * as errors from '../errors'

import {
    isAttachedTrytesArray,
    isHash,
    isHashArray,
    isInteger,
    isTag,
    isTagArray,
    isTrytes,
    isTrytesArray,
    isUriArray,
} from './guards'

export type Validatable<T = any> = [T, (x: T) => boolean, string]

type Validator<T> = (x: T) => Validatable<T>

/**
 * Runs each validator in sequence, and throws on the first occurence of invalid data
 * @param validators
 */
export const validate = (validators: Validatable[]) => {
    for (const v of validators) {
        const [val, isValid, errorMsg] = v

        if (!isValid(val)) {
            throw new Error(`${errorMsg}: ${val}`)
        }
    }
}

/**
 * Data type validators
 */

export const attachedTrytesArrayValidator: Validator<string[]> = (trytes: string[]) => [
    trytes,
    isAttachedTrytesArray,
    errors.INVALID_ATTACHED_TRYTES,
]

export const depthValidator: Validator<number> = depth => [depth, isInteger, errors.INVALID_DEPTH]
export const hashValidator: Validator<string> = hash => [hash, isHash, errors.INVALID_HASH]
export const hashArrayValidator: Validator<string[]> = hashes => [hashes, isHashArray, errors.INVALID_HASH_ARRAY]
export const mwmValidator: Validator<number> = n => [n, isInteger, errors.INVALID_MIN_WEIGHT_MAGNITUDE]
export const seedValidator: Validator<string> = seed => [seed, isTrytes, errors.INVALID_SEED]
export const tagArrayValidator: Validator<string[]> = tags => [tags, isTagArray, errors.INVALID_TAG]
export const thresholdValidator: Validator<number> = threshold => [threshold, isInteger, errors.INVALID_THRESHOLD]
export const trytesArrayValidator: Validator<string[]> = trytes => [trytes, isTrytesArray, errors.INVALID_TRYTES]
export const uriArrayValidator: Validator<string[]> = uris => [uris, isUriArray, errors.INVALID_URI]
