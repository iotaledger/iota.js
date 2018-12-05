/**
 * @module transaction
 */

import { tritsToTrytes, trytesToTrits } from '@iota/converter'
import Curl from '@iota/curl'
import * as errors from '../../errors'
import { isArray, isHash, isTrytesOfExactLength, validate, Validator } from '../../guards'
import '../../typed-array'
import { Hash, Transaction, Trytes } from '../../types'
import {
    HASH_SIZE,
    NONCE_TRYTES_SIZE,
    OBSOLETE_TAG_TRYTES_SIZE,
    SIGNATURE_MESSAGE_FRAGMENT_TRYTES_SIZE,
    TAG_TRYTES_SIZE,
    TRANSACTION_TRYTES_SIZE,
} from './constants'

export { Transaction }

/**
 * Calculates the transaction hash out of 8019 transaction trits.
 *
 * @method transactionHash
 *
 * @param {Int8Array} trits - Int8Array of 8019 transaction trits
 *
 * @return {Hash} Transaction hash
 */
export const transactionHash = (trits: Int8Array): Hash => {
    const hash: Int8Array = new Int8Array(Curl.HASH_LENGTH)
    const curl = new Curl()

    // generate the transaction hash
    curl.initialize()
    curl.absorb(trits, 0, trits.length)
    curl.squeeze(hash, 0, Curl.HASH_LENGTH)

    return tritsToTrytes(hash)
}

/* Type guards */

/**
 * Checks if input is valid transaction object.
 *
 * @method isTransaction
 *
 * @param {object} tx
 *
 * @return {boolean}
 */
export const isTransaction = (tx: any): tx is Transaction =>
    isHash(tx.hash) &&
    isTrytesOfExactLength(tx.signatureMessageFragment, SIGNATURE_MESSAGE_FRAGMENT_TRYTES_SIZE) &&
    isHash(tx.address) &&
    Number.isInteger(tx.value) &&
    isTrytesOfExactLength(tx.obsoleteTag, OBSOLETE_TAG_TRYTES_SIZE) &&
    Number.isInteger(tx.timestamp) &&
    (Number.isInteger(tx.currentIndex) && tx.currentIndex >= 0 && tx.currentIndex <= tx.lastIndex) &&
    Number.isInteger(tx.lastIndex) &&
    isHash(tx.bundle) &&
    isHash(tx.trunkTransaction) &&
    isHash(tx.branchTransaction) &&
    isTrytesOfExactLength(tx.tag, TAG_TRYTES_SIZE) &&
    Number.isInteger(tx.attachmentTimestamp) &&
    Number.isInteger(tx.attachmentTimestampLowerBound) &&
    Number.isInteger(tx.attachmentTimestampUpperBound) &&
    isTrytesOfExactLength(tx.nonce, NONCE_TRYTES_SIZE)

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
 * Checks if input is correct transaction hash (81 trytes)
 *
 * @method isTransactionHash
 *
 * @param {string} hash
 * @param {number} mwm
 *
 * @return {boolean}
 */
export const isTransactionHash = (hash: any, minWeightMagnitude?: number): hash is Hash => {
    const hasCorrectHashLength = isTrytesOfExactLength(hash, HASH_SIZE)

    if (minWeightMagnitude) {
        return (
            hasCorrectHashLength &&
            trytesToTrits(hash)
                .slice(-Math.abs(minWeightMagnitude))
                .every((trit: number) => trit === 0)
        )
    }

    return hasCorrectHashLength
}

/**
 * Checks if input is correct transaction trytes (2673 trytes)
 *
 * @method isTransactionTrytes
 *
 * @param {string} trytes
 * @param {number} minWeightMagnitude
 *
 * @return {boolean}
 */
export const isTransactionTrytes = (trytes: any, minWeightMagnitude?: number): trytes is Trytes => {
    const hasCorrectTrytesLength = isTrytesOfExactLength(trytes, TRANSACTION_TRYTES_SIZE)

    if (minWeightMagnitude) {
        return hasCorrectTrytesLength && isTransactionHash(transactionHash(trytesToTrits(trytes)), minWeightMagnitude)
    }

    return hasCorrectTrytesLength
}

/**
 * Checks if input is valid attached transaction trytes.
 * For attached transactions last 241 trytes are non-zero.
 *
 * @method isAttachedTrytes
 *
 * @param {string} trytes
 *
 * @return {boolean}
 */
export const isAttachedTrytes = (trytes: any): trytes is Trytes =>
    isTrytesOfExactLength(trytes, TRANSACTION_TRYTES_SIZE) &&
    !/^[9]+$/.test(trytes.slice(TRANSACTION_TRYTES_SIZE - 3 * HASH_SIZE))

export const isAttachedTrytesArray = isArray(isAttachedTrytes)
export const isTransactionArray = isArray(isTransaction)
export const isTransactionHashArray = isArray(isTransactionHash)

/* Validators */

export const transactionValidator: Validator<Transaction> = (transaction: any) => [
    transaction,
    isTransaction,
    errors.INVALID_TRANSACTION,
]

export const tailTransactionValidator: Validator<Transaction> = (transaction: any) => [
    transaction,
    isTailTransaction,
    errors.INVALID_TAIL_TRANSACTION,
]

export const transactionHashValidator: Validator<Hash> = (hash: any, msg?: string) => [
    hash,
    isTransactionHash,
    msg || errors.INVALID_TRANSACTION_HASH,
]

export const transactionTrytesValidator: Validator<Trytes> = (trytes: any) => [
    trytes,
    isTransactionTrytes,
    errors.INVALID_TRANSACTION_TRYTES,
]

export const attachedTrytesValidator: Validator<Trytes> = (trytes: any) => [
    trytes,
    isAttachedTrytes,
    errors.INVALID_ATTACHED_TRYTES,
]

export const validateTransaction = (transaction: any) => validate(transactionValidator(transaction))
export const validateTailTransaction = (transaction: any) => validate(tailTransactionValidator(transaction))
export const validateTransactionHash = (hash: any, msg?: string) => validate(transactionHashValidator(hash, msg))
export const validateTransactionTrytes = (trytes: any) => validate(transactionTrytesValidator(trytes))
export const validateAttachedTrytes = (trytes: any) => validate(attachedTrytesValidator(trytes))
