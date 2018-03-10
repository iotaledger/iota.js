import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { attachedTrytesArrayValidator, validate } from '../../utils'
import { BaseCommand, Callback, IRICommand, Provider, Trytes } from '../types'

export interface StoreTransactionsCommand extends BaseCommand {
    command: IRICommand.STORE_TRANSACTIONS
    trytes: string[]
}

export type StoreTransactionsResponse = void

export const validateStoreTransactions = (trytes: Trytes[]) => validate(attachedTrytesArrayValidator(trytes))

/**
 *   @method storeTransactions
 *   @param {array} trytes
 *   @returns {function} callback
 *   @returns {object} success
 **/
export const createStoreTransactions = (provider: Provider) =>
    (trytes: Trytes[], callback?: Callback<void>): Promise<void> =>
        Promise.resolve(validateStoreTransactions(trytes))
            .then(() =>
                provider.sendCommand<StoreTransactionsCommand, StoreTransactionsResponse>({
                    command: IRICommand.STORE_TRANSACTIONS,
                    trytes,
                })
            )
            .asCallback(callback)
