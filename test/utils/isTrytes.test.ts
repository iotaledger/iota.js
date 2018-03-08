import test from 'ava'
import { isTrytes } from '../../lib/utils'

test('isTrytes', t => {
    const validTrytes = 'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLS'
    const invalidTrytes = '123adfdsafLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLASD'
    const trytesOfLengthNine = 'ABCDEFGHI'

    t.is(
        isTrytes(validTrytes),
        true,
        'isTrytes() should return true for valid trytes.'
    )

    t.is(
        isTrytes(invalidTrytes),
        false,
        'isTrytes() should return false for invalid trytes.'
    )

    t.is(
        isTrytes(trytesOfLengthNine, 9),
        true,
        'isTrytes() should return true for valid trytes and valid length.'
    )

    t.is(
        isTrytes(trytesOfLengthNine, 10),
        false,
        'isTrytes() should return false for valid trytes but invalid length.'
    )
});
