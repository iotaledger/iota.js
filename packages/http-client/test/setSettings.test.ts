import test from 'ava'
import * as nock from 'nock'
import { createHttpClient } from '../src'
import {
    expectedFindTransactionsResponse as batchedResponse,
    findTransactionsCommand as batchedCommand,
    requestBatchSize,
} from './batchedSend'
import { apiVersion, findTransactionsCommand as command, findTransactionsResponse as response, headers } from './send'

const bumpedApiVersion = apiVersion + 1

nock('http://localhost:34265', headers(apiVersion))
    .post('/', command)
    .reply(200, response)

nock('http://localhost:44265', headers(bumpedApiVersion))
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
        apiVersion: bumpedApiVersion,
    })

    t.deepEqual(await client.send(command), response)
})

test('setSettings() sets request batch size', async t => {
    const client = createHttpClient({
        provider: 'http://localhost:24265',
        requestBatchSize: 1000,
        apiVersion,
    })

    client.setSettings({
        requestBatchSize,
    })

    t.deepEqual(await client.send(batchedCommand), batchedResponse)
})
