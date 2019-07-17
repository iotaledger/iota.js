/** @module transaction-converter */

import { tritsToTrytes, TRYTE_WIDTH, trytesToTrits, value } from '@iota/converter'
import { padTrits, padTrytes } from '@iota/pad'
import {
    ADDRESS_LENGTH,
    ADDRESS_OFFSET,
    ATTACHMENT_TIMESTAMP_LENGTH,
    ATTACHMENT_TIMESTAMP_LOWER_BOUND_LENGTH,
    ATTACHMENT_TIMESTAMP_LOWER_BOUND_OFFSET,
    ATTACHMENT_TIMESTAMP_OFFSET,
    ATTACHMENT_TIMESTAMP_UPPER_BOUND_LENGTH,
    ATTACHMENT_TIMESTAMP_UPPER_BOUND_OFFSET,
    BRANCH_TRANSACTION_LENGTH,
    BRANCH_TRANSACTION_OFFSET,
    BUNDLE_LENGTH,
    BUNDLE_OFFSET,
    CURRENT_INDEX_LENGTH,
    CURRENT_INDEX_OFFSET,
    ISSUANCE_TIMESTAMP_LENGTH,
    ISSUANCE_TIMESTAMP_OFFSET,
    LAST_INDEX_LENGTH,
    LAST_INDEX_OFFSET,
    OBSOLETE_TAG_LENGTH,
    OBSOLETE_TAG_OFFSET,
    SIGNATURE_OR_MESSAGE_LENGTH,
    SIGNATURE_OR_MESSAGE_OFFSET,
    TAG_LENGTH,
    TAG_OFFSET,
    TRANSACTION_LENGTH,
    TRANSACTION_NONCE_LENGTH,
    TRANSACTION_NONCE_OFFSET,
    transactionHash,
    TRUNK_TRANSACTION_LENGTH,
    TRUNK_TRANSACTION_OFFSET,
    VALUE_LENGTH,
    VALUE_OFFSET,
} from '@iota/transaction'
import * as errors from '../../errors'
import { isTrytesOfExactLength } from '../../guards'
import '../../typed-array'
import { asArray, Hash, Transaction, Trytes } from '../../types'

export { Transaction }

export function asTransactionTrytes(transactions: Transaction): Trytes
export function asTransactionTrytes(transactions: ReadonlyArray<Transaction>): ReadonlyArray<Trytes>
/**
 * Converts a transaction object or a list of those into transaction trytes.
 *
 * @method asTransactionTrytes
 *
 * @param {Transaction | Transaction[]} transactions - Transaction object(s)
 *
 * @return {Trytes | Trytes[]} Transaction trytes
 */
export function asTransactionTrytes(
    transactions: Transaction | ReadonlyArray<Transaction>
): Trytes | ReadonlyArray<Trytes> {
    const txTrytes = asArray(transactions).map(transaction =>
        [
            transaction.signatureMessageFragment,
            transaction.address,
            tritsToTrytes(padTrits(VALUE_LENGTH)(trytesToTrits(transaction.value))),
            padTrytes(OBSOLETE_TAG_LENGTH / TRYTE_WIDTH)(transaction.obsoleteTag),
            tritsToTrytes(padTrits(ISSUANCE_TIMESTAMP_LENGTH)(trytesToTrits(transaction.timestamp))),
            tritsToTrytes(padTrits(CURRENT_INDEX_LENGTH)(trytesToTrits(transaction.currentIndex))),
            tritsToTrytes(padTrits(LAST_INDEX_LENGTH)(trytesToTrits(transaction.lastIndex))),
            transaction.bundle,
            transaction.trunkTransaction,
            transaction.branchTransaction,
            padTrytes(OBSOLETE_TAG_LENGTH / TRYTE_WIDTH)(transaction.tag || transaction.obsoleteTag),
            tritsToTrytes(padTrits(ATTACHMENT_TIMESTAMP_LENGTH)(trytesToTrits(transaction.attachmentTimestamp))),
            tritsToTrytes(
                padTrits(ATTACHMENT_TIMESTAMP_LOWER_BOUND_LENGTH)(
                    trytesToTrits(transaction.attachmentTimestampLowerBound)
                )
            ),
            tritsToTrytes(
                padTrits(ATTACHMENT_TIMESTAMP_UPPER_BOUND_LENGTH)(
                    trytesToTrits(transaction.attachmentTimestampUpperBound)
                )
            ),
            transaction.nonce,
        ].join('')
    )

    return Array.isArray(transactions) ? txTrytes : txTrytes[0]
}

/**
 * Converts transaction trytes of 2673 trytes into a transaction object.
 *
 * @method asTransactionObject
 *
 * @param {Trytes} trytes - Transaction trytes
 *
 * @return {Transaction} Transaction object
 */
