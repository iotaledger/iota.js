import * as Promise from 'bluebird'
import { attachedTrytesArrayValidator, validate } from '@iota/validators'
import {
    Callback,
    IRICommand,
    Provider,
    StoreTransactionsCommand,
    StoreTransactionsResponse,
    Trytes
} from '../../types'

/**  
 * @method createStoreTransactions 
 * 
 * @param {Provider} provider - Network provider
 * 
 * @return {function} {@link storeTransactions}
 */
export const createStoreTransactions = ({ send }: Provider) =>

    /**
     * @description Persists a list of _attached_ transaction trytes in the store of connected node by calling
     * [`storeTransactions`]{@link https://docs.iota.org/iri/api#endpoints/storeTransactions} command.
     * Tip selection and Proof-of-Work must be done first, by calling `{@link getTransactionsToApprove}` and
     * `{@link attachToTangle}` or an equivalent attach method or remote
     * [`PoWbox`]{@link https://powbox.testnet.iota.org/}.
     *
     * Persist the transaction trytes in local storage **before** calling this command, to ensure
     * reattachment is possible, until your bundle has been included.
     *
     * Any transactions stored with this command will eventaully be erased, as a result of a snapshot.
     *
     * @method storeTransactions
     *
     * @param {Trytes[]} trytes - Attached transaction trytes 
     * @param {Callback} [callback] - Optional callback
     *
     * @return {Promise}
     * @fullfil {Trytes[]} Attached transaction trytes
     * @reject {Error}
     * - `INVALID_ATTACHED_TRYTES`: Invalid attached trytes array
     * - Fetch error
     */
    (trytes: ReadonlyArray<Trytes>, callback?: Callback<ReadonlyArray<Trytes>>): Promise<ReadonlyArray<Trytes>> =>
        Promise.resolve(validate(attachedTrytesArrayValidator(trytes)))
            .then(() => send<StoreTransactionsCommand, StoreTransactionsResponse>({
                command: IRICommand.STORE_TRANSACTIONS,
                trytes,
            }))
            .then(() => trytes)
            .asCallback(callback)
