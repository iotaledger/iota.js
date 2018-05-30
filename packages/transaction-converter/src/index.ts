import { tritsToTrytes, trytesToTrits, value } from '@iota/converter'
import Curl from '@iota/curl'
import { padTrits, padTrytes } from '@iota/pad'
import { errors, isTrytesOfExactLength } from '@iota/validators'
import { asArray, Hash, Transaction, Trytes } from '../../types'

/**
 * Converts a transaction object or a list of those into transaction trytes.
 *
 * @method asTransactionTrytes
 * 
 * @param {Transaction | Transaction[]} transactions - Transaction object(s)
 * 
 * @returns {Trytes | Trytes[]} - Transaction trytes
 */
export function asTransactionTrytes(transactions: Transaction): Trytes
export function asTransactionTrytes(transactions: Transaction[]): Trytes[]
export function asTransactionTrytes(transactions: Transaction | Transaction[]) {
    const txTrytes = asArray(transactions).map(transaction =>
        [
            transaction.signatureMessageFragment,
            transaction.address,
            tritsToTrytes(padTrits(81)(trytesToTrits(transaction.value))),
            padTrytes(27)(transaction.obsoleteTag),
            tritsToTrytes(padTrits(27)(trytesToTrits(transaction.timestamp))),
            tritsToTrytes(padTrits(27)(trytesToTrits(transaction.currentIndex))),
            tritsToTrytes(padTrits(27)(trytesToTrits(transaction.lastIndex))),
            transaction.bundle,
            transaction.trunkTransaction,
            transaction.branchTransaction,
            padTrytes(27)(transaction.tag || transaction.obsoleteTag),
            tritsToTrytes(padTrits(27)(trytesToTrits(transaction.attachmentTimestamp))),
            tritsToTrytes(padTrits(27)(trytesToTrits(transaction.attachmentTimestampLowerBound))),
            tritsToTrytes(padTrits(27)(trytesToTrits(transaction.attachmentTimestampUpperBound))),
            transaction.nonce,
        ].join('')
    )

    return Array.isArray(transactions) ? txTrytes : txTrytes[0]
}

/**
 * Calculates the transaction hash out of 8019 transaction trits.
 *
 * @method transactionHash
 * 
 * @param {Int8Array} transactionTrits - Int8Array of 8019 transaction trits
 * 
 * @return {Hash} - transactionObject
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
 * Converts transaction trytes of 2673 trytes into a transaction object.
 *
 * @method asTransactionObject
 *
 * @param {Trytes} trytes - Transaction trytes
 *
 * @return {Transaction} - Transaction object
 */
export const asTransactionObject = (trytes: Trytes, hash?: Hash): Transaction => {
    if (!isTrytesOfExactLength(trytes, 2673)) {
        throw new Error(errors.INVALID_TRYTES)
    }

    for (let i = 2279; i < 2295; i++) {
        if (trytes.charAt(i) !== '9') {
            throw new Error(errors.INVALID_TRYTES)
        }
    }

    const trits = trytesToTrits(trytes)

    return {
        hash: hash || transactionHash(trits),
        signatureMessageFragment: trytes.slice(0, 2187),
        address: trytes.slice(2187, 2268),
        value: value(trits.slice(6804, 6837)),
        obsoleteTag: trytes.slice(2295, 2322),
        timestamp: value(trits.slice(6966, 6993)),
        currentIndex: value(trits.slice(6993, 7020)),
        lastIndex: value(trits.slice(7020, 7047)),
        bundle: trytes.slice(2349, 2430),
        trunkTransaction: trytes.slice(2430, 2511),
        branchTransaction: trytes.slice(2511, 2592),
        tag: trytes.slice(2592, 2619),
        attachmentTimestamp: value(trits.slice(7857, 7884)),
        attachmentTimestampLowerBound: value(trits.slice(7884, 7911)),
        attachmentTimestampUpperBound: value(trits.slice(7911, 7938)),
        nonce: trytes.slice(2646, 2673),
    }
}

/**
 * Converts a list of transaction trytes into list of transaction objects.
 * It's a curried method which accepts a list of hashes and returns a mapper.
 * In cases hashes are given, the mapper function will apply them to each converted object.
 *
 * @method asTransactionObjects
 *
 * @param {Hash[]} [hashes] - Optional list of known hashes. Known hashes are directly mapped
 * to transaction objects, otherwise all hashes are being recalculated.
 * 
 * @return {Function} - Returns a {@link transactionObjectsMapper} 
 */
export const asTransactionObjects = (hashes?: Hash[]) =>

    /**
     * @method transactionObjectsMapper
     * 
     * @param {Trytes[]} trytes - List of transaction trytes
     * 
     * @return {Transaction[]} - List of transaction objects
     */
    (trytes: Trytes[]) =>
        trytes.map((tryteString, i) => asTransactionObject(tryteString, hashes ? hashes[i] : undefined))

export const asFinalTransactionTrytes = (transactions: Transaction[]) =>
    transactions.map(transaction => asTransactionTrytes(transaction)).reverse()

/**
 * @method transactionObject
 * 
 * @deprecated
 */
export const transactionObject = (trytes: Trytes): Transaction => asTransactionObject(trytes)

/**
 * @method transactionTrytes
 * 
 * @deprecated
 */
export const transactionTrytes = (transaction: Transaction): Trytes => asTransactionTrytes(transaction)
