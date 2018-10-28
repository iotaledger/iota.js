import * as Promise from 'bluebird'
import { Callback, Provider, Transaction } from '../../types'
import { createFindTransactions, createGetTransactionObjects, FindTransactionsQuery } from './'

/**
 * @method createFindTransactionObjects
 *
 * @memberof module:core
 *
 * @param {Provider} provider - Network provider for accessing IRI
 *
 * @return {function} {@link #module_core.findTransactionObjects `findTransactionObjects`}
 */
export const createFindTransactionObjects = (provider: Provider) => {
    const findTransactions = createFindTransactions(provider)
    const getTransactionObjects = createGetTransactionObjects(provider)

    /**
     * Wrapper function for [`findTransactions`]{@link #module_core.findTransactions} and
     * [`getTrytes`]{@link #module_core.getTrytes}.
     * Searches for transactions given a `query` object with `addresses`, `tags` and `approvees` fields.
     * Multiple query fields are supported and `findTransactionObjects` returns intersection of results.
     *
     * @example
     *
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
     * @memberof module:core
     *
     * @param {object} query
     * @param {Hash[]} [query.addresses] - List of addresses
     * @param {Hash[]} [query.bundles] - List of bundle hashes
     * @param {Tag[]} [query.tags] - List of tags
     * @param {Hash[]} [query.addresses] - List of approvees
     * @param {Callback} [callback] - Optional callback
     *
     * @returns {Promise}
     * @fulfil {Transaction[]} Array of transaction objects
     * @reject {Error}
     * - `INVALID_SEARCH_KEY`
     * - `INVALID_HASH`: Invalid bundle hash
     * - `INVALID_TRANSACTION_HASH`: Invalid approvee transaction hash
     * - `INVALID_ADDRESS`: Invalid address
     * - `INVALID_TAG`: Invalid tag
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
