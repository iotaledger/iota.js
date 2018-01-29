import errors from '../../errors'
import { isTrytes } from '../../utils'

import { API, Bundle, Callback } from '../types'

export interface GetTransfersOptions {
    start?: number
    end?: number
    inclusionStates?: boolean
    security?: number
}

/**
 *   @method getTransfers
 *   @param {string} seed
 *   @param {object} [options]
 *   @param {int} [options.start=0] Starting key index
 *   @param {int} [options.end] Ending key index
 *   @param {int} [options.security=2] - security level to be used for getting inputs and addresses
 *   @param {bool} [options.inclusionStates=false] - returns confirmation status of all transactions
 *   @param {function} callback
 *   @returns {object} success
 */
export default function getTransfers(
    this: API,
    seed: string,
    {
      start = 0,
      end,
      inclusionStates = false,
      security = 2
    }: GetTransfersOptions = {},
    callback?: Callback<Bundle[]>
): Promise<Bundle[]> {

    const promise: Promise<Bundle[]> = new Promise((resolve, reject) => { 
        if (!isTrytes(seed)) {
            return reject(errors.INVALID_SEED)
        }

        // Reject if start value bigger than end, 
        // or if difference between end and start is bigger than 500 keys
        if (end && (start > end! || end! > start + 500)) {
            return reject(errors.INVALID_INPUTS)
        }

        // 1. Get all addresses associated with the given seed
        resolve(
            this.getNewAddress(seed, {
                index: start,
                total: end ? end - start : undefined,
                returnAll: true,
                security,
            })
                // 2. Get the associated bundles 
                .then((addresses) => this.bundlesFromAddresses(addresses, inclusionStates, callback))
        )
    })
    
    if (typeof callback === 'function') {
        promise.then(callback.bind(null, null), callback)
    }
    
    return promise
}
