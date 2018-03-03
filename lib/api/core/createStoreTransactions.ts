import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { attachedTrytesArrayValidator, validate } from '../../utils'
import { BaseCommand, Callback, IRICommand, Settings, Trytes } from '../types'
import { sendCommand } from './sendCommand'

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
export const createStoreTransactions = (settings: Settings) => {
    let { provider } = settings

    const storeTransactions = (trytes: Trytes[], callback?: Callback<void>): Promise<void> =>
        Promise.resolve(validateStoreTransactions(trytes))
            .then(() =>
                sendCommand<StoreTransactionsCommand, StoreTransactionsResponse>(provider, {
                    command: IRICommand.STORE_TRANSACTIONS,
                    trytes,
                })
            )
            .asCallback(callback)

    const setSettings = (newSettings: Settings) => {
        provider = newSettings.provider
    }

    // tslint:disable-next-line prefer-object-spread
    return Object.assign(storeTransactions, { setSettings })
}
