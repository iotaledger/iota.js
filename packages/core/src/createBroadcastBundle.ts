import { asFinalTransactionTrytes } from '@iota/transaction-converter'
import * as Promise from 'bluebird'
import { Callback, Hash, Provider, Trytes } from '../../types'
import { createBroadcastTransactions, createGetBundle } from './'

/**
 * @method createBroadcastBundle
 * 
 * @summary Creates a new `broadcastBundle()` method, using a custom Provider instance.
 *
 * @memberof module:core
 * 
 * @ignore
 *
 * @param {Provider} provider - The Provider object that the method should use to call the node's API endpoints.
 *
 * @return {Function} [`broadcastBundle`]{@link #module_core.broadcastBundle}  - A new `broadcastBundle()` function that uses your chosen Provider instance.
 */
export const createBroadcastBundle = (provider: Provider) => {
    const broadcastTransactions = createBroadcastTransactions(provider)
    const getBundle = createGetBundle(provider)

    /**
     * This method uses the `getBundle()` method to get all transactions in the given tail transaction's bundle from the connected IRI node.
     * 
     * Then, those transactions are sent to the node again so that the node sends them to all of its neighbors.
     * 
     * You may want to use this method to improve the likelihood of your transactions reaching the rest of the network.
     * 
     * **Note:** To use this method, the node must already have your bundle's transaction trytes in its ledger.
     * 
     * ## Related methods
     * 
     * To create and sign a bundle of new transactions, use the [`prepareTransfers()`]{@link #module_core.prepareTransfers} method.
     * 
     * @method broadcastBundle
     * 
     * @summary Resends all transactions in the bundle of a given tail transaction hash to the connected IRI node.
     *
     * @memberof module:core
     *
     * @param {Hash} tailTransactionHash - Tail transaction hash
     * @param {Callback} [callback] - Optional callback function
     * 
     * @example
     *
     * ```js
     * broadcastBundle(tailHash)
     *   .then(transactionObjects => {
     *      console.log(`Successfully sent the following bundle to the node:)
     *      console.log(JSON.stringify(transactionObjects));
     *   })
     *   .catch(error => {
     *     console.log(`Something went wrong: ${error}`)
     *   })
     * ```
     *
     * @return {Promise}
     * 
     * @fulfil {Transaction[]} transactionObjects - Array of transaction objects
     * 
     * @reject {Error} error - An error that contains one of the following:
     * - `INVALID_TRANSACTION_HASH`: Make sure the tail transaction hash is 81 trytes long and its `currentIndex` field is 0
     * - `INVALID_BUNDLE`: Check the tail transaction's bundle for the following:
     *   - Addresses in value transactions have a 0 trit at the end, which means they were generated using the Kerl hashing function
     *   - Transactions in the bundle array are in the same order as their currentIndex field
     *   - The total value of all transactions in the bundle sums to 0
     *   - The bundle hash is valid
     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors) 
     */
    return function broadcastBundle(
        tailTransactionHash: Hash,
        callback?: Callback<ReadonlyArray<Trytes>>
    ): Promise<ReadonlyArray<Trytes>> {
        return getBundle(tailTransactionHash)
            .then(asFinalTransactionTrytes)
            .then(broadcastTransactions)
            .asCallback(callback)
    }
}
