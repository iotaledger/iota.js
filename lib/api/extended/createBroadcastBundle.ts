import * as Promise from 'bluebird'
import * as erros from '../../errors'
import { asFinalTransactionTrytes, hashValidator, validate } from '../../utils'
import { createBroadcastTransactions } from '../core'
import { Callback, Provider, Transaction } from '../types'
import { createGetBundle } from './index'

/**
 *   Re-broadcasts a transfer by tail transaction
 *
 *   @method broadcastBundle
 *   @param {string} tailTransaction
 *   @param {function} [callback]
 *   @returns {object} Transaction objects
 **/
export const createBroadcastBundle = (provider: Provider) => {
    const broadcastTransactions = createBroadcastTransactions(provider)
    const getBundle = createGetBundle(provider)

    const broadcastBundle = (tailTransactionHash: string, callback?: Callback<void>): Promise<void> =>
        Promise.resolve(validate(hashValidator(tailTransactionHash)))
            .then(() => getBundle(tailTransactionHash))
            .then(asFinalTransactionTrytes)
            .then(broadcastTransactions)
            .asCallback(callback)
}
