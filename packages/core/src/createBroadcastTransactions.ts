import { TRYTE_WIDTH, trytesToTrits } from '@iota/converter'
import { isAttached, TRANSACTION_LENGTH } from '@iota/transaction'
import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { isTrytesOfExactLength, validate } from '../../guards'
import {
    BroadcastTransactionsCommand,
    BroadcastTransactionsResponse,
    Callback,
    IRICommand,
    Provider,
    Trytes,
} from '../../types'

/**
 * @method createBroadcastTransactions
 * 
 * @summary Creates a new `broadcastTransactions()` method, using a custom Provider instance.
 *
 * @memberof module:core
 * 
 * @ignore
 *
 * @param {Provider} provider - The Provider object that the method should use to call the node's API endpoints.
 *
 * @return {Function} [`broadcastTransactions`]{@link #module_core.broadcastTransactions}  - A new `broadcastTransactions()` function that uses your chosen Provider instance.
 */
export const createBroadcastTransactions = ({ send }: Provider) =>
    /**
     * This method sends the given transaction trytes to the connected IRI node, using its
     * [`broadcastTransactions`](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference#broadcastTransactions) endpoint.
     * 
     * **Note:** Before calling this method, we recommend saving your transaction trytes in local storage.
     * By doing so, you make sure that you can always reattach your transactions to the Tangle in case they remain in a pending state. 
     * 
     * ## Related methods
     * 
     * The given transaction trytes must be in a valid bundle and must include a proof of work.
     * 
     * To create a valid bundle, use the `prepareTransfers()` method. For more information about what makes a bundles and transactions valid, see [this guide](https://docs.iota.org/docs/node-software/0.1/iri/concepts/transaction-validation).
     * 
     * To do proof of work, use one of the following methods:
     * 
     * - [`attachToTangle()`]{@link #module_core.attachToTangle}
     * - [`sendTrytes()`]{@link #module_core.sendTrytes}
     *
     * @method broadcastTransactions
     * 
     * @summary Sends the given transaction trytes to the connected IRI node.
     *
     * @memberof module:core
     *
     * @param {TransactionTrytes[]} trytes - Transaction trytes that include proof of work
     * @param {Callback} [callback] - Optional callback
     * 
     * @example
     *
     * ```js
     * broadcastTransactions(trytes)
     *   .then(transactionTrytes => {
     *      console.log(`Successfully sent the following transaction trytes to the node:)
     *      console.log(JSON.stringify(transactionTrytes));
     *   })
     *   .catch(error => {
     *     console.log(`Something went wrong: ${error}`)
     *   })
     * ```
     *
     * @return {Promise}
     * 
     * @fulfil {TransactionTrytes[]} transactionTrytes - Array of transaction trytes that you just broadcast
     * 
     * @reject {Error} error - An error that contains one of the following:
     * - `INVALID_ATTACHED_TRYTES`: Make sure that the trytes include a proof of work
     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors) 
     */
    (trytes: ReadonlyArray<Trytes>, callback?: Callback<ReadonlyArray<Trytes>>): Promise<ReadonlyArray<Trytes>> =>
        Promise.resolve(
            validate([
                trytes,
                arr =>
                    arr.every(
                        (t: Trytes) =>
                            isTrytesOfExactLength(t, TRANSACTION_LENGTH / TRYTE_WIDTH) && isAttached(trytesToTrits(t))
                    ),
                errors.INVALID_ATTACHED_TRYTES,
            ])
        )
            .then(() =>
                send<BroadcastTransactionsCommand, BroadcastTransactionsResponse>({
                    command: IRICommand.BROADCAST_TRANSACTIONS,
                    trytes,
                })
            )
            .then(() => trytes)
            .asCallback(callback)
