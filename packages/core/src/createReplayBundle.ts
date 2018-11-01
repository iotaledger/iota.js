import { transactionHashValidator } from '@iota/transaction'
import { asFinalTransactionTrytes } from '@iota/transaction-converter'
import * as Promise from 'bluebird'
import { depthValidator, minWeightMagnitudeValidator, validate } from '../../guards'
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
     * Reattaches a transfer to tangle by selecting tips & performing the Proof-of-Work again.
     * Reattachments are usefull in case original transactions are pending, and can be done securely
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
     * Currently is `14` on mainnet & spamnnet and `9` on most other testnets.
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
        return Promise.resolve(
            validate(
                transactionHashValidator(tail),
                depthValidator(depth),
                minWeightMagnitudeValidator(minWeightMagnitude)
            )
        )
            .then(() => getBundle(tail))
            .then(bundle => asFinalTransactionTrytes(bundle))
            .then(trytes => sendTrytes(trytes, depth, minWeightMagnitude, reference))
            .asCallback(typeof arguments[3] === 'function' ? arguments[3] : callback)
    }
}
