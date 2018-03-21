import { Hash, Transaction, Trytes } from '../api/types'
import { Curl, trits, trytes, value } from '../crypto'
import * as errors from '../errors'
import { asArray, padTrits, padTrytes } from './'

/**
 *   Converts a transaction object into trytes
 *
 *   @method transactionTrytes
 *   @param {object} transactionTrytes
 *   @returns {String} trytes
 **/
export function asTransactionTrytes(transactions: Transaction): Trytes
export function asTransactionTrytes(transactions: Transaction[]): Trytes[]
export function asTransactionTrytes(transactions: Transaction | Transaction[]) {
    const txTrytes = asArray(transactions).map(transaction =>
        [
            transaction.signatureMessageFragment,
            transaction.address,
            trytes(padTrits(81)(trits(transaction.value))),
            padTrytes(27)(transaction.obsoleteTag),
            trytes(padTrits(27)(trits(transaction.timestamp))),
            trytes(padTrits(27)(trits(transaction.currentIndex))),
            trytes(padTrits(27)(trits(transaction.lastIndex))),
            transaction.bundle,
            transaction.trunkTransaction,
            transaction.branchTransaction,
            padTrytes(27)(transaction.tag || transaction.obsoleteTag),
            trytes(padTrits(27)(trits(transaction.attachmentTimestamp))),
            trytes(padTrits(27)(trits(transaction.attachmentTimestampLowerBound))),
            trytes(padTrits(27)(trits(transaction.attachmentTimestampUpperBound))),
            transaction.nonce,
        ].join('')
    )

    return Array.isArray(transactions) ? txTrytes : txTrytes[0]
}

/**
 *   Calculates the transaction hash out of 8019 transaction trits.
 *
 *   @method transactionHash
 *   @param {Int8Array} transactionTrits
 *   @returns {Transaction} transactionObject
 **/
export const transactionHash = (transactionTrits: Int8Array): Hash => {
    const hashTrits: Int8Array = new Int8Array(Curl.HASH_LENGTH)
    const curl = new Curl()

    // generate the correct transaction hash
    curl.initialize()
    curl.absorb(transactionTrits, 0, transactionTrits.length)
    curl.squeeze(hashTrits, 0, Curl.HASH_LENGTH)

    return trytes(hashTrits)
}

/**
 *   Converts transaction trytes of 2673 trytes into a transaction object.
 *
 *   @method transactionObject
 *   @param {string} trytes
 *   @returns {String} transactionObject
 **/
export const asTransactionObject = (txTrytes: Trytes, hash?: Hash): Transaction => {
    if (!trytes) {
        throw new Error(errors.INVALID_TRYTES)
    }

    // validity check
    for (let i = 2279; i < 2295; i++) {
        if (txTrytes.charAt(i) !== '9') {
            throw new Error(errors.INVALID_TRYTES)
        }
    }

    const transactionTrits = trits(txTrytes)

    return {
        hash: hash || transactionHash(transactionTrits),
        signatureMessageFragment: txTrytes.slice(0, 2187),
        address: txTrytes.slice(2187, 2268),
        value: value(transactionTrits.slice(6804, 6837)),
        obsoleteTag: txTrytes.slice(2295, 2322),
        timestamp: value(transactionTrits.slice(6966, 6993)),
        currentIndex: value(transactionTrits.slice(6993, 7020)),
        lastIndex: value(transactionTrits.slice(7020, 7047)),
        bundle: txTrytes.slice(2349, 2430),
        trunkTransaction: txTrytes.slice(2430, 2511),
        branchTransaction: txTrytes.slice(2511, 2592),
        tag: txTrytes.slice(2592, 2619),
        attachmentTimestamp: value(transactionTrits.slice(7857, 7884)),
        attachmentTimestampLowerBound: value(transactionTrits.slice(7884, 7911)),
        attachmentTimestampUpperBound: value(transactionTrits.slice(7911, 7938)),
        nonce: txTrytes.slice(2646, 2673),
    }
}

export const asTransactionObjects = (hashes?: Hash[]) => (txTrytes: Trytes[]) =>
    txTrytes.map((tryteString, i) => asTransactionObject(tryteString, hashes ? hashes[i] : undefined))

export const asFinalTransactionTrytes = (transactions: Transaction[]) =>
    transactions.map(transaction => asTransactionTrytes(transaction)).reverse()

/* Legacy conversion methods - Deprecated */
export const transactionObject = (txTrytes: Trytes): Transaction => asTransactionObject(txTrytes)
export const transactionTrytes = (transaction: Transaction): Trytes => asTransactionTrytes(transaction)
