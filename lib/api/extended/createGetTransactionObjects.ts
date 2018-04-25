import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { asTransactionObjects, hashArrayValidator, validate } from '../../utils'
import { createGetTrytes } from '../core'
import { Bundle, Callback, Hash, Provider, Transaction, Trytes } from '../types'

/**
 * @method createGetTransactionObjects
 * 
 * @param {Provider} provider - Network provider
 * 
 * @return {Function} {@link getTransactionObjects}
 */
export const createGetTransactionObjects = (provider: Provider) => {
    const getTrytes = createGetTrytes(provider)

    /**
     * Fetches the transaction objects, given an array of transaction hashes.
     *
     * @example
     * getTransactionObjects(hashes)
     *    .then(transactions => {
     *        // ...
     *    })
     *    .catch(err => {
     *        // handle errors
     *    })
     *
     * @method getTransactionObjects
     * 
     * @param {Hash[]} hashes - Array of transaction hashes
     * @param {Function} [callback] - Optional callback
     * 
     * @returns {Promise}
     * @fulfil {Transaction[]}
     * @reject {Error}
     * - `INVALID_HASH_ARRAY`
     * - Fetch error
     */
    return (hashes: Hash[], callback?: Callback<Transaction[]>): Promise<Transaction[]> =>
        Promise.resolve(validate(hashArrayValidator(hashes)))
            .then(() => getTrytes(hashes))
            .then(asTransactionObjects(hashes))
            .asCallback(callback)
}
