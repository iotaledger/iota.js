# `@iota/persistence`

Persistence module allows to persist a state of **`last key index`**, **`bundles`** and **`CDAs`***.

Access to a database is done with adapters that implement the <a href="#PersistenceAdapter"><code><b>PersistenceAdapter</b></code></a> interface. An implementation of it is `@iota/persistence-adapter-level` which uses an :[**`abstract-level`**](https://github.com/Level/abstract-leveldown) store ([**`leveldown`**](https://github.com/Level/leveldown), [`leveljs`](https://github.com/Level/level-js), [`memdown`](https://github.com/Level/memdown) or [others...](https://github.com/Level/awesome/#stores)).

<small>* **CDAs** = **C**onditional **D**eposit **A**dresses</small>
## Example with level adapter
```JS
import { persistence, storeID } from '@iota/persistence'
import { persistenceAdapter } from '@iota/persistence-adapter-level'
import leveldown from 'leveldown'

;(async function (seed) {
    const adapter = persistenceAdapter({
        storeID: storeID(seed),
        storePath: './test/temp', // test directory
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
            createReadStream,
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
interface PersistenceAdapter<K = Buffer, V = Buffer> {
    readonly read: (key: K) => Promise<V>
    readonly write: (key: K, value: V) => Promise<void>
    readonly delete: (key: K) => Promise<void>
    readonly batch: (ops: ReadonlyArray<PersistenceAdapterBatch<K, V>>) => Promise<void>
    readonly createReadStream: CreatePersistenceReadStream
}
```
### Readable streams
**`createReadStream()`** reads & streams persisted **bundles** & **CDAs** as key-value pairs.
```JS
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
            } = desirializeCDA(value)
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
```TS
type CreatePersistenceReadStream = (
    onData: (data: Int8Array) => any,
    onError: (error: Error) => any,
    onClose: () => any,
    onEnd: () => any
) => NodeJS.ReadableStream
```

## Persistence Events
Persistence module emits events after every sucessful modification of the state.

```JS
persistence.on('writeBundle', bundle => {})
persistence.on('deleteBundle', bundle => {})
persistence.on('writeCDA', cda => {})
persistence.on('deleteCDA', cda => {})
```

