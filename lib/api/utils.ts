import * as Promise from 'bluebird'
import * as errors from '../errors'

import {
    isAddress,
    isAddresses,
    isHashArray,
    isStartEndOptions,
    isTagArray,
    isTrytes,
    isUri,
    noChecksum,
} from '../utils'

import { Address, Addresses, Callback, FindTransactionsQuery, Inputs, Normalized, NormalizedInputs } from './types'

export const removeChecksum = (input: string[] | { [key: string]: string[] }): string[] | { [key: string]: string[] } =>
    Array.isArray(input)
        ? input.map(address => noChecksum(address))
        : { ...input, addresses: input.addresses.map((address: string) => noChecksum(address)) }

export const toArray = (x: any): any[] => (Array.isArray(x) ? x : [x])

export const isObject = (obj: object): boolean => Object.prototype.toString.call(obj) === '[object Object]'

export const merge = (a: { [x: string]: any }) => (b: { [x: string]: any }): { [x: string]: any } =>
    keys(b).reduce(
        (acc: { [x: string]: any }, x: string): object => ({
            ...acc,
            ...(isObject(b[x]) ? merge(a[x])(b[x]) : b[x]),
        }),
        {}
    )

export const validateStartEndOptions = (start: number, end: number) => ({
    validator: isStartEndOptions(start, end),
    value: { start, end },
    errorMessage: errors.INVALID_START_END_OPTIONS,
})

export const validateInteger = (errorMessage: string = errors.NOT_INT) => (value: number) => ({
    validator: Number.isInteger,
    value,
    errorMessage,
})

export const validateAddress = (value: Address | string) => ({
    validator: isAddress,
    value,
    errorMessage: errors.INVALID_ADDRESS,
})

export const validateAddresses = (value: Addresses | string[]) => ({
    validator: isAddresses,
    value,
    errorMessage: errors.INVALID_ADDRESSES,
})

export const validateArrayOfHashes = (value: string[]) => ({
    validator: isHashArray,
    value,
    errorMessage: errors.INVALID_HASH_ARRAY,
})

export const validateArrayOfTags = (value: string[]) => ({
    validator: isTagArray,
    value,
    errorMessage: errors.INVALID_TAGS,
})

export const validateIndexOption = validateInteger(errors.INVALID_INDEX)

export const validateSecurityOption = validateInteger(errors.INVALID_SECURITY_LEVEL)

export const validateStartOption = validateInteger(errors.INVALID_START_OPTION)

export const validateThreshold = validateInteger(errors.INVALID_THRESHOLD)

const validKeys = ['bundles', 'addresses', 'tags', 'approvees']

export const validateFindTransactionsQuery = ({ addresses, bundles, tags, approvees }: FindTransactionsQuery) =>
    validate({
        'query.addresses': addresses ? validateAddresses(addresses) : null,
        'query.bundles': bundles ? validateArrayOfHashes(bundles) : null,
        'query.tags': tags ? validateArrayOfTags(tags) : null,
        'query.approvees': approvees ? validateArrayOfHashes(approvees) : null,
    })

export const isSufficientBalance = (threshold: number) => ({ inputs, totalBalance }: NormalizedInputs) =>
    totalBalance < threshold ? Promise.reject(errors.INSUFFICIENT_BALANCE) : Promise.resolve()
