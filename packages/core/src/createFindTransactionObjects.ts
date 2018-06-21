import * as Promise from 'bluebird'
import { createFindTransactions, createGetTransactionObjects, FindTransactionsQuery } from './'
import { Callback, Provider, Transaction } from '../../types'

/**  
 * @method createFindTransactionObjects
 * 
 * @param {Provider} provider - Network provider for accessing IRI
 *
 * @return {function} {@link findTransactionObjects}
 */
export const createFindTransactionObjects = (provider: Provider) => {
    const findTransactions = createFindTransactions(provider)
    const getTransactionObjects = createGetTransactionObjects(provider)

    /**
     * Wrapper function for `{@link findTransactions}` and `{@link getTrytes}`.
     * Searches for transactions given a `query` object with `addresses`, `tags` and `approvees` fields.
     * Multiple query fields are supported and `findTransactionObjects` returns intersection of results.
     *
     * ### Example
     * Searching for transactions by address:
     * 
     * ```js
     * findTransactionObjects({ addresses: ['ADR...'] })
     *    .then(transactions => {
     *        // ...
     *    })
     *    .catch(err => { 
     *        // ...
     *    })
     * ```
     *
     * @method findTransactionObjects
     *
     * @param {object} query
     * @param {Array<Hash>} [query.addresses] - List of addresses 
     * @param {Callback} [callback] - Optional callback
     * 
     * @returns {Promise}
     * @fulfil {Transaction[]} Array of transaction objects 
     * @reject {Error}
     * - `INVALID_HASH_ARRAY`: Invalid hashes of addresses, approvees of bundles
     * - `INVALID_TAG_ARRAY`: Invalid tags
     * - Fetch error
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
