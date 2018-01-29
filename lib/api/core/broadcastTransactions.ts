import errors from '../../errors'
import { isArrayOfAttachedTrytes } from '../../utils'

import { API, BaseCommand, Callback, IRICommand } from '../types'

export interface BroadcastTransactionsCommand extends BaseCommand {
    command: IRICommand.BROADCAST_TRANSACTIONS
    trytes: string[]
}

export type BroadcastTransactionsResponse = void

/**
 *   @method broadcastTransactions
 *   @param {array} trytes
 *   @returns {function} callback
 *   @returns {object} success
 **/
export default function broadcastTransactions(
    this: API, 
    trytes: string[], 
    callback?: Callback<void>): Promise<void> {

    const promise: Promise<void> = new Promise((resolve, reject) => {
        if (!isArrayOfAttachedTrytes(trytes)) {
            return reject(errors.INVALID_ATTACHED_TRYTES)
        }

        resolve(
            this.sendCommand(
                {
                    command: IRICommand.BROADCAST_TRANSACTIONS,
                    trytes
                }
            )
        )
    })

    // Invoke callback
    if (typeof callback === 'function') {
        promise.then(callback.bind(null, null), callback)
    }

    return promise
}
