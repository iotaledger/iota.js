import * as Promise from 'bluebird'
import { createFindTransactions, FindTransactionsQuery } from '../core'
import { Callback, Settings, Transaction } from '../types'
import { createGetTransactionObjects } from './index'

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
export const createFindTransactionObjects = (settings: Settings) => {
    const findTransactions = createFindTransactions(settings)
    const getTransactionsObjects = createGetTransactionObjects(settings)

    const findTransactionObjects = (
        query: FindTransactionsQuery,
        callback?: Callback<Transaction[]>
    ): Promise<Transaction[]> =>
        findTransactions(query)
            .then(getTransactionsObjects)
            .asCallback(callback)

    const setSettings = (newSettings: Settings) => {
        settings = newSettings
    }

    // tslint:disable-next-line prefer-object-spread
    return Object.assign(findTransactionObjects, { setSettings })
}
