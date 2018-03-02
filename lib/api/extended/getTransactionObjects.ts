import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { hashArrayValidator, transactionObject, validate } from '../../utils'
import { getTrytes } from '../core'
import { Callback, Transaction } from '../types'

export const trytesToTransactionObjects = (trytes: string[]) =>
    trytes.map((trytesString: string) => transactionObject(trytesString))

/**
 *   Gets the transaction objects, given an array of transaction hashes.
 *
 *   @method getTransactionsObjects
 *   @param {array} hashes - Array of transaction hashes
 *   @param {function} [callback] - Optional callback
 *   @returns {promise<object[]>}
 */
export const getTransactionObjects = (
    hashes: string[],
    callback?: Callback<Transaction[]>
): Promise<Transaction[]> =>
    Promise
        .try(validate(
            hashArrayValidator(hashes)
        ))
        .then(() => getTrytes(hashes))
        .then(trytesToTransactionObjects)
        .asCallback(callback)
