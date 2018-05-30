import * as Promise from 'bluebird'
import { Transfer } from '../../core/src/types'

export const asyncPipe = <T>(...fns: Array<(x: T) => T | Promise<T>>): (x: T | Promise<T>) => Promise<T> =>
    (x: T | Promise<T>) => fns.reduce((m, f) => m.then(f), Promise.resolve(x))

export const spammer = (): Transfer => ({
    address: '9'.repeat(81),
    value: 0,
    tag: '9'.repeat(27),
    message: '9'.repeat(27 * 81),
})

export const generateSpam = (n: number = 1) => new Array(n).map(spammer)
