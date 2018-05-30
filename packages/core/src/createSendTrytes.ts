import * as Promise from 'bluebird'
import * as errors from './errors'
import { asTransactionObject, depthValidator, mwmValidator, trytesArrayValidator, validate } from '@iota/utils'
import { createAttachToTangle, createGetTransactionsToApprove, createStoreAndBroadcast } from './'
import { AttachToTangle, Bundle, Callback, Hash, Provider, Transaction } from './types'

export interface SendTrytesOptions {
    reference?: string
}

export const createSendTrytes = (provider: Provider, attachFn?: AttachToTangle) => {
    const getTransactionsToApprove = createGetTransactionsToApprove(provider)
    const storeAndBroadcast = createStoreAndBroadcast(provider)
    const attachToTangle = attachFn || createAttachToTangle(provider)

    return function (
        trytes: string[],
        depth: number,
        minWeightMagnitude: number,
        options?: SendTrytesOptions,
        callback?: Callback<Bundle>
    ): Promise<Bundle> {
        return Promise.resolve(
            validate(
                trytesArrayValidator(trytes),
                depthValidator(depth),
                mwmValidator(minWeightMagnitude)
            )
        )
            .then(() => getTransactionsToApprove(depth, options ? options.reference : undefined))
            .then(({ trunkTransaction, branchTransaction }) =>
                attachToTangle(trunkTransaction, branchTransaction, minWeightMagnitude, trytes)
            )
            .tap(attachedTrytes => storeAndBroadcast(attachedTrytes))
            .then((attachedTrytes) => attachedTrytes.map(t => asTransactionObject(t)))
            .asCallback(arguments.length === 4 && typeof arguments[3] === 'function' ? arguments[3] : callback)
    }
}
