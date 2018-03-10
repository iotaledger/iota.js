import * as Promise from 'bluebird'
import { createFindTransactions, FindTransactionsQuery } from '../core'
import { Callback, Provider, Transaction } from '../types'
import { createGetTransactionObjects } from './'

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
export const createFindTransactionObjects = (provider: Provider) => {
    const findTransactions = createFindTransactions(provider)
    const getTransactionsObjects = createGetTransactionObjects(provider)

    return (
        query: FindTransactionsQuery,
        callback?: Callback<Transaction[]>
    ): Promise<Transaction[]> =>
        findTransactions(query)
            .then(getTransactionsObjects)
            .asCallback(callback)
}
