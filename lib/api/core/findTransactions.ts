import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { hashArrayValidator, isArray, padTagArray, removeChecksum, tagArrayValidator, validate } from '../../utils'

import { API, BaseCommand, Callback, IRICommand } from '../types'
import { sendCommand } from './sendCommand'

export interface FindTransactionsQuery {
    addresses?: string[]
    approvees?: string[]
    bundles?: string[]
    tags?: string[]
}

export interface FindTransactionsCommand extends BaseCommand, FindTransactionsQuery {
    command: IRICommand.FIND_TRANSACTIONS
}

export interface FindTransactionsResponse {
    hashes: string[]
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
    const validators = []

    if (addresses) {
        validators.push(hashArrayValidator(addresses))
    }

    if (approvees) {
        validators.push(hashArrayValidator(approvees))
    }

    if (bundles) {
        validators.push(hashArrayValidator(bundles))
    }

    if (tags) {
        validators.push(tagArrayValidator(tags))
    }

    validate(validators)
}

/**
 *   @method findTransactions
 *   @param {object} searchValues
 *   @returns {function} callback
 *   @returns {object} success
 **/
export const findTransactions = (query: FindTransactionsQuery, callback?: Callback<string[]>): Promise<string[]> => {
    if (query.tags) {
        query.tags = padTagArray(query.tags)
    }

    return Promise.try(() => validateFindTransactions(query))
        .then(() =>
            sendCommand<FindTransactionsCommand, FindTransactionsResponse>({
                command: IRICommand.FIND_TRANSACTIONS,
                ...query,
            })
        )
        .then(res => res.hashes)
        .asCallback(callback)
}
