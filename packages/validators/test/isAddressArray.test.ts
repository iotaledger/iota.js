import test from 'ava'
import { isAddressArray } from '../src'

test('isAddressArray()', t => {
    const addresses = ['JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLS']
    const addressesWithChecksum = [
        'UYEEERFQYTPFAHIPXDQAQYWYMSMCLMGBTYAXLWFRFFWPYFOICOVLK9A9VYNCKK9TQUNBTARCEQXJHD9VYXOEDEOMRC',
    ]
    const addressesOfInvalidLength = ['SDFSDAFdasfaSDF']
    const addressesOfInvalidTrytes = ['SDFSDAFdasfaSDF']
    const addressesOfInvalidSecurity = [
        'JALLWDTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSJMP',
    ]
    const addressesOfInvalidIndex = [
        'JALLWDTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSJMP',
    ]

    t.is(
        isAddressArray(addresses),
        false,
        'isAddressArray() should return true for valid address array without checksum.'
    )

    t.is(
        isAddressArray(addressesWithChecksum),
        true,
        'isAddressArray() should return true for valid addresses with checksum.'
    )

    t.is(
        isAddressArray(addressesOfInvalidLength),
        false,
        'isAddressArray() should return false for addresses of invalid length.'
    )

    t.is(
        isAddressArray(addressesOfInvalidTrytes),
        false,
        'isAddressArray() should return false for addresses of invalid trytes.'
    )

    t.is(
        isAddressArray(addressesOfInvalidSecurity),
        false,
        'isAddressArray() should return false for addresses of invalid security level.'
    )

    t.is(
        isAddressArray(addressesOfInvalidIndex),
        false,
        'isAddressArray() should return false for addresses of invalid index.'
    )
})
