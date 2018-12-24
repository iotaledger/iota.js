import { asTransactionObject } from '@iota/transaction-converter'
import * as Promise from 'bluebird'
import { depthValidator, hashValidator, validate } from '../../guards'
import { Callback, Hash, Provider } from '../../types'
import { createCheckConsistency, createGetTrytes } from './'

const MILESTONE_INTERVAL = 2 * 60 * 1000
const ONE_WAY_DELAY = 1 * 60 * 1000
const DEPTH = 6

export const isAboveMaxDepth = (attachmentTimestamp: number, depth = DEPTH) =>
    attachmentTimestamp < Date.now() && Date.now() - attachmentTimestamp < depth * MILESTONE_INTERVAL - ONE_WAY_DELAY

/**
 *
 * @method createIsPromotable
 *
 * @memberof module:core
 *
 * @param {Provider} provider - Network provider
 *
 * @param {number} [depth=6] - Depth up to which promotion is effective.
 *
 * @return {function} {@link #module_core.isPromotable `isPromotable`}
 */
export const createIsPromotable = (provider: Provider, depth = DEPTH) => {
    const checkConsistency = createCheckConsistency(provider)
    const getTrytes = createGetTrytes(provider)

    /**
     * Checks if a transaction is _promotable_, by calling [`checkConsistency`]{@link #module_core.checkConsistency} and
     * verifying that `attachmentTimestamp` is above a lower bound.
     * Lower bound is calculated based on number of milestones issued
     * since transaction attachment.
     *
     * @example
     * #### Example with promotion and reattachments
     *
     * Using `isPromotable` to determine if transaction can be [_promoted_]{@link #module_core.promoteTransaction}
     * or should be [_reattached_]{@link #module_core.replayBundle}
     *
     * ```js
     * // We need to monitor inclusion states of all tail transactions (original tail & reattachments)
     * const tails = [tail]
     *
     * getLatestInclusion(tails)
     *   .then(states => {
     *     // Check if none of transactions confirmed
     *     if (states.indexOf(true) === -1) {
     *       const tail = tails[tails.length - 1] // Get latest tail hash
     *
     *       return isPromotable(tail)
     *         .then(isPromotable => isPromotable
     *           ? promoteTransaction(tail, 3, 14)
     *           : replayBundle(tail, 3, 14)
     *             .then(([reattachedTail]) => {
     *               const newTailHash = reattachedTail.hash
     *
     *               // Keeping track of all tail hashes to check confirmation
     *               tails.push(newTailHash)
     *
     *               // Promote the new tail...
     *             })
     *     }
     *   }).catch(err => {
     *     // ...
     *   })
     * ```
     *
     * @method isPromotable
     *
     * @memberof module:core
     *
     * @param {Hash} tail - Tail transaction hash
     * @param {Callback} [callback] - Optional callback
     *
     * @return {Promise}
     * @fulfil {boolean} Consistency state of transaction or co-consistency of transactions
     * @reject {Error}
     * - `INVALID_HASH`: Invalid hash
     * - `INVALID_DEPTH`: Invalid depth
     * - Fetch error
     */
    return (tail: Hash, callback?: Callback<boolean>): Promise<boolean> =>
        Promise.resolve(validate(hashValidator(tail), depthValidator(depth)))
            .then(() =>
                Promise.all([
                    checkConsistency(tail),
                    getTrytes([tail]).then(([trytes]) => asTransactionObject(trytes, tail).attachmentTimestamp),
                ])
            )
            .then(([isConsistent, attachmentTimestamp]) => isConsistent && isAboveMaxDepth(attachmentTimestamp, depth))
            .asCallback(callback)
}
