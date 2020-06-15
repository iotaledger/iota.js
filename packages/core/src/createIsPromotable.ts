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
 * @ignore
 *
 * @param {Provider} provider - Network provider
 *
 * @param {number} [depth=6] - Depth up to which promotion is effective.
 *
 * @return {function} {@link #module_core.isPromotable}
 */
export const createIsPromotable = (provider: Provider, depth = DEPTH) => {
    const checkConsistency = createCheckConsistency(provider)
    const getTrytes = createGetTrytes(provider)

    /**
     * To decide if a transaction can be promoted, this method makes sure that it's [consistent]{@link #module_core.checkConsistency}
     * and that the value of the transaction's `attachmentTimestamp` field is not older than the latest 6 milestones.
     * 
     * ## Related methods
     * 
     * If a transaction is promotable, you can promote it by using the [`promoteTransaction()`]{@link #module_core.promoteTransaction} method.
     * 
     * @method isPromotable
     * 
     * @summary Checks if a given tail transaction hash can be [promoted](https://docs.iota.org/docs/getting-started/0.1/transactions/reattach-rebroadcast-promote#promote).
     * 
     * @memberof module:core
     *
     * @param {Hash} tail - Tail transaction hash
     * @param {Callback} [callback] - Optional callback function
     * 
     * @example
     * ```js
     * isPromotable(tailTransactionHash)
     *   .then(isPromotable => {
     *     isPromotable? console.log(`${tailTransactionHash} can be promoted`):
     *     console.log(`${tailTransactionHash} cannot be promoted. You may want to reattach it.`);
     *   })
     *   .catch(error => {
     *     console.log(`Something went wrong: ${error}`);
     *   })
     * ```
     *
     * @return {Promise}
     * 
     * @fulfil {boolean} isPromotable - Returns `true` if the transaction is promotable or `false` if not.
     * 
     * @reject {Error} error - An error that contains one of the following:
     * - `INVALID_TRANSACTION_HASH`: Make sure the tail transaction hashes are 81 trytes long and their `currentIndex` field is 0
     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors) 
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
