import { tritsToTrytes, trytesToTrits } from '@iota/converter'
import { transactionHash } from '@iota/transaction'
import { asTransactionObject, asTransactionTrytes } from '@iota/transaction-converter'
import { NativeModules } from 'react-native'

import { Hash, Trytes } from '../../types'

/**
 * Attaches transactions to tangle by finding a valid nonce.
 * Proof-of-Work puzzle is solved with native modules that use
 * [`entangled`](https://github.com/iotaledger/entangled/tree/develop/mobile) libraries.
 *
 * @method attachToTangle
 *
 * @param {Hash} trunkTransaction
 *
 * @param {Hash} branchTransaction
 *
 * @param {number} minWeightMagnitude
 *
 * @param {Trytes} trytes
 *
 * @return {Promise<Trytes[]>} Attached trytes
 */
export const attachToTangle = (
    trunkTransaction: Hash,
    branchTransaction: Hash,
    minWeightMagnitude: number,
    trytes: ReadonlyArray<Trytes>
): ReadonlyArray<Trytes> => {
    const search = (transactions: ReadonlyArray<Trytes> = [], trunk = trunkTransaction) => {
        if (transactions.length === trytes.length) {
            return [...transactions].reverse()
        }

        const transaction = {
            ...asTransactionObject(trytes[transactions.length]),
            trunkTransaction: trunk,
            branchTransaction,
            attachmentTimestamp: Date.now(),
            attachmentTimestampLowerBound: 0,
            attachmentTimestampUpperBound: (Math.pow(3, 27) - 1) / 2,
        }

        return NativeModules.PearlDiver.doPOW(asTransactionTrytes(transaction), minWeightMagnitude).then(
            (nonce: Trytes) => {
                const transactionTrytes = asTransactionTrytes({ ...transaction, nonce })
                return search(
                    [...transactions, transactionTrytes],
                    tritsToTrytes(transactionHash(trytesToTrits(transactionTrytes)))
                )
            }
        )
    }

    return search()
}
