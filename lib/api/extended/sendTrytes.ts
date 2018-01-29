import errors from '../../errors'
import { transactionObject } from '../../utils'

import { API, Bundle, Callback } from '../types'

/**
 *   Gets transactions to approve, attaches to Tangle, broadcasts and stores
 *
 *   @method sendTrytes
 *   @param {array} trytes
 *   @param {int} depth
 *   @param {int} minWeightMagnitude
 *   @param {object} options
 *   @param {function} callback
 *   @returns {object} analyzed Transaction objects
 **/
export default function sendTrytes(
    this: API,
    trytes: string[],
    depth: number,
    minWeightMagnitude: number,
    options?: any,
    callback?: Callback<Bundle>
): Promise<Bundle> {
    // If no options provided, switch arguments
    if (arguments.length === 4 && typeof options === 'function') {
        callback = options
        options = {}
    }

    const promise: Promise<Bundle> = new Promise((resolve, reject) => {
        if (!Number.isInteger(depth)) {
            return reject(errors.INVALID_DEPTH)
        }
        
        if (!Number.isInteger(minWeightMagnitude)) {
            return reject(errors.INVALID_MIN_WEIGHT_MAGNITUDE)
        }

        resolve(
            // 1. Tip selection: Get a pair of transactions to approve
            this.getTransactionsToApprove(depth, options.reference)

                // 2. Do Proof-of-Work and attach transactions to tangle
                .then(({ trunkTransaction, branchTransaction }) => this.attachToTangle(
                    trunkTransaction,
                    branchTransaction,
                    minWeightMagnitude,
                    trytes
                ))

                // 3. Broadcast and store transactions
                .then(attachedTrytes => this.storeAndBroadcast(attachedTrytes)
                    .then(() => attachedTrytes
                        .map(tryteString => transactionObject(tryteString))
                    )
                )
        )
    })

    if (typeof callback === 'function') {
        promise.then(callback.bind(null, null), callback)
    }

    return promise
}
