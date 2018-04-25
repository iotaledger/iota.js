import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { attachedTrytesArrayValidator, validate } from '../../utils'
import { BaseCommand, Callback, IRICommand, Provider, Trytes } from '../types'

export interface StoreTransactionsCommand extends BaseCommand {
    command: IRICommand.STORE_TRANSACTIONS
    trytes: string[]
}

export type StoreTransactionsResponse = void

export const validateStoreTransactions = (trytes: Trytes[]) => validate(attachedTrytesArrayValidator(trytes))

/**  
 * @method createStoreTransactions 
 * 
 * @param {Provider} provider - Network provider
 * 
 * @return {function} {@link storeTransactions}
 */
export const createStoreTransactions = (provider: Provider) =>

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
    (trytes: Trytes[], callback?: Callback<Trytes[]>): Promise<Trytes[]> =>
        Promise.resolve(validateStoreTransactions(trytes))
            .then(() =>
                provider.sendCommand<StoreTransactionsCommand, StoreTransactionsResponse>({
                    command: IRICommand.STORE_TRANSACTIONS,
                    trytes,
                })
            )
            .then(() => trytes)
            .asCallback(callback)
