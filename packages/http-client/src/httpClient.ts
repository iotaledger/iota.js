/** @module http-client */

import * as Promise from 'bluebird'
import {
    BaseCommand,
    FindTransactionsCommand,
    GetBalancesCommand,
    GetInclusionStatesCommand,
    GetTrytesCommand,
    IRICommand,
    Provider,
} from '../../types'
import { batchedSend, send } from './request'
import { getSettingsWithDefaults, Settings } from './settings'

const BATCH_SIZE = 1000

export interface MapsToArrays {
    [key: string]: any[]
}

/* Known batchable commands */
export type BatchableCommand<C> = C &
    MapsToArrays &
    (FindTransactionsCommand | GetBalancesCommand | GetInclusionStatesCommand | GetTrytesCommand)

export interface BatchableKeys {
    readonly [key: string]: string[]
}

export type BatchableKey = 'addresses' | 'approvees' | 'bundles' | 'tags' | 'tips' | 'transactions' | 'hashes'

/* Batchable keys for each command */
export const batchableKeys: BatchableKeys = {
    [IRICommand.FIND_TRANSACTIONS]: ['addresses', 'approvees', 'bundles', 'tags'],
    [IRICommand.GET_BALANCES]: ['addresses'],
    [IRICommand.GET_INCLUSION_STATES]: ['tips', 'transactions'],
    [IRICommand.GET_TRYTES]: ['hashes'],
}

export const isBatchableCommand = <C>(command: BaseCommand): command is BatchableCommand<C> =>
    command.command === IRICommand.FIND_TRANSACTIONS ||
    command.command === IRICommand.GET_BALANCES ||
    command.command === IRICommand.GET_INCLUSION_STATES ||
    command.command === IRICommand.GET_TRYTES

export const getKeysToBatch = <C>(
    command: BatchableCommand<C>,
    batchSize: number = BATCH_SIZE
): ReadonlyArray<string> =>
    Object.keys(command).filter(
        key =>
            batchableKeys[command.command].indexOf(key) > -1 &&
            Array.isArray(command[key]) &&
            command[key].length > batchSize
    )

/**
 * Create an http client to access IRI http API.
 *
 * @method createHttpClient
 *
 * @param {object} [settings={}]
 * @param {string} [settings.provider=http://localhost:14265] Uri of IRI node
 * @param {string | number} [settings.apiVersion=1] - IOTA Api version to be sent as `X-IOTA-API-Version` header.
 * @param {number} [settings.requestBatchSize=1000] - Number of search values per request.
 * @return Object
 */
export const createHttpClient = (settings?: Partial<Settings>): Provider => {
    let currentSettings = getSettingsWithDefaults({ ...settings })
    return {
        /**
         * @member send
         *
         * @param {object} command
         *
         * @return {object} response
         */
        send: <C extends BaseCommand, R>(command: Readonly<C>): Promise<Readonly<R>> =>
            Promise.try(() => {
                const { provider, user, password, requestBatchSize, apiVersion } = currentSettings

                if (isBatchableCommand(command)) {
                    const keysToBatch = getKeysToBatch(command, requestBatchSize)

                    if (keysToBatch.length) {
                        return batchedSend<C>(
                            { command, uri: provider, user, password, apiVersion },
                            keysToBatch,
                            requestBatchSize
                        )
                    }
                }

                return send<C>({ command, uri: provider, user, password, apiVersion })
            }),

        /**
         * @member setSettings
         *
         * @param {object} [settings={}]
         * @param {string} [settings.provider=http://localhost:14265] Uri of IRI node
         * @param {string | number} [settings.apiVersion=1] - IOTA Api version to be sent as `X-IOTA-API-Version` header.
         * @param {number} [settings.requestBatchSize=1000] - Number of search values per request.
         */
        setSettings: (newSettings?: Partial<Settings>): void => {
            currentSettings = getSettingsWithDefaults({ ...currentSettings, ...newSettings })
        },
    }
}
