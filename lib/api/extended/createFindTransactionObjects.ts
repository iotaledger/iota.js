import * as Promise from 'bluebird'
import { createFindTransactions, FindTransactionsQuery } from '../core'
import { Callback, Provider, Transaction } from '../types'
import { createGetTransactionObjects } from './'

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
     * Wrapper function for `{@link findTransactions}` and `{@link getTrytes}`. Trytes are being converted and returned as
     * transaction objects.
     * It allows to search for transactions by passing a `query` object with `addresses`, `tags`, `approvees` and `bundles` fields.
     * Multiple query fields are supported and `findTransactions` returns intersection of results.
     *
     * Currently transactions are not searchable by `tag` field. Support will be restored by next snapshot.
     *
     * @example
     * findTransactionObjects({ addresses: ['ADRR...'] })
     *    .then(transactions => {
     *        // ...
     *    })
     *    .catch(err => { 
     *        // handle errors here
     *    })
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
    return (query: FindTransactionsQuery, callback?: Callback<Transaction[]>): Promise<Transaction[]> =>
        findTransactions(query)
            .then(getTransactionObjects)
            .asCallback(callback)
}
