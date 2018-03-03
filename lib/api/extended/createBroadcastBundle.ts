import * as Promise from 'bluebird'
import * as erros from '../../errors'
import { asFinalTransactionTrytes, hashValidator, validate } from '../../utils'
import { createBroadcastTransactions } from '../core'
import { Callback, Settings, Transaction } from '../types'
import { createGetBundle } from './index'

/**
 *   Re-broadcasts a transfer by tail transaction
 *
 *   @method broadcastBundle
 *   @param {string} tailTransaction
 *   @param {function} [callback]
 *   @returns {object} Transaction objects
 **/
export const createBroadcastBundle = (settings: Settings) => {
    const broadcastTransactions = createBroadcastTransactions(settings)
    const getBundle = createGetBundle(settings)

    const broadcastBundle = (tailTransactionHash: string, callback?: Callback<void>): Promise<void> =>
        Promise.resolve(validate(hashValidator(tailTransactionHash)))
            .then(() => getBundle(tailTransactionHash))
            .then(asFinalTransactionTrytes)
            .then(broadcastTransactions)
            .asCallback(callback)

    const setSettings = (newSettings: Settings) => {
        settings = newSettings
    }

    // tslint:disable-next-line prefer-object-spread
    return Object.assign(broadcastBundle, { setSettings })
}
