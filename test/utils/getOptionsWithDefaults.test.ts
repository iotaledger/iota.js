import test from 'ava'
import { getOptionsWithDefaults } from '../../lib/utils'

test('getOptionsWithDefaults() assigns default properties.', t => {
    const defaults = { a: 1, b: 2, c: 3 }
    const partial = { a: 4 }
    const expected = {a: 4, b: 2, c: 3}

    t.deepEqual(
        getOptionsWithDefaults(defaults)(partial),
        expected,
        'getOptionsWithDefaults() should assign default properties.'
    )
})

test('getOptionsWithDefaults() returns non-partial object as is.', t => {
    const defaults = { a: 1, b: 2, c: 3 }
    const obj = { a: 4, b: 5, c: 6 }
  
    t.deepEqual(
        getOptionsWithDefaults(defaults)(obj),
        { a: 4, b: 5, c: 6 },
        'getOptionsWithDefaults() should return non-partial object as is.' 
    )
})

test('getOptionsWithDefaults() does not mutatate original object.', t => {
    const defaults = { a: 1, b: 2, c: 3 }
    const partial = { a: 4 }
    
    getOptionsWithDefaults(defaults)(partial)
    
    t.deepEqual(
        partial,
        { a: 4 },
        'getOptionsWithDefaults() should not mutate original object.'
    )
})
