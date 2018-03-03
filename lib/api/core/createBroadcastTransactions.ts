import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { attachedTrytesArrayValidator, validate } from '../../utils'
import { BaseCommand, Callback, IRICommand, Settings, Trytes } from '../types'
import { getKeysToBatch, sendCommand } from './sendCommand'

export interface BroadcastTransactionsCommand extends BaseCommand {
    command: IRICommand.BROADCAST_TRANSACTIONS
    trytes: Trytes[]
}

export type BroadcastTransactionsResponse = void

export const validateBroadcastTransactions = (trytes: Trytes[]) => validate(attachedTrytesArrayValidator(trytes))

/**
 *   @method broadcastTransactions
 *   @param {array} trytes
 *   @returns {function} callback
 *   @returns {object} success
 **/
export const createBroadcastTransactions = (settings: Settings) => {
    let { provider } = settings

    const broadcastTransactions = (trytes: Trytes[], callback?: Callback<void>): Promise<void> =>
        Promise.resolve(validateBroadcastTransactions(trytes))
            .then(() =>
                sendCommand<BroadcastTransactionsCommand, BroadcastTransactionsResponse>(provider, {
                    command: IRICommand.BROADCAST_TRANSACTIONS,
                    trytes,
                })
            )
            .asCallback(callback)

    const setSettings = (newSettings: Settings) => {
        provider = newSettings.provider
    }

    // tslint:disable-next-line prefer-object-spread
    return Object.assign(broadcastTransactions, { setSettings })
}
