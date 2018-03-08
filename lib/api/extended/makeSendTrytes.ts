import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { asTransactionObject, depthValidator, mwmValidator, validate } from '../../utils'
import { getTransactionsToApprove, makeAttachToTangle } from '../core'
import { Bundle, Callback, CurlFunction, Transaction, Trytes } from '../types'
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
export const makeSendTrytes = (curl: CurlFunction) => (
    trytes: Trytes[],
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
            makeAttachToTangle(curl)(trunkTransaction, branchTransaction, minWeightMagnitude, trytes)
        )
        .tap(storeAndBroadcast)
        .then(attachedTrytes => attachedTrytes.map((tryteString: Trytes) => asTransactionObject(tryteString)))
        .asCallback(callback)
}
