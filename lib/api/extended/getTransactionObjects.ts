import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { asTransactionObjects, hashArrayValidator, validate } from '../../utils'
import { getTrytes } from '../core'
import { Bundle, Callback, Hash, Transaction, Trytes } from '../types'

/**
 *   Gets the transaction objects, given an array of transaction hashes.
 *
 *   @method getTransactionsObjects
 *   @param {array} hashes - Array of transaction hashes
 *   @param {function} [callback] - Optional callback
 *   @returns {promise<object[]>}
 */
export const getTransactionObjects = (
    hashes: Hash[],
    callback?: Callback<Transaction[]>
): Promise<Transaction[]> =>
    Promise.resolve(validate(hashArrayValidator(hashes)))
        .then(() => getTrytes(hashes))
        .then(asTransactionObjects(hashes))
        .asCallback(callback)
