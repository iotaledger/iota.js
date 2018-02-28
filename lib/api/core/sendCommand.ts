import * as Promise from 'bluebird'
import { API, BaseCommand, BatchableCommand, batchableKeys, Callback, IRICommand, Settings } from '../types'

import { defaultSettings } from '../'
import { batchedSend, send } from '../../utils'

const BATCH_SIZE = 1000

/**
 *   General function that makes an HTTP request to the local node
 *
 *   @method sendCommand
 *   @param {object} command
 *   @param {function} callback
 *   @returns {object} success
 **/
export const sendCommand = <C extends BaseCommand, R>(command: C): Promise<R> =>
    Promise.try(() => {
        const keysToBatch: string[] = getKeysToBatch<C, keyof C[]>(command, BATCH_SIZE)

        if (keysToBatch.length) {
            return batchedSend(command, keysToBatch, BATCH_SIZE)
        }

        return send(command)
    })

export const getKeysToBatch = <C extends BaseCommand, K = keyof C[]>(command: C, batchSize: number = BATCH_SIZE) => {
    if (
        command.command === IRICommand.FIND_TRANSACTIONS ||
        command.command === IRICommand.GET_BALANCES ||
        // command.command === IRICommand.GET_INCLUSION_STATES ||
        command.command === IRICommand.GET_TRYTES
    ) {
        return Object.keys(command).filter(key => {
            const field = command[key as keyof C]

            return batchableKeys[command.command].indexOf(key) > -1 && Array.isArray(field) && field.length > BATCH_SIZE
        })
    }
    return []
}
