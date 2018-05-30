/* tslint:disable no-console */
import 'isomorphic-fetch'
import { API_VERSION, DEFAULT_URI, MAX_REQUEST_BATCH_SIZE } from './settings'
import { BaseCommand, FindTransactionsResponse, GetBalancesResponse, IRICommand, Transaction } from '../../types'
import { BatchableCommand, BatchableKeys, BatchableKey } from './httpClient';

const requestError = (statusText: string) => Promise.reject(`Request error: ${statusText}`)

/**
 * Sends an http request to a specified host
 *
 * @method send
 * 
 * @param {Command} command
 * 
 * @param {String} [uri='http://localhost:14265']
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
): Promise<R> => fetch(uri, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-IOTA-API-Version': apiVersion.toString()
    },
    body: JSON.stringify(command)
})
    .then(({ ok, json, statusText }) => ok
        ? json()
        : requestError(statusText)
    )
    .then((json: any) => {
        const { error, exception } = json
        return (error || exception)
            ? requestError(error || exception)
            : json
    })

/**
 * Sends a batched http request to a specified host
 * supports findTransactions, getBalances & getTrytes commands
 *
 * TODO: implement batched requests for getInclusionStates
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
 * @return Promise
 * @fulil {Object} - Response
 * @reject {Error} - Request error
 */

 /*
export const batchedSend = <C extends BaseCommand, R = any>(
    command: C,
    keysToBatch: string[],
    requestBatchSize = MAX_REQUEST_BATCH_SIZE,
    uri: string = DEFAULT_URI,
    apiVersion: string | number = API_VERSION
): Promise<R> => {
    const allKeys: Array<string> = Object.keys(command)
    const requestStack: C[] = []

    keysToBatch.forEach(keyToBatch => {
        const dataToBatch = [...command[keyToBatch]]

        while (dataToBatch.length) {
            const batch = dataToBatch.splice(0, requestBatchSize)
            const params: C = allKeys.filter(key => key === keyToBatch || keysToBatch.indexOf(key) === -1).reduce(
                (acc, key) => {
                    acc[key] = batch
                    return acc
                },
                {} as C // tslint:disable-line no-object-literal-type-assertion
            )

            requestStack.push(params)
        }
    })

    return Promise.all(requestStack.map(cmd => send(command, uri, ))).then(res => {
        switch (command.command) {
            case IRICommand.GET_BALANCES:
                const balances = res.reduce((acc, b) => acc.concat(b.balances), [])
                return {
                    ...res.sort((a, b) => a.milestoneIndex - b.milestoneIndex).shift(),
                    balances,
                }

            case IRICommand.FIND_TRANSACTIONS:
                const seenTxs = new Set()

                if (keysToBatch.length === 1) {
                    return res
                        .reduce((a, b) => a.concat(b), [])
                        .filter((tx: Transaction) => (seenTxs.has(tx.hash) ? false : seenTxs.add(tx.hash)))
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
                                requestStack.some(
                                    cmd =>
                                        cmd.hasOwnProperty(key) &&
                                        cmd[key].findIndex(
                                            (value: keyof Transaction) => value === tx[keysToTxFields[key]]
                                        ) !== -1
                                )
                            )
                        )
                    )

                    .reduce((a, b) => a.concat(b), [])
                    .filter((tx: Transaction) => (seenTxs.has(tx.hash) ? false : seenTxs.add(tx.hash)))

            default:
                return res.reduce((a, b) => a.concat(b), [])
        }
    })
}
*/