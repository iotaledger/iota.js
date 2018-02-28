import * as errors from '../../errors'
import { isHashArray, transactionObject } from '../../utils'

import { API, Callback, Transaction } from '../types'

/**
 *   Gets the transaction objects, given an array of transaction hashes.
 *
 *   @method getTransactionsObjects
 *   @param {array} hashes - Array of transaction hashes
 *   @param {function} [callback] - Optional callback
 *   @returns {promise<object[]>}
 */
export default function getTransactionObjects(
    this: API,
    hashes: string[],
    callback?: Callback<Transaction[]>
): Promise<Transaction[]> {
    const promise: Promise<Transaction[]> = new Promise((resolve, reject) => {
        if (!isHashArray(hashes)) {
            return reject(errors.INVALID_INPUTS)
        }

        // Get the transaction trytes and map to transaction objects
        resolve(
            this.getTrytes(hashes).then((trytes: string[]) =>
                trytes.map((transactionTrytes: string) => transactionObject(transactionTrytes))
            )
        )
    })

    if (typeof callback === 'function') {
        promise.then(callback.bind(null, null), callback)
    }

    return promise
}
