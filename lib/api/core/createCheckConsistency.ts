import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { asArray, hashArrayValidator, validate } from '../../utils'
import { BaseCommand, Callback, IRICommand, Provider, Trytes } from '../types'

export interface CheckConsistencyCommand extends BaseCommand {
    command: IRICommand.CHECK_CONSISTENCY
    transactions: Trytes[]
}

export interface CheckConsistencyResponse {
    state: boolean
}

export const validateCheckConsistency = (transactions: string[]) => validate(hashArrayValidator(transactions))

/**  
 * @method createCheckConsistency
 *
 * @param {Provider} provider - Network provider
 * 
 * @return {function} {@link checkConsistency}
 */
export const createCheckConsistency = (provider: Provider) =>

    /**
     * Checks if a transaction is _consistent_ or a set of transactions are _co-consistent_, by calling 
     * [`checkConsistency`]{@link https://docs.iota.org/iri/api#endpoints/checkConsistency} command.
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
    (transactions: string | string[], callback?: Callback<boolean>): Promise<boolean> => {
        const transactionsArray = asArray(transactions)

        return Promise.resolve(validateCheckConsistency(transactionsArray))
            .then(() =>
                provider.sendCommand<CheckConsistencyCommand, CheckConsistencyResponse>({
                    command: IRICommand.CHECK_CONSISTENCY,
                    transactions: transactionsArray,
                })
            )
            .then((res: CheckConsistencyResponse) => res.state)
            .asCallback(callback)
    }
