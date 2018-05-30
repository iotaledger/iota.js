import * as Promise from 'bluebird'
import { padTagArray } from '@iota/pad'
import {
    hashArrayValidator, isArray, removeChecksum, tagArrayValidator, validate
} from '@iota/validators'
import * as errors from './errors'
import { BaseCommand, Callback, Hash, IRICommand, Tag, Provider } from './types'

export interface FindTransactionsQuery {
    addresses?: Hash[]
    approvees?: Hash[]
    bundles?: Hash[]
    tags?: Tag[]
}

export interface FindTransactionsCommand extends BaseCommand, FindTransactionsQuery {
    command: IRICommand.FIND_TRANSACTIONS
}

export interface FindTransactionsResponse {
    hashes: Hash[]
}

const keysOf = <T>(o: T): Array<keyof T> => Object.keys(o) as Array<keyof T>

const validKeys = ['bundles', 'addresses', 'tags', 'approvees']

const hasValidKeys = (query: FindTransactionsQuery) => {
    for (const key of keysOf(query)) {
        if (validKeys.indexOf(key) === -1 || !isArray(query[key])) {
            throw new Error(errors.INVALID_KEY)
        }
    }
}

const validateFindTransactions = (query: FindTransactionsQuery) => {
    hasValidKeys(query)

    const { addresses, approvees, bundles, tags } = query

    if (addresses) {
        validate(hashArrayValidator(addresses))
    }

    if (approvees) {
        validate(hashArrayValidator(approvees))
    }

    if (bundles) {
        validate(hashArrayValidator(bundles))
    }

    if (tags) {
        validate(tagArrayValidator(tags))
    }

    return query
}

const removeAddressChecksum = (query: FindTransactionsQuery): FindTransactionsQuery =>
    query.addresses ? { ...query, addresses: removeChecksum(query.addresses) } : query

const padTags = (query: FindTransactionsQuery): FindTransactionsQuery =>
    query.tags ? { ...query, tags: padTagArray(query.tags) } : query

/**  
 * @method createFindTransactions 
 *
 * @param {Provider} provider - Network provider for accessing IRI
 *
 * @return {function} {@link findTransactions}
 */
export const createFindTransactions = ({ send }: Provider) =>

    /**
     * Performs a search for transaction `hashes`  by calling
     * [`findTransactions`]{@link https://docs.iota.org/iri/api#endpoints/findTransactions} command.
     * It allows to search for transactions by passing a `query` object with `addresses`, `tags`, `approvees` and `bundles` fields.
     * Multiple query fields are supported and `findTransactions` returns intersection of results.
     *
     * Currently transactions are not searchable by `tag` field. Support will be restored by next snapshot. 
     *
     * @example
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
    (query: FindTransactionsQuery, callback?: Callback<Hash[]>): Promise<Hash[]> =>
        Promise.resolve(validateFindTransactions(query))
            .then(removeAddressChecksum)
            .then(padTags)
            .then(query =>
                send<FindTransactionsCommand, FindTransactionsResponse>({
                    ...query,
                    command: IRICommand.FIND_TRANSACTIONS,
                })
            )
            .then(({ hashes }: FindTransactionsResponse) => hashes)
            .asCallback(callback)