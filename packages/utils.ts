import * as Promise from 'bluebird'

export const asyncPipe = <T>(...fns: Array<(x: T) => T | Promise<T>>): ((x: Promise<T>) => Promise<T>) => (
    x: Promise<T>
) => fns.reduce((m, f) => m.then(f), x)
