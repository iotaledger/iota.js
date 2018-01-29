import errors from '../../errors'
import { isHash,  transactionTrytes } from '../../utils'

import { API, Bundle, Callback, Transaction } from '../types'

/**
 *   Re-broadcasts a transfer by tail transaction
 *
 *   @method broadcastBundle
 *   @param {string} tailTransaction
 *   @param {function} [callback]
 *   @returns {object} Transaction objects
 **/
export default function broadcastBundle(
  this: API,
  tailTransaction: string,
  callback: Callback<void>
): Promise<void> | void {

    const promise: Promise<void> = new Promise((resolve, reject) => {
        if (!isHash(tailTransaction)) {
            return reject(errors.INVALID_TRYTES)
        }

        resolve(
            this.getBundle(tailTransaction)
                .then((bundle: Bundle) =>
                    this.broadcastTransactions(
                        bundle
                            .map((transaction: Transaction) => transactionTrytes(transaction))
                            .reverse()
                    )
                )
        )
    })

    if (typeof callback === 'function') {
        promise.then(callback.bind(null, null), callback)
        return    
    }

    return promise
}
