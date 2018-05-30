import * as Promise from 'bluebird'
import { hashValidator, validate } from '@iota/validators'
import { asFinalTransactionTrytes, asTransactionObjects } from '@iota/transaction-converter'
import { createBroadcastTransactions, createGetBundle } from './'
import { Callback, Hash, Provider, Transaction, Trytes, GetTrytesCommand } from './types'

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
     * particularly in the case of long bundles.
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
    const broadcastBundle = (
        tailTransactionHash: Hash,
        callback?: Callback<Trytes[]>
    ): Promise<Trytes[]> =>
        Promise.resolve(validate(hashValidator(tailTransactionHash)))
            .then(() => getBundle(tailTransactionHash))
            .then(asFinalTransactionTrytes)
            .then(broadcastTransactions)
            .then(asTransactionObjects)
            .asCallback(callback)
}
