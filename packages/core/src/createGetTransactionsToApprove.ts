import { TRYTE_WIDTH } from '@iota/converter'
import { TRANSACTION_HASH_LENGTH } from '@iota/transaction'
import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { isTrytesOfExactLength, validate } from '../../guards'
import {
    Callback,
    GetTransactionsToApproveCommand,
    GetTransactionsToApproveResponse,
    Hash,
    IRICommand,
    Provider,
    TransactionsToApprove,
} from '../../types'

/**
 * @method createGetTransactionsToApprove
 * 
 * @summary Creates a new `getTransactionsToApprove()` method, using a custom Provider instance.
 *
 * @memberof module:core
 * 
 * @ignore
 *
 * @param {Provider} provider - The Provider object that the method should use to call the node's API endpoints.
 *
 * @return {Function} [`getTransactionsToApprove`]{@link #module_core.getTransactionsToApprove}  - A new `getTransactionsToApprove()` function that uses your chosen Provider instance.
 */
export const createGetTransactionsToApprove = ({ send }: Provider) =>
    /**
     * This method gets two [consistent]{@link #module_core.checkConsistency} tip transaction hashes that can be used as branch and trunk transactions by calling the connected IRI node's [`getTransactionsToApprove`](https://docs.iota.works/iri/api#endpoints/getTransactionsToApprove) endpoint.
     *
     * To make sure that the tip transactions also directly or indirectly reference another transaction, add that transaction's hash to the `reference` argument.
     * 
     * ## Related methods
     * 
     * You can use the returned transaction hashes to do proof of work on transaction trytes, using the [`attachToTangle()`]{@link #module_core.attachToTangle} method.
     * 
     * @method getTransactionsToApprove
     * 
     * @summary Gets two tip transaction hashes that can be used as branch and trunk transactions.
     *
     * @memberof module:core
     *
     * @param {number} depth - The [depth](https://docs.iota.org/docs/getting-started/0.1/transactions/depth) at which to start the weighted random walk. The [Trinity wallet](https://trinity.iota.org/) uses a value of `3`,
     * meaning that the weighted random walk starts 3 milestones in the past.
     * @param {Hash} [reference] - Optional transaction hash that you want the tip transactions to reference
     * @param {Callback} [callback] - Optional callback function
     * 
     * @example
     *
     * ```js
     * getTransactionsToApprove(3)
     *   .then(transactionsToApprove) => {
     *      console.log(Found the following transaction hashes that you can reference in a new bundle:);
     *      console.log(JSON.stringify(transactionsToApprove));
     *   })
     *   .catch(error => {
     *     console.log(`Something went wrong: ${error}`);
     *   })
     * ```
     *
     * @return {Promise}
     * 
     * @fulfil {Object} transactionsToApprove - An object that contains the following:
     * - trunkTransaction: Transaction hash
     * - branchTransaction: Transaction hash
     * 
     * @reject {Error} error - An error that contains one of the following:
     * - `INVALID_DEPTH`: Make sure that the `depth` argument is greater than zero
     * - `INVALID_REFERENCE_HASH`: Make sure that the reference transaction hash is 81 trytes long
     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors) 
     */
    function getTransactionsToApprove(
        depth: number,
        reference?: Hash,
        callback?: Callback<TransactionsToApprove>
    ): Promise<TransactionsToApprove> {
        return Promise.resolve(
            validate(
                [depth, n => Number.isInteger(n) && n > 0, errors.INVALID_DEPTH],
                !!reference && [
                    reference,
                    t => isTrytesOfExactLength(reference, TRANSACTION_HASH_LENGTH / TRYTE_WIDTH),
                    errors.INVALID_REFERENCE_HASH,
                ]
            )
        )
            .then(() =>
                send<GetTransactionsToApproveCommand, GetTransactionsToApproveResponse>({
                    command: IRICommand.GET_TRANSACTIONS_TO_APPROVE,
                    depth,
                    reference,
                })
            )
            .then(({ trunkTransaction, branchTransaction }: GetTransactionsToApproveResponse) => ({
                trunkTransaction,
                branchTransaction,
            }))
            .asCallback(typeof arguments[1] === 'function' ? arguments[1] : callback)
    }
