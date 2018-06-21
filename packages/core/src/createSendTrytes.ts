import * as Promise from 'bluebird'
import { asTransactionObject } from '@iota/transaction-converter'
import {
    depthValidator,
    mwmValidator,
    trytesArrayValidator,
    validate,
} from '@iota/validators'
import {
    createAttachToTangle,
    createGetTransactionsToApprove,
    createStoreAndBroadcast,
} from './'
import {
    AttachToTangle,
    Bundle,
    Callback,
    Hash,
    Provider,
    Transaction,
    Trytes
} from '../../types'

export const createSendTrytes = (provider: Provider, attachFn?: AttachToTangle) => {
    const getTransactionsToApprove = createGetTransactionsToApprove(provider)
    const storeAndBroadcast = createStoreAndBroadcast(provider)
    const attachToTangle = attachFn || createAttachToTangle(provider)

    /**
     * [Attaches to tanlge]{@link attachToTangle}, [stores]{@link storeTransactions}
     * and [broadcasts]{@link broadcastTransaction} a list of transaction trytes.
     * 
     * ### Example
     * ```js
     * prepareTransfers(seed, transfers)
     *   .then(trytes => sendTrytes(trytes, depth, minWeightMagnitude))
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
     * @param {Trytes[]} - List of trytes to attach, store & broadcast
     * @param {number} depth - Depth
     * @param {number} minWeightMagnitude - Min weight magnitude
     * @param {string} [reference] - Optional reference hash
     * 
     * @return {Promise}
     * @fulfil {Transaction[]}  Returns list of attached transactions
     * @reject {Error}
     * - `INVALID_TRYTES`
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
            validate(trytesArrayValidator(trytes), depthValidator(depth), mwmValidator(minWeightMagnitude))
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
