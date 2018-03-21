import * as Promise from 'bluebird'
import { asTransactionObject, tailTransactionValidator, transactionHashValidator, validate } from '../../utils'
import { createGetTrytes } from '../core'
import { Bundle, Callback, Provider, Transaction } from '../types'

export const validateTailTransaction = (
    transaction: Transaction,
    bundleHash: string | undefined
): Transaction | never | void => (!bundleHash ? validate(tailTransactionValidator(transaction)) : transaction)

export const createTraverseBundle = (provider: Provider) => {
    const getTrytes = createGetTrytes(provider)

    const traverseToNextTransaction = (
        transaction: Transaction,
        bundleHash: string | undefined,
        bundle: Bundle
    ): Bundle | Promise<Bundle> =>
        bundleHash !== transaction.bundle || transaction.currentIndex === transaction.lastIndex
            ? bundle.concat([transaction])
            : traverseBundle(transaction.trunkTransaction, transaction.bundle, bundle.concat([transaction]))

    const traverseBundle = function(
        trunkTransaction: string,
        bundleHash?: string | undefined,
        bundle: Bundle = [],
        callback?: Callback<Bundle>
    ): Promise<Bundle> {
        const args = arguments
        return Promise.resolve(validate(transactionHashValidator(trunkTransaction)))
            .then(() => getTrytes([trunkTransaction])
                .then(trytes => asTransactionObject(trytes[0], trunkTransaction))
                .then(transaction => {
                    validateTailTransaction(transaction, bundleHash)
                    return transaction
                })
                .then(transaction => traverseToNextTransaction(transaction, bundleHash || transaction.bundle, bundle))
                .asCallback(args.length !== 4 && typeof args[args.length - 1] === 'function'
                    ? args[length - 1]
                    : callback
                )
            )
    }

    return traverseBundle
}
