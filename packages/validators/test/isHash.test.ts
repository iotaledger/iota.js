import test from 'ava'
import { isHash } from '../src'

test('isHash()', t => {
    const validHash = 'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLS'
    const validHashWithChecksum =
        'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSJMPIVGPNE'
    const invalidHash = '123adfdsafLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLASD'

    t.is(isHash(validHash), true, 'hash() should return true for valid hash.')

    t.is(isHash(validHashWithChecksum), true, 'hash() should return true for valid hash with checksum.')

    t.is(isHash(invalidHash), false, 'hash() should return false for invalid hash')
})
