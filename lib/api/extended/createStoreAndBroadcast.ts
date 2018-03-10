import * as Promise from 'bluebird'
import { createBroadcastTransactions, createStoreTransactions } from '../core'
import { Callback, Provider } from '../types'

/**
 *   Broadcasts and stores transaction trytes
 *
 *   @method storeAndBroadcast
 *   @param {array} trytes
 *   @returns {function} callback
 *   @returns {object} success
 **/
export const createStoreAndBroadcast = (provider: Provider) => {
    const storeTransactions = createStoreTransactions(provider)
    const broadcastTransactions = createBroadcastTransactions(provider)

    return (trytes: string[], callback?: Callback<void>): Promise<void> =>
        storeTransactions(trytes)
            .then(() => broadcastTransactions(trytes))
            .asCallback(callback)
}
