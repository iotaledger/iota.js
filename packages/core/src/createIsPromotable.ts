import * as Promise from 'bluebird'
import { asTransactionObject, depthValidator, hashValidator, integerValidator, validate } from '@iota/utils'
import { createCheckConsistency, createGetTrytes } from './'
import { Callback, Hash, Provider } from './types'

const MILESTONE_INTERVAL = 2 * 60 * 1000
const ONE_WAY_DELAY = 1 * 60 * 1000
const MAX_DEPTH = 6

export const isAboveMaxDepth = (
    attachmentTimestamp: number,
    maxDepth = 6
) => {
    validate(integerValidator(attachmentTimestamp), depthValidator(maxDepth))

    return (attachmentTimestamp < Date.now()) &&
        ((Date.now() - attachmentTimestamp) < (maxDepth * (MILESTONE_INTERVAL - ONE_WAY_DELAY)))
}

/**
 *  
 * @method createIsPromotable
 * 
 * @param {Provider} provider - Network provider
 * 
 * @param {number} [maxDepth=6]
 * 
 * @param maxDepth 
 */
export const createIsPromotable = (provider: Provider, maxDepth?: number) => {
    const checkConsistency = createCheckConsistency(provider)
    const getTrytes = createGetTrytes(provider)

    /**
     * Checks if a transaction _consistent_, by calling 
     * [`checkConsistency`]{@link https://docs.iota.org/iri/api#endpoints/checkConsistency} command and 
     * verifying that promotion can be applied
     * It accepts hashes of _tail_ transactions. A tail is the transaction in the bundle with `currentIndex=0`.
     *
     * As long as a transaction is consistent it is able to be accepted by the network.
     * In case the transaction is inconsistent, it will not be accepted, and a reattachment is required 
     * by calling `{@link replayBundle}`.
     *
     * _Co-consistent_ transactions and the transactions that they approove (directly or inderectly), are not
     * conflicting with each other and rest of the ledger.
     *
     * This method is particularly usefull for promoting pending transactions, which increases their chances
     * of getting accepted. Use it to check if a transaction can be [`promoted`]{@link promoteTransaction}
     * or requires [`reattachment`]{@link replayBundle}.
     *
     * @example
     * ```js
     * import iota from '@iota/core'
     *
     * const { checkConsistency, promoteTransaction } = iota({ provider })
     * 
     * checkConsistency(tailHash)
     *    .then(isConsistent => isConsistent
     *        ? promoteTransaction(tailHash)
     *        : replayBundle(tailHash)
     *            .then(([reattachedTailHash]) => {
     *                // promote the new reattachment
     *            })
     *    )
     *    .catch(err => {
     *        // handle errors here
     *    })
     * ```
     *
     * Note that consistent transactions might be left behind due to networking issues, or if 
     * not referenced by recent milestones issued by
     * [Coordinator]{@link https://docs.iota.org/introduction/tangle/consensus}. 
     * Therefore `checkConsistency` should be used together with a time heuristic to determine
     * if a transaction should be promoted or reattached.
     *
     * ```js
     * const isAboveMaxDepth = attachmentTimestamp =>
     *    // Check against future timestamps
     *    attachmentTimestamp < Date.now() &&
     *    // Check if transaction wasn't issued before last 6 milestones
     *    // Milestones are being issued every ~2mins
     *    Date.now() - attachmentTimestamp < 11 * 60 * 1000
     *
     * checkConsistency(tailHash)
     *    .then(isConsistent => (isConsistent && isAboveMaxDepth)
     *        ? promoteTransaction(tailHash)
     *        : replayBundle(tailHash)
     *    )
     * ```
     *
     * @method checkConsistency
     *
     * @param {Hash|Hash[]} transactions - Tail transaction hash, or array of tail transaction hashes
     * @param {Callback} [callback] - Optional callback
     *
     * @return {Promise}
     * @fulfil {boolean} Consistency state of transaction or co-consistency of transactions
     * @reject {Error}
     * - `IVNALID_HASH_ARRAY`: Invalid array of hashes
     * - Fetch error
     */
    return (tail: Hash, maxDepth?: number) =>
        Promise.resolve(validate(hashValidator(tail), depthValidator(maxDepth)))
            .then(Promise.all(checkConsistency(tail), getTrytes([tail])))
            .then(([isConsistent, trytes]) => {
                const { attachmentTimestamp } = asTransactionObject(trytes, tail)
                return isConsistent && isAboveMaxDepth(attachmentTimestamp, maxDepth)
            })
}