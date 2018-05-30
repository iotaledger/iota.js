import * as Promise from 'bluebird'
import { asTransactionObject, tailTransactionValidator, transactionHashValidator, validate } from '@iota/utils'
import { createGetTrytes } from './'
import { Callback, Hash, Provider, Transaction } from './types'

/**
 * @method createTraverseBundle
 * 
 * @param {Provider} provider
 * 
 * @return {@link traverseBundle} 
 */
export const createTraverseBundle = (provider: Provider) => {
    const getTrytes = createGetTrytes(provider)

    const traverseToNextTransaction = (
        transaction: Transaction,
        bundle: Transaction[]
    ): Transaction[] | Promise<Transaction[]> =>
        transaction.currentIndex === transaction.lastIndex
            ? bundle.concat([transaction])
            : traverseBundle(transaction.trunkTransaction, bundle.concat([transaction]))

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
     * @param {Hash} bundle - List of accumulated transactions
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
    const traverseBundle = function (
        trunkTransaction: Hash,
        bundle: Transaction[] = [],
        callback?: Callback<Transaction[]>
    ): Promise<Transaction[]> {
        const args = arguments
        return Promise.resolve(validate(transactionHashValidator(trunkTransaction)))
            .then(() => getTrytes([trunkTransaction])
                .then(([trytes]) => asTransactionObject(trytes, trunkTransaction))
                .then(transaction => bundle.length === 0
                    ? validate(tailTransactionValidator(transaction))
                    : transaction
                )
                .then(transaction => traverseToNextTransaction(transaction, bundle))
                .asCallback(args.length !== 3 && typeof args[args.length - 1] === 'function'
                    ? args[length - 1]
                    : callback
                )
            )
    }

    return traverseBundle
}
