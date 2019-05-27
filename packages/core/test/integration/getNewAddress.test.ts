import { createHttpClient } from '@iota/http-client'
import test from 'ava'
import { INVALID_SEED, INVALID_TOTAL_OPTION } from '../../../errors'
import { stringify } from '../../../guards'
import {
    applyChecksumOption,
    applyReturnAllOption,
    createGetNewAddress,
    createIsAddressUsed,
    getUntilFirstUnusedAddress,
} from '../../src/createGetNewAddress'
import './nocks/findTransactions'
import './nocks/wereAddressesSpentFrom'

import { addresses, addressesWithChecksum, newAddress, newAddressWithChecksum, seed } from '@iota/samples'

const client = createHttpClient()
const getNewAddress = createGetNewAddress(client, 'lib')
const isAddressUsed = createIsAddressUsed(client)

test('getNewAddress() resolves to correct new address', async t => {
    t.is(await getNewAddress(seed, { index: 0 }), newAddress, 'getNewAddress() should resolve to correct new address')
})

test('getNewAddress() with total option resolves to correct addresses', async t => {
    t.deepEqual(
        await getNewAddress(seed, { index: 0, total: 2 }),
        addresses.slice(0, 2),
        'getNewAddress() with `total` option resolves to correct addresses'
    )
})

test('getNewAddress() with `returnAll` option resolves to correct addresses', async t => {
    t.deepEqual(
        await getNewAddress(seed, { index: 1, returnAll: true }),
        addresses.slice(1, 3),
        'getNewAddress() with `returnAll` option should resolve to addresses from `start` up to new address'
    )
})

test('getNewAddresses() with `checksum` option resolves to correct addresses', async t => {
    t.is(
        await getNewAddress(seed, { index: 0, checksum: true }),
        newAddressWithChecksum,
        'getNewAddress() with `checksum` option should resolve to correct address'
    )

    t.deepEqual(
        await getNewAddress(seed, { index: 0, total: 2, checksum: true }),
        addressesWithChecksum.slice(0, 2),
        'getNewAddress() with `total` & `checksum` options resolves to correct addresses'
    )

    t.deepEqual(
        await getNewAddress(seed, { index: 1, returnAll: true, checksum: true }),
        addressesWithChecksum.slice(1, 3),
        'getNewAddress() with `checksum` & `returnAll` options should resolve to correct addresses'
    )
})

test('getNewAddress() rejects with correct errors for invalid arguments', t => {
    const invalidSeed = 'asdasDSFDAFD'

    t.is(
        t.throws(() => getNewAddress(invalidSeed, { index: 0 }), Error).message,
        `${INVALID_SEED}: ${stringify(invalidSeed)}`,
        'getNewAddress() should throw correct error for invalid seed'
    )
})

test('getNewAddress() rejects with correct errors for `total=0`', t => {
    t.is(
        t.throws(() => getNewAddress(seed, { index: 0, total: 0 }), Error).message,
        `${INVALID_TOTAL_OPTION}: ${stringify(0)}`,
        'getNewAddress() should throw correct error for `total=0`'
    )
})

test.cb('getNewAddress() invokes callback', t => {
    getNewAddress(seed, { index: 0, total: 1 }, t.end)
})

test.cb('getNewAddress() passes correct arguments to callback', t => {
    getNewAddress(seed, { index: 0 }, (err, res) => {
        t.is(err, null, 'getNewAddress() should pass null as first argument in callback for successuful requests')

        t.is(res, newAddress, 'getNewAddress() should pass the correct response as second argument in callback')

        t.end()
    })
})

test('isAddressUsed() resolves to correct state', async t => {
    t.is(await isAddressUsed(addresses[0]), true, 'isAddressUsed() resolves to `true` for spent address')

    t.is(await isAddressUsed(addresses[1]), true, 'isAddressUsed() resolves to `true` for address with transactions')

    t.is(await isAddressUsed(addresses[1]), true, 'isAddressUsed() resolves to `false` result for unused address')
})

test('getUntilFirstUnusedAddress() resolves to correct new address', async t => {
    const index = 0
    const security = 2

    t.deepEqual(
        await getUntilFirstUnusedAddress(isAddressUsed, seed, index, security, false)(),
        [newAddress],
        'getNewAddress() with `returnAll: false` should resolve to correct new address'
    )

    t.deepEqual(
        await getUntilFirstUnusedAddress(isAddressUsed, seed, index, security, true)(),
        addresses.slice(0, 3),
        'getUntilFristUnusedAddress() with `returnAll: true` should resolve to correct address from start to new address'
    )
})

test('applyReturnAllOption() returns correct address or address array', t => {
    t.deepEqual(
        applyReturnAllOption(true, 0)(addresses),
        addresses,
        'applyReturnAllOption() should return address array for `returnAll: true`'
    )

    t.is(
        applyReturnAllOption(false, 0)(addresses),
        newAddress,
        'applyReturnAllOption() should return new address string for `returnAll: false`'
    )

    t.deepEqual(
        applyReturnAllOption(false, 2)(addresses),
        addresses,
        'applyReturnAllOption() should return address array if called with `total`'
    )
})

test('applyChecksumOption() resolves to correct addresses', async t => {
    t.deepEqual(
        await applyChecksumOption(true)(newAddress),
        newAddressWithChecksum,
        'applyChecksumOptions() with `checksum = true` should add checksum to single address'
    )

    t.deepEqual(
        await applyChecksumOption(true)(addresses.slice(0, 1)),
        addressesWithChecksum.slice(0, 1),
        'applyChecksumOptions() with `checksum = true` should add checksum to address array'
    )

    t.is(
        await applyChecksumOption(false)(newAddress),
        newAddress,
        'applyChecksumOptions() with `checksum = false` should not add checksum'
    )
})
