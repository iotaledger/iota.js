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
 * @memberof module:core
 *
 * @param {Provider} provider - Network provider for accessing IRI
 *
 * @return {function} {@link #module_core.findTransactions `findTransactionObjects`}
 */
export const createFindTransactions = ({ send }: Provider) => {
    /**
     * Searches for transaction `hashes`  by calling
     * [`findTransactions`](https://docs.iota.org/iri/api#endpoints/findTransactions) command.
     * It allows to search for transactions by passing a `query` object with `addresses`, `tags` and `approvees` fields.
     * Multiple query fields are supported and `findTransactions` returns intersection of results.
     *
     * @example
     *
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
     * @memberof module:core
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
     * - `INVALID_SEARCH_KEY`
     * - `INVALID_HASH`: Invalid bundle hash
     * - `INVALID_TRANSACTION_HASH`: Invalid approvee transaction hash
     * - `INVALID_ADDRESS`: Invalid address
     * - `INVALID_TAG`: Invalid tag
     * - Fetch error
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
