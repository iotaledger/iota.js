import * as nock from 'nock'
import { createHttpClient } from '../src'
import { FindTransactionsCommand, IRICommand, FindTransactionsResponse } from '../../types'
import test from 'ava'

const API_VERSION = 1

const { send } = createHttpClient({
    provider: 'http://localhost:24265',
    requestBatchSize: 3,
    apiVersion: API_VERSION,
})

export const command: FindTransactionsCommand = {
    command: IRICommand.FIND_TRANSACTIONS,
    addresses: ['A'.repeat(81), 'B'.repeat(81), 'C'.repeat(81)],
    tags: ['A'.repeat(27), 'B'.repeat(27), 'C'.repeat(27)],
    approvees: ['D'.repeat(81), 'E'.repeat(81), 'F'.repeat(81)],
}

export const headers = (version: string | number) => ({
    reqheaders: {
        'Content-Type': 'application/json',
        'X-IOTA-API-Version': version.toString(),
    },
})

export const response: FindTransactionsResponse = {
    hashes: ['H'.repeat(81)],
}

export const validSendNock = nock('http://localhost:24265', headers(API_VERSION))
    .persist()
    .post('/', command)
    .reply(200, response)

test('send() returns correct response.', async t => {
    t.deepEqual(await send(command), response)
})

export const invalidCommand: FindTransactionsCommand = {
    command: IRICommand.FIND_TRANSACTIONS,
    addresses: ['asdfsf'],
}

export const badSendNock = nock('http://localhost:24265', headers(API_VERSION))
    .persist()
    .post('/', invalidCommand)
    .reply(400)

test('send() returns correct error message for bad request.', t => {
    return send(invalidCommand).catch(error => {
        t.is(error, 'Request error: Bad Request', 'httpClient.send() should throw correct error for bad request.')
    })
})
