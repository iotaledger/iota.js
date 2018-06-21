import * as Promise from 'bluebird'
import { asTransactionObjects } from '@iota/transaction-converter'
import { hashArrayValidator, validate } from '@iota/validators'
import { createGetTrytes } from './'
import { Callback, Hash, Provider, Transaction, Trytes } from '../../types'

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
     *   .then(transactions => {
     *     // ...
     *   })
     *   .catch(err => {
     *     // handle errors
     *   })
     *
     * @method getTransactionObjects
     * 
     * @param {Hash[]} hashes - Array of transaction hashes
     * @param {Function} [callback] - Optional callback
     * 
     * @returns {Promise}
     * @fulfil {Transaction[]} - List of transaction objects
     * @reject {Error}
     * - `INVALID_HASH_ARRAY`
     * - Fetch error
     */
    return function getTransactionObjects(
        hashes: ReadonlyArray<Hash>,
        callback?: Callback<ReadonlyArray<Transaction>>
    ): Promise<ReadonlyArray<Transaction>> {
        return Promise.resolve(validate(hashArrayValidator(hashes)))
            .then(() => getTrytes(hashes))
            .then(asTransactionObjects(hashes))
            .asCallback(callback)
    }
}
