import * as Promise from 'bluebird'
import {
    BaseCommand,
    BatchableCommand,
    batchableKeys,
    Callback,
    IRICommand,
    isBatchableCommand,
    Maybe,
    Provider,
    Settings,
    Transaction
} from '../api/types'
import * as errors from '../errors'
import { batchedSend, send } from './'

const BATCH_SIZE = 1000

export const getKeysToBatch = <C extends BatchableCommand, K = keyof C[]>(
    command: C,
    batchSize: number = BATCH_SIZE
) => Object.keys(command).filter((key: keyof C) =>
    batchableKeys[command.command].indexOf(key) > -1 &&
    Array.isArray(command[key]) &&
    command[key].length > BATCH_SIZE
)

export const provider = (settings: Partial<Settings>): Provider => ({
    sendCommand: <C extends BaseCommand, R>(
        command: C,
        callback?: Callback<R>
    ): Promise<R> => Promise.try(() => {
        if (isBatchableCommand(command)) {
            const keysToBatch: string[] = getKeysToBatch(command, BATCH_SIZE)

            if (keysToBatch.length) {
                return batchedSend(settings.provider || '', command, keysToBatch, BATCH_SIZE)
            }
        }

        return send(settings.provider || '', command)
    }),
    setSettings: (newSettings: Settings): void => {
        settings = newSettings
    }
})
