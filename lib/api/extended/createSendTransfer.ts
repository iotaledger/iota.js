import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { depthValidator, mwmValidator, seedValidator, transferArrayValidator, validate } from '../../utils'
import { AttachToTangle, Bundle, Callback, Provider, Transaction, Transfer, Trytes } from '../types'
import { createPrepareTransfers, createSendTrytes, getPrepareTransfersOptions, PrepareTransfersOptions, SendTrytesOptions } from './index'

export interface SendTransferOptions extends PrepareTransfersOptions, SendTrytesOptions {}

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
export const createSendTransfer = (provider: Provider, attachFn?: AttachToTangle) => {
    const prepareTransfers = createPrepareTransfers(provider)
    const sendTrytes = createSendTrytes(provider, attachFn)

    return ( 
        seed: string,
        depth: number,
        minWeightMagnitude: number,
        transfers: Transfer[],
        options?: SendTransferOptions,
        callback?: Callback<Bundle>
    ): Promise<Bundle> => {
        // If no options provided, switch arguments
        if (options && typeof options === 'function') {
            callback = options
            options = getPrepareTransfersOptions({})
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
}
