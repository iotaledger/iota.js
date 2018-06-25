import test from 'ava'
import { isTrytesOfExactLength } from '../src'

test('isTrytes() returns true for valid trytes of exact length.', t => {
    const validTrytes = 'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLL'

    t.is(
        isTrytesOfExactLength(validTrytes, 80),
        true,
        'isTrytes() should return true for valid trytes of exact length.'
    )
})

test('isTrytes() returns false for trytes of invalid length.', t => {
    const trytes = 'ABCDEFGHI'

    t.is(isTrytesOfExactLength(trytes, 10), false, 'isTrytes() should return false for trytes of invalid length.')
})

test('isTrytes() returns false for invalid trytes.', t => {
    const invalidTrytes = 'ab13DEFGHI'

    t.is(isTrytesOfExactLength(invalidTrytes, 10), false, 'isTrytes() should return false for invalid trytes.')
})
