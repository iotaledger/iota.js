import { TRYTE_WIDTH, trytesToTrits } from '@iota/converter'
import { isTransaction, TRANSACTION_HASH_LENGTH, TRANSACTION_LENGTH } from '@iota/transaction'
import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { isTrytesOfExactLength, validate } from '../../guards'
import {
    AttachToTangle,
    AttachToTangleCommand,
    AttachToTangleResponse,
    Callback,
    Hash,
    IRICommand,
    Provider,
    Trytes,
} from '../../types'

/**
 * @method createAttachToTangle
 *
 * @summary Creates a new `attachToTangle()` method, using a custom Provider instance.
 * 
 * @memberof module:core
 * 
 * @ignore
 *
 * @param {Provider} provider - The Provider object that the method should use to call the node's API endpoints.
 *
 * @return {Function} [`attachToTangle`]{@link #module_core.attachToTangle} - A new `attachToTangle()` function that uses your chosen Provider instance.
 */
export const createAttachToTangle = ({ send }: Provider): AttachToTangle => {
    /**
     * This method uses the connected IRI node's [`attachToTangle`](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference#attachToTangle) endpoint to chain the given transaction trytes into a bundle and do proof of work. 
     * 
     * By doing proof of work, this method overwrites the following transaction fields:
     *  - `hash`
     *  - `nonce`
     *  - `attachmentTimestamp`
     *  - `attachmentTimestampLowerBound`
     *  - `attachmentTimestampUpperBound`
     *
     * **Note:** You can replace this method with your own custom one in the [`composeApi()`]{@link ##module_core.composeApi} method. For example, you may want to write a function that does local proof of work, using either the [`ccurl.interface.js`](https://github.com/iotaledger/ccurl.interface.js) NodeJS library,
     * or the [`curl.lib.js`](https://github.com/iotaledger/curl.lib.js) library for browsers that support WebGL2.
     * 
     * ## Related methods
     * 
     * To attach the returned transaction trytes to the Tangle, use the [`broadcastTransactions()`]{@link #module_core.broadcastTransactions} method to send them to a node.
     * 
     * You can get a trunk and branch transaction hash by calling the
     * [`getTransactionsToApprove()`]{@link #module_core.getTransactionsToApprove} method
     * 
     * @method attachToTangle
     * 
     * @summary Connects the given transaction trytes into a bundle and sends them to the connected IOTA node to complete [remote proof of work](https://docs.iota.org/docs/getting-started/0.1/transactions/proof-of-work). 
     * 
     * @memberof module:core
     *
     * @param {Hash} trunkTransaction - Trunk transaction hash 
     * @param {Hash} branchTransaction - Branch transaction hash
     * @param {number} minWeightMagnitude - The [minimum weight magnitude](https://docs.iota.org/docs/getting-started/0.1/network/minimum-weight-magnitude) to use for proof of work. **Note:** This value must be at least the same as the minimum weight magnitude of the branch and trunk transactions.
     * @param {TransactionTrytes[]} trytes - Array of transaction trytes in head first order, which are returned by the [`prepareTransfers()`]{@link #module_core.prepareTransfers} method
     * @param {Callback} [callback] - Optional callback function
     *
     * @example
     *
     * ```js
     * getTransactionsToApprove(depth)
     *   .then(({ trunkTransaction, branchTransaction }) =>
     *     attachToTangle(trunkTransaction, branchTransaction, minWeightMagnitude, trytes)
     *   )
     *   .then(attachedTrytes => {
     *     console.log(`Successfully did proof of work. Here are your bundle's transaction trytes: ${attachedTrytes}`)
     *   }).catch(error => {
     *     console.log(`Something went wrong: ${error}`)
     *   })
     * ```
     *
     * @return {Promise}
     * 
     * @fulfil {TransactionTrytes[]} attachedTrytes - Array of transaction trytes in tail-first order. To attach these transactions to the Tangle, pass the trytes to the [`broadcastTransactions()`]{@link #module_core.broadcastTransactions} method.
     * 
     * @reject {Error} error - One of the following errors:
     * - `INVALID_TRUNK_TRANSACTION`: Make sure that the hash contains 81 trytes
     * - `INVALID_BRANCH_TRANSACTION`: Make sure that the hash contains 81 trytes
     * - `INVALID_MIN_WEIGHT_MAGNITUDE`: Make sure that the minimum weight magnitude is at least the same as the one used for the branch and trunk transactions.
     * - `INVALID_TRANSACTION_TRYTES`: Make sure the trytes can be converted to a valid transaction object
     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors) 
     */
    return function attachToTangle(
        trunkTransaction: Hash,
        branchTransaction: Hash,
        minWeightMagnitude: number,
        trytes: ReadonlyArray<Trytes>,
        callback?: Callback<ReadonlyArray<Trytes>>
    ): Promise<ReadonlyArray<Trytes>> {
        return Promise.resolve(
            validate(
                [
                    trunkTransaction,
                    t => isTrytesOfExactLength(t, TRANSACTION_HASH_LENGTH / TRYTE_WIDTH),
                    errors.INVALID_TRUNK_TRANSACTION,
                ],
                [
                    branchTransaction,
                    t => isTrytesOfExactLength(t, TRANSACTION_HASH_LENGTH / TRYTE_WIDTH),
                    errors.INVALID_BRANCH_TRANSACTION,
                ],
                [
                    minWeightMagnitude,
                    mwm => Number.isInteger(mwm) && mwm <= TRANSACTION_HASH_LENGTH,
                    errors.INVALID_MIN_WEIGHT_MAGNITUDE,
                ],
                [
                    trytes,
                    arr =>
                        arr.every(
                            (t: Trytes) =>
                                isTrytesOfExactLength(t, TRANSACTION_LENGTH / TRYTE_WIDTH) &&
                                isTransaction(trytesToTrits(t))
                        ),
                    errors.INVALID_TRANSACTION_TRYTES,
                ]
            )
        )
            .then(() =>
                send<AttachToTangleCommand, AttachToTangleResponse>({
                    command: IRICommand.ATTACH_TO_TANGLE,
                    trunkTransaction,
                    branchTransaction,
                    minWeightMagnitude,
                    trytes,
                })
            )
            .then(res => res.trytes)
            .asCallback(typeof arguments[2] === 'function' ? arguments[2] : callback)
    }
}
