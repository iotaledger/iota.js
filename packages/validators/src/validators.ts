/**
 * @module validators
 */

import { HASH_SIZE, TAG_SIZE, TRANSACTION_TRYTES_SIZE } from './constants'
import * as errors from './errors'
import { Address, Hash, Tag, Transaction, Transfer, Trytes } from '../../types'

export type Validatable<T = any> = [T, (x: T) => boolean, string]

export type Validator<T> = (x: T, err?: string) => Validatable<T>

/**
 * Runs each validator in sequence, and throws on the first occurence of invalid data.
 * Validators are passed as arguments and executed in given order.
 * You might want place `validate()` in promise chains before operations that require valid inputs,
 * taking advantage of built-in promise branching.
 *
 * @example
 *
 * ```js
 * try {
 *   validate([
 *     value, // Given value
 *     isTrytes, // Validator function
 *     'Invalid trytes' // Error message
 *   ])
 * } catch (err) {
 *   console.log(err.message) // 'Invalid trytes'
 * }
 * ```
 *
 * @method validate
 *
 * @throws {Error} error
 * @return {boolean}
 */
export const validate = (...validators: Array<Validatable | false>) => {
    validators.forEach(validator => {
        if (Array.isArray(validator)) {
            const [value, isValid, msg] = validator

            if (!isValid(value)) {
                throw new Error(`${msg}: ${value}`)
            }
        }
    })

    return true
}

/* Type guards */

export const isInteger = Number.isInteger
export const isArray = Array.isArray

/**
 * @method isTrytesOfExactLength
 *
 * @param {string} trytes
 * @param {number} length
 *
 * @return {boolean}
 */
export const isTrytesOfExactLength = (trytes: string, length: number) =>
    typeof trytes === 'string' && new RegExp(`^[9A-Z]{${length}}$`).test(trytes)

/**
 * @method isTrytesOfMaxLength
 *
 * @param {string} trytes
 * @param {number} length
 *
 * @return {boolean}
 */
export const isTrytesOfMaxLength = (trytes: string, length: number) =>
    typeof trytes === 'string' && new RegExp(`^[9A-Z]{1,${length}}$`).test(trytes)

/**
 * Checks if input is correct trytes consisting of [9A-Z]; optionally validate length
 * @method isTrytes
 *
 * @param {string} trytes
 * @param {string | number} [length='1,']
 *
 * @return {boolean}
 */
export const isTrytes = (trytes: string, length: string | number = '1,'): trytes is Trytes =>
    typeof trytes === 'string' && new RegExp(`^[9A-Z]{${length}}$`).test(trytes)

/**
 * Checks if input is correct hash (81 trytes) or address with checksum (90 trytes)
 *
 * @method isHash
 *
 * @param {string} hash
 *
 * @return {boolean}
 */
export const isHash = (hash: any): hash is Hash =>
    isTrytesOfExactLength(hash, HASH_SIZE) || isTrytesOfExactLength(hash, HASH_SIZE + 9) // address w/ checksum is valid hash

/**
 * Checks if input is correct transaction hash (81 trytes)
 *
 * @method isTransactionHash
 *
 * @param {string} hash
 *
 * @return {boolean}
 */
export const isTransactionHash = (hash: any): hash is Hash => isTrytesOfExactLength(hash, HASH_SIZE)

/**
 * Checks if input contains `9`s only.
 * @method isEmpty
 *
 * @param {string} hash
 *
 * @return {boolean}
 */
export const isEmpty = (trytes: any): trytes is Trytes => typeof trytes === 'string' && /^[9]+$/.test(trytes)
export const isNinesTrytes = isEmpty

/**
 * Checks if input is valid `transfer` object.
 *
 * @method isTransfer
 *
 * @param {Transfer} transfer
 *
 * @return {boolean}
 */
export const isTransfer = (transfer: Transfer): transfer is Transfer =>
    isHash(transfer.address) &&
    isInteger(transfer.value) &&
    transfer.value >= 0 &&
    (!transfer.message.length || isTrytes(transfer.message)) &&
    (!transfer.tag.length || isTrytes(transfer.tag)) &&
    transfer.tag.length <= 27

/**
 * Checks if input is array of valid `transfer` objects.
 *
 * @method isTransfersArray
 *
 * @param {Transfer[]} transfers
 *
 * @return {boolean}
 */
export const isTransfersArray = (transfers: ReadonlyArray<any>): transfers is ReadonlyArray<Transfer> =>
    isArray(transfers) && transfers.every(isTransfer)

/**
 * Checks if input is array of valid hashes.
 * Valid hashes are `81` trytes in length, or `90` trytes in case of addresses with checksum.
 *
 * @method isHashArray
 *
 * @param {string[]} hashes
 *
 * @return {boolean}
 */
export const isHashArray = (hashes: ReadonlyArray<any>): hashes is ReadonlyArray<Hash> =>
    isArray(hashes) && hashes.every(isHash)

/**
 * Checks if input is array of valid transaction hashes.
 *
 * @method isTransactionHashArray
 *
 * @param {string[]} hashes
 *
 * @return {boolean}
 */
