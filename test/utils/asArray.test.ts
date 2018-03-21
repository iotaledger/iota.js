import test from 'ava'
import { asArray } from '../../lib/utils'

test('asArray() lifts the given type `T` to `Array<T>`.', t => {
    t.deepEqual(
        asArray('test'),
        ['test'],
        'asArray() should lift given type `T` to `Array<T>`.'
    )
})

test('asArray() returns a given array as is.', t => {
    t.deepEqual(
        asArray(['test']),
        ['test'],
        'asArray() should return a given array as is.'
    )
})
