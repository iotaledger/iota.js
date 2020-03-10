import * as Promise from 'bluebird'
import { Callback, Provider, Trytes } from '../../types'
import { createBroadcastTransactions, createStoreTransactions } from './'

/**
 * @method createStoreAndBroadcast
 *
 * @memberof module:core
 * 
 * @ignore
 *
 * @param {Provider} provider
 *
 * @return {function} {@link #module_core.storeAndBroadcast `storeAndBroadcast`}
 */
export const createStoreAndBroadcast = (provider: Provider) => {
    const storeTransactions = createStoreTransactions(provider)
    const broadcastTransactions = createBroadcastTransactions(provider)

    /**
     * This method uses the connected IRI node's
     * [`broadcastTransactions`](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference#broadcastTransactions) and [`storeTransactions`](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference#storeTransactions) endpoints to send it the given transaction trytes.
     * 
     * **Note:** Before calling this method, we recommend saving your transaction trytes in local storage.
     * By doing so, you make sure that you can always reattach your transactions to the Tangle in case they remain in a pending state. 
     * 
     * ## Related methods
     * 
     * The given transaction trytes must be in a valid bundle and must include a proof of work.
     * 
     * To create a valid bundle, use the `prepareTransfers()` method. For more information about what makes a bundles and transactions valid, see [this guide](https://docs.iota.org/docs/node-software/0.1/iri/concepts/transaction-validation).
     * 
     * To do proof of work, use one of the following methods:
     * 
     * - [`attachToTangle()`]{@link #module_core.attachToTangle}
     * - [`sendTrytes()`]{@link #module_core.sendTrytes}
     *
     * @method storeAndBroadcast
     * 
     * @summary Sends the given transaction trytes to the connected IRI node.
     *
     * @memberof module:core
     *
     * @param {Array<Trytes>} trytes - Array of transaction trytes
     * @param {Callback} [callback] - Optional callback function
     * 
     * @example
     * ```js
     * storeAndBroadcast(trytes)
     * .then(transactionTrytes => {
     *     console.log(`Successfully sent transactions to the node`);
     *     console.log(JSON.stringify(transactionTrytes));
     * }).catch(error => {
     *     console.log(`Something went wrong: ${error}`)
     * })
     * ```
     *
     * @return {Promise<Trytes[]>}
     * 
     * @fulfil {Trytes[]} transactionTrytes - Attached transaction trytes
     * 
     * @reject {Error} error - An error that contains one of the following:
     * - `INVALID_TRANSACTION_TRYTES`: Make sure the trytes can be converted to a valid transaction object
     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors) 
     */
    return (
        trytes: ReadonlyArray<Trytes>,
        callback?: Callback<ReadonlyArray<Trytes>>
    ): Promise<ReadonlyArray<Trytes>> =>
        storeTransactions(trytes)
            .then(broadcastTransactions)
            .asCallback(callback)
}
