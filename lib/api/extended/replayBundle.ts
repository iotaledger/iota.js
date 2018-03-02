import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { hashValidator, integerValidator, mwmValidator, transactionTrytes, validate } from '../../utils'
import { Bundle, Callback } from '../types'
import { getBundle, sendTrytes } from './index'

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
export const replayBundle = (
    tail: string,
    depth: number,
    minWeightMagnitude: number,
    callback?: Callback<Bundle>
): Promise<Bundle> =>
    Promise.resolve(validate(hashValidator(tail), integerValidator(depth), mwmValidator(minWeightMagnitude)))
        .then(() => getBundle(tail))
        .then((bundle: Bundle) => bundle.map(transaction => transactionTrytes(transaction)).reverse())
        .then((trytes: string) => sendTrytes(trytes, depth, minWeightMagnitude))
        .asCallback(callback)
