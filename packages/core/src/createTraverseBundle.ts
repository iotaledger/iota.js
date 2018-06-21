import * as Promise from 'bluebird'
import { asTransactionObject } from '@iota/transaction-converter'
import { tailTransactionValidator, transactionHashValidator, validate } from '@iota/validators'
import { createGetTrytes } from './'
import { Callback, Hash, Provider, Transaction } from '../../types'

/**
 * @method createTraverseBundle
 * 
 * @param {Provider} provider
 * 
 * @return {@link traverseBundle} 
 */
export const createTraverseBundle = (provider: Provider) => {
    const getTrytes = createGetTrytes(provider)

    /**
     * Fetches the bundle of a given the _tail_ transaction hash, by traversing through `trunkTransaction`.
     * It does not validate the bundle.
     *
     * @example
     * traverseBundle(tail)
     *    .then(bundle => {
     *        // ...
     *    })
     *    .catch(err => {
     *        // handle errors
     *    })
     *
     * @method traverseBundle
     * 
     * @param {Hash} trunkTransaction - Trunk transaction, should be tail (`currentIndex == 0`)
     * @param {Hash} [bundle=[]] - List of accumulated transactions
     * @param {Callback} [callback] - Optional callback
     * 
     * @returns {Promise}
     * @fulfil {Transaction[]} Bundle as array of transaction objects
     * @reject {Error}
     * - `INVALID_HASH`
     * - `INVALID_TAIL_HASH`: Provided transaction is not tail (`currentIndex !== 0`) 
     * - `INVALID_BUNDLE`: Bundle is syntactically invalid
     * - Fetch error
     */
    return function traverseBundle(
        trunkTransaction: Hash,
        bundle: ReadonlyArray<Transaction> = [],
        callback?: Callback<ReadonlyArray<Transaction>>
    ): Promise<ReadonlyArray<Transaction>> {
        return Promise.resolve(validate(transactionHashValidator(trunkTransaction)))
            .then(() => getTrytes([trunkTransaction]))
            .then(([trytes]) => asTransactionObject(trytes, trunkTransaction))
            .tap(transaction => validate(bundle.length === 0 && tailTransactionValidator(transaction)))
            .then(transaction => transaction.currentIndex === transaction.lastIndex
                ? bundle.concat(transaction)
                : traverseBundle(transaction.trunkTransaction, bundle.concat(transaction))
            )
            .asCallback(arguments[1] === 'function' ? arguments[1] : callback)
    }
}
