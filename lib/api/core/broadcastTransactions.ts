import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { attachedTrytesArrayValidator, validate } from '../../utils'
import { BaseCommand, Callback, IRICommand, Trytes } from '../types'
import { sendCommand } from './sendCommand'

export interface BroadcastTransactionsCommand extends BaseCommand {
    command: IRICommand.BROADCAST_TRANSACTIONS
    trytes: Trytes[]
}

export type BroadcastTransactionsResponse = void

export const validateBroadcastTransactions = (trytes: Trytes[]) => validate([attachedTrytesArrayValidator(trytes)])

/**
 *   @method broadcastTransactions
 *   @param {array} trytes
 *   @returns {function} callback
 *   @returns {object} success
 **/
export const broadcastTransactions = (trytes: Trytes[], callback?: Callback<void>): Promise<void> =>
    Promise.try(() => validateBroadcastTransactions(trytes))
        .then(() =>
            sendCommand<BroadcastTransactionsCommand, BroadcastTransactionsResponse>({
                command: IRICommand.BROADCAST_TRANSACTIONS,
                trytes,
            })
        )
        .asCallback(callback)
