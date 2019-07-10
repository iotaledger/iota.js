import { bytesToTrits, tritsToBytes } from '@iota/converter'
import { AbstractLevelDOWN } from 'abstract-leveldown'
import * as Promise from 'bluebird'
import leveldown from 'leveldown'
import * as levelup from 'levelup'
import * as path from 'path'
import {
    CreatePersistenceAdapter,
    PersistenceAdapter,
    PersistenceAdapterParams,
    PersistenceBatchTypes,
    PersistenceError,
    PersistenceIteratorOptions,
} from '../../types'

export {
    CreatePersistenceAdapter,
    PersistenceAdapter,
    PersistenceBatchTypes,
    PersistenceIteratorOptions,
    PersistenceAdapterParams,
    PersistenceError,
}

export const createPersistenceAdapter = ({
    persistenceID,
    persistencePath,
    store = leveldown,
}: PersistenceAdapterParams): PersistenceAdapter<string, Int8Array> => {
    if (typeof persistenceID !== 'string') {
        throw new TypeError('Illegal storeID.')
    }

    if (typeof persistencePath !== 'string') {
        throw new TypeError('Illegal store path.')
    }

    const db: levelup.LevelUp<AbstractLevelDOWN<string, Buffer>> = levelup.default(
        store(path.join(persistencePath, persistenceID))
    )

    return {
        get: key => Promise.try(() => db.get(key)).then(bytesToTrits),

        put: (key, value) => Promise.try(() => db.put(key, tritsToBytes(value))),

        del: key => Promise.try(() => db.del(key)),

        batch: commands =>
            Promise.try(() =>
                db.batch(
                    commands.map(command => {
                        switch (command.type) {
                            case PersistenceBatchTypes.put:
                                return {
                                    type: PersistenceBatchTypes.put,
                                    key: command.key,
                                    value: tritsToBytes(command.value),
                                }
                            case PersistenceBatchTypes.del:
                                return {
                                    type: PersistenceBatchTypes.del,
                                    key: command.key,
                                }
                        }

                        /* istanbul ignore next */
                        return undefined as any
                    })
                )
            ),

        createReadStream: options => db.createReadStream(options),

        close: () => Promise.try(() => db.close()),

        open: () => Promise.try(() => db.open()),
    }
}
