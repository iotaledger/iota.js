import * as Promise from 'bluebird'
import { Tag, Transfer, Trytes } from '../api/types'

export const asyncPipe = <T>(...fns: Array<(x: T) => T | Promise<T>>): (x: T | Promise<T>) => Promise<T> => 
    (x: T | Promise<T>) => fns.reduce((m, f) => m.then(f), Promise.resolve(x))

export const getOptionsWithDefaults = <T>(defaults: T) => (options: Partial<T>): T =>
    Object.assign({}, defaults, options) // tslint:disable-line prefer-object-spread

export const asArray = <T>(x: T | T[]): T[] => (Array.isArray(x) ? x : [x])

export const spammer = (): Transfer => ({
    address: '9'.repeat(81),
    value: 0,
    tag: '9'.repeat(27),
    message: '9'.repeat(27 * 81),
})

export const generateSpam = (n: number = 1) => new Array(n).map(spammer)
