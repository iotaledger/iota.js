import { asTransactionObject } from '@iota/transaction-converter'
import * as Promise from 'bluebird'
import {
    AttachToTangle,
    Bundle,
    Callback,
    Hash,
    Provider,
    Transaction, // tslint:disable-line no-unused-variable
    Trytes,
} from '../../types'
import { createAttachToTangle, createGetTransactionsToApprove, createStoreAndBroadcast } from './'

/**
 * @method createSendTrytes
 *
 * @memberof module:core
 * 
 * @ignore
 *
 * @param {Provider} provider - Network provider
 *
 * @return {Function} {@link #module_core.sendTrytes `sendTrytes`}
 */
export const createSendTrytes = (provider: Provider, attachFn?: AttachToTangle) => {
    const getTransactionsToApprove = createGetTransactionsToApprove(provider)
    const storeAndBroadcast = createStoreAndBroadcast(provider)
    const attachToTangle = attachFn || createAttachToTangle(provider)

    /**
     * This method takes an array of transaction trytes that don't include a proof of work or 
     * 
     * Then, the method calls the following to finalize the bundle and send it to the node:
     * - [`getTransactionsToApprove()`]{@link #module_core.getTransactionsToApprove}
     * - [`attachToTangle()`]{@link #module_core.attachToTangle}
     * - [`storeAndBroadcast()`]{@link #module_core.storeAndBroadcast}
     *
     * **Note:** Before calling this method, we recommend saving your transaction trytes in local storage.
     * By doing so, you make sure that you can always reattach your transactions to the Tangle in case they remain in a pending state. 
     * 
     * ## Related methods
     * 
     * To create transaction trytes that don't include a proof of work or trunk and branch transactions, use the [`prepareTransfers()`]{@link #module_core.prepareTransfers} method.
     *
     * @method sendTrytes
     * 
     * @summary Does tip selection and proof of work for a bundle of transaction trytes before sending the final transactions to the connected IRI node.
     *
     * @memberof module:core
     *
     * @param {Trytes[]} trytes - Array of prepared transaction trytes to attach, store, and send
     *
     * @param {number} depth - The [depth](https://docs.iota.org/docs/getting-started/0.1/transactions/depth) at which to start the weighted random walk. The [Trinity wallet](https://trinity.iota.org/) uses a value of `3`,
     * meaning that the weighted random walk starts 3 milestones in the past.
     *
     * @param {number} minWeightMagnitude - The [minimum weight magnitude](https://docs.iota.org/docs/getting-started/0.1/network/minimum-weight-magnitude) to use for proof of work. **Note:** This value must be at least the same as the minimum weight magnitude of the branch and trunk transactions.
     *
     * @param {string} [reference] - Optional reference transaction hash
     *
     * @param {Callback} [callback] - Optional callback function
     * 
     * @example
     * ```js
     * prepareTransfers(seed, transfers)
     *   .then(trytes => {
     *      return iota.sendTrytes(trytes, depth, minWeightMagnitude)
     *   })
     *   .then(bundle => {
     *     console.log(`Successfully attached transactions to the Tangle`);
     *     console.log(JSON.stringify(bundle));
     *   }).catch(error => {
     *     console.log(`Something went wrong: ${error}`)
     *   })
     * ```
     *
     * @return {Promise}
     * 
     * @fulfil {Transaction[]} bundle - Array of transaction objects that you just sent to the node
     * 
     * @reject {Error} error - An error that contains one of the following:
     * - `INVALID_TRANSACTION_TRYTES`: Make sure the trytes can be converted to a valid transaction object
     * - `INVALID_DEPTH`: Make sure that the `depth` argument is greater than zero
     * - `INVALID_MIN_WEIGHT_MAGNITUDE`: Make sure that the minimum weight magnitude is at least the same as the original bundle
     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors) 
     */
    return function sendTrytes(
        trytes: ReadonlyArray<Trytes>,
        depth: number,
        minWeightMagnitude: number,
        reference?: Hash,
        callback?: Callback<Bundle>
    ): Promise<Bundle> {
        if (reference && typeof reference === 'function') {
            callback = reference
            reference = undefined
        }

        return getTransactionsToApprove(depth, reference)
            .then(({ trunkTransaction, branchTransaction }) =>
                attachToTangle(trunkTransaction, branchTransaction, minWeightMagnitude, trytes)
            )
            .then(attachedTrytes => storeAndBroadcast(attachedTrytes))
            .then(attachedTrytes => attachedTrytes.map(t => asTransactionObject(t)))
            .asCallback(typeof arguments[3] === 'function' ? arguments[3] : callback)
    }
}
