/* tslint:disable no-console */

import * as async from 'async'
import 'whatwg-fetch'

import {
    BaseCommand,
    BatchableCommand,
    Callback,
    FindTransactionsCommand,
    GetBalancesCommand,
    GetInclusionStatesCommand,
    GetTrytesCommand,
    IRICommand,
    isBatchableCommand,
    isFindTransactions,
    isGetBalances,
    isGetInclusionStates,
    isGetTrytes,
} from '../api/types'
import * as errors from '../errors/requestErrors'
import { Transaction } from './types'

const DEFAULT_PROVIDER = 'http://localhost:14265'
const SANDBOX_ID_PROP = 'id'
const BATCH_SIZE = 1000
// var async = require('async')

export enum IRIResult {
    NEIGBORS = 'neighbors',
    ADDED_NEIGHBORS = 'addedNeighbors',
    REMOVED_NEIGHBORS = 'removedNeighbors',
    HASHES = 'hashes',
    TRYTES = 'trytes',
    STATES = 'states',
}

const batchableKeys = {
    [IRICommand.FIND_TRANSACTIONS]: ['addresses', 'approvees', 'bundles', 'tags'] as Array<
        keyof FindTransactionsCommand
    >,
    [IRICommand.GET_BALANCES]: ['addresses'] as Array<keyof GetBalancesCommand>,
    [IRICommand.GET_INCLUSION_STATES]: ['tips', 'transactions'] as Array<keyof GetInclusionStatesCommand>,
    [IRICommand.GET_TRYTES]: ['hashes'] as Array<keyof GetTrytesCommand>,
}

// Result map of the commands we want to format

const resultMap: { [key: string]: IRIResult } = {
    [IRICommand.GET_NEIGHBORS]: IRIResult.NEIGBORS,
    [IRICommand.ADD_NEIGHBORS]: IRIResult.ADDED_NEIGHBORS,
    [IRICommand.REMOVE_NEIGHBORS]: IRIResult.REMOVED_NEIGHBORS,
    [IRICommand.GET_TIPS]: IRIResult.HASHES,
    [IRICommand.FIND_TRANSACTIONS]: IRIResult.HASHES,
    [IRICommand.GET_TRYTES]: IRIResult.TRYTES,
    [IRICommand.GET_INCLUSION_STATES]: IRIResult.STATES,
    [IRICommand.ATTACH_TO_TANGLE]: IRIResult.TRYTES,
}

function batchableKeysOf<T extends BatchableCommand>(cmd: T) {
    return batchableKeys[cmd.command] as Array<keyof T>
}

export default class MakeRequest {
    public constructor(public provider: string = DEFAULT_PROVIDER, public token: string) {}

    /**
     *   Change the HTTP provider
     *
     *   @method setProvider
     *   @param {String} provider
     **/
    public setProvider(provider: string = DEFAULT_PROVIDER) {
        this.provider = provider
    }

    /**
     * @deprecated
     *
     * This method used to be implemented to use XMLHttpRequest, and is no longer
     * necessary. The blank method is left in for compatibility purposes
     **/
    public open() {
        console.warn('Request.open is deprecated. Remove it from your code.')
    }

    /**
     *   sends an http request to a specified host
     *
     *   @method send
     *   @param {object} command
     *   @param {function} callback
     **/
    public send<C extends BaseCommand, R = any>(command: BaseCommand, callback: Callback<R>) {
        let response: Response
        let error: Error | null = null
        let result: any = null

        const req = fetch(this.provider, this.getFetchOptions())
            .then(res => {
                response = res

                return response.json()
            })
            .then(json => {
                // Error due to invalid request, e.g. 400
                if (!response.ok) {
                    if (json.error) {
                        error = errors.requestError(json.error)
                    } else if (json.exception) {
                        error = errors.requestError(json.exception)
                    }
                }

                if (resultMap.hasOwnProperty(command.command)) {
                    // If the response is from the sandbox, don't prepare the result
                    // tslint:disable-next-line prefer-conditional-expression
                    if (command.command === IRICommand.GET_INCLUSION_STATES && result.hasOwnProperty('id')) {
                        result = json
                    } else {
                        result = json[resultMap[command.command]]
                    }
                }
            })
            .catch(err => {
                // Server side error, e.g. invalid JSON response
                return response.text().then(text => {
                    error = errors.invalidResponse(text)
                })
            })
            .then(() => {
                if (callback) {
                    callback(error, result)
                    return
                }

                if (error) {
                    throw error
                } else {
                    return result
                }
            })

        if (callback) {
            return
        }

        return req
    }

