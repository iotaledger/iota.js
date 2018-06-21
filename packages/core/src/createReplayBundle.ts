import * as Promise from 'bluebird'
import { asFinalTransactionTrytes } from '@iota/transaction-converter'
import { hashValidator, integerValidator, mwmValidator, validate } from '@iota/validators'
import { createGetBundle, createSendTrytes } from './'
import { AttachToTangle, Bundle, Callback, Hash, Provider, Transaction } from '../../types'

/**
 * @method createReplayBundle 
 * 
 * @param {Provider} provider - Network provider
 * 
 * @return {Function} {@link replayBundle}
 */
export const createReplayBundle = (provider: Provider, attachFn?: AttachToTangle) => {
    const getBundle = createGetBundle(provider)
    const sendTrytes = createSendTrytes(provider, attachFn)

    /**
     * Reattaches a transfer to tangle by selecting tips & performing the Proof-of-Work again.
     * Reattachments are usefull in case original transactions are pending, and can be done securely
     * as many times as needed.
     * 
     * ### Example
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
     * @param {Hash} tail - Tail transaction hash. Tail transaction is the transaction in the bundle with
     * `currentIndex == 0`.
     * 
     * @param {number} depth - The depth at which Random Walk starts. A value of `3` is typically used by wallets,
     * meaning that RW starts 3 milestones back.
     * 
     * @param {number} minWeightMagnitude - Minimum number of trailing zeros in transaction hash. This is used by
     * {@link AttachToTangle} function to search for a valid `nonce`.
     * Currently is `14` on mainnet and `9` on testnet. 
     * 
     * @param {Callback} [callback] - Optional callback
     * 
     * @returns {Promise}
     * @fulfil {Transaction[]}
     * @reject {Error}
     * - `INVALID_DEPTH`
     * - `INVALID_MIN_WEIGHT_MAGNITUDE`
     * - `INVALID_HASH`
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
            validate(hashValidator(tail), integerValidator(depth), mwmValidator(minWeightMagnitude))
        )
            .then(() => getBundle(tail))
            .then(bundle => asFinalTransactionTrytes(bundle))
            .then(trytes => sendTrytes(trytes, depth, minWeightMagnitude, reference))
            .asCallback(typeof arguments[3] === 'function' ? arguments[3] : callback)
    }
}
