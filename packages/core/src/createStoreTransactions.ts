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
 * @param {Provider} provider - Network provider
 *
 * @return {function} {@link #module_core.storeTransactions `storeTransactions`}
 */
export const createStoreTransactions = ({ send }: Provider) =>
    /**
     * @description Persists a list of _attached_ transaction trytes in the store of connected node by calling
     * [`storeTransactions`](https://docs.iota.org/iri/api#endpoints/storeTransactions) command.
     * Tip selection and Proof-of-Work must be done first, by calling
     * [`getTransactionsToApprove`]{@link #module_core.getTransactionsToApprove} and
     * [`attachToTangle`]{@link #module_core.attachToTangle} or an equivalent attach method or remote
     * [`PoWbox`](https://powbox.devnet.iota.org/).
     *
     * **Note:** Persist the transaction trytes in local storage __before__ calling this command, to ensure
     * that reattachment is possible, until your bundle has been included.
     *
     * Any transactions stored with this command will eventaully be erased, as a result of a snapshot.
     *
     * @method storeTransactions
     *
     * @memberof module:core
     *
     * @param {Trytes[]} trytes - Attached transaction trytes
     * @param {Callback} [callback] - Optional callback
     *
     * @return {Promise}
     * @fullfil {Trytes[]} Attached transaction trytes
     * @reject {Error}
     * - `INVALID_ATTACHED_TRYTES`: Invalid attached trytes
     * - Fetch error
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
