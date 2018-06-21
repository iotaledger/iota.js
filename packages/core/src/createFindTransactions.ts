import * as Promise from 'bluebird'
import { removeChecksum } from '@iota/checksum'
import { padTagArray } from '@iota/pad'
import {
    errors, hashArrayValidator, tagArrayValidator, validate
} from '@iota/validators'
import {
    Callback,
    FindTransactionsCommand,
    FindTransactionsQuery,
    FindTransactionsResponse,
    Hash,
    IRICommand,
    Provider
} from '../../types'

const keysOf = <T>(o: T): ReadonlyArray<keyof T> => Object.keys(o) as Array<keyof T>

const validKeys: ReadonlyArray<keyof FindTransactionsQuery> = ['bundles', 'addresses', 'tags', 'approvees']

const hasValidKeys = (query: FindTransactionsQuery) => {
    for (const key of keysOf(query)) {
        if (validKeys.indexOf(key) === -1) {
            throw new Error(`${errors.INVALID_KEY}: ${key}`)
        }
    }
}

export const validateFindTransactions = (query: FindTransactionsQuery) => {
    const { addresses, approvees, bundles, tags } = query

    hasValidKeys(query)

    validate(
        !!addresses && hashArrayValidator(addresses, errors.INVALID_ADDRESS),
        !!tags && tagArrayValidator(tags),
        !!approvees && hashArrayValidator(approvees),
        !!bundles && hashArrayValidator(bundles)
    )
}

export const removeAddressChecksum = (query: FindTransactionsQuery) => (
    query.addresses ? {
        ...query,
        addresses: removeChecksum(query.addresses)
    } : query
)

export const padTags = (query: FindTransactionsQuery) => (
    query.tags ? {
        ...query,
        tags: padTagArray(query.tags)
    } : query
)

/**  
 * @method createFindTransactions 
 *
 * @param {Provider} provider - Network provider for accessing IRI
 *
 * @return {function} {@link findTransactions}
 */
export const createFindTransactions = ({ send }: Provider) => {

    /**
     * Searches for transaction `hashes`  by calling
     * [`findTransactions`](https://docs.iota.org/iri/api#endpoints/findTransactions) command.
     * It allows to search for transactions by passing a `query` object with `addresses`, `tags` and `approvees` fields.
     * Multiple query fields are supported and `findTransactions` returns intersection of results.
     *
     * ### Example
     * ```js
     * findTransactions({ addresses: ['ADRR...'] })
     *    .then(hashes => {
     *        // ...
     *    })
     *    .catch(err => { 
     *        // handle errors here
     *    })
     * ```
     *
     * @method findTransactions
     *
     * @param {object} query
     * @param {Hash[]} [query.addresses] - List of addresses
     * @param {Hash[]} [query.bundles] - List of bundle hashes
     * @param {Tag[]} [query.tags] - List of tags
     * @param {Hash[]} [query.addresses] - List of approvees
     * @param {Callback} [callback] - Optional callback
     *
     * @returns {Promise}
     * @fulfil {Hash[]} Array of transaction hashes
     * @reject {Error}
     * - `INVALID_HASH_ARRAY`: Invalid hashes of addresses, approvees of bundles
     * - `INVALID_TAG_ARRAY`: Invalid tags
     * - Fetch error
     */
    return function findTransactions(
        query: FindTransactionsQuery,
        callback?: Callback<ReadonlyArray<Hash>>
    ): Promise<ReadonlyArray<Hash>> {
        return Promise.resolve(validateFindTransactions(query))
            .then(() => removeAddressChecksum(query))
            .then(padTags)
            .then(query => send<FindTransactionsCommand, FindTransactionsResponse>({
                ...query,
                command: IRICommand.FIND_TRANSACTIONS,
            }))
            .then(({ hashes }) => hashes)
            .asCallback(callback)
    }
}