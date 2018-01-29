import errors from '../../errors'
import { isArrayOfAttachedTrytes } from '../../utils'

import { API, BaseCommand, Callback, IRICommand } from '../types'

export interface StoreTransactionsCommand extends BaseCommand {
    command: IRICommand.STORE_TRANSACTIONS
    trytes: string[]
}

export type StoreTransactionsResponse = void

import sendCommand from './sendCommand'

/**
 *   @method storeTransactions
 *   @param {array} trytes
 *   @returns {function} callback
 *   @returns {object} success
 **/
export default function storeTransactions(
    this: API,
    trytes: string[], 
    callback?: Callback<void>): Promise<void> {

    const promise: Promise<void> = new Promise((resolve, reject) => {
        if (!isArrayOfAttachedTrytes(trytes)) {
            reject(new Error(errors.INVALID_ATTACHED_TRYTES))
        }

        resolve(
            this.sendCommand(
                {
                    command: IRICommand.STORE_TRANSACTIONS,
                    trytes,
                }
            )
        )
    })

    if (typeof callback === 'function') {
        promise.then(callback.bind(null, null), callback) 
    }

    return promise
}
