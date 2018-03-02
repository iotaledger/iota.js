import * as Promise from 'bluebird'
import { findTransactions, FindTransactionsQuery } from '../core'
import { Callback, Transaction } from '../types'
import { getTransactionObjects } from './getTransactionObjects'

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
export const findTransactionObjects = (
    query: FindTransactionsQuery,
    callback?: Callback<Transaction[]>
): Promise<Transaction[]> =>
    findTransactions(query)
        .then(getTransactionObjects)
        .asCallback(callback)
