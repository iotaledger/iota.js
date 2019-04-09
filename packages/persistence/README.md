# @iota/persistence

Persistence module allows to persist a state of **`last key index`**, **`bundles`** and **`CDAs`***.

Access to a database is done with adapters that implement the <a href="#PersistenceAdapter"><code><b>PersistenceAdapter</b></code></a> interface. An implementation of it is `@iota/persistence-adapter-level` which uses an :[**`abstract-level`**](https://github.com/Level/abstract-leveldown) store ([**`leveldown`**](https://github.com/Level/leveldown), [`leveljs`](https://github.com/Level/level-js), [`memdown`](https://github.com/Level/memdown) or [others...](https://github.com/Level/awesome/#stores)).

<small>* **CDAs** = **C**onditional **D**eposit **A**dresses</small>
## Example with level adapter
```JS
import { persistence, persistenceID } from '@iota/persistence'
import { createPersistenceAdapter } from '@iota/persistence-adapter-level'
import leveldown from 'leveldown'

;(async function (seed) {
    const adapter = persistenceAdapter({
        persistenceID: persistenceID(seed),
        persistencePath: './test/temp', // test directory
        store: leveldown // default store
    })

    try {
        const {
            nextIndex,
            writeBundle,
            deleteBundle,
            writeCDA,
            deleteCDA,
            batch,
            state.read,
            createStateReadStream,
            history.read,
            history.delete,
            createHistoryReadStream,
        } = await persistence(adapter)

        return nextIndex()
    } catch (error) {
        // deal with errors here...
        return error
    }
})('SOME9SEED') // Shoud output 1
```
<a name="PersistenceAdapter"></a>
## PersistenceAdapter interface
```TS
export interface PersistenceAdapter<K = Buffer, V = Buffer> {
    readonly read: (key: K) => Promise<V>
    readonly write: (key: K, value: V) => Promise<void>
    readonly delete: (key: K) => Promise<void>
    readonly batch: (ops: ReadonlyArray<PersistenceAdapterBatch<K, V>>) => Promise<void>
    readonly createReadStream: (options?: PersistenceIteratorOptions) => NodeJS.ReadableStream
}
```
### Readable streams
**`createReadStream()`** reads & streams persisted **bundles** & **CDAs** as key-value pairs.
```JS
import { CDA_LENGTH, deserializeCDA } from '@iota/cda'
import { isMultipleOfTransactionLength } from '@iota/transaction'

createReadStream
    .on('data', value => {
        if (value.length === CDA_LENGTH) {
            // It's a CDA
            const {
                address,
                timeoutAt,
                expectedBalance,
                checksum,
                index,
                security,
            } = deserializeCDA(value)
        } else if (isMultipleOfTransactionLength(value)) {
            // It's a bundle
            const bundle = transaction.bundle(value)
        }

    })
    .on('error', error => {
        // handle errors here
    })
    .on('close', () => {})
    .on('end', () => {})
```


## Persistence Events
Persistence module emits events after every sucessful modification of the state.

```JS
persistence.on('writeBundle', bundle => {})
persistence.on('deleteBundle', bundle => {})
persistence.on('writeCDA', cda => {})
persistence.on('deleteCDA', cda => {})
```

