import test from 'ava'
import { isTrytesArray } from '../../lib/utils'
import { trytes } from '../samples/trytes'

test('isTrytesArray()', t => {
    const invalidTrytes = [
        'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSJMPIVGPNE',
        'fdsafBCDWDUOSTSJEEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQRVNLLSJ'
    ]

    t.deepEqual(
        isTrytesArray(trytes),
        true,
        'isTrytesArray() returns true for valid attached trytes'
    )

    t.deepEqual(
        isTrytesArray(invalidTrytes),
        false,
        'isTryte return false for invalid trytes'
    )
})
