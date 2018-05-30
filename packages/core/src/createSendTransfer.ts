import * as Promise from 'bluebird'
import { depthValidator, mwmValidator, seedValidator, transferArrayValidator, validate } from '@iota/utils'
import { createPrepareTransfers, createSendTrytes, SendTrytesOptions } from './'
import { getPrepareTransfersOptions, PrepareTransfersOptions } from './createPrepareTransfers'
import { AttachToTangle, Bundle, Callback, Provider, Transaction, Transfer, Trytes } from './types'

export interface SendTransferOptions extends PrepareTransfersOptions, SendTrytesOptions { }

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
