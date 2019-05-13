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
 * @param {Provider} provider - Network provider
 *
 * @return {Function} {@link #module_core.replayBundle `replayBundle`}
 */
export const createReplayBundle = (provider: Provider, attachFn?: AttachToTangle) => {
    const getBundle = createGetBundle(provider)
    const sendTrytes = createSendTrytes(provider, attachFn)

    /**
     * Reattaches a transfer to the Tangle by selecting tips and performing the Proof-of-Work again.
     * Reattachments are useful in case the original transactions are pending, and can be done securely
     * as many times as needed.
     *
     * @example
     * ```js
     * replayBundle(tail)
     *   .then(transactions => {
     *     // ...
     *   })
     *   .catch(err => {
     *     // ...
     *   })
     * })
     * ```
     *
     * @method replayBundle
     *
     * @memberof module:core
     *
     * @param {Hash} tail - Tail transaction hash. Tail transaction is the transaction in the bundle with
     * `currentIndex == 0`.
     *
     * @param {number} depth - The depth at which Random Walk starts. A value of `3` is typically used by wallets,
     * meaning that RW starts 3 milestones back.
     *
     * @param {number} minWeightMagnitude - Minimum number of trailing zeros in transaction hash. This is used by
     * [`attachToTangle`]{@link #module_core.attachToTangle} function to search for a valid `nonce`.
     * Currently it is `14` on mainnet & spamnet and `9` on most other testnets.
     *
     * @param {Callback} [callback] - Optional callback
     *
     * @returns {Promise}
     * @fulfil {Transaction[]}
     * @reject {Error}
     * - `INVALID_DEPTH`
     * - `INVALID_MIN_WEIGHT_MAGNITUDE`
     * - `INVALID_TRANSACTION_HASH`
     * - `INVALID_BUNDLE`
     * - Fetch error
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