    /**
     *   sends a batched http request to a specified host
     *   supports findTransactions, getBalances, getInclusionStates & getTrytes commands
     *
     *   @method batchedSend
     *   @param {object} command
     *   @param {function} callback
     **/
    public batchedSend<C extends BaseCommand, R = any>(command: C, batchSize: number = 1000, callback: Callback<R>) {
        if (!isBatchableCommand(command)) {
            throw new Error(`${command.command} may not be batched`)
        }

        const allKeys = Object.keys(command) as Array<keyof C>
        const batchKeys = batchableKeysOf(command)
        const requestStack: any[] = []

        batchKeys.forEach(key => {
            while (command[key].length) {
                const batch = command[key].splice(0, batchSize)
                const params: any = {}

                allKeys.forEach(k => {
                    if (k === key || batchKeys.indexOf(k) === -1) {
                        params[k] = batch
                    }
                })

                requestStack.push(params)
            }
        })

        async.mapSeries<any, any, any>(
            requestStack,
            (cmd, cb) => {
                this.send(cmd, (err, res) => {
                    if (err) {
                        return cb(err)
                    }

                    cb(void 0, res)
                })
            },
            (err, res) => {
                if (err) {
                    return callback(err as Error)
                }

                switch (command.command) {
                    case IRICommand.GET_BALANCES:
                        const balances = res!.reduce((a: any, b: any) => a.concat(b.balances), [])

                        res = res!.sort((a: any, b: any) => a.milestoneIndex - b.milestoneIndex).shift()
                        ;(res as any).balances = balances

                        callback(null, res as any)

                        break

                    case IRICommand.FIND_TRANSACTIONS:
                        const seenTxs = new Set()

                        if (batchKeys.length === 1) {
                            return callback(
                                null,
                                res!.reduce((a, b) => a.concat(b), []).filter((tx: Transaction) => {
                                    const seen = seenTxs.has(tx.hash)

                                    if (!seen) {
                                        seenTxs.add(tx.hash)

                                        return true
                                    }

                                    return false
                                })
                            )
                        }

                        const keysToTxFields: { [k: string]: keyof Transaction } = {
                            bundles: 'bundle',
                            addresses: 'address',
                            hashes: 'hash',
                            tags: 'tag',
                        }

                        callback(
                            null,
                            res!
                                .map(batch => {
                                    return batch.filter((tx: Transaction) => {
                                        return batchKeys.every(key => {
                                            return requestStack.some((cmd: C) => {
                                                return (
                                                    cmd.hasOwnProperty(key) &&
                                                    (cmd as any)[key].findIndex((value: any) => {
                                                        return value === tx[keysToTxFields[key]]
                                                    }) !== -1
                                                )
                                            })
                                        })
                                    })
                                })
                                .reduce((a, b) => a.concat(b), [])
                                .filter((tx: Transaction) => {
                                    if (!seenTxs.has(tx.hash)) {
                                        seenTxs.add(tx.hash)

                                        return true
                                    }
                                    return false
                                })
                        )

                        break

                    default:
                        callback(null, res!.reduce((a, b) => a.concat(b), []))
                }
            }
        )
    }

    /**
     *   sends an http request to a specified host
     *
     *   @method sandboxSend
     *   @param {object} command
     *   @param {function} callback
     **/
    public sandboxSend(jobId: string, retryInterval: number, callback: Callback<string[]>) {
        const promise = new Promise((resolve, reject) => {
            const interval = setInterval(() => {
                fetch(`${this.provider}/jobs/${jobId}`, {
                    method: 'GET',
                })
                    .then(res => {
                        if (!res.ok) {
                            throw new Error(`Sandbox error: ${res.status} ${res.statusText}`)
                        }

                        return res.json()
                    })
                    .then(json => {
                        if (json.progress !== '100') {
                            console.log(`Job ${jobId} progress: ${json.progress}`)
                            return
                        }

                        clearInterval(interval)

                        if (callback) {
                            callback(null, json.response.trytes)
                        }

                        resolve(json.response.trytes)
                    })
                    .catch(err => {
                        if (callback) {
                            callback(err)
                        }

                        reject(err)
                    })
            }, retryInterval)
        })

        if (callback) {
            return
        }

        return promise
    }

    private getFetchOptions(extras?: RequestInit): RequestInit {
        const method = 'POST'
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            'X-IOTA-API-Version': '1',
        }

        if (this.token) {
            headers.Authorization = `token ${this.token}`
        }

        return { method, headers, ...extras }
    }
}
