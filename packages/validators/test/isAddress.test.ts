import test from 'ava'
import { isAddress } from '../src'

test('isAddress()', t => {
    const validAddressWithChecksum =
        'UYEEERFQYTPFAHIPXDQAQYWYMSMCLMGBTYAXLWFRFFWPYFOICOVLK9A9VYNCKK9TQUNBTARCEQXJHD9VYXOEDEOMRC'
    const validAddressWithoutChecksum =
        'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLS'
    const validAddressWithInvalidChecksum =
        'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSJMPIVGPNF'
    const addressOfInvalidLength = 'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNR'
    const addressOfInvalidTrytes =
        '123adfdsafLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLASD'

    t.is(
        isAddress(validAddressWithChecksum),
        true,
        'isAddress() should return true for valid address with valid checksum.'
    )

    t.is(
        isAddress(validAddressWithoutChecksum),
        false,
        'isAddress() should return false for valid address without checksum.'
    )

    t.is(
        isAddress(validAddressWithInvalidChecksum),
        false,
        'isAddress() should return false for valid address with invalid checksum.'
    )

    t.is(isAddress(addressOfInvalidLength), false, 'isAddress() should return false for input of invalid length.')

    t.is(isAddress(addressOfInvalidTrytes), false, 'isAddress() should return false for input of invalid trytes.')
})
