import test from 'ava'
import * as nock from 'nock'
import { createHttpClient } from '../src'
import { command as batchedCommand, response as batchedResponse } from './batchedSend.test'
import { command, headers, response } from './send.test'

const API_VERSION = 1

nock('http://localhost:34265', headers(API_VERSION))
    .post('/', command)
    .reply(200, response)

nock('http://localhost:44265', headers(2))
    .post('/', command)
    .reply(200, response)

test('setSettings() sets provider uri', async t => {
    const client = createHttpClient()

    client.setSettings({
        provider: 'http://localhost:34265',
    })

    t.deepEqual(await client.send(command), response)
})

test('setSettings() sets X-IOTA-API-Version', async t => {
    const client = createHttpClient()

    client.setSettings({
        provider: 'http://localhost:44265',
        apiVersion: 2,
    })

    t.deepEqual(await client.send(command), response)
})

test('setSettings() sets request batch size', async t => {
    const client = createHttpClient({
        provider: 'http://localhost:24265',
        requestBatchSize: 1000,
        apiVersion: API_VERSION,
    })

    client.setSettings({
        requestBatchSize: 2,
    })

    t.deepEqual(await client.send(batchedCommand), batchedResponse)
})
