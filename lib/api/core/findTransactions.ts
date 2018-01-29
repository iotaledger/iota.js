import errors from '../../errors'
import { isArrayOfHashes, isTrytes, noChecksum } from '../../utils'

import { API, BaseCommand, Callback, IRICommand } from '../types'

export interface FindTransactionsQuery {
    bundles?: string[]
    addresses?: string[]
    tags?: string[]
    approvees?: string[]
    [key: string]: string[] | undefined
}

export interface FindTransactionsCommand extends BaseCommand, FindTransactionsQuery {
    command: IRICommand.FIND_TRANSACTIONS
    addresses?: string[]
    hashes?: string[]
    bundles?: string[]
    approvees?: string[]
}

export interface FindTransactionsResponse {
    hashes: string[]
}

const keysOf = <T>(o: T): Array<keyof T> => Object.keys(o) as Array<keyof T>

/**
 *   @method findTransactions
 *   @param {object} searchValues
 *   @returns {function} callback
 *   @returns {object} success
 **/
export default function findTransactions(
    this: API,
    query: FindTransactionsQuery,
    callback?: Callback<string[]>): Promise<string[]> {

    const validKeys = ['bundles', 'addresses', 'tags', 'approvees']

    const promise: Promise<string[]> = new Promise((resolve, reject) => {
        if (keysOf(query).some(key => validKeys.indexOf(key) === -1 || !Array.isArray(query[key]))) {
            return reject(new Error(errors.INVALID_SEARCH_KEYS))
        }

        for (const key of Object.keys(query)) {
            if (key === 'tags' && (query.tags as Array<keyof FindTransactionsQuery>).some(tag => !isTrytes(tag, 27))) {
                return reject(new Error(errors.INVALID_TAG))
            }
            
            if (!isArrayOfHashes(query[key] as Array<keyof FindTransactionsQuery>)) {
                return reject(new Error(errors.INVALID_TRYTES))
            }
        }

        if (query.tags) {
            query.tags = query.tags
                .map(tag => tag.concat('9').repeat(27 - tag.length))
        }

        if (query.addresses) {
            query.addresses = query.addresses
                .map(address => noChecksum(address))
        } 
        
        resolve(
            this.sendCommand<FindTransactionsCommand, FindTransactionsResponse>(
                {
                    command: IRICommand.FIND_TRANSACTIONS,
                    ...query
                }
            )
                .then(res => res.hashes)
        )
    })

    if (typeof callback === 'function') {
        promise.then(callback.bind(null, null), callback)
    }

    return promise
}
