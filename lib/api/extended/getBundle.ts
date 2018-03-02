import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { bundleValidator, hashValidator, validate } from '../../utils'
import { Bundle, Callback, Transaction } from '../types' 
import { traverseBundle } from './'

export const validateBundle = (bundle: Bundle) => validate(bundleValidator(bundle))

/**
 *   Gets and validates the bundle of a given the tail transaction.
 *
 *   @method getBundle
 *   @param {string} transaction Hash of a tail transaction
 *   @returns {list} bundle Transaction objects
 **/
export const getBundle = (
    tailTransactionHash: string,
    callback?: Callback<Bundle[]>
): Promise<Bundle> =>
    Promise
        .try(() => validate(
            hashValidator(tailTransactionHash)
        ))
        .then(() => traverseBundle(tailTransactionHash))
        .then((bundle) => {
            validateBundle(bundle)
            return bundle
        })
        .asCallback(callback)
