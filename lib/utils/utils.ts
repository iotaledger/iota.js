import { Hash, Tag, Transaction, Transfer, Trytes } from '../api/types'
import { Converter, Curl, Kerl, Signing } from '../crypto'
import * as errors from '../errors'
import { toTrytes }  from './'
import { isNinesTrytes, isTransactionArray, isTrytes } from './guards'

export const getOptionsWithDefaults = <T>(defaults: T) => (options: Partial<T>): T =>
    Object.assign({}, defaults, options) // tslint:disable-line prefer-object-spread

export const asArray = <T>(x: T | T[]): T[] => (Array.isArray(x) ? x : [x])

export const pad = (length: number) => (trytes: Trytes) => {
    if (trytes.length > length) {
        return trytes
    }

    return trytes.concat('9'.repeat(length - trytes.length))
}

export const padTag = pad(27)
export const padTagArray = (tags: Tag[]) => tags.map(padTag)

export const spammer = (): Transfer => ({
    address: '9'.repeat(81),
    value: 0,
    tag: '9'.repeat(27),
    message: '9'.repeat(27 * 81),
})

export const generateSpam = (n: number = 1) => new Array(n).map(spammer)
