import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { depthValidator, mwmValidator, seedValidator, transferArrayValidator, validate } from '../../utils'
import { Bundle, Callback, CurlFunction, Transaction, Transfer, Trytes } from '../types'
import { makeSendTrytes, prepareTransfers } from './index'

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
export const makeSendTransfer = (curl: CurlFunction) => (
    seed: string,
    depth: number,
    minWeightMagnitude: number,
    transfers: Transfer[],
    options?: any,
    callback?: Callback<Bundle>
): Promise<Bundle> => {
    // If no options provided, switch arguments
    if (options && typeof options === 'function') {
        callback = options
        options = {}
    }

    return Promise.resolve(
        validate(
            depthValidator(depth),
            seedValidator(seed),
            mwmValidator(minWeightMagnitude),
            transferArrayValidator(transfers)
        )
    )
        .then(() => prepareTransfers(seed, transfers, options))
        .then((trytes: Trytes[]) => makeSendTrytes(curl)(trytes, depth, minWeightMagnitude, options))
        .asCallback(callback)
}
