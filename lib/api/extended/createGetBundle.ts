import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { bundleValidator, hashValidator, validate } from '../../utils'
import { Bundle, Callback, Settings, Transaction } from '../types'
import { createTraverseBundle } from './index'

export const validateBundle = (bundle: Bundle) => validate(bundleValidator(bundle))

/**
 *   Gets and validates the bundle of a given the tail transaction.
 *
 *   @method createGetBundle
 *   @param {string} transaction Hash of a tail transaction
 *   @returns {list} bundle Transaction objects
 **/
export const createGetBundle = (settings: Settings) => {
    const traverseBundle = createTraverseBundle(settings)

    const getBundle = (
    tailTransactionHash: string,
    callback?: Callback<Bundle>
): Promise<Bundle> =>
    Promise.resolve(validate(hashValidator(tailTransactionHash)))
        .then(() => traverseBundle(tailTransactionHash))
        .tap(validateBundle)
        .asCallback(callback)

    const setSettings = (newSettings: Settings) => {
        settings = newSettings
    }

    // tslint:disable-next-line prefer-object-spread
    return Object.assign(getBundle, { setSettings })
}