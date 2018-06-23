import * as Promise from 'bluebird'
import { depthValidator, mwmValidator, seedValidator, transferArrayValidator, validate } from '@iota/validators'
import { createPrepareTransfers, createSendTrytes } from './'
import { getPrepareTransfersOptions, PrepareTransfersOptions } from './createPrepareTransfers'
import { AttachToTangle, Bundle, Callback, Hash, Provider, Transfer, Transaction } from '../../types'

export interface SendTransferOptions extends PrepareTransfersOptions {
    readonly reference?: Hash
}

export const createSendTransfer = (provider: Provider, attachFn?: AttachToTangle) => {
    const prepareTransfers = createPrepareTransfers(provider)
    const sendTrytes = createSendTrytes(provider, attachFn)

    return function sendTransfer(
        seed: string,
        depth: number,
        minWeightMagnitude: number,
        transfers: Transfer[],
        options?: SendTransferOptions,
        callback?: Callback<Bundle>
    ): Promise<Bundle> {
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
            .then(trytes => sendTrytes(trytes, depth, minWeightMagnitude, options ?
                options.reference : undefined
            ))
            .asCallback(callback)
    }
}
