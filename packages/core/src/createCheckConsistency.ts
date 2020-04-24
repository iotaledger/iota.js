import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { isHash, validate } from '../../guards'
import {
    asArray,
    Callback,
    CheckConsistencyCommand,
    CheckConsistencyResponse,
    getOptionsWithDefaults,
    Hash,
    IRICommand,
    Provider,
} from '../../types'

export interface CheckConsistencyOptions {
    rejectWithReason?: boolean
}

const defaults = {
    rejectWithReason: false,
}

/**
 * @method createCheckConsistency
 * 
 * @summary Creates a new `checkConsistency()` method, using a custom Provider instance.
 *
 * @memberof module:core
 * 
 * @ignore
 *
 * @param {Provider} provider - The Provider object that the method should use to call the node's API endpoints.
 *
 * @return {Function} [`checkConsistency`]{@link #module_core.checkConsistency}  - A new `checkConsistency()` function that uses your chosen Provider instance.
 */
export const createCheckConsistency = ({ send }: Provider) =>
    /**
     * This method finds out if a transaction has a chance of being confirmed, using the connected node's
     * [`checkConsistency`](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference#checkconsistency) endpoint.
     * 
     * A consistent transaction is one where:
     * - The node has the transaction's branch and trunk transactions in its ledger
     * - The transaction's bundle is valid
     * - The transaction's branch and trunk transactions are valid
     * 
     * For more information about what makes a bundles and transactions valid, see [this article](https://docs.iota.org/docs/node-software/0.1/iri/concepts/transaction-validation).
     *
     * As long as a transaction is consistent it has a chance of being confirmed.
     * 
     * ## Related methods
     * 
     * If a consistent transaction is taking a long time to be confirmed, you can improve its chances, using the
     * [`promoteTransaction()`]{@link #module_core.promoteTransaction} method.
     * 
     * If a transaction is inconsistent, it will never be confirmed. In this case, you can reattach the transaction, using the [`replayBundle()`]{@link #module_core.replayBundle} method.
     * 
     * @method checkConsistency
     * 
     * @summary Checks if one or more transactions are consistent.
     * 
     * @memberof module:core
     *
     * @param {Hash|Hash[]} transactions - One or more tail transaction hashes to check
     * @param {Object} [options] - Options object
     * @param {boolean} [options.rejectWithReason] - Return the reason for inconsistent transactions
     * @param {Callback} [callback] - Optional callback function
     * 
     * @example
     * ```js
     * checkConsistency(transactions)
     *   .then(isConsistent => {
     *     isConsistent? console.log(All these transactions are consistent): console.log(One or more of these transactions are inconsistent);
     *   })
     *   .catch(err => {
     *     console.log(`Something went wrong: ${error}`);
     *   })
     * ```
     *
     * @return {Promise}
     * 
     * @fulfil {boolean} isConsistent - Whether the given transactions are consistent
     * 
     * @reject {Error} error - An error that contains one of the following:
     * - `INVALID_TRANSACTION_HASH`: Make sure the tail transaction hashes are 81 trytes long and their `currentIndex` field is 0
     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors) 
     * - Reason for inconsistency if the method was called with the `options.rejectWithReason` argument
     */
    function checkConsistency(
        transactions: Hash | ReadonlyArray<Hash>,
        options?: CheckConsistencyOptions,
        callback?: Callback<boolean>
    ): Promise<boolean> {
        const { rejectWithReason } = getOptionsWithDefaults(defaults)(options || {})
        const tails = asArray(transactions)

        return Promise.resolve(validate([tails, arr => arr.every(isHash), errors.INVALID_TRANSACTION_HASH]))
            .then(() =>
                send<CheckConsistencyCommand, CheckConsistencyResponse>({
                    command: IRICommand.CHECK_CONSISTENCY,
                    tails,
                })
            )
            .then(({ state, info }) => {
                if (rejectWithReason && !state) {
                    throw new Error(errors.inconsistentTransaction(info))
                }

                return state
            })
            .asCallback(typeof arguments[1] === 'function' ? arguments[1] : callback)
    }
