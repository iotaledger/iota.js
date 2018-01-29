import errors from '../../errors'
import { isHash, transactionTrytes } from '../../utils'

import { API, Bundle, Callback } from '../types'
/**
 *   Replays a transfer by doing Proof of Work again
 *
 *   @method replayBundle
 *   @param {string} tail
 *   @param {int} depth
 *   @param {int} minWeightMagnitude
 *   @param {function} callback
 *   @returns {object} analyzed Transaction objects
 **/
export default function replayBundle(
    this: API,
    tail: string,
    depth: number,
    minWeightMagnitude: number,
    callback?: Callback<Bundle>
): Promise<Bundle> {

    const promise: Promise<Bundle> = new Promise((resolve, reject) => {
        // Check if correct tail hash
        if (!isHash(tail)) {
            reject(errors.INVALID_TRYTES)
        }

        // Check if correct depth and minWeightMagnitude
        if (!Number.isInteger(depth)) {
          return reject(errors.INVALID_DEPTH)
        }
        
        if (!Number.isInteger(minWeightMagnitude)) {
            return reject(errors.INVALID_MIN_WEIGHT_MAGNITUDE)
        }

        resolve(
            this.getBundle(tail)
                .then((bundle: Bundle) => this.sendTrytes(
                    bundle
                        .map(transaction => transactionTrytes(transaction))
                        .reverse(),
                    depth,
                    minWeightMagnitude,
                    {}
                ))
        )
    })

    if (typeof callback === 'function') {
        promise.then(callback.bind(null, null), callback)
    }

    return promise
}
