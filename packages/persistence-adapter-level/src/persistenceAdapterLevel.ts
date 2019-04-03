import { AbstractBatch, AbstractLevelDOWN } from 'abstract-leveldown'
import * as Promise from 'bluebird'
import leveldown from 'leveldown'
import * as levelup from 'levelup'
import * as path from 'path'
import {
    PersistenceAdapter,
    PersistenceAdapterBatch,
    PersistenceAdapterDeleteOp,
    PersistenceAdapterWriteOp,
    PersistenceIteratorOptions,
} from '../../types'

export {
    PersistenceAdapter,
    PersistenceAdapterBatch,
    PersistenceIteratorOptions,
    PersistenceAdapterDeleteOp,
    PersistenceAdapterWriteOp,
}

export interface PersistenceAdapterParams {
    readonly storeID: string
    readonly storePath: string
    readonly store?: any
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

    const storeID = params.storeID
    const storePath = params.storePath
    const store = params.store || leveldown
    const db: levelup.LevelUp<AbstractLevelDOWN<Buffer, Buffer>> = levelup.default(store(path.join(storePath, storeID)))

    return {
        read: key => Promise.try(() => db.get(key)),

        write: (key, value) => Promise.try(() => db.put(key, value)),

        delete: key => Promise.try(() => db.get(key)).then(value => db.del(key)),

        batch: ops =>
            Promise.try(() =>
                db.batch(
                    ops.map(
                        (op): AbstractBatch<Buffer, Buffer> => {
                            const { type, key } = op
                            switch (type) {
                                case 'write':
                                    return {
                                        type: 'put',
                                        key,
                                        value: (op as PersistenceAdapterWriteOp<Buffer, Buffer>).value,
                                    }
                                case 'delete':
                                    return {
                                        type: 'del',
                                        key,
                                    }
                            }
                        }
                    )
                )
            ),

        createReadStream: (onData, onError, onClose, onEnd, options) =>
            db
                .createReadStream(options)
                .on('data', ({ value }) => {
                    onData(value)
                })
                .on('error', onError)
                .on('close', onClose)
                .on('end', onEnd),
    }
}
