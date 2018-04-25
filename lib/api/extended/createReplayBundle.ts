import * as Promise from 'bluebird'
import * as errors from '../../errors'

import { asFinalTransactionTrytes, hashValidator, integerValidator, mwmValidator, validate } from '../../utils'
import { AttachToTangle, Bundle, Callback, Provider, Transaction, Trytes } from '../types'
import { createGetBundle, createSendTrytes } from './index'

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
     * Replays a transfer by doing Proof of Work again
     * 
     * @example
     * 
     * replayBundle(tail)
     *      .then(transactions => {
     *          // ...
     *      })
     *      .catch(err => {
     *          // handle errors
     *      })
     * })
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
    return (
        tail: string,
        depth: number,
        minWeightMagnitude: number,
        callback?: Callback<Bundle>
    ): Promise<Bundle> =>
        Promise.resolve(validate(hashValidator(tail), integerValidator(depth), mwmValidator(minWeightMagnitude)))
            .then(() => getBundle(tail))
            .then(bundle => asFinalTransactionTrytes(bundle))
            .then(trytes => sendTrytes(trytes, depth, minWeightMagnitude))
            .asCallback(callback)
}
