import test from 'ava'
import { isTrytes } from '../src'

test('isTrytes() returns true for valid trytes.', t => {
    const validTrytes = 'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLS'

    t.is(isTrytes(validTrytes), true, 'isTrytes() should return true for valid trytes.')
})

test('isTrytes() returns true for valid trytes and length.', t => {
    const trytes = 'ABCDEFGHI'

    t.is(isTrytes(trytes, 9), true, 'isTrytes() should return true for valid trytes and valid length.')
})

test('isTrytes() returns false for trytes of invalid length.', t => {
    const trytes = 'ABCDEFGHI'

    t.is(isTrytes(trytes, 10), false, 'isTrytes() should return false for trytes of invalid length.')
})

test('isTrytes() returns false for invalid trytes.', t => {
    const invalidTrytes = '134asdfLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLASD'

    t.is(isTrytes(invalidTrytes), false, 'isTrytes() should return false for invalid trytes.')
})
