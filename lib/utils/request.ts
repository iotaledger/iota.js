/* tslint:disable no-console */

import fetch from 'whatwg-fetch'

import {
    BaseCommand,
    BatchableCommand,
    Callback,
    IRICommand,
    Settings
} from '../api/types'

import * as errors from '../errors/requestErrors'
import { Transaction } from './types'

export interface RequestOptions {
    provider: string,
    token?: string
}

/**
 *   Sends an http request to a specified host
 *
 *   @method send
 *   @param {object} command
 *   @param {function} callback
 **/
export function send<C extends BaseCommand, R = any>(command: BaseCommand, options: RequestOptions): Promise<R> {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'X-IOTA-API-Version': '1',
    }

    if (options.token) {
        headers.Authorization = `token ${options.token}`
    }

    return fetch(options.provider, { method: 'POST', headers })
        .then((res:any) => {
            if (!res.ok) {
                throw errors.requestError(res.statusText)
            }
            return res.json()
        })
        .then((json:any) => {
            if (json.error) {
                throw errors.requestError(json.error)
            } else if (json.exception) {
                throw errors.requestError(json.exception)
            }

            return json
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
export function batchedSend<C extends BaseCommand, R = any>(
    command: C,
    options: RequestOptions,
    keysToBatch: string[],
    batchSize: number): Promise<R> {

    const allKeys = Object.keys(command) as Array<keyof C>
    const requestStack: C[] = []

    keysToBatch.forEach(keyToBatch => {
        while ((command[keyToBatch] as string[]).length) {
            const batch: C[] = command[keyToBatch].splice(0, batchSize)
            const params: C = allKeys
                .filter(key => key === keyToBatch || keysToBatch.indexOf(key) === -1)
                .forEach(key => params[key] = batch)

            requestStack.push(params)
        }
    })
    
    return Promise.all(requestStack.map((cmd) => send(cmd, options)))
        .then(res => {
            switch (command.command) {
              case IRICommand.GET_BALANCES:
                const balances = res.reduce((acc, b) => acc.concat(b.balances), [])
                return {
                  ...res.sort((a, b) => a.milestoneIndex - b.milestoneIndex).shift(),
                  balances 
                }
              
              case IRICommand.FIND_TRANSACTIONS:
                  const seenTxs = new Set()

                  if (keysToBatch.length === 1) {
                  return res
                      .reduce((a, b) => a.concat(b), [])
                      .filter((tx: Transaction) => seenTxs.has(tx.hash) ? false : seenTxs.add(tx.hash))
                  }

                  const keysToTxFields: { [k: string]: keyof Transaction } = {
                      bundles: 'bundle',
                      addresses: 'address',
                      hashes: 'hash',
                      tags: 'tag',
                  }

                  return res
                      .map(batch =>
                          batch.filter((tx: Transaction) =>
                              keysToBatch.every(key => 
                                  requestStack.some(cmd =>
                                      cmd.hasOwnProperty(key) &&
                                      cmd[key].findIndex((value: keyof Transaction) => value === tx[keysToTxFields[key]]) !== -1))))
                                          
                    .reduce((a, b) => a.concat(b), [])
                    .filter((tx: Transaction) => seenTxs.has(tx.hash) ? false : seenTxs.add(tx.hash))
                    
              default:
                return res.reduce((a, b) => a.concat(b), [])
            }
        })
}
