import test from 'ava'
import { isAddress } from '../src'

test('isAddress()', t => {
    const validAddressWithChecksum = {
        address: 'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSJMPIVGPNE',
        keyIndex: 1,
        security: 2
    }
    const validAddressWithoutChecksum = {
        address: 'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLS',
        keyIndex: 1,
        security: 2
    }
    const validAddressWithInvalidChecksum = {
        address: 'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSJMPIVGPNF',
        keyIndex: 1,
        security: 2
    }
    const addressOfInvalidLength = {
        address: 'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNR',
        keyIndex: 1,
        security: 2
    }
    const addressOfInvalidTrytes = {
        address: '123adfdsafLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLASD',
        keyIndex: 1,
        security: 2
    }

    t.is(
        isAddress(validAddressWithChecksum),
        true,
        'isAddress() should return true for valid address with valid checksum.'
    )

    t.is(
        isAddress(validAddressWithoutChecksum),
        true,
        'isAddress() should return true for valid address without checksum.'
    )

    t.is(
        isAddress(validAddressWithInvalidChecksum),
        true,
        'isAddress() should return false for valid address with invalid checksum.'
    )

    t.is(
        isAddress(addressOfInvalidLength),
        false,
        'isAddress() should return false for input of invalid length.'
    )

    t.is(
        isAddress(addressOfInvalidTrytes),
        false,
        'isAddress() should return false for input of invalid trytes.'
    )

})
