import { createHttpClient } from '@iota/http-client'
import test from 'ava'
import { INVALID_ADDRESS, INVALID_HASH, INVALID_TAG, INVALID_TRANSACTION_HASH } from '../../../errors'
import { stringify } from '../../../guards'
import { createFindTransactions } from '../../src'
import {
    findTransactionsByAddressesCommand,
    findTransactionsByAddressesResponse,
    findTransactionsByApproveesCommand,
    findTransactionsByApproveesResponse,
    findTransactionsByBundlesCommand,
    findTransactionsByBundlesResponse,
    findTransactionsByTagsCommand,
    findTransactionsByTagsResponse,
} from './nocks/findTransactions'

const findTransactions = createFindTransactions(createHttpClient())

const invalidHashes = ['INVALID9HASh']

const addressesWithChecksum =
    findTransactionsByAddressesCommand.addresses || [].map((address: string) => address.concat('9'.repeat(9)))

test('findTransactions() by addresses resolves to correct response', async t => {
    t.deepEqual(
        await findTransactions({ addresses: findTransactionsByAddressesCommand.addresses }),
        findTransactionsByAddressesResponse.hashes,
        'findTransactions() by addresses should resolve to correct transaction hashes'
    )
})

test('findTransactions() removes checksum from addresses', async t => {
    t.deepEqual(
        await findTransactions({ addresses: [...addressesWithChecksum] }),
        findTransactionsByAddressesResponse.hashes,
        'findTransactions() by addresses should remove checksum from addresses, if any'
    )
})

test('findTransactions() does not mutate original query object', async t => {
    const addresses = [...addressesWithChecksum]

    await findTransactions({ addresses })

    t.deepEqual(addresses, addressesWithChecksum)
})

test('findTransactions() rejects with correct error for invalid addresses', async t => {
    t.is(
        t.throws(() => findTransactions({ addresses: invalidHashes }), Error).message,
        `${INVALID_ADDRESS}: ${stringify(invalidHashes)}`,
        'getBalances() should throw error for invalid addresses'
    )
})

test('findTransactions() by bundle hashes resolves to correct response', async t => {
    t.deepEqual(
        await findTransactions({ bundles: findTransactionsByBundlesCommand.bundles }),
        findTransactionsByBundlesResponse.hashes,
        'findTransactions() by bundle hashes should resolve to correct transaction hashes'
    )
})

test('findTransactions() rejects with correct error for invalid bundle hashes', async t => {
    t.is(
        t.throws(() => findTransactions({ bundles: invalidHashes }), Error).message,
        `${INVALID_HASH}: ${stringify(invalidHashes)}`,
        'findTransactions() should throw error for invalid bundle hashes'
    )
})

test('findTransactions() by tags resolves to correct response', async t => {
    t.deepEqual(
        await findTransactions({ tags: findTransactionsByTagsCommand.tags }),
        findTransactionsByTagsResponse.hashes,
        'findTransactions() by tags should resolve to correct transaction hashes'
    )
})

test('findTransactions() rejects with correct error for invalid tags', async t => {
    t.is(
        t.throws(() => findTransactions({ tags: invalidHashes }), Error).message,
        `${INVALID_TAG}: ${stringify(invalidHashes)}`,
        'findTransactions() should throw error for invalid tags'
    )
})

test('findTransactions() by approvees resolves to correct response', async t => {
    t.deepEqual(
        await findTransactions({ approvees: findTransactionsByApproveesCommand.approvees }),
        findTransactionsByApproveesResponse.hashes,
        'findTransactions() by approvees should resolve to correct transaction hashes'
    )
})

test('findTransactions() rejects with correct error for invalid approvees', async t => {
    t.is(
        t.throws(() => findTransactions({ approvees: invalidHashes }), Error).message,
        `${INVALID_TRANSACTION_HASH}: ${stringify(invalidHashes)}`,
        'findTransactions() should throw error for invalid apprvovees'
    )
})

test.cb('findTransactions() invokes callback', t => {
    findTransactions({ addresses: findTransactionsByAddressesCommand.addresses }, t.end)
})

test.cb('findTransactions() passes correct arguments to callback', t => {
    findTransactions({ addresses: findTransactionsByAddressesCommand.addresses }, (err, res) => {
        t.is(err, null, 'findTransactions() should pass null as first argument in callback for successuful requests')

        t.deepEqual(
            res,
            findTransactionsByAddressesResponse.hashes,
            'findTransactions() should pass the correct response as second argument in callback'
        )

        t.end()
    })
})
