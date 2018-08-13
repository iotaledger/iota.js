/**
 * @module transaction
 */

import { tritsToTrytes, trytesToTrits } from '@iota/converter'
import Curl from '@iota/curl'
import { isArray, isHash, isInteger, isNinesTrytes, isTrytes, isTrytesOfExactLength } from '@iota/validators'
import {
    HASH_SIZE,
    TRANSACTION_TRYTES_SIZE,
    SIGNATURE_MESSAGE_FRAGMENT_TRYTES_SIZE,
    OBSOLETE_TAG_TRYTES_SIZE,
    NONCE_TRYTES_SIZE,
    TAG_TRYTES_SIZE,
} from './constants'
import { Hash, Transaction, Trytes } from '../../types'

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
export const isTransactionHash = (hash: any, mwm?: number): hash is Hash => {
    const hasCorrectHashLength = isTrytesOfExactLength(hash, HASH_SIZE)

    if (mwm) {
        return (
            hasCorrectHashLength &&
            trytesToTrits(hash)
                .slice(-Math.abs(mwm))
                .every(trit => trit === 0)
        )
    }

    return hasCorrectHashLength
}

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
    isArray(hashes) && !!hashes.length && hashes.every(isTransactionHash)

/**
 * Checks if input is correct transaction trytes (2673 trytes)
 *
 * @method isTransactionTrytes
 *
 * @param {string} trytes
 * @param {number} mwm
 *
 * @return {boolean}
 */
export const isTransactionTrytes = (trytes: any, mwm?: number): trytes is Trytes => {
    const hasCorrectTrytesLength = isTrytesOfExactLength(trytes, TRANSACTION_TRYTES_SIZE)

    if (mwm) {
        return hasCorrectTrytesLength && isTransactionHash(transactionHash(trytesToTrits(trytes)), mwm)
    }

    return hasCorrectTrytesLength
}

/**
 * Checks if input is array of valid transaction trytes.
 *
 * @method isTransactionTrytesArray
 *
 * @param {string[]} trytesArray
 *
 * @return {boolean}
 */
export const isTransactionTrytesArray = (trytesArray: ReadonlyArray<any>): trytesArray is ReadonlyArray<Trytes> =>
    isArray(trytesArray) &&
    !!trytesArray.length &&
    trytesArray.every(trytes => isTrytes(trytes, TRANSACTION_TRYTES_SIZE))

/**
 * Checks if input is array of valid attached transaction trytes.
 * For attached transactions last 241 trytes are non-zero.
 *
 * @method isAttachedTrytesArray
 *
 * @param {string[]} trytesArray
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
 * @param {object} tx
 *
 * @return {boolean}
 */
export const isTransaction = (tx: any): tx is Transaction =>
    isHash(tx.hash) &&
    isTrytesOfExactLength(tx.signatureMessageFragment, SIGNATURE_MESSAGE_FRAGMENT_TRYTES_SIZE) &&
    isHash(tx.address) &&
    isInteger(tx.value) &&
    isTrytesOfExactLength(tx.obsoleteTag, OBSOLETE_TAG_TRYTES_SIZE) &&
    isInteger(tx.timestamp) &&
    (isInteger(tx.currentIndex) && tx.currentIndex >= 0) &&
    isInteger(tx.lastIndex) &&
    isHash(tx.bundle) &&
    isHash(tx.trunkTransaction) &&
    isHash(tx.branchTransaction) &&
    isTrytesOfExactLength(tx.tag, TAG_TRYTES_SIZE) &&
    isInteger(tx.attachmentTimestamp) &&
    isInteger(tx.attachmentTimestampLowerBound) &&
    isInteger(tx.attachmentTimestampUpperBound) &&
    isTrytesOfExactLength(tx.nonce, NONCE_TRYTES_SIZE)

/**
 * Checks if input is valid array of transaction objects.
 *
 * @method isTransactionArray
 *
 * @param {object[]} bundle
 *
 * @return {boolean}
 */
export const isTransactionArray = (bundle: ReadonlyArray<any>): bundle is ReadonlyArray<Transaction> =>
    isArray(bundle) && bundle.length > 0 && bundle.every(isTransaction)

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
