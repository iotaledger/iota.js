import { API, Callback, FindTransactionsQuery, Transaction } from '../types'

/**
 *   Wrapper function for findTransactions, getTrytes and transactionObjects
 *   Returns the transactionObject of a transaction hash. The input can be a valid
 *   findTransactions input
 *
 *   @method getTransactionsObjects
 *   @param {object} input
 *   @returns {function} callback
 *   @returns {object} success
 **/
export default function findTransactionObjects(
    this: API,    
    query: FindTransactionsQuery,
    callback: Callback<Transaction[]>
): Promise<Transaction[]> {
    // Find transaction hashes
    const promise: Promise<Transaction[]> = this.findTransactions(query)

        // Get the full transaction objects 
        .then(hashes => this.getTransactionObjects(hashes))

    if (typeof callback === 'function') {
        promise.then(callback.bind(null, null), callback)
    }

    return promise
}
