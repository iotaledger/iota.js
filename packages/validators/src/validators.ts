import * as errors from './errors'
import { Address, Transaction, Transfer, Trytes } from '../../types'
import {
    isAddressArray,
    isAttachedTrytesArray,
    isHash,
    isHashArray,
    isInputArray,
    isSecurityLevel,
    isStartEndOptions,
    isTag,
    isTagArray,
    isTailTransaction,
    isTransactionHash,
    isTransactionHashArray,
    isTransfersArray,
    isTrytes,
    isTrytesArray,
    isUriArray,
} from './'

export type Validatable<T = any> = [T, (x: T) => boolean, string]

export type Validator<T> = (x: T, err?: string) => Validatable<T>

/**
 * Runs each validator in sequence, and throws on the first occurence of invalid data
 * 
 * @method validate
 * 
 * @param validators
 * 
 * @throws {Error} error
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
export const hashValidator: Validator<string> = (hash, error?: string) => [
    hash,
    isHash,
    error || errors.INVALID_HASH
]

export const hashArrayValidator: Validator<string[]> = hashes => [
    hashes,
    isHashArray,
    errors.INVALID_HASH_ARRAY
]

export const transactionHashValidator: Validator<string> = hash => [
    hash,
    isTransactionHash,
    errors.INVALID_HASH
]

export const transactionHashArrayValidator: Validator<string[]> = hashes => [
    hashes,
    isTransactionHashArray,
    errors.INVALID_HASH_ARRAY
]

export const trytesValidator: Validator<string> = trytes => [
    trytes,
    isTrytes,
    errors.INVALID_TRYTES
]

export const trytesArrayValidator: Validator<string[]> = trytes => [
    trytes,
    isTrytesArray,
    errors.INVALID_TRYTES_ARRAY
]

export const integerValidator: Validator<number> = integer => [
    integer,
    Number.isInteger,
    errors.NOT_INT
]

export const depthValidator: Validator<number> = depth => [
    depth,
    Number.isInteger,
    errors.INVALID_DEPTH
]

export const mwmValidator: Validator<number> = mwm => [
    mwm,
    Number.isInteger,
    errors.INVALID_MIN_WEIGHT_MAGNITUDE
]

export const addressObjectArrayValidator: Validator<Address[]> = (addresses: Address[]) => [
    addresses,
    isAddressArray,
    errors.INVALID_INPUTS,
]

export const attachedTrytesArrayValidator: Validator<string[]> = (trytes: string[]) => [
    trytes,
    isAttachedTrytesArray,
    errors.INVALID_ATTACHED_TRYTES,
]

export const tailTransactionValidator: Validator<Transaction> = transaction => [
    transaction,
    isTailTransaction,
    errors.INVALID_TAIL_TRANSACTION,
]

export const seedValidator: Validator<string> = seed => [
    seed,
    isTrytes,
    errors.INVALID_SEED
]

export const indexValidator: Validator<number> = index => [
    index,
    Number.isInteger,
    errors.INVALID_INDEX
]

export const securityLevelValidator: Validator<number> = security => [
    security,
    isSecurityLevel,
    errors.INVALID_SECURITY_LEVEL,
]

export const startOptionValidator: Validator<number> = start => [
    start,
    s => Number.isInteger(s) && s >= 0,
    errors.INVALID_START_OPTION,
]

export const getInputsThresholdValidator: Validator<number> = threshold => [
    threshold,
    s => Number.isInteger(s) && s >= 0,
    errors.INVALID_THRESHOLD,
]

export const startEndOptionsValidator: Validator<any> = options => [
    options,
    isStartEndOptions,
    errors.INVALID_START_END_OPTIONS,
]

export const getBalancesThresholdValidator: Validator<number> = threshold => [
    threshold,
    t => Number.isInteger(t) && t <= 100,
    errors.INVALID_THRESHOLD
]

export const tagArrayValidator: Validator<string[]> = tags => [
    tags,
    isTagArray,
    errors.INVALID_TAG
]

export const transferArrayValidator: Validator<Transfer[]> = transfers => [
    transfers,
    isTransfersArray,
    errors.INVALID_TRANSFERS,
]

export const uriArrayValidator: Validator<string[]> = uris => [
    uris,
    isUriArray,
    errors.INVALID_URI
]

export const inputValidator: Validator<Address[]> = inputs => [
    inputs,
    isInputArray,
    errors.INVALID_INPUTS,
]

export const remainderAddressValidator: Validator<string | undefined> = remainderAddress => [
    remainderAddress,
    (address: string | undefined): boolean => !address || isHash(address),
    errors.INVALID_ADDRESS,
]
