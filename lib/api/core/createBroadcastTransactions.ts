import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { attachedTrytesArrayValidator, validate } from '../../utils'
import { BaseCommand, Callback, IRICommand, Provider, Trytes } from '../types'

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
export const createBroadcastTransactions = (provider: Provider) =>
    (trytes: Trytes[], callback?: Callback<void>): Promise<void> =>
        Promise.resolve(validateBroadcastTransactions(trytes))
            .then(() =>
                provider.sendCommand<BroadcastTransactionsCommand, BroadcastTransactionsResponse>({
                    command: IRICommand.BROADCAST_TRANSACTIONS,
                    trytes,
                })
            )
            .then(() => undefined)
            .asCallback(callback)
