import * as Promise from 'bluebird'
import * as errors from '../../errors'

import { asFinalTransactionTrytes, hashValidator, integerValidator, mwmValidator, validate } from '../../utils'
import { AttachToTangle, Bundle, Callback, Settings, Transaction, Trytes } from '../types'
import { createGetBundle, createSendTrytes } from './index'

/**
 *   Replays a transfer by doing Proof of Work again
 *
 *   @method replayBundle
 *   @param {string} tail
 *   @param {int} depth
 *   @param {int} minWeightMagnitude
 *   @param {function} callback
 *   @returns {object} analyzed Transaction objects
 **/
export const createReplayBundle = (settings: Settings) => {
    const getBundle = createGetBundle(settings)
    const sendTrytes = createSendTrytes(settings)

    const replayBundle = (
        tail: string,
        depth: number,
        minWeightMagnitude: number,
        callback?: Callback<Bundle>
    ): Promise<Bundle> =>
        Promise.resolve(validate(hashValidator(tail), integerValidator(depth), mwmValidator(minWeightMagnitude)))
            .then(() => getBundle(tail))
            .then((bundle: Bundle) => asFinalTransactionTrytes(bundle))
            .then((trytes: Trytes[]) => sendTrytes(trytes, depth, minWeightMagnitude))
            .asCallback(callback)

    const setSettings = (newSettings: Settings) => {
        settings = newSettings
    }

    // tslint:disable-next-line prefer-object-spread
    return Object.assign(replayBundle, { setSettings })
}
