import * as Promise from 'bluebird'
import { batchedSend, send } from '../../utils'
import {
    BaseCommand,
    BatchableCommand,
    batchableKeys,
    Callback,
    IRICommand,
    isBatchableCommand,
    Settings,
} from '../types'

const BATCH_SIZE = 1000

/**
 *   General function that makes an HTTP request to the local node
 *
 *   @method sendCommand
 *   @param {object} command
 *   @param {function} callback
 *   @returns {object} success
 **/
export const sendCommand = <C extends BaseCommand, R>(provider: string, command: C): Promise<R> =>
    Promise.try(() => {
        if (isBatchableCommand(command)) {
            const keysToBatch: string[] = getKeysToBatch(command, BATCH_SIZE)

            if (keysToBatch.length) {
                return batchedSend(provider, command, keysToBatch, BATCH_SIZE)
            }
        }

        return send(provider, command)
    })

export const getKeysToBatch = <C extends BatchableCommand, K = keyof C[]>(
    command: C,
    batchSize: number = BATCH_SIZE
) => {
    return Object.keys(command).filter((key: keyof C) => {
        const field = command[key]

        return batchableKeys[command.command].indexOf(key) > -1 && Array.isArray(field) && field.length > BATCH_SIZE
    })
}
