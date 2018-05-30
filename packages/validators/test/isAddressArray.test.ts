import test from 'ava'
import { isAddressArray } from '../src'

test('isAddressArray()', t => {
    const addresses = [{
        address: 'JALLWDTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSJMP',
        security: 2,
        keyIndex: 1,
        balance: '0'
    }]

    const addressesWithChecksum = [{
        address: 'UYEEERFQYTPFAHIPXDQAQYWYMSMCLMGBTYAXLWFRFFWPYFOICOVLK9A9VYNCKK9TQUNBTARCEQXJHD9VYXOEDEOMRC',
        security: 2,
        keyIndex: 1,
        balance: '0'
    }]

    const addressesOfInvalidLength = [{
        address: 'SDFSDAFdasfaSDF',
        security: 2,
        keyIndex: 1,
        balance: '0'
    }]

    const addressesOfInvalidTrytes = [{
        address: 'SDFSDAFdasfaSDF',
        security: 2,
        keyIndex: 1,
        balance: '0'
    }]

    const addressesOfInvalidSecurity = [{
        address: 'JALLWDTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSJMP',
        security: -1,
        keyIndex: 1,
        balance: '0'
    }]

    const addressesOfInvalidIndex = [{
        address: 'JALLWDTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSJMP',
        security: 2,
        keyIndex: -1,
        balance: '0'
    }]

    t.is(
        isAddressArray(addresses),
        true,
        'isAddressArray() should return true for valid address array.'
    )

    t.is(
        isAddressArray(addressesWithChecksum),
        true,
        'isAddressArray() should return true for valid address with checksum.'
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
});
