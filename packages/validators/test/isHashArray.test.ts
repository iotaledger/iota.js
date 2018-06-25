import test from 'ava'
import { isHashArray } from '../src'

test('isHashArray', t => {
    const hashes = [
        'ABCDWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQRVNLLSJ',
        'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLS',
    ]

    const invalidHashes = [
        'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSJMPIVGPNEI',
        'fdsafBCDWDUOSTSJEEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQRVNLALJ',
    ]

    t.is(isHashArray(hashes), true, 'isHashArray() should return true for valid hashes')

    t.is(isHashArray(invalidHashes), false, 'isHashArray() should return false for invalid hashes')
})
