/* tslint:disable no-console */

import 'whatwg-fetch'

import {
    BaseCommand,
    BatchableCommand,
    Callback,
    FindTransactionsCommand,
    FindTransactionsQuery,
    GetBalancesCommand,
    GetInclusionStatesCommand,
    GetTrytesCommand,
    IRICommand,
    isBatchableCommand,
    isFindTransactions,
    isGetBalances,
    isGetInclusionStates,
    isGetTrytes
} from '../api/types/commands'

import {
    GetBalancesResponse
} from '../api/types/responses'

import { defaultSettings, Settings } from '../api'

import * as errors from '../errors/requestErrors'
import { Transaction } from './types'

const SANDBOX_ID_PROP = 'id'
const BATCH_SIZE = 1000

enum IRIResult {
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

/**
 *   sends an http request to a specified host
 *
 *   @method send
 *   @param {object} command
 *   @param {function} callback
 **/
function send<C extends BaseCommand, R = any>(command: BaseCommand, settings: Settings): Promise<R> {
    let response: Response
    let error: Error | null = null
    let provider: string = settings.provider || defaultSettings.provider

    if (settings.sandbox && settings.token) {
      provider += '/command'
    }

    return fetch(provider, getFetchOptions(settings.token))
        .then((res:any) => {
            response = res  
            return res.json()
        })
        .then((json:any) => {
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
                if (command.command === IRICommand.GET_INCLUSION_STATES && json.hasOwnProperty('id')) {
                    return json
                } else {
                    return json[resultMap[command.command]]
                }
            }
            return json
        })
        .catch((err: Error) => {
            // Server side error, e.g. invalid JSON response
            return response.text().then(text => {
                throw errors.invalidResponse(text)
            })
        })

}

/**
 *   sends a batched http request to a specified host
 *   supports findTransactions, getBalances & getTrytes commands
 *
 *   TODO: implement batched requests for getInclusionStates
 *    
 *   @method batchedSend
 *   @param {object} command
 *   @param {function} callback
 **/
function batchedSend<C extends BaseCommand, R = any>(command: C, settings: Settings, batchSize: number = 1000): Promise<R> {
    if (!isBatchableCommand(command)) {
        throw new Error(`${command.command} may not be batched`)
    }

    const allKeys = Object.keys(command) as Array<keyof C>
    const batchKeys = batchableKeysOf(command) as Array<keyof C>
    const requestStack: C[] = []

    batchKeys.forEach(key => {
        while ((command[key] as string[]).length) {
            const batch: string[] = (command[key] as string[]).splice(0, batchSize)
            const params: any = {}

            allKeys.forEach(k => {
                if (k === key || batchKeys.indexOf(k) === -1) {
                    params[k] = batch
                }
            })

            requestStack.push(params)
        }
    })
    
    return Promise.all(requestStack.map((cmd) => send(cmd, settings)))
        .then(res => {
            switch (command.command) {
              case IRICommand.GET_BALANCES:
                const balances = res.reduce((acc: string[], b:any) => acc.concat(b.balances), [])
                return {
                  ...res.sort((a:any, b:any) => a.milestoneIndex - b.milestoneIndex).shift(),
                  balances 
                }
              
              case IRICommand.FIND_TRANSACTIONS:
                  const seenTxs = new Set()

                  if (batchKeys.length === 1) {
                    return res.reduce((a:any, b:any) => a.concat(b), []).filter((tx: Transaction) => {
                        const seen = seenTxs.has(tx.hash)

                        if (!seen) {
                            seenTxs.add(tx.hash)
                            return true
                        }
                        return false
                    })
                  }

                  const keysToTxFields: { [k: string]: keyof Transaction } = {
                    bundles: 'bundle',
                    addresses: 'address',
                    hashes: 'hash',
                    tags: 'tag',
                  }

                  return res
                    .map((batch: any) =>
                      batch.filter((tx: Transaction) => 
                        batchKeys.every(key =>
                          requestStack.some((cmd: C) =>
                            cmd.hasOwnProperty(key) &&
                            (cmd as any)[key].findIndex((value: any) => value === tx[keysToTxFields[key]]) !== -1
                          )
                        )
                      )
                    )
                    .reduce((a, b) => a.concat(b), [])
                    .filter((tx: Transaction) => {
                      if (!seenTxs.has(tx.hash)) {
                        seenTxs.add(tx.hash)
                        return true
                      }
                      
                      return false
                    })
              default:
                return res.reduce((a:any, b:any) => a.concat(b), [])
            }
        })
}


function getFetchOptions(sandboxToken: string | undefined): RequestInit {
    const method = 'POST'
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'X-IOTA-API-Version': '1',
    }

    if (sandboxToken) {
        headers.Authorization = `token ${sandboxToken}`
    }

    return { method, headers }
}

export { batchedSend, IRIResult, send }
