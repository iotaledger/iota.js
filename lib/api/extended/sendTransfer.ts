import errors from '../../errors'

import { API, Bundle, Callback, Transfer } from '../types'

/**
 *   Prepares Transfer, gets transactions to approve
 *   attaches to Tangle, broadcasts and stores
 *
 *   @method sendTransfer
 *   @param {string} seed
 *   @param {int} depth
 *   @param {int} minWeightMagnitude
 *   @param {array} transfers
 *   @param {object} options
 *       @property {array} inputs List of inputs used for funding the transfer
 *       @property {string} address if defined, this address wil be used for sending the remainder value to
 *   @param {function} callback
 *   @returns {object} analyzed Transaction objects
 **/
export default function sendTransfer(
    this: API,
    seed: string,
    depth: number,
    minWeightMagnitude: number,
    transfers: Transfer[],
    options?: any,
    callback?: Callback<Bundle>
): Promise<Bundle> {

    // If no options provided, switch arguments
    if (arguments.length === 5 && Object.prototype.toString.call(options) === '[object Function]') {
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
            // 1. Prepare transfers: Check balances & inputs, sign and return the transaction trytes
            this.prepareTransfers(seed, transfers, options)
           
                // 2. Attach transactions to tangle
                .then((trytes: string[]) => this.sendTrytes(trytes, depth, minWeightMagnitude, options))
        )
    })

    if (typeof callback === 'function') {
        promise.then(callback.bind(null, null), callback)
    }

    return promise
}
