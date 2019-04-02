import { trytesToTrits } from '@iota/converter'
import { AbstractLevelDOWN } from 'abstract-leveldown'
import * as Promise from 'bluebird'
import { EventEmitter } from 'events'
import leveldown from 'leveldown'
import * as levelup from 'levelup'
import * as path from 'path'
import { PersistenceAdapter, PersistenceIteratorOptions } from '../../types'

export interface PersistenceAdapterParams {
    storeID: string
    storePath: string
    store?: any
}

export interface PersistenceError extends Error {
    notFound?: boolean
}

export const persistenceAdapter = (params: PersistenceAdapterParams): PersistenceAdapter => {
    if (typeof params.storeID !== 'string') {
        throw new Error('Illegal storeID.')
    }

    if (typeof params.storePath !== 'string') {
        throw new Error('Illegal store path.')
    }

    const emitter = new EventEmitter()
    const storeID = params.storeID
    const storePath = params.storePath
    const store = params.store || leveldown
    const db: levelup.LevelUp<AbstractLevelDOWN<any, any>> = levelup.default(store(path.join(storePath, storeID)))

    return {
        read: (key: Int8Array) =>
            Promise.try(() => db.get(Buffer.from(key.buffer))).then(value => Int8Array.from(value)),

        write: (key: Int8Array, value: Int8Array) =>
            Promise.try(() => db.put(Buffer.from(key.buffer), Buffer.from(value.buffer))),

        delete: (key: Int8Array) =>
            Promise.try(() => db.get(Buffer.from(key.buffer))).then(value => db.del(Buffer.from(key.buffer))),

        createReadStream: (
            onData: (data: { key: Int8Array; value: Int8Array }) => any,
            onError: (error: Error) => any,
            onClose: () => any,
            onEnd: () => any,
            options?: PersistenceIteratorOptions
        ) =>
            db
                .createReadStream(options)
                .on('data', onData)
                .on('error', onError)
                .on('close', onClose)
                .on('end', onEnd),
    }
}
