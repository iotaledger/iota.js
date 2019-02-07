import 'cross-fetch/polyfill' // tslint:disable-line no-submodule-imports
import {
    BaseCommand,
    FindTransactionsResponse,
    GetBalancesResponse,
    GetInclusionStatesResponse,
    GetTrytesResponse,
    IRICommand,
    Trytes,
} from '../../types'
import { BatchableCommand } from './httpClient'
import { API_VERSION, DEFAULT_URI, REQUEST_BATCH_SIZE } from './settings'

const requestError = (statusText: string) => `Request error: ${statusText}`

type R = GetBalancesResponse | GetInclusionStatesResponse | GetTrytesResponse | FindTransactionsResponse

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
export const send = <C extends BaseCommand>(
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
    }).then(res =>
        res
            .json()
            .then(
                json =>
                    res.ok
                        ? json
                        : Promise.reject(
                              requestError(json.error || json.exception ? json.error || json.exception : res.statusText)
                          )
            )
            .catch(error => {
                if (!res.ok && error.type === 'invalid-json') {
                    throw requestError(res.statusText)
                } else {
                    throw error
                }
            })
    )

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
export const batchedSend = <C extends BaseCommand>(
    command: BatchableCommand<C>,
    keysToBatch: ReadonlyArray<string>,
    requestBatchSize = REQUEST_BATCH_SIZE,
    uri: string = DEFAULT_URI,
    apiVersion: string | number = API_VERSION
): Promise<any> => {
    const params = Object.keys(command)
        .filter(key => keysToBatch.indexOf(key) === -1)
        .reduce(
            (acc: any, key: string) => ({
                ...acc,
                [key]: command[key],
            }),
            {}
        )

    return Promise.all(
        keysToBatch.map(key => {
            return Promise.all(
                command[key]
                    .reduce(
                        (
                            acc,
                            _, // tslint:disable-line no-unused-variable
                            i
                        ) =>
                            i < Math.ceil(command[key].length / requestBatchSize)
                                ? acc.concat({
                                      ...params,
                                      [key]: command[key].slice(i * requestBatchSize, (1 + i) * requestBatchSize),
                                  })
                                : acc,
                        []
                    )
                    .map((batchedCommand: BatchableCommand<C>) => send(batchedCommand, uri, apiVersion))
            ).then(res => res.reduce((acc: ReadonlyArray<R>, batch) => acc.concat(batch as R), []))
        })
    ).then((responses: ReadonlyArray<ReadonlyArray<R>>) => {
        switch (command.command) {
            case IRICommand.FIND_TRANSACTIONS:
                return {
                    hashes: (responses[0][0] as any).hashes.filter((hash: string) =>
                        responses.every(
                            response =>
                                response.findIndex(res => (res as FindTransactionsResponse).hashes.indexOf(hash) > -1) >
                                -1
                        )
                    ),
                }
            case IRICommand.GET_BALANCES:
                return {
                    ...responses[0]
                        .slice()
                        .sort((a: any, b: any) => a.milestoneIndex - b.milestoneIndex)
                        .slice(-1)[0],
                    balances: responses[0].reduce(
                        (acc: ReadonlyArray<string>, response: R) =>
                            acc.concat((response as GetBalancesResponse).balances),
                        []
                    ),
                }
            case IRICommand.GET_INCLUSION_STATES:
                return {
                    ...responses[0][0],
                    states: responses[0].reduce(
                        (acc: ReadonlyArray<boolean>, response: R) =>
                            acc.concat((response as GetInclusionStatesResponse).states),
                        []
                    ),
                }
            case IRICommand.GET_TRYTES:
                return {
                    trytes: responses[0].reduce(
                        (acc: ReadonlyArray<Trytes>, response: R) => acc.concat((response as GetTrytesResponse).trytes),
                        []
                    ),
                }
            default:
                throw requestError('Invalid batched request.')
        }
    })
}
