import { TRYTE_WIDTH } from '@iota/converter'
import { TRANSACTION_HASH_LENGTH } from '@iota/transaction'
import { asTransactionObject } from '@iota/transaction-converter'
import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { isTrytesOfExactLength, validate } from '../../guards'
import { Callback, Hash, Provider, Transaction } from '../../types'
import { createGetTrytes } from './'

/**
 * @method createTraverseBundle
 *
 * @memberof module:core
 *
 * @param {Provider} provider
 *
 * @return {function} {@link #module_core.traverseBundle `traverseBundle`}
 */
export const createTraverseBundle = (provider: Provider) => {
    const getTrytes = createGetTrytes(provider)

    /**
     * Fetches the bundle of a given the _tail_ transaction hash, by traversing through `trunkTransaction`.
     * It does not validate the bundle.
     *
     * @example
     *
     * ```js
     * traverseBundle(tail)
     *    .then(bundle => {
     *        // ...
     *    })
     *    .catch(err => {
     *        // handle errors
     *    })
     * ```
     *
     * @method traverseBundle
     *
     * @memberof module:core
     *
     * @param {Hash} trunkTransaction - Trunk transaction, should be tail (`currentIndex == 0`)
     * @param {Hash} [bundle=[]] - List of accumulated transactions
     * @param {Callback} [callback] - Optional callback
     *
     * @returns {Promise}
     * @fulfil {Transaction[]} Bundle as array of transaction objects
     * @reject {Error}
     * - `INVALID_TRANSACTION_HASH`
     * - `INVALID_TAIL_HASH`: Provided transaction is not tail (`currentIndex !== 0`)
     * - `INVALID_BUNDLE`: Bundle is syntactically invalid
     * - Fetch error
     */
    return function traverseBundle(
        trunkTransaction: Hash,
        bundle: ReadonlyArray<Transaction> = [],
        callback?: Callback<ReadonlyArray<Transaction>>
    ): Promise<ReadonlyArray<Transaction>> {
        return Promise.resolve(
            validate([
                trunkTransaction,
                t => isTrytesOfExactLength(t, TRANSACTION_HASH_LENGTH / TRYTE_WIDTH),
                errors.INVALID_TRANSACTION_HASH,
            ])
        )
            .then(() => getTrytes([trunkTransaction]))
            .then(([trytes]) => asTransactionObject(trytes, trunkTransaction))
            .tap(transaction =>
                validate(
                    bundle.length === 0 && [transaction, t => t.currentIndex === 0, errors.INVALID_TAIL_TRANSACTION]
                )
            )
            .then(transaction =>
                transaction.currentIndex === transaction.lastIndex
                    ? bundle.concat(transaction)
                    : traverseBundle(transaction.trunkTransaction, bundle.concat(transaction))
            )
            .asCallback(arguments[1] === 'function' ? arguments[1] : callback)
    }
}
