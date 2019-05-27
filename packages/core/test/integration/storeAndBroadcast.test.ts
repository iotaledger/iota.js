import { createHttpClient } from '@iota/http-client'
import { attachedTrytesOfInvalidLength } from '@iota/samples'
import test from 'ava'
import { INVALID_ATTACHED_TRYTES } from '../../../errors'
import { stringify } from '../../../guards'
import { createStoreAndBroadcast } from '../../src'
import './nocks/broadcastTransactions'
import { storeTransactionsCommand } from './nocks/storeTransactions'

const storeAndBroadcast = createStoreAndBroadcast(createHttpClient())

test('storeAndBroadcast() stores and broadcasts transactions.', async t => {
    const { trytes } = storeTransactionsCommand

    t.deepEqual(
        await storeAndBroadcast([...trytes]),
        trytes,
        'storeAndBroadcast() should store and bradcast transactions.'
    )
})

test('storeAndBroadcast() does not mutate original trytes.', async t => {
    const { trytes } = storeTransactionsCommand

    await storeAndBroadcast(trytes)

    t.deepEqual(trytes, storeTransactionsCommand.trytes, 'storeAndBroadcast() should not mutate original trytes.')
})

test('storeAndBroadcast() rejects with correct error for invalid attached trytes.', t => {
    const invalidTrytes = ['asdasDSFDAFD']

    t.is(
        t.throws(() => storeAndBroadcast(invalidTrytes), Error).message,
        `${INVALID_ATTACHED_TRYTES}: ${stringify(invalidTrytes)}`,
        'storeAndBroadcast() should throw error for invalid attached trytes.'
    )
})

test('storeAndBroadcast() rejects with correct errors for attached trytes of invalid length.', t => {
    t.is(
        t.throws(() => storeAndBroadcast(attachedTrytesOfInvalidLength), Error).message,
        `${INVALID_ATTACHED_TRYTES}: ${stringify(attachedTrytesOfInvalidLength)}`,
        'storeAndBroadcast() should throw error for attached trytes of invalid length.'
    )
})

test.cb('storeAndBroadcast() invokes callback', t => {
    storeAndBroadcast([...storeTransactionsCommand.trytes], t.end)
})

test.cb('storeAndBroadcast() passes correct arguments to callback', t => {
    const { trytes } = storeTransactionsCommand
    storeAndBroadcast([...trytes], (err, res) => {
        t.is(err, null, 'storeAndBroadcast() should pass null as first argument in callback for successuful requests')

        t.deepEqual(res, trytes, 'storeAndBroadcast() should pass the correct response as second argument in callback')

        t.end()
    })
})
