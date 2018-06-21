import * as Promise from 'bluebird'
import { hashValidator, validate } from '@iota/validators'
import { asFinalTransactionTrytes, asTransactionObjects } from '@iota/transaction-converter'
import { createBroadcastTransactions, createGetBundle } from './'
import { Callback, Hash, Provider, Trytes } from '../../types'

/**
 * @method createBroadcastBundle
 * 
 * @param {Provider} provider - Network provider
 *
 * @return {function} {@link broadcastBundle}
 */
export const createBroadcastBundle = (provider: Provider) => {
    const broadcastTransactions = createBroadcastTransactions(provider)
    const getBundle = createGetBundle(provider)

    /**
     * Re-broadcasts all transactions in a bundle given the tail transaction hash.
     * It might be useful when transactions did not properly propagate, 
     * particularly in the case of large bundles.
     * 
     * ### Example
     * ```js
     * broadcastTransactions(tailHash)
     *   .then(transactions => {
     *      // ...
     *   })
     *   .catch(err => {
     *     // ...
     *   })
     * ```
     *  
     * @method broadcastBundle
     *
     * @param {Hash} tailTransactionHash - Tail transaction hash 
     * @param {Callback} [callback] - Optional callback
     *
     * @return {Promise}
     * @fulfil {Transaction[]} List of transaction objects
     * @reject {Error}
     * - `INVALID_HASH`: Invalid tail transaction hash
     * - `INVALID_BUNDLE`: Invalid bundle
     * - Fetch error
     */
    return function broadcastBundle(
        tailTransactionHash: Hash,
        callback?: Callback<ReadonlyArray<Trytes>>
    ): Promise<ReadonlyArray<Trytes>> {
        return Promise.resolve(validate(hashValidator(tailTransactionHash)))
            .then(() => getBundle(tailTransactionHash))
            .then(asFinalTransactionTrytes)
            .then(broadcastTransactions)
            .asCallback(callback)
    }
}
