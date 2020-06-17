import { createHttpClient } from '@iota/http-client'
import test from 'ava'
import { INVALID_ADDRESS, INVALID_TRANSACTION_HASH } from '../../../errors'
import { stringify } from '../../../guards'
import { createGetBalances } from '../../src'
import { balancesResponse, getBalancesCommand } from './nocks/getBalances'

const getBalances = createGetBalances(createHttpClient())

const addressesWithChecksum = getBalancesCommand.addresses.map(address => address.concat('9'.repeat(9)))

test('getBalances() resolves to correct balances response', async t => {
    t.deepEqual(
        await getBalances(getBalancesCommand.addresses),
        balancesResponse,
        'getBalances() should resolve to correct balances'
    )
})

test('getBalances() removes checksum from addresses', async t => {
    t.deepEqual(
        await getBalances([...addressesWithChecksum]),
        balancesResponse,
        'getBalances() by addresses should remove checksum from addresses'
    )
})

test('getBalances() does not mutate original addresses', async t => {
    const addresses = [...addressesWithChecksum]

    await getBalances(addresses)

    t.deepEqual(addresses, addressesWithChecksum, 'getBalances() should not mutate original addresses')
})

test('getBalances() rejects with correct errors for invalid input', t => {
    const invalidAddresses = ['asdasDSFDAFD']
    const invalidTips = [`m${'M'.repeat(80)}`]

    t.is(
        t.throws(() => getBalances([...addressesWithChecksum], invalidTips), { instanceOf: Error }).message,
        `${INVALID_TRANSACTION_HASH}: ${stringify(invalidTips)}`,
        'getBalances() should throw error for invalid tips'
    )

    t.is(
        t.throws(() => getBalances(invalidAddresses), { instanceOf: Error }).message,
        `${INVALID_ADDRESS}: ${stringify(invalidAddresses)}`,
        'getBalances() should throw error for invalid addresses'
    )
})

test.cb('getBalances() invokes callback when tips parameter is not provided', t => {
    getBalances(getBalancesCommand.addresses, undefined, t.end)
})

test.cb('getBalances() invokes callback when tips parameter is provided', t => {
    getBalances(getBalancesCommand.addresses, ['M'.repeat(81)], t.end)
})

test.cb('getBalances() passes correct arguments to callback when tips parameter is not provided', t => {
    getBalances(getBalancesCommand.addresses, undefined, (err, res) => {
        t.is(err, null, 'getBalances() should pass null as first argument in callback for successuful requests')

        t.deepEqual(
            res,
            balancesResponse,
            'getBalances() should pass the correct response as second argument in callback'
        )

        t.end()
    })
})

test.cb('getBalances() passes correct arguments to callback when tips parameter is provided', t => {
    getBalances(getBalancesCommand.addresses, ['M'.repeat(81)], (err, res) => {
        t.is(err, null, 'getBalances() should pass null as first argument in callback for successuful requests')

        t.deepEqual(
            res,
            balancesResponse,
            'getBalances() should pass the correct response as second argument in callback'
        )

        t.end()
    })
})
