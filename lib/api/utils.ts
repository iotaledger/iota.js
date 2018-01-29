import errors from '../errors'

import {
    isAddress,
    isAddresses,
    isArrayOfHashes,
    isArrayOfTags,
    isStartEndOptions,
    isTrytes,
    noChecksum
} from '../utils'

import {
    Address,
    Addresses,
    Callback,
    FindTransactionsQuery,
    Inputs,
    Normalized,
    NormalizedInputs
} from './types'

export const removeChecksum = (input: string[] | {[key: string]: string[]}): string[] | {[key: string]: string[]} =>
    Array.isArray(input)
        ? input.map(address => noChecksum(address))
        : { ...input, addresses: input.addresses.map((address: string) => noChecksum(address)) }

export const toArray = (x: any): any[] => Array.isArray(x) ? x : [x] 

export const keys = (obj: {[key: string]: any} | string[]) => Array.isArray(obj) ? obj : Object.keys(obj)

export const normalize = <T, V = {[key: string]: T}>(
    ids: string[],
    lift: (id: string, b: T) => Normalized<V>
) =>
    (b: T[]): Normalized<V> => ids
        .reduce((acc, id, index) => ({
            ...acc,
            ...lift(id, b[index])
        }), {})

export const isObject = (obj: object): boolean => Object.prototype.toString.call(obj) === '[object Object]'

export const merge = (a: {[x: string]: any}) =>
  (b: {[x: string]: any}): {[x: string]: any} =>
        keys(b).reduce((acc: {[x: string]: any}, x: string): object => ({
            ...acc,
            ...( isObject(b[x]) ? merge(a[x])(b[x]) : b[x] )
        }), {})

export const invokeCallback = (callback?: Callback) =>
    (res: any) => callback
        ? res.then(callback.bind(null, null), callback)
        : res

export interface ValidationAction {
    validator: (x: any) => boolean
    value: any
    errorMessage: string
}

export interface ValidationActions {
    [key: string]: ValidationAction | null
}

export interface InvalidArguments {
    [key: string]: string
}

export const getInvalidArguments = (validationActions: ValidationActions): InvalidArguments =>
    Object.keys(validationActions)
        .map((key) => ({ ...validationActions[key] as ValidationAction, key }))
        .reduce((acc: InvalidArguments, { validator, key, value, errorMessage }) => (
            !validator(value)
                ? (acc[key] = errorMessage)
                : acc 
        ), {})

export const validate = (actions: ValidationActions): Promise<void> =>
    new Promise((resolve, reject) => {
        const errorMessages = getInvalidArguments(actions)
        if (Object.keys(errorMessages).length) {
            reject(
                `Invalid arguments: \n ${
                    Object.keys(errorMessages)
                        .map((acc, arg) => `${arg}: ${errorMessages[arg]}`)
                        .join('\n')
                }`
            )
        } else {
            resolve()
        }
    })

export const validateSeed = (value: string) => ({
    validator: isTrytes,
    value,
    errorMessage: errors.INVALID_SEED
})

export const validateStartEndOptions = (start: number, end: number) => ({
    validator: isStartEndOptions(start, end),
    value: { start, end },
    errorMessage: errors.INVALID_START_END_OPTIONS
})

export const validateInteger = (errorMessage: string = errors.NOT_INT) => (value: number) => ({
    validator: Number.isInteger,
    value,
    errorMessage
})

export const validateAddress = (value: Address | string) => ({
    validator: isAddress,
    value,
    errorMessage: errors.INVALID_ADDRESS
})

export const validateAddresses = (value: Addresses | string[]) => ({
    validator: isAddresses,
    value,
    errorMessage: errors.INVALID_ADDRESSES
})

export const validateArrayOfHashes = (value: string[]) => ({
    validator: isArrayOfHashes,
    value,
    errorMessage: errors.INVALID_ARRAY_OF_HASHES
})

export const validateArrayOfTags = (value: string[]) => ({
    validator: isArrayOfTags,
    value,
    errorMessage: errors.INVALID_TAGS
})

export const validateIndexOption = validateInteger(errors.INVALID_INDEX)

export const validateSecurityOption = validateInteger(errors.INVALID_SECURITY_LEVEL)

export const validateStartOption = validateInteger(errors.INVALID_START_OPTION)

export const validateThreshold = validateInteger(errors.INVALID_THRESHOLD)

const validKeys = ['bundles', 'addresses', 'tags', 'approvees']

export const validateFindTransactionsQuery = ({
    addresses,
    bundles,
    tags,
    approvees
}: FindTransactionsQuery) => validate({
    'query.addresses': addresses ? validateAddresses(addresses) : null,
    'query.bundles': bundles ? validateArrayOfHashes(bundles) : null,
    'query.tags': tags ? validateArrayOfTags(tags) : null,
    'query.approvees': approvees ? validateArrayOfHashes(approvees) : null
})

export const isSufficientBalance = (threshold: number) =>
    ({inputs, totalBalance}: NormalizedInputs) => 
        totalBalance < threshold
          ? Promise.reject(errors.INSUFFICIENT_BALANCE)
          : Promise.resolve()
