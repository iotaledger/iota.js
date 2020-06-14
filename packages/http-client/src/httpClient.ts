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
 * This method creates an HTTP client that you can use to send requests to the [IRI API endpoints](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference).
 * 
 * ## Related methods
 * 
 * To send requests to the IRI node, use the [`send()`]{@link #module_http-client.send} method.
 * 
 * @method createHttpClient
 * 
 * @summary Creates an HTTP client to access the IRI API.
 *  
 * @memberof module:http-client
 *
 * @param {Object} [settings={}]
 * @param {String} [settings.provider=http://localhost:14265] URI of an IRI node to connect to
 * @param {String | number} [settings.apiVersion=1] - IOTA API version to be sent in the `X-IOTA-API-Version` header.
 * @param {number} [settings.requestBatchSize=1000] - Number of search values per request
 * 
 * @example
 * ```js
 * let settings = {
 *  provider: 'http://mynode.eu:14265'
 * }
 * 
 * let httpClient = HttpClient.createHttpClient(settings);
 * ```
 *
 * @return HTTP client object
 */
export const createHttpClient = (settings?: Partial<Settings>): Provider => {
    let currentSettings = getSettingsWithDefaults({ ...settings })
    return {
        /**
        * This method uses the HTTP client to send requests to the [IRI API endpoints](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference).
        * 
        * ## Related methods
        * 
        * To create an HTTP client, use the [`createHttpClient()`]{@link #module_http-client.createHttpClient} method.
        * 
        * @method createHttpClient
        * 
        * @summary Sends an API request to the connected IRI node.
        *
        * @param {Object} command - The request body for the API endpoint
        * 
        * @example
        * ```js
        * let httpClient = HttpClient.createHttpClient(settings);
        * httpClient.send({command:'getNodeInfo'})
        * .then(response => {
        *   console.log(response);
        * })
        * .catch(error => {
        *   console.log(error);
        * })
        * ```
        *
        * @return {Promise}
        * 
        * @fulfil {Object} response - The response from the IRI node
        * 
        * @reject {Object} error - The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors) 
        */
        send: <C extends BaseCommand, R>(command: Readonly<C>): Promise<Readonly<R>> =>
            Promise.try(() => {
                const { provider, user, password, requestBatchSize, apiVersion, agent } = currentSettings

                if (isBatchableCommand(command)) {
                    const keysToBatch = getKeysToBatch(command, requestBatchSize)

                    if (keysToBatch.length) {
                        return batchedSend<C>(
                            { command, uri: provider, user, password, apiVersion, agent },
                            keysToBatch,
                            requestBatchSize
                        )
                    }
                }

                return send<C>({ command, uri: provider, user, password, apiVersion, agent })
            }),

        /**
        * This method updates the settings of an existing HTTP client.
        * 
        * ## Related methods
        * 
        * To create an HTTP client, use the [`createHttpClient()`]{@link #module_http-client.createHttpClient} method.
        * 
        * @method setSettings
        * 
        * @summary Updates the settings of an existing HTTP client.
        *
        * @param {Object} [settings={}]
        * @param {String} [settings.provider=http://localhost:14265] URI of an IRI node to connect to
        * @param {String | number} [settings.apiVersion=1] - IOTA API version to be sent in the `X-IOTA-API-Version` header.
        * @param {number} [settings.requestBatchSize=1000] - Number of search values per request.
        * 
        * @example
        * ```js
        * let settings = {
        *   provider: 'https://nodes.devnet.thetangle.org:443'
        *   }
        * 
        * let httpClient = http.createHttpClient(settings);
        * httpClient.send({command:'getNodeInfo'}).then(res => {
        *   console.log(res)
        * }).catch(err => {
        *   console.log(err)
        * });
        * 
        * httpClient.setSettings({provider:'http://newnode.org:14265'});
        * 
        * httpClient.send({command:'getNodeInfo'}).then(res => {
        *   console.log(res)
        * }).catch(err => {
        *   console.log(err)
        * })
        * ```
        *
        * @return {void}
        */
        setSettings: (newSettings?: Partial<Settings>): void => {
            currentSettings = getSettingsWithDefaults({ ...currentSettings, ...newSettings })
        },
    }
}
