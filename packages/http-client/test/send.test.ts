import test from 'ava'
import * as nock from 'nock'
import { FindTransactionsCommand, FindTransactionsResponse, IRICommand } from '../../types'
import { createHttpClient } from '../src'

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

const invalidGetTransactionsToApproveCommand = {
    command: IRICommand.GET_TRANSACTIONS_TO_APPROVE,
    depth: 42000,
}
const invalidGetTransactionsToApproveResponse = {
    error: 'Invalid depth input',
    duration: 0,
}

export const badSendJSONResponseNock = nock('http://localhost:24265', headers(API_VERSION))
    .persist()
    .post('/', invalidGetTransactionsToApproveCommand)
    .reply(400, invalidGetTransactionsToApproveResponse)

test('send() parses and returns json encoded error of bad request.', t => {
    return send(invalidGetTransactionsToApproveCommand).catch(error => {
        t.is(
            error,
            `Request error: ${invalidGetTransactionsToApproveResponse.error}`,
            'httpClient.send() should parse and return json encoded error of bad request.'
        )
    })
})

const invalidGetTransactionsToApproveCommandB = {
    command: IRICommand.GET_TRANSACTIONS_TO_APPROVE,
    depth: 42001,
}
export const badSendInvalidJSONResponseNock = nock('http://localhost:24265', headers(API_VERSION))
    .persist()
    .post('/', invalidGetTransactionsToApproveCommandB)
    .reply(400, 'Invalid json')

test('send() ignores invalid json of bad requests.', t => {
    return send(invalidGetTransactionsToApproveCommandB).catch(error => {
        t.is(error, 'Request error: Bad Request', 'httpClient.send() should ignore invalid json of bad requests.')
    })
})