export const isTransactionHashArray = (hashes: ReadonlyArray<any>): hashes is ReadonlyArray<Hash> =>
    isArray(hashes) && hashes.every(isTransactionHash)

/**
 * Checks if input is array of valid tranasction trytes.
 *
 * @method isTransactionTrytesArray
 *
 * @param {string[]} trytes
 *
 * @return {boolean}
 */
export const isTransactionTrytesArray = (trytesArray: ReadonlyArray<any>): trytesArray is ReadonlyArray<Trytes> =>
    isArray(trytesArray) && trytesArray.every(trytes => isTrytes(trytes, TRANSACTION_TRYTES_SIZE))

export const isTrytesArray = (trytesArray: ReadonlyArray<any>): trytesArray is ReadonlyArray<Trytes> =>
    isArray(trytesArray) && trytesArray.every(trytes => isTrytes(trytes, TRANSACTION_TRYTES_SIZE))

/**
 * Checks if input is array of valid attached tranasction trytes.
 * For attached transactions last 241 trytes are non-zero.
 *
 * @method isAttachedTrytesArray
 *
 * @param {string[]} trytes
 *
 * @return {boolean}
 */
export const isAttachedTrytesArray = (trytesArray: ReadonlyArray<any>): trytesArray is ReadonlyArray<Trytes> =>
    isArray(trytesArray) &&
    trytesArray.length > 0 &&
    trytesArray.every(
        trytes =>
            isTrytesOfExactLength(trytes, TRANSACTION_TRYTES_SIZE) &&
            !/^[9]+$/.test(trytes.slice(TRANSACTION_TRYTES_SIZE - 3 * HASH_SIZE))
    )

/**
 * Checks if input is valid transaction object.
 *
 * @method isTransaction
 *
 * @param {Object[]} tx
 *
 * @return {boolean}
 */
export const isTransaction = (tx: any): tx is Transaction =>
    isHash(tx.hash) &&
    isTrytesOfExactLength(tx.signatureMessageFragment, 2187) &&
    isHash(tx.address) &&
    isInteger(tx.value) &&
    isTrytesOfExactLength(tx.obsoleteTag, 27) &&
    isInteger(tx.timestamp) &&
    isInteger(tx.currentIndex) &&
    isInteger(tx.lastIndex) &&
    isHash(tx.bundle) &&
    isHash(tx.trunkTransaction) &&
    isHash(tx.branchTransaction) &&
    isTrytesOfExactLength(tx.tag, 27) &&
    isInteger(tx.attachmentTimestamp) &&
    isInteger(tx.attachmentTimestampLowerBound) &&
    isInteger(tx.attachmentTimestampUpperBound) &&
    isTrytesOfExactLength(tx.nonce, 27)

/**
 * Checks if input is valid array of transaction objects.
 *
 * @method isTransactionArray
 *
 * @param {Object[]} bundle
 *
 * @return {boolean}
 */
export const isTransactionArray = (bundle: ReadonlyArray<any>): bundle is ReadonlyArray<Transaction> =>
    isArray(bundle) && bundle.length > 0 && bundle.every(isTransaction)

/**
 * Checks if input is valid address. Address can be passed with or without checksum.
 * It does not validate the checksum.
 *
 * @method isAddress
 *
 * @param {string} address
 *
 * @return {boolean}
 */
export const isAddress = (address: any): address is Address =>
    isHash(address.address) && isSecurityLevel(address.security) && isInteger(address.keyIndex) && address.keyIndex >= 0

/**
 * Checks if input is valid array of address. Similarly to [`isAddress`]{@link #module_validators.isAddress},
 * it does not validate the checksum.
 *
 * @method isAddresses
 *
 * @param {string} address
 *
 * @return {boolean}
 */
export const isAddressArray = (addresses: ReadonlyArray<any>): addresses is ReadonlyArray<Address> =>
    isArray(addresses) && addresses.length > 0 && addresses.every(isAddress)

/**
 * Checks that a given `URI` is valid
 *
 * Valid Examples:
 * - `udp://[2001:db8:a0b:12f0::1]:14265`
 * - `udp://[2001:db8:a0b:12f0::1]`
 * - `udp://8.8.8.8:14265`
 * - `udp://domain.com`
 * - `udp://domain2.com:14265`
 *
 * @method isUri
 *
 * @param {string} uri
 *
 * @return {boolean}
 */
export const isUri = (uri: any): uri is Trytes => {
    if (typeof uri !== 'string') {
        return false
    }

    const getInside = /^(udp|tcp):\/\/([\[][^\]\.]*[\]]|[^\[\]:]*)[:]{0,1}([0-9]{1,}$|$)/i

    const stripBrackets = /[\[]{0,1}([^\[\]]*)[\]]{0,1}/

    const uriTest = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))|(^\s*((?=.{1,255}$)(?=.*[A-Za-z].*)[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?)*)\s*$)/

    return getInside.test(uri) && uriTest.test(stripBrackets.exec(getInside.exec(uri)![1])![1])
}

