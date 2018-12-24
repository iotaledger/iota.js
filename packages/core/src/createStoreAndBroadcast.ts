import * as Promise from 'bluebird'
import { Callback, Provider, Trytes } from '../../types'
import { createBroadcastTransactions, createStoreTransactions } from './'

/**
 * @method createStoreAndBroadcast
 *
 * @memberof module:core
 *
 * @param {Provider} provider
 *
 * @return {function} {@link #module_core.storeAndBroadcast `storeAndBroadcast`}
 */
export const createStoreAndBroadcast = (provider: Provider) => {
    const storeTransactions = createStoreTransactions(provider)
    const broadcastTransactions = createBroadcastTransactions(provider)

    /**
     * Stores and broadcasts a list of _attached_ transaction trytes by calling
     * [`storeTransactions`]{@link #module_core.storeTransactions} and
     * [`broadcastTransactions`]{@link #module_core.broadcastTransactions}.
     *
     * **Note:** Persist the transaction trytes in local storage __before__ calling this command, to ensure
     * that reattachment is possible, until your bundle has been included.
     *
     * Any transactions stored with this command will eventaully be erased, as a result of a snapshot.
     *
     * @method storeAndBroadcast
     *
     * @memberof module:core
     *
     * @param {Array<Trytes>} trytes - Attached transaction trytes
     * @param {Callback} [callback] - Optional callback
     *
     * @return {Promise<Trytes[]>}
     * @fulfil {Trytes[]} Attached transaction trytes
     * @reject {Error}
     * - `INVALID_ATTACHED_TRYTES`: Invalid attached trytes
     * - Fetch error
     */
    return (
        trytes: ReadonlyArray<Trytes>,
        callback?: Callback<ReadonlyArray<Trytes>>
    ): Promise<ReadonlyArray<Trytes>> =>
        storeTransactions(trytes)
            .then(broadcastTransactions)
            .asCallback(callback)
}
