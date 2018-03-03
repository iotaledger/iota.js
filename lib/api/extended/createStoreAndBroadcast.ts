import * as Promise from 'bluebird'
import { createBroadcastTransactions, createStoreTransactions } from '../core'
import { Callback, Settings } from '../types'

/**
 *   Broadcasts and stores transaction trytes
 *
 *   @method storeAndBroadcast
 *   @param {array} trytes
 *   @returns {function} callback
 *   @returns {object} success
 **/
export const createStoreAndBroadcast = (settings: Settings) => {
    const storeTransactions = createStoreTransactions(settings)
    const broadcastTransactions = createBroadcastTransactions(settings)

    const storeAndBroadcast = (trytes: string[], callback?: Callback<void>): Promise<void> =>
        storeTransactions(trytes)
            .then(() => broadcastTransactions(trytes))
            .asCallback(callback)

    const setSettings = (newSettings: Settings) => {
        settings = newSettings
    }

    // tslint:disable-next-line prefer-object-spread
    return Object.assign(storeAndBroadcast, { setSettings })
}
