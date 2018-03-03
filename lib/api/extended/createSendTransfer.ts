import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { depthValidator, mwmValidator, seedValidator, transferArrayValidator, validate } from '../../utils'
import { Bundle, Callback, Settings, Transaction, Transfer, Trytes } from '../types'
import { createPrepareTransfers, createSendTrytes } from './index'

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
export const createSendTransfer = (settings: Settings) => {
    const prepareTransfers = createPrepareTransfers(settings)
    const sendTrytes = createSendTrytes(settings)

    const sendTransfer = (
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
            .then((trytes: Trytes[]) => sendTrytes(trytes, depth, minWeightMagnitude, options))
            .asCallback(callback)
    }

    const setSettings = (newSettings: Settings) => {
        settings = newSettings
    }

    // tslint:disable-next-line prefer-object-spread
    return Object.assign(sendTransfer, { setSettings })
}
