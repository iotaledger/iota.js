import * as Promise from 'bluebird'
import { attachedTrytesArrayValidator, validate } from '@iota/validators'
import {
    BroadcastTransactionsCommand,
    BroadcastTransactionsResponse,
    Callback,
    IRICommand,
    Provider,
    Trytes
} from '../../types'

/**  
 * @method createBroadcastTransactions
 *
 * @param {Provider} provider - Network provider
 * 
 * @return {function} {@link broadcastTransactions}
 */
export const createBroadcastTransactions = ({ send }: Provider) =>

    /**
     * Broadcasts an list of _attached_ transaction trytes to the network by calling
     * [`boradcastTransactions`]{@link https://docs.iota.org/iri/api#endpoints/broadcastTransactions} command.
     * Tip selection and Proof-of-Work must be done first, by calling `{@link getTransactionsToApprove}` and
     * `{@link attachToTangle}` or an equivalent attach method or remote 
     * [`PoWbox`]{@link https://powbox.testnet.iota.org/}.
     *
     * You may use this method to increase odds of effective transaction propagation.
     *
     * Persist the transaction trytes in local storage **before** calling this command for first time, to ensure
     * that reattachment is possible, until your bundle has been included.
     * 
     * ### Example
     * ```js
     * broadcastTransactions(trytes)
     *   .then(trytes => {
     *      // ...
     *   })
     *   .catch(err => {
     *     // ...
     *   })
     * ```
     * 
     * @method broadcastTransactions
     * 
     * @param {TransactionTrytes[]} trytes - Attached Transaction trytes 
     * @param {Callback} [callback] - Optional callback
     *
     * @return {Promise}
     * @fulfil {Trytes[]} Attached transaction trytes
     * @reject {Error}
     * - `INVALID_ATTACHED_TRYTES`: Invalid array of attached trytes
     * - Fetch error
     */
    (trytes: ReadonlyArray<Trytes>, callback?: Callback<ReadonlyArray<Trytes>>): Promise<ReadonlyArray<Trytes>> =>
        Promise.resolve(validate(attachedTrytesArrayValidator(trytes)))
            .then(() => send<BroadcastTransactionsCommand, BroadcastTransactionsResponse>({
                command: IRICommand.BROADCAST_TRANSACTIONS,
                trytes,
            }))
            .then(() => trytes)
            .asCallback(callback)