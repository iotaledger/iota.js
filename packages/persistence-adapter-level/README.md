# @iota/persistence-adapater-level

Persistence adapter with support for different [**`abstract-level`**](https://github.com/Level/abstract-leveldown) stores, such as
[**`leveldown`**](https://github.com/Level/leveldown) (recommended default), [`leveljs`](https://github.com/Level/level-js), [`memdown`](https://github.com/Level/memdown) and [others...](https://github.com/Level/awesome/#stores)

## Example with `@iota/persistence`
```JS
import { persistence, persistenceID } from '@iota/persistence'
import { persistenceAdapter } from '@iota/persistence-adapter-level'
import leveldown from 'leveldown'

;(async function (seed) {
    const persistenceAdapter = createPersistenceAdapter({
        persistenceID: persistenceID(seed),
        persistencePath: './test/temp', // test directory
        store: leveldown, // default store
    })

    try {
        const { nextIndex } = createPersistence(persistenceAdapter)

        return await nextIndex()
    } catch (error) {
        return error
    }
})('SOME9SEED')
```

