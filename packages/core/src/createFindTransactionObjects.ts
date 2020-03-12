import * as Promise from 'bluebird'
import { Callback, Provider, Transaction } from '../../types'
import { createFindTransactions, createGetTransactionObjects, FindTransactionsQuery } from './'

/**
 * @method createFindTransactionObjects
 * 
 * @summary Creates a new `findTransactionObjects()` method, using a custom Provider instance.
 *
 * @memberof module:core
 * 
 * @ignore
 *
 * @param {Provider} provider - The Provider object that the method should use to call the node's API endpoints.
 *
 * @return {Function} [`findTransactionObjects`]{@link #module_core.findTransactionObjects}  - A new `findTransactionObjects()` function that uses your chosen Provider instance.
 */
export const createFindTransactionObjects = (provider: Provider) => {
    const findTransactions = createFindTransactions(provider)
    const getTransactionObjects = createGetTransactionObjects(provider)

    /**
     * This method uses the [`findTransactions()`]{@link #module_core.findTransactions} to find transactions with the given fields, then it uses
     * the [`getTransactionObjects()`]{@link #module_core.getTransactionObjects} method to return the transaction objects.
     * 
     * If you pass more than one query, this method returns only transactions that contain all the given fields in those queries.
     * 
     * ## Related methods
     * 
     * To find only transaction hashes, use the [`findTransactions()`]{@link #module_core.findTransactions} method.
     * 
     * @method findTransactionObjects
     * 
     * @summary Searches the Tangle for transaction objects that contain all the given values in their [transaction fields](https://docs.iota.org/docs/getting-started/0.1/transactions/transactions#structure-of-a-transaction).
     *
     * @memberof module:core
     *
     * @param {Object} query - Query object
     * @param {Hash[]} [query.addresses] - Array of addresses to search for in transactions
     * @param {Hash[]} [query.bundles] - Array of bundle hashes to search for in transactions
     * @param {Tag[]} [query.tags] - Array of tags to search for in transactions
     * @param {Hash[]} [query.approvees] - Array of transaction hashes that you want to search for in transactions' branch and trunk transaction fields
     * @param {Callback} [callback] - Optional callback function
     * 
     * @example
     * ```js
     * findTransactionObjects({ addresses: ['ADDRESS999...'] })
     *    .then(transactionObjects => {
     *      console.log(`Successfully found the following transactions:)
     *      console.log(JSON.stringify(transactionObjects));
     *   })
     *   .catch(error => {
     *     console.log(`Something went wrong: ${error}`)
     *   })
     * ```
     *
     * @returns {Promise}
     * 
     * @fulfil {Transaction[]} transactionObjects - Array of transaction objects, which contain fields that match the query object
     * 
     * @reject {Error} error - An error that contains one of the following:
     * - `INVALID_SEARCH_KEY`: Make sure that you entered valid query parameters
     * - `INVALID_HASH`: Make sure that the bundle hashes are 81 trytes long
     * - `INVALID_TRANSACTION_HASH`: Make sure that the approvee transaction hashes are 81 trytes long
     * - `INVALID_ADDRESS`: Make sure that the addresses contain only trytes
     * - `INVALID_TAG`: Make sure that the tags contain only trytes
     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors) 
     */
    return function findTransactionObjects(
        query: FindTransactionsQuery,
        callback?: Callback<ReadonlyArray<Transaction>>
    ): Promise<ReadonlyArray<Transaction>> {
        return findTransactions(query)
            .then(getTransactionObjects)
            .asCallback(callback)
    }
}