/**
 * Checks that a given input is array of value `URI`s
 *
 * @method isUriArray
 *
 * @param {string[]} uris
 *
 * @return {boolean}
 */
export const isUriArray = (uris: ReadonlyArray<any>): uris is ReadonlyArray<string> =>
    isArray(uris) && uris.every(isUri)

/* Check if start & end options are valid */
export const isStartEndOptions = ({ start, end }: { start: number; end: number }): boolean =>
    !end || (start <= end && end < start + 500)

/**
 * Checks that input is valid tag trytes.
 *
 * @method isTag
 *
 * @param {string} tag
 *
 * @return {boolean}
 */
export const isTag = (tag: any): tag is Tag => isTrytesOfMaxLength(tag, TAG_SIZE)

/**
 * Checks that input is array of valid tag trytes.
 *
 * @method isTagArray
 *
 * @param {string[]} tags
 *
 * @return {boolean}
 */
export const isTagArray = (tags: ReadonlyArray<any>): tags is ReadonlyArray<Tag> => isArray(tags) && tags.every(isTag)

export const isSecurityLevel = (security: any): security is number => isInteger(security) && security > 0

/**
 * Checks if given transaction object is tail transaction.
 * A tail transaction is one with `currentIndex=0`.
 *
 * @method isTailTransaction
 *
 * @param {object} transaction
 *
 * @return {boolean}
 */
export const isTailTransaction = (transaction: any): transaction is Transaction =>
    isTransaction(transaction) && transaction.currentIndex === 0

/**
 * Checks if input is valid array of `input` objects.
 *
 * @method isInputArray
 *
 * @param {object[]} inputs
 *
 * @return {boolean}
 */
export const isInputArray = (inputs: any): inputs is ReadonlyArray<Address> =>
    inputs.every(
        (input: Address) =>
            isHash(input.address) && isInteger(input.keyIndex) && input.keyIndex >= 0 && isSecurityLevel(input.security)
    )

/* Data type validators */

export const hashValidator: Validator<string> = (hash, error?: string) => [hash, isHash, error || errors.INVALID_HASH]

export const hashArrayValidator: Validator<ReadonlyArray<string>> = (hashes, error?: string) => [
    hashes,
    isHashArray,
    error || errors.INVALID_HASH_ARRAY,
]

export const transactionHashValidator: Validator<string> = (hash, error?: string) => [
    hash,
    isTransactionHash,
    error || errors.INVALID_HASH,
]

export const transactionHashArrayValidator: Validator<ReadonlyArray<string>> = hashes => [
    hashes,
    isTransactionHashArray,
    errors.INVALID_HASH_ARRAY,
]

export const trytesValidator: Validator<string> = trytes => [trytes, isTrytes, errors.INVALID_TRYTES]

export const trytesArrayValidator: Validator<ReadonlyArray<string>> = trytes => [
    trytes,
    isTrytesArray,
    errors.INVALID_TRYTES_ARRAY,
]

export const integerValidator: Validator<number> = integer => [integer, Number.isInteger, errors.NOT_INT]

export const depthValidator: Validator<number> = depth => [depth, Number.isInteger, errors.INVALID_DEPTH]

export const mwmValidator: Validator<number> = mwm => [mwm, Number.isInteger, errors.INVALID_MIN_WEIGHT_MAGNITUDE]

export const addressObjectArrayValidator: Validator<ReadonlyArray<Address>> = (addresses: ReadonlyArray<Address>) => [
    addresses,
    isAddressArray,
    errors.INVALID_INPUTS,
]

export const attachedTrytesArrayValidator: Validator<ReadonlyArray<string>> = (trytes: ReadonlyArray<string>) => [
    trytes,
    isAttachedTrytesArray,
    errors.INVALID_ATTACHED_TRYTES,
]

export const tailTransactionValidator: Validator<Transaction> = transaction => [
    transaction,
    isTailTransaction,
    errors.INVALID_TAIL_TRANSACTION,
]

export const seedValidator: Validator<string> = seed => [seed, isTrytes, errors.INVALID_SEED]

export const indexValidator: Validator<number> = index => [index, Number.isInteger, errors.INVALID_INDEX]

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
    errors.INVALID_THRESHOLD,
]

export const tagArrayValidator: Validator<ReadonlyArray<string>> = tags => [tags, isTagArray, errors.INVALID_TAGS]

export const tagValidator: Validator<ReadonlyArray<string>> = tag => [tag, isTag, errors.INVALID_TAG]

export const transferArrayValidator: Validator<ReadonlyArray<Transfer>> = transfers => [
    transfers,
    isTransfersArray,
    errors.INVALID_TRANSFERS,
]

export const uriArrayValidator: Validator<ReadonlyArray<string>> = uris => [uris, isUriArray, errors.INVALID_URI]

export const inputValidator: Validator<ReadonlyArray<Address>> = inputs => [inputs, isInputArray, errors.INVALID_INPUTS]

export const remainderAddressValidator: Validator<string | undefined> = remainderAddress => [
    remainderAddress,
    (address: string | undefined): boolean => !address || isHash(address),
    errors.INVALID_ADDRESS,
]
