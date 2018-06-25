import test from 'ava'
import { isTrytesOfMaxLength } from '../src'

test('isTrytesOfMaxLength() returns true for valid trytes and length.', t => {
    const validTrytes = 'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLS'

    t.is(
        isTrytesOfMaxLength(validTrytes, 81),
        true,
        'isTrytesOfMaxLength() should return true for valid trytes and length.'
    )

    t.is(
        isTrytesOfMaxLength('DASFASDF', 81),
        true,
        'isTrytesOfMaxLength() should return true for valid trytes and length.'
    )
})

test('isTrytesOfMaxLength() returns false for trytes of invalid length.', t => {
    const trytes = 'ABCDEFGHI'

    t.is(
        isTrytesOfMaxLength(trytes, 8),
        false,
        'isTrytesOfMaxLength() should return false for trytes of invalid length.'
    )
})

test('isTrytesOfMaxLength() returns false for invalid trytes.', t => {
    const invalidTrytes = '134asdfLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLASD'

    t.is(isTrytesOfMaxLength(invalidTrytes, 87), false, 'isTrytesOfMaxLength() should return false for invalid trytes.')
})
