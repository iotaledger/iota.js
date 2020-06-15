import { TRYTE_WIDTH, trytesToTrits } from '@iota/converter'
import { isAttached, TRANSACTION_LENGTH } from '@iota/transaction'
import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { isTrytesOfExactLength, validate } from '../../guards'
import {
    Callback,
    IRICommand,
    Provider,
    StoreTransactionsCommand,
    StoreTransactionsResponse,
    Trytes,
} from '../../types'

/**
 * @method createStoreTransactions
 *
 * @memberof module:core
 * 
 * @ignore
 *
 * @param {Provider} provider - Network provider
 *
 * @return {function} {@link #module_core.storeTransactions `storeTransactions`}
 */
export const createStoreTransactions = ({ send }: Provider) =>
    /**
     * This method uses the connected IRI node's
     * [`storeTransactions`](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference#storeTransactions) endpoint to store the given transaction trytes.
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
     * @method storeAndBroadcast
     * 
     * @summary Stores the given transaction trytes on the connected IRI node.
     *
     * @memberof module:core
     *
     * @param {Trytes[]} trytes - Array of transaction trytes
     * @param {Callback} [callback] - Optional callback function
     * 
     * @example
     * ```js
     * storeTransactions(trytes)
     * .then(transactionTrytes => {
     *     console.log(`Successfully stored transactions on the node`);
     *     console.log(JSON.stringify(transactionTrytes));
     * }).catch(error => {
     *     console.log(`Something went wrong: ${error}`)
     * })
     * ```
     *
     * @return {Promise}
     * 
     * @fullfil {Trytes[]} transactionTrytes - Attached transaction trytes
     * 
     * @reject {Error} error - An error that contains one of the following:
     * - `INVALID_TRANSACTION_TRYTES`: Make sure the trytes can be converted to a valid transaction object
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
                send<StoreTransactionsCommand, StoreTransactionsResponse>({
                    command: IRICommand.STORE_TRANSACTIONS,
                    trytes,
                })
            )
            .then(() => trytes)
            .asCallback(callback)
