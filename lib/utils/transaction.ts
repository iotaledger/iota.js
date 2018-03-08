import { Hash, Transaction, Trytes } from '../api/types'
import { Converter, Curl } from '../crypto'
import * as errors from '../errors'
import { asArray, pad } from './'

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
    const trytes = asArray(transactions).map(transaction =>
        [
            transaction.signatureMessageFragment,
            transaction.address,
            pad(27)(Converter.trytes(Converter.trits(transaction.value))),
            pad(27)(transaction.obsoleteTag),
            pad(9)(Converter.trytes(Converter.trits(transaction.timestamp))),
            pad(9)(Converter.trytes(Converter.trits(transaction.currentIndex))),
            pad(9)(Converter.trytes(Converter.trits(transaction.lastIndex))),
            transaction.bundle,
            transaction.trunkTransaction,
            transaction.branchTransaction,
            pad(27)(transaction.tag || transaction.obsoleteTag),
            pad(9)(Converter.trytes(Converter.trits(transaction.attachmentTimestamp))),
            pad(9)(Converter.trytes(Converter.trits(transaction.attachmentTimestampLowerBound))),
            pad(9)(Converter.trytes(Converter.trits(transaction.attachmentTimestampUpperBound))),
            transaction.nonce,
        ].join('')
    )

    return Array.isArray(transactions) ? trytes : trytes[0]
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
    curl.squeeze(hashTrits, 0, 243)

    return Converter.trytes(hashTrits)
}

/**
 *   Converts transaction trytes of 2673 trytes into a transaction object.
 *
 *   @method transactionObject
 *   @param {string} trytes
 *   @returns {String} transactionObject
 **/
export const asTransactionObject = (trytes: Trytes, hash?: Hash): Transaction => {
    if (!trytes) {
        throw new Error(errors.INVALID_TRYTES)
    }

    // validity check
    for (let i = 2279; i < 2295; i++) {
        if (trytes.charAt(i) !== '9') {
            throw new Error(errors.INVALID_TRYTES)
        }
    }

    const transactionTrits = Converter.trits(trytes)

    return {
        hash: hash || transactionHash(transactionTrits),
        signatureMessageFragment: trytes.slice(0, 2187),
        address: trytes.slice(2187, 2268),
        value: Converter.value(transactionTrits.slice(6804, 6837)),
        obsoleteTag: trytes.slice(2295, 2322),
        timestamp: Converter.value(transactionTrits.slice(6966, 6993)),
        currentIndex: Converter.value(transactionTrits.slice(6993, 7020)),
        lastIndex: Converter.value(transactionTrits.slice(7020, 7047)),
        bundle: trytes.slice(2349, 2430),
        trunkTransaction: trytes.slice(2430, 2511),
        branchTransaction: trytes.slice(2511, 2592),
        tag: trytes.slice(2592, 2619),
        attachmentTimestamp: Converter.value(transactionTrits.slice(7857, 7884)),
        attachmentTimestampLowerBound: Converter.value(transactionTrits.slice(7884, 7911)),
        attachmentTimestampUpperBound: Converter.value(transactionTrits.slice(7911, 7938)),
        nonce: trytes.slice(2646, 2673),
    }
}

export const asTransactionObjects = (hashes: Hash[]) => (trytes: Trytes[]) =>
    trytes.map((tryteString, i) => asTransactionObject(tryteString, hashes[i]))

export const asFinalTransactionTrytes = (transactions: Transaction[]) =>
    transactions.map(transaction => asTransactionTrytes(transaction)).reverse()

/* Legacy conversion methods - Deprecated */
// export const transactionObject = (trytes: Trytes): Transaction => asTransactionObject(trytes)
// export const transactionTrytes = (transaction: Transaction): Trytes => asTransactionTrytes(transaction)
