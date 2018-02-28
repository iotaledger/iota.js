import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { attachedTrytesArrayValidator, validate } from '../../utils'
import { BaseCommand, Callback, IRICommand, Trytes } from '../types'
import { sendCommand } from './sendCommand'

export interface StoreTransactionsCommand extends BaseCommand {
    command: IRICommand.STORE_TRANSACTIONS
    trytes: string[]
}

export type StoreTransactionsResponse = void

export const validateStoreTransactions = (trytes: Trytes[]) => validate([attachedTrytesArrayValidator(trytes)])

/**
 *   @method storeTransactions
 *   @param {array} trytes
 *   @returns {function} callback
 *   @returns {object} success
 **/
export const storeTransactions = (trytes: Trytes[], callback?: Callback<void>): Promise<void> =>
    Promise.try(() => validateStoreTransactions(trytes))
        .then(() =>
            sendCommand<StoreTransactionsCommand, StoreTransactionsResponse>({
                command: IRICommand.STORE_TRANSACTIONS,
                trytes,
            })
        )
        .asCallback(callback)
