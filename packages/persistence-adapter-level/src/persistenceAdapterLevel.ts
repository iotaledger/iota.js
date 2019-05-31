import { AbstractBatch, AbstractLevelDOWN } from 'abstract-leveldown'
import * as Promise from 'bluebird'
import leveldown from 'leveldown'
import * as levelup from 'levelup'
import * as path from 'path'
import {
    CreatePersistenceAdapter,
    PersistenceAdapter,
    PersistenceAdapterBatch,
    PersistenceAdapterBatchTypes,
    PersistenceAdapterDeleteOp,
    PersistenceAdapterParams,
    PersistenceAdapterWriteOp,
    PersistenceError,
    PersistenceIteratorOptions,
} from '../../types'

export {
    CreatePersistenceAdapter,
    PersistenceAdapter,
    PersistenceAdapterBatch,
    PersistenceAdapterBatchTypes,
    PersistenceIteratorOptions,
    PersistenceAdapterDeleteOp,
    PersistenceAdapterWriteOp,
    PersistenceAdapterParams,
    PersistenceError,
}

export const createPersistenceAdapter = ({
    persistenceID,
    persistencePath,
    store = leveldown,
}: PersistenceAdapterParams): PersistenceAdapter => {
    if (typeof persistenceID !== 'string') {
        throw new TypeError('Illegal storeID.')
    }

    if (typeof persistencePath !== 'string') {
        throw new TypeError('Illegal store path.')
    }

    const db: levelup.LevelUp<AbstractLevelDOWN<Buffer, Buffer>> = levelup.default(
        store(path.join(persistencePath, persistenceID))
    )

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
                                case PersistenceAdapterBatchTypes.write:
                                    return {
                                        type: 'put',
                                        key,
                                        value: (op as PersistenceAdapterWriteOp<Buffer, Buffer>).value,
                                    }
                                case PersistenceAdapterBatchTypes.delete:
                                    return {
                                        type: 'del',
                                        key,
                                    }
                            }
                        }
                    )
                )
            ),

        createReadStream: options => db.createReadStream(options),

        close: () => Promise.try(() => db.close()),

        open: () => Promise.try(() => db.open()),
    }
}
