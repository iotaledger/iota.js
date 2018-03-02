import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { asTransactionObject, depthValidator, mwmValidator, validate } from '../../utils'
import { attachToTangle, getTransactionsToApprove } from '../core'
import { Bundle, Callback } from '../types'
import { storeAndBroadcast } from './index'

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
export const sendTrytes = (
    trytes: string[],
    depth: number,
    minWeightMagnitude: number,
    options?: any,
    callback?: Callback<Bundle>
): Promise<Bundle> => {
    // If no options provided, switch arguments
    if (options && typeof options === 'function') {
        callback = options
        options = {}
    }

    return Promise.resolve(validate(depthValidator(depth), mwmValidator(minWeightMagnitude)))
        .then(() => getTransactionsToApprove(depth, options.reference))
        .then(({ trunkTransaction, branchTransaction }) =>
            attachToTangle(trunkTransaction, branchTransaction, minWeightMagnitude, trytes)
        )
        .tap(storeAndBroadcast)
        .then(attachedTrytes => attachedTrytes.map(asTransactionObject))
        .asCallback(callback)
}