export const asTransactionObject = (trytes: Trytes, hash?: Hash): Transaction => {
    if (!isTrytesOfExactLength(trytes, TRANSACTION_LENGTH / TRYTE_WIDTH)) {
        throw new Error(errors.INVALID_TRYTES)
    }

    for (let i = 2279; i < 2295; i++) {
        if (trytes.charAt(i) !== '9') {
            throw new Error(errors.INVALID_TRYTES)
        }
    }

    const trits = trytesToTrits(trytes)

    return {
        hash: hash || tritsToTrytes(transactionHash(trits)),
        signatureMessageFragment: trytes.slice(
            SIGNATURE_OR_MESSAGE_OFFSET / TRYTE_WIDTH,
            SIGNATURE_OR_MESSAGE_LENGTH / TRYTE_WIDTH
        ),
        address: trytes.slice(ADDRESS_OFFSET / TRYTE_WIDTH, (ADDRESS_OFFSET + ADDRESS_LENGTH) / TRYTE_WIDTH),
        value: value(trits.slice(VALUE_OFFSET, VALUE_OFFSET + VALUE_LENGTH)),
        obsoleteTag: trytes.slice(
            OBSOLETE_TAG_OFFSET / TRYTE_WIDTH,
            (OBSOLETE_TAG_OFFSET + OBSOLETE_TAG_LENGTH) / TRYTE_WIDTH
        ),
        timestamp: value(trits.slice(ISSUANCE_TIMESTAMP_OFFSET, ISSUANCE_TIMESTAMP_OFFSET + ISSUANCE_TIMESTAMP_LENGTH)),
        currentIndex: value(trits.slice(CURRENT_INDEX_OFFSET, CURRENT_INDEX_OFFSET + CURRENT_INDEX_LENGTH)),
        lastIndex: value(trits.slice(LAST_INDEX_OFFSET, LAST_INDEX_OFFSET + LAST_INDEX_LENGTH)),
        bundle: trytes.slice(BUNDLE_OFFSET / TRYTE_WIDTH, (BUNDLE_OFFSET + BUNDLE_LENGTH) / TRYTE_WIDTH),
        trunkTransaction: trytes.slice(
            TRUNK_TRANSACTION_OFFSET / TRYTE_WIDTH,
            (TRUNK_TRANSACTION_OFFSET + TRUNK_TRANSACTION_LENGTH) / TRYTE_WIDTH
        ),
        branchTransaction: trytes.slice(
            BRANCH_TRANSACTION_OFFSET / TRYTE_WIDTH,
            (BRANCH_TRANSACTION_OFFSET + BRANCH_TRANSACTION_LENGTH) / TRYTE_WIDTH
        ),
        tag: trytes.slice(TAG_OFFSET / TRYTE_WIDTH, (TAG_OFFSET + TAG_LENGTH) / TRYTE_WIDTH),
        attachmentTimestamp: value(
            trits.slice(ATTACHMENT_TIMESTAMP_OFFSET, ATTACHMENT_TIMESTAMP_OFFSET + ATTACHMENT_TIMESTAMP_LENGTH)
        ),
        attachmentTimestampLowerBound: value(
            trits.slice(
                ATTACHMENT_TIMESTAMP_LOWER_BOUND_OFFSET,
                ATTACHMENT_TIMESTAMP_LOWER_BOUND_OFFSET + ATTACHMENT_TIMESTAMP_LOWER_BOUND_LENGTH
            )
        ),
        attachmentTimestampUpperBound: value(
            trits.slice(
                ATTACHMENT_TIMESTAMP_UPPER_BOUND_OFFSET,
                ATTACHMENT_TIMESTAMP_UPPER_BOUND_OFFSET + ATTACHMENT_TIMESTAMP_UPPER_BOUND_LENGTH
            )
        ),
        nonce: trytes.slice(
            TRANSACTION_NONCE_OFFSET / TRYTE_WIDTH,
            (TRANSACTION_NONCE_OFFSET + TRANSACTION_NONCE_LENGTH) / TRYTE_WIDTH
        ),
    }
}

/**
 * Converts a list of transaction trytes into list of transaction objects.
 * Accepts a list of hashes and returns a mapper. In cases hashes are given,
 * the mapper function map them to converted objects.
 *
 * @method asTransactionObjects
 *
 * @param {Hash[]} [hashes] - Optional list of known hashes.
 * Known hashes are directly mapped to transaction objects,
 * otherwise all hashes are being recalculated.
 *
 * @return {Function} {@link #module_transaction.transactionObjectsMapper `transactionObjectsMapper`}
 */
export const asTransactionObjects = (hashes?: ReadonlyArray<Hash>) => {
    /**
     * Maps the list of given hashes to a list of converted transaction objects.
     *
     * @method transactionObjectsMapper
     *
     * @param {Trytes[]} trytes - List of transaction trytes to convert
     *
     * @return {Transaction[]} List of transaction objects with hashes
     */
    return function transactionObjectsMapper(trytes: ReadonlyArray<Trytes>) {
        return trytes.map((tryteString, i) => asTransactionObject(tryteString, hashes![i]))
    }
}

export const asFinalTransactionTrytes = (transactions: ReadonlyArray<Transaction>) =>
    [...asTransactionTrytes(transactions)].reverse()

export const transactionObject = (trytes: Trytes): Transaction => {
    /* tslint:disable-next-line:no-console */
    console.warn('`transactionObject` has been renamed to `asTransactionObject`')

    return asTransactionObject(trytes)
}

export const transactionTrytes = (transaction: Transaction): Trytes => {
    /* tslint:disable-next-line:no-console */
    console.warn('`transactionTrytes` has been renamed to `asTransactionTrytes`')

    return asTransactionTrytes(transaction)
}
