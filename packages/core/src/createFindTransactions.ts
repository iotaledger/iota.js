import { removeChecksum } from '@iota/checksum'
import { TRYTE_WIDTH } from '@iota/converter'
import { padTagArray } from '@iota/pad'
import { BUNDLE_LENGTH, TRANSACTION_HASH_LENGTH } from '@iota/transaction'
import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { isHash, isTag, isTrytesOfExactLength, validate } from '../../guards'
import {
    Callback,
    FindTransactionsCommand,
    FindTransactionsQuery,
    FindTransactionsResponse,
    Hash,
    IRICommand,
    Provider,
    Trytes,
} from '../../types'

const keysOf = <T>(o: T): ReadonlyArray<keyof T> => Object.keys(o) as Array<keyof T>

const validKeys: ReadonlyArray<keyof FindTransactionsQuery> = ['bundles', 'addresses', 'tags', 'approvees']

const hasValidKeys = (query: FindTransactionsQuery) => {
    for (const key of keysOf(query)) {
        if (validKeys.indexOf(key) === -1) {
            throw new Error(`${errors.INVALID_SEARCH_KEY}: ${key}`)
        }
    }
}

export const validateFindTransactions = (query: FindTransactionsQuery) => {
    const { addresses, approvees, bundles, tags } = query

    hasValidKeys(query)

    validate(
        !!addresses && [addresses, arr => arr.every(isHash), errors.INVALID_ADDRESS],

        !!tags && [tags, arr => arr.every(isTag), errors.INVALID_TAG],
        !!approvees && [
            approvees,
            arr => arr.every((a: Trytes) => isTrytesOfExactLength(a, TRANSACTION_HASH_LENGTH / TRYTE_WIDTH)),
            errors.INVALID_TRANSACTION_HASH,
        ],
        !!bundles && [
            bundles,
            arr => arr.every((b: Trytes) => isTrytesOfExactLength(b, BUNDLE_LENGTH / TRYTE_WIDTH)),
            errors.INVALID_HASH,
        ]
    )
}

export const removeAddressChecksum = (query: FindTransactionsQuery) =>
    query.addresses
        ? {
              ...query,
              addresses: query.addresses.map(removeChecksum),
          }
        : query

export const padTags = (query: FindTransactionsQuery) =>
    query.tags
        ? {
              ...query,
              tags: padTagArray(query.tags),
          }
        : query

/**
 * @method createFindTransactions
 * 
 * @summary Creates a new `findTransactions()` method, using a custom Provider instance.
 *
 * @memberof module:core
 * 
 * @ignore
 *
 * @param {Provider} provider - The Provider object that the method should use to call the node's API endpoints.
 *
 * @return {Function} [`findTransactions`]{@link #module_core.findTransactions}  - A new `findTransactions()` function that uses your chosen Provider instance.
 */
export const createFindTransactions = ({ send }: Provider) => {
    /**
     * This method searches for transaction hashes by calling the connected IRI node's [`findTransactions`](https://docs.iota.org/docs/node-software/0.1/iri/references/api-reference#findTransactions) endpoint.
     * 
     * If you pass more than one query parameter, this method returns only transactions that contain all the given fields in those queries.
     * 
     * ## Related methods
     * 
     * To find transaction objects, use the [`findTransactionObjects()`]{@link #module_core.findTransactionObjects} method.
     * 
     * @method findTransactions
     * 
     * @summary * Searches the Tangle for the hashes of transactions that contain all the given values in their transaction fields.
     * 
     * @memberof module:core
     *
     * @param {Object} query - Query object
     * @param {Hash[]} [query.addresses] - Array of addresses to search for in transactions
     * @param {Hash[]} [query.bundles] - Array of bundle hashes to search for in transactions
     * @param {Tag[]} [query.tags] - Array of tags to search for in transactions
     * @param {Hash[]} [query.approvees] - Array of transaction hashes that you want to search for in transactions' branch and trunk transaction fields
     * @param {Callback} [callback] - Optional callback function
     * 
     * @example
     *
     * ```js
     * findTransactions({ addresses: ['ADDRESS999...'] })
     *    .then(transactionHashes => {
     *      console.log(`Successfully found the following transactions:)
     *      console.log(JSON.stringify(transactionHashes));
     *   })
     *   .catch(error => {
     *     console.log(`Something went wrong: ${error}`)
     *   })
     * ```
     *
     * @returns {Promise}
     * 
     * @fulfil {Hash[]} transactionHashes - Array of transaction hashes for transactions, which contain fields that match the query object
     * 
     * @reject {Error} error - An error that contains one of the following:
     * - `INVALID_SEARCH_KEY`: Make sure that you entered valid query parameters
     * - `INVALID_HASH`: Make sure that the bundle hashes are 81 trytes long
     * - `INVALID_TRANSACTION_HASH`: Make sure that the approvee transaction hashes are 81 trytes long
     * - `INVALID_ADDRESS`: Make sure that the addresses contain only trytes
     * - `INVALID_TAG`: Make sure that the tags contain only trytes
     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors) 
     */
    return function findTransactions(
        query: FindTransactionsQuery,
        callback?: Callback<ReadonlyArray<Hash>>
    ): Promise<ReadonlyArray<Hash>> {
        return Promise.resolve(validateFindTransactions(query))
            .then(() => removeAddressChecksum(query))
            .then(padTags)
            .then(formattedQuery =>
                send<FindTransactionsCommand, FindTransactionsResponse>({
                    ...formattedQuery,
                    command: IRICommand.FIND_TRANSACTIONS,
                })
            )
            .then(({ hashes }) => hashes)
            .asCallback(callback)
    }
}
