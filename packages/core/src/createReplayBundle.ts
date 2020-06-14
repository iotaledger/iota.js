import { asFinalTransactionTrytes } from '@iota/transaction-converter'
import * as Promise from 'bluebird'
import {
    AttachToTangle,
    Bundle,
    Callback,
    Hash,
    Provider,
    Transaction, // tslint:disable-line no-unused-variable
} from '../../types'
import { createGetBundle, createSendTrytes } from './'

/**
 * @method createReplayBundle
 *
 * @memberof module:core
 *
 * @ignore
 * 
 * @param {Provider} provider - Network provider
 *
 * @return {Function} {@link #module_core.replayBundle `replayBundle`}
 */
export const createReplayBundle = (provider: Provider, attachFn?: AttachToTangle) => {
    const getBundle = createGetBundle(provider)
    const sendTrytes = createSendTrytes(provider, attachFn)

    /**
     * This method [reattaches](https://docs.iota.org/docs/getting-started/0.1/transactions/reattach-rebroadcast-promote#reattach) a bundle to the Tangle by calling the [`sendTrytes()`]{@link #module_core.sendTrytes} method.
     * 
     * You can call this function as many times as you need until one of the bundles becomes confirmed.
     * 
     * ## Related methods
     * 
     * Before you call this method, it's worth finding out if you can promote it by calling the [`isPromotable()`]{@link #module_core.isPromotable} method.
     *
     * @method replayBundle
     * 
     * @summary Reattaches a bundle to the Tangle.
     *
     * @memberof module:core
     *
     * @param {Hash} tail - Tail transaction hash
     *
     * @param {number} depth - The [depth](https://docs.iota.org/docs/getting-started/0.1/transactions/depth) at which to start the weighted random walk. The [Trinity wallet](https://trinity.iota.org/) uses a value of `3`,
     * meaning that the weighted random walk starts 3 milestones in the past.
     *
     * @param {number} minWeightMagnitude - The [minimum weight magnitude](https://docs.iota.org/docs/getting-started/0.1/network/minimum-weight-magnitude) to use for proof of work. **Note:** This value must be at least the same as the minimum weight magnitude of the branch and trunk transactions.
     *
     * @param {Callback} [callback] - Optional callback function
     * 
     * @example
     * 
     * ```js
     * iota.replayBundle(tailTransactionHash)
     *   .then(bundle => {
     *     console.log(`Successfully reattached ${tailTransactionHash}`);
     *     console.log(JSON.stringify(bundle));
     *   }).catch(error => {
     *     console.log(`Something went wrong: ${error}`)
     *   })
     * ```
     *
     * @returns {Promise}
     * 
     * @fulfil {Transaction[]} bundle - Array of transaction objects in the reattached bundle
     * 
     * @reject {Error} error - An error that contains one of the following:
     * - `INVALID_DEPTH`: Make sure that the `depth` argument is greater than zero
     * - `INVALID_MIN_WEIGHT_MAGNITUDE`: Make sure that the minimum weight magnitude is at least the same as the original bundle
     * - `INVALID_TRANSACTION_HASH`: Make sure the tail transaction hash is 81 trytes long and its `currentIndex` field is 0
     * - `INVALID_BUNDLE`: Check the tail transaction's bundle for the following:
     *   - Addresses in value transactions have a 0 trit at the end, which means they were generated using the Kerl hashing function
     *   - Transactions in the bundle array are in the same order as their currentIndex field
     *   - The total value of all transactions in the bundle sums to 0
     *   - The bundle hash is valid
     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors) 
     */
    return function replayBundle(
        tail: Hash,
        depth: number,
        minWeightMagnitude: number,
        reference?: Hash,
        callback?: Callback<Bundle>
    ): Promise<Bundle> {
        return getBundle(tail)
            .then(bundle => asFinalTransactionTrytes(bundle))
            .then(trytes => sendTrytes(trytes, depth, minWeightMagnitude, reference))
            .asCallback(typeof arguments[3] === 'function' ? arguments[3] : callback)
    }
}
