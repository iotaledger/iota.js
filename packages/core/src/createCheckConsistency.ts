import * as Promise from 'bluebird'
import { hashArrayValidator, validate } from '@iota/validators'
import {
    asArray,
    Callback,
    CheckConsistencyCommand,
    CheckConsistencyResponse,
    Hash,
    IRICommand,
    Provider,
} from '../../types'

/**
 * @method createCheckConsistency
 *
 * @memberof module:core
 *
 * @param {Provider} provider - Network provider
 *
 * @return {function} {@link #module_core.checkConsistency `checkConsistency`}
 */
export const createCheckConsistency = ({ send }: Provider) =>
    /**
     * Checks if a transaction is _consistent_ or a set of transactions are _co-consistent_, by calling
     * [`checkConsistency`](https://docs.iota.org/iri/api#endpoints/checkConsistency) command.
     * _Co-consistent_ transactions and the transactions that they approve (directly or inderectly),
     * are not conflicting with each other and rest of the ledger.
     *
     * As long as a transaction is consistent it might be accepted by the network.
     * In case transaction is inconsistent, it will not be accepted, and a reattachment
     * is required by calling [`replaybundle`]{@link #module_core.replayBundle}.
     *
     * @example
     *
     * ```js
     * checkConsistency(tailHash)
     *   .then(isConsistent => {
     *     // ...
     *   })
     *   .catch(err => {
     *     // ...
     *   })
     * ```
     *
     * @example
     * ##### Example with `checkConsistency` & `isPromotable`
     *
     * Consistent transactions might remain pending due to networking issues,
     * or if not referenced by recent milestones issued by
     * [Coordinator](https://docs.iota.org/introduction/tangle/consensus).
     * Therefore `checkConsistency` with a time heuristic can determine
     * if a transaction should be [_promoted_]{@link promoteTransaction}
     * or [_reattached_]{@link replayBundle}.
     * This functionality is abstracted in [`isPromotable`]{@link isPromotable}.
     *
     * ```js
     * const isAboveMaxDepth = attachmentTimestamp => (
     *    // Check against future timestamps
     *    attachmentTimestamp < Date.now() &&
     *    // Check if transaction wasn't issued before last 6 milestones
     *    // Milestones are being issued every ~2mins
     *    Date.now() - attachmentTimestamp < 11 * 60 * 1000
     * )
     *
     * const isPromotable = ({ hash, attachmentTimestamp }) => (
     *   checkConsistency(hash)
     *      .then(isConsistent => (
     *        isConsistent &&
     *        isAboveMaxDepth(attachmentTimestamp)
     *      ))
     * )
     * ```
     *
     * @method checkConsistency
     *
     * @memberof module:core
     *
     * @param {Hash|Hash[]} transactions - Tail transaction hash (hash of transaction
     * with `currentIndex=0`), or array of tail transaction hashes.
     * @param {Callback} [callback] - Optional callback.
     *
     * @return {Promise}
     * @fulfil {boolean} Consistency state of given transaction or co-consistency of given transactions.
     * @reject {Error}
     * - `IVNALID_HASH_ARRAY`: Invalid array of hashes
     * - Fetch error
     */
    function checkConsistency(
        transactions: Hash | ReadonlyArray<Hash>,
        callback?: Callback<boolean>
    ): Promise<boolean> {
        return Promise.resolve(validate(hashArrayValidator(asArray(transactions))))
            .then(() =>
                send<CheckConsistencyCommand, CheckConsistencyResponse>({
                    command: IRICommand.CHECK_CONSISTENCY,
                    transactions: asArray(transactions),
                })
            )
            .then(({ state }) => state)
            .asCallback(callback)
    }
