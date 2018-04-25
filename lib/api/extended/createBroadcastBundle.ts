import * as Promise from 'bluebird'
import * as erros from '../../errors'
import { asFinalTransactionTrytes, hashValidator, validate } from '../../utils'
import { createBroadcastTransactions } from '../core'
import { Callback, Provider, Transaction, Trytes } from '../types'
import { createGetBundle } from './index'

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
     * Re-broadcasts all transactions in a bundle given the tail transaction hash. It might 
     * be needed in case a transaction is missing from the bundle, more common for long bundles.
     * 
     * @method broadcastBundle
     *
     * @param {string} tail - Tail transaction hash 
     * @param {Callback} [callback] - Optional callback
     *
     * @return {Promise}
     * @fulfil {Transaction[]} List of transaction objects
     * @reject {Error}
     * - `INVALID_HASH`: Invalid tail transaction hash
     * - Fetch error
     */
    const broadcastBundle = (tailTransactionHash: string, callback?: Callback<Trytes[]>): Promise<Trytes[]> =>
        Promise.resolve(validate(hashValidator(tailTransactionHash)))
            .then(() => getBundle(tailTransactionHash))
            .then(asFinalTransactionTrytes)
            .then(broadcastTransactions)
            .asCallback(callback)
}
