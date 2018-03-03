import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { asTransactionObject, depthValidator, mwmValidator, validate } from '../../utils'
import { createAttachToTangle, createGetTransactionsToApprove } from '../core'
import { AttachToTangle, Bundle, Callback, Settings, Transaction } from '../types'
import { createStoreAndBroadcast } from './index'

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
export const createSendTrytes = (settings: Settings) => {
    const getTransactionsToApprove = createGetTransactionsToApprove(settings)
    const attachToTangle = createAttachToTangle(settings.attachToTangle)
    const storeAndBroadcast = createStoreAndBroadcast(settings)

    const sendTrytes = (
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
            .then(attachedTrytes => attachedTrytes.map(t => asTransactionObject(t)))
            .asCallback(callback)
    }

    const setSettings = (newSettings: Settings) => {
        settings = newSettings
    }

    // tslint:disable-next-line prefer-object-spread
    return Object.assign(sendTrytes, { setSettings })
}
