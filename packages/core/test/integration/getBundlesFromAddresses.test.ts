import { createHttpClient } from '@iota/http-client'
import { bundle, bundleWithZeroValue, transfers } from '@iota/samples'
import test from 'ava'
import { INVALID_ADDRESS } from '../../../errors'
import { stringify } from '../../../guards'
import {
    createGetBundlesFromAddresses,
    getBundleSync,
    groupTransactionsIntoBundles,
} from '../../src/createGetBundlesFromAddresses'
import './nocks/findTransactions'
import { getBalancesCommand } from './nocks/getBalances'
import './nocks/getInclusionStates'
import './nocks/getNodeInfo'
import './nocks/getTrytes'

const getBundlesFromAddresses = createGetBundlesFromAddresses(createHttpClient(), 'lib')

const addresses = [getBalancesCommand.addresses[0], getBalancesCommand.addresses[1], getBalancesCommand.addresses[2]]

test('getBundlesFromAddresses() resolves to correct transactions.', async t => {
    t.deepEqual(
        await getBundlesFromAddresses(addresses, true),
        transfers,
        'getBundlesFromAddresses() should resolve to correct transactions.'
    )
})

test('getBundlesFromAddresses() rejects with correct errors for invalid addresses.', t => {
    const invalidAddresses = ['asdasDSFDAFD']

    t.is(
        t.throws(() => getBundlesFromAddresses(invalidAddresses, true), Error).message,
        `${INVALID_ADDRESS}: ${stringify(invalidAddresses)}`,
        'getBundlesFromAddresses() should throw correct error for invalid addresses.'
    )
})

test.cb('getBundlesFromAddresses() invokes callback', t => {
    getBundlesFromAddresses(addresses, true, t.end)
})

test.cb('getBundlesFromAddresses() passes correct arguments to callback', t => {
    getBundlesFromAddresses(addresses, true, (err, res) => {
        t.is(
            err,
            null,
            'getBundlesFromAddresses() should pass null as first argument in callback for successuful requests'
        )

        t.deepEqual(
            res,
            transfers,
            'getBundlesFromAddresses() should pass the correct response as second argument in callback'
        )

        t.end()
    })
})

test('getBundleSync() returns correct bundle.', t => {
    t.deepEqual(getBundleSync(bundle, bundle[0]), bundle, 'getBundleSync() should return correct bundle.')
})

test('groupTransactionsIntoBundles() returns correct bundles.', t => {
    t.deepEqual(
        groupTransactionsIntoBundles([...bundle].concat([...bundleWithZeroValue])),
        [bundle, bundleWithZeroValue],
        'groupTransactionsIntoBundles() should return correct bundles.'
    )
})
