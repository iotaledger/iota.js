import test from 'ava'
import { trytes } from '@iota/samples'
import { isTrytesArray } from '../src'

test('isTrytesArray()', t => {
    const invalidTrytes = [
        'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSJMPIVGPNE',
        'fdsafBCDWDUOSTSJEEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQRVNLLSJ',
    ]

    t.deepEqual(isTrytesArray(trytes), true, 'isTrytesArray() returns true for valid attached trytes')

    t.deepEqual(isTrytesArray(invalidTrytes), false, 'isTryte return false for invalid trytes')
})
