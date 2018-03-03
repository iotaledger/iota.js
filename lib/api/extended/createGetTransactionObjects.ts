import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { asTransactionObjects, hashArrayValidator, validate } from '../../utils'
import { createGetTrytes } from '../core'
import { Bundle, Callback, Hash, Settings, Transaction, Trytes } from '../types'

/**
 *   Gets the transaction objects, given an array of transaction hashes.
 *
 *   @method getTransactionsObjects
 *   @param {array} hashes - Array of transaction hashes
 *   @param {function} [callback] - Optional callback
 *   @returns {promise<object[]>}
 */
export const createGetTransactionObjects = (settings: Settings) => {
    const getTrytes = createGetTrytes(settings)

    const getTransactionObjects = (hashes: Hash[], callback?: Callback<Transaction[]>): Promise<Transaction[]> =>
        Promise.resolve(validate(hashArrayValidator(hashes)))
            .then(() => getTrytes(hashes))
            .then(asTransactionObjects(hashes))
            .asCallback(callback)

    const setSettings = (newSettings: Settings) => {
        settings = newSettings
    }

    // tslint:disable-next-line prefer-object-spread
    return Object.assign(getTransactionObjects, { setSettings })
}
