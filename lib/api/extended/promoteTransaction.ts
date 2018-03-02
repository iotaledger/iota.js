import * as errors from '../../errors'
import { isHash, isTransfersArray } from '../../utils'

import { API, Callback, Transaction, Transfer } from '../types'

export interface PromoteTransactionOptions {
    delay?: number
    interrupt?: boolean
}

/**
 * Promotes a transaction by adding spam on top of it.
 * Will promote {maximum} transfers on top of the current one with {delay} interval.
 *
 * @param {string} tail
 * @param {int} depth
 * @param {int} minWeightMagnitude
 * @param {array} transfer
 * @param {object} params
 * @param {function} [callback]
 * @returns {Promise<string>} 
 */
export default function promoteTransaction(
    this: API, 
    tailTransaction: string,
    depth: number,
    minWeightMagnitude: number,
    spamTransfers: Transfer[] = [
        {
            address: '9'.repeat(81),
            value: 0,
            tag: '9'.repeat(27),
            message: '9'.repeat(27 * 81) 
        }
    ],
    {
        delay = 1000,
        interrupt = false,

    }: PromoteTransactionOptions = {},
    callback: Callback<Transaction[]>
): Promise<Transaction[]> {

    const spamTransactions: Transaction[] = []

    const promise: Promise<Transaction[]> = new Promise((resolve, reject) => { 
        if (!isHash(tailTransaction)) {
            return reject(errors.INVALID_TRYTES)
        }

        if (!isTransfersArray(spamTransfers)) {
            return reject(errors.INVALID_TRANSFERS) 
        }

        this.isPromotable(tailTransaction)
            .then((isPromotable: boolean) => {
                if (!isPromotable) {
                    return reject(errors.INCONSISTENT_SUBTANGLE)
                }

                this.sendTransfer(
                    spamTransfers[0].address,
                    depth,
                    minWeightMagnitude,
                    spamTransfers,
                    { reference: tailTransaction }
                )
                    .then(async (transactions: Transaction[]) => {
                        if ((delay && delay > 0) ||
                            interrupt === true ||
                            (typeof interrupt === 'function' && await interrupt())
                        ) {
                            spamTransactions.concat(transactions)

                            setTimeout(() => {
                                this.promoteTransaction(
                                    tailTransaction,
                                    depth,
                                    minWeightMagnitude,
                                    spamTransfers,
                                    { delay, interrupt }
                                )
                            }, delay)
                        } else {
                            resolve(spamTransactions) 
                        }
                    }
                )
            })
    })

    if (typeof callback === 'function') {
        promise.then(callback.bind(null, null), callback)
    }

    return promise
}
