import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { asTransactionObject, hashArrayValidator, validate } from '../../utils'
import { getTrytes } from '../core'
import { Bundle, Callback, Transaction, Trytes } from '../types'

export const trytesToTransactionObjects = (trytes: Trytes[]): Bundle => trytes.map(asTransactionObject)

/**
 *   Gets the transaction objects, given an array of transaction hashes.
 *
 *   @method getTransactionsObjects
 *   @param {array} hashes - Array of transaction hashes
 *   @param {function} [callback] - Optional callback
 *   @returns {promise<object[]>}
 */
export const getTransactionObjects = (hashes: string[], callback?: Callback<Bundle>): Promise<Bundle> =>
    Promise.resolve(validate(hashArrayValidator(hashes)))
        .then(() => getTrytes(hashes))
        .then(trytesToTransactionObjects)
        .asCallback(callback)
