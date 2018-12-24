import { transactionTrytesValidator } from '@iota/transaction'
import { asTransactionObject } from '@iota/transaction-converter'
import * as Promise from 'bluebird'
import { arrayValidator, depthValidator, minWeightMagnitudeValidator, validate } from '../../guards'
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
 * @param {Provider} provider - Network provider
 *
 * @return {Function} {@link #module_core.sendTrytes `sendTrytes`}
 */
export const createSendTrytes = (provider: Provider, attachFn?: AttachToTangle) => {
    const getTransactionsToApprove = createGetTransactionsToApprove(provider)
    const storeAndBroadcast = createStoreAndBroadcast(provider)
    const attachToTangle = attachFn || createAttachToTangle(provider)

    /**
     * [Attaches to tanlge]{@link #module_core.attachToTangle}, [stores]{@link #module_core.storeTransactions}
     * and [broadcasts]{@link #module_core.broadcastTransactions} a list of transaction trytes.
     *
     * **Note:** Persist the transaction trytes in local storage __before__ calling this command, to ensure
     * that reattachment is possible, until your bundle has been included.
     *
     * @example
     * ```js
     * prepareTransfers(seed, transfers)
     *   .then(trytes => {
     *      // Persist trytes locally before sending to network.
     *      // This allows for reattachments and prevents key reuse if trytes can't
     *      // be recovered by querying the network after broadcasting.
     *
     *      return iota.sendTrytes(trytes, depth, minWeightMagnitude)
     *   })
     *   .then(transactions => {
     *     // ...
     *   })
     *   .catch(err => {
     *     // ...
     *   })
     * ```
     *
     * @method sendTrytes
     *
     * @memberof module:core
     *
     * @param {Trytes[]} trytes - List of trytes to attach, store & broadcast
     * @param {number} depth - Depth
     * @param {number} minWeightMagnitude - Min weight magnitude
     * @param {string} [reference] - Optional reference hash
     * @param {Callback} [callback] - Optional callback
     *
     * @return {Promise}
     * @fulfil {Transaction[]}  Returns list of attached transactions
     * @reject {Error}
     * - `INVALID_TRANSACTION_TRYTES`
     * - `INVALID_DEPTH`
     * - `INVALID_MIN_WEIGHT_MAGNITUDE`
     * - Fetch error, if connected to network
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

        return Promise.resolve(
            validate(
                arrayValidator(transactionTrytesValidator)(trytes),
                depthValidator(depth),
                minWeightMagnitudeValidator(minWeightMagnitude)
            )
        )
            .then(() => getTransactionsToApprove(depth, reference))
            .then(({ trunkTransaction, branchTransaction }) =>
                attachToTangle(trunkTransaction, branchTransaction, minWeightMagnitude, trytes)
            )
            .tap(attachedTrytes => storeAndBroadcast(attachedTrytes))
            .then(attachedTrytes => attachedTrytes.map(t => asTransactionObject(t)))
            .asCallback(typeof arguments[3] === 'function' ? arguments[3] : callback)
    }
}
