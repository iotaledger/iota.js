/* tslint:disable no-console */
import 'isomorphic-fetch'
import { API_VERSION, DEFAULT_URI, MAX_REQUEST_BATCH_SIZE } from './settings'
import { BaseCommand, FindTransactionsResponse, GetBalancesResponse, IRICommand } from '../../types'
import { BatchableCommand } from './httpClient'

const requestError = (statusText: string) => Promise.reject(`Request error: ${statusText}`)

/**
 * Sends an http request to a specified host.
 *
 * @method send
 *
 * @memberof module:http-client
 *
 * @param {Command} command
 *
 * @param {String} [uri=http://localhost:14265]
 *
 * @param {String|Number} [apiVersion=1]
 *
 * @return Promise
 * @fulil {Object} - Response
 * @reject {Error} - Request error
 */
export const send = <C extends BaseCommand, R = any>(
    command: C,
    uri: string = DEFAULT_URI,
    apiVersion: string | number = API_VERSION
): Promise<R> =>
    fetch(uri, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-IOTA-API-Version': apiVersion.toString(),
        },
        body: JSON.stringify(command),
    })
        .then(res => (res.ok ? res.json() : requestError(res.statusText)))
        .then(json => (json.error || json.exception ? requestError(json.error || json.exception) : json))

/**
 * Sends a batched http request to a specified host
 * supports findTransactions, getBalances & getTrytes commands
 *
 * @method batchedSend
 *
 * @param {Command} command
 *
 * @param {String[]} keysToBatch
 *
 * @param {Number} [requestBatchSize=1000]
 *
 * @param {String} [uri='http://localhost:14265']
 *
 * @param {String|Number} [apiVersion=1]
 *
 * @ignore
 *
 * @return Promise
 * @fulil {Object} - Response
 * @reject {Error} - Request error
 */
export const batchedSend = <C extends BaseCommand, R = any>(
    command: BatchableCommand<C>,
    keysToBatch: ReadonlyArray<string>,
    requestBatchSize = MAX_REQUEST_BATCH_SIZE,
    uri: string = DEFAULT_URI,
    apiVersion: string | number = API_VERSION
): Promise<any> =>
    Promise.all(
        keysToBatch.map(key => {
            return Promise.all(
                command[key]
                    .reduce(
                        (acc, _, i) =>
                            i < Math.ceil(command[key].length / requestBatchSize)
                                ? acc.concat({
                                      command: command.command,
                                      [key]: command[key].slice(i * requestBatchSize, (1 + i) * requestBatchSize),
                                  })
                                : acc,
                        []
                    )
                    .map((batchedCommand: BatchableCommand<C>) => send(batchedCommand, uri, apiVersion))
            ).then(res => res.reduce((acc: ReadonlyArray<R>, batch: Object) => acc.concat(<R>batch), []))
        })
    ).then((responses: ReadonlyArray<ReadonlyArray<R>>) => {
        switch (command.command) {
            case IRICommand.FIND_TRANSACTIONS:
                return {
                    hashes: (responses[0][0] as any).hashes.filter((hash: string) =>
                        responses.every(
                            _response =>
                                _response.findIndex(
                                    (res: Object) => (<FindTransactionsResponse>res).hashes.indexOf(hash) > -1
                                ) > -1
                        )
                    ),
                }
            case IRICommand.GET_BALANCES:
                return {
                    ...responses[0]
                        .slice()
                        .sort((a: any, b: any) => a.milestoneIndex - b.milestoneIndex)
                        .slice(-1),
                    balances: responses[0].reduce((acc, response: any) => acc.concat(response.balances), []),
                }
            case IRICommand.GET_INCLUSION_STATES:
                return {
                    ...(responses[0][0] as Object),
                    states: responses[0].reduce((acc: any, response: any) => acc.conact(response.states)),
                }
            default:
                requestError('Invalid batched request.')
        }
    })
