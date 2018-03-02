import * as Promise from 'bluebird'
import { broadcastTransactions, storeTransactions } from '../core'
import { Callback } from '../types'

/**
 *   Broadcasts and stores transaction trytes
 *
 *   @method storeAndBroadcast
 *   @param {array} trytes
 *   @returns {function} callback
 *   @returns {object} success
 **/
export const storeAndBroadcast = (
    trytes: string[],
    callback?: Callback<void>
): Promise<void> =>
      storeTransactions(trytes)
      .then(() => broadcastTransactions(trytes))
      .asCallback(callback)
