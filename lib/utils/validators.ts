import { Bundle, Transaction, Transfer } from '../api/types'
import * as errors from '../errors'
import { isBundle } from './'
import {
    isAttachedTrytesArray,
    isHash,
    isHashArray,
    isInteger,
    isSecurityLevel,
    isStartEndOptions,
    isTag,
    isTagArray,
    isTailTransaction,
    isTransfersArray,
    isTrytes,
    isTrytesArray,
    isUriArray,
} from './guards'

export type Validatable<T = any> = [T, (x: T) => boolean, string]

export type Validator<T> = (x: T) => Validatable<T>

/**
 * Runs each validator in sequence, and throws on the first occurence of invalid data
 * @param validators
 */
export const validate = (...validators: Validatable[]) => {
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

export const bundleValidator: Validator<Bundle> = bundle => [bundle, isBundle, errors.INVALID_BUNDLE]
export const depthValidator: Validator<number> = depth => [depth, isInteger, errors.INVALID_DEPTH]
export const hashArrayValidator: Validator<string[]> = hashes => [hashes, isHashArray, errors.INVALID_HASH_ARRAY]
export const hashValidator: Validator<string> = hash => [hash, isHash, errors.INVALID_HASH]
export const indexValidator: Validator<number> = security => [security, isInteger, errors.INVALID_INDEX]
export const integerValidator: Validator<number> = integer => [integer, isInteger, errors.NOT_INT]
export const mwmValidator: Validator<number> = n => [n, isInteger, errors.INVALID_MIN_WEIGHT_MAGNITUDE]
export const securityLevelValidator: Validator<number> = security => [
    security,
    isSecurityLevel,
    errors.INVALID_SECURITY_LEVEL,
]
export const seedValidator: Validator<string> = seed => [seed, isTrytes, errors.INVALID_SEED]
export const startEndOptionsValidator: Validator<{ start: number; end: number }> = options => [
    options,
    isStartEndOptions,
    errors.INVALID_START_END_OPTIONS,
]
export const tagArrayValidator: Validator<string[]> = tags => [tags, isTagArray, errors.INVALID_TAG]
export const tailTransactionValidator: Validator<Transaction> = transaction => [
    transaction,
    isTailTransaction,
    errors.INVALID_TAIL_TRANSACTION,
]
export const thresholdValidator: Validator<number> = threshold => [threshold, isInteger, errors.INVALID_THRESHOLD]
export const trytesValidator: Validator<string> = trytes => [trytes, isTrytes, errors.INVALID_TRYTES]
export const trytesArrayValidator: Validator<string[]> = trytes => [trytes, isTrytesArray, errors.INVALID_TRYTES_ARRAY]
export const uriArrayValidator: Validator<string[]> = uris => [uris, isUriArray, errors.INVALID_URI]
export const remainderAddressValidator: Validator<string | undefined> = remainderAddress =>
    [remainderAddress, (address: string | undefined): boolean => !address || isHash(address), errors.INVALID_ADDRESS]
export const transferArrayValidator: Validator<Transfer[]> = transfers => [transfers, isTransfersArray, errors.INVALID_TRANSFERS]


