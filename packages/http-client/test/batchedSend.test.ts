import * as nock from 'nock'
import { createHttpClient } from '../src'
import { FindTransactionsCommand, FindTransactionsResponse, IRICommand } from '../../types'
import { headers } from './send.test'
import test from 'ava'

const API_VERSION = 1

const { send } = createHttpClient({
    provider: 'http://localhost:24265',
    requestBatchSize: 2,
    apiVersion: API_VERSION,
})

export const command: FindTransactionsCommand = {
    command: IRICommand.FIND_TRANSACTIONS,
    addresses: ['A'.repeat(81), 'B'.repeat(81), 'C'.repeat(81)],
    tags: ['A'.repeat(27), 'B'.repeat(27), 'C'.repeat(27)],
    approvees: ['D'.repeat(81)],
}

export const command_1: FindTransactionsCommand = {
    command: IRICommand.FIND_TRANSACTIONS,
    addresses: ['A'.repeat(81), 'B'.repeat(81)],
}
export const command_2: FindTransactionsCommand = {
    command: IRICommand.FIND_TRANSACTIONS,
    addresses: ['C'.repeat(81)],
}

export const command_3: FindTransactionsCommand = {
    command: IRICommand.FIND_TRANSACTIONS,
    tags: ['A'.repeat(27), 'B'.repeat(27)],
}

export const command_4: FindTransactionsCommand = {
    command: IRICommand.FIND_TRANSACTIONS,
    tags: ['C'.repeat(27)],
}

export const command_5: FindTransactionsCommand = {
    command: IRICommand.FIND_TRANSACTIONS,
    approvees: ['D'.repeat(81)],
}

export const response_1: FindTransactionsResponse = {
    hashes: ['A'.repeat(81), 'C'.repeat(81)],
}
export const response_2: FindTransactionsResponse = {
    hashes: ['B'.repeat(81), 'D'.repeat(81)],
}
export const response_3: FindTransactionsResponse = {
    hashes: ['A'.repeat(81), 'D'.repeat(81), 'E'.repeat(81)],
}
export const response_4: FindTransactionsResponse = {
    hashes: ['B'.repeat(81), 'A'.repeat(81)],
}
export const response_5: FindTransactionsResponse = {
    hashes: ['A'.repeat(81), 'C'.repeat(81)],
}

export const response: FindTransactionsResponse = {
    hashes: ['A'.repeat(81)],
}

export const batchedSendNock_1 = nock('http://localhost:24265', headers(API_VERSION))
    .persist()
    .post('/', command_1)
    .reply(200, response_1)

export const batchedSendNock_2 = nock('http://localhost:24265', headers(API_VERSION))
    .persist()
    .post('/', command_2)
    .reply(200, response_2)

export const batchedSendNock_3 = nock('http://localhost:24265', headers(API_VERSION))
    .persist()
    .post('/', command_3)
    .reply(200, response_3)

export const batchedSendNock_4 = nock('http://localhost:24265', headers(API_VERSION))
    .persist()
    .post('/', command_4)
    .reply(200, response_4)

export const batchedSendNock_5 = nock('http://localhost:24265', headers(API_VERSION))
    .persist()
    .post('/', command_5)
    .reply(200, response_5)

test('batchedSend() returns correct response', async t => {
    t.deepEqual(await send(command), response)
})
