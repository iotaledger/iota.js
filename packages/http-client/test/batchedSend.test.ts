import test from 'ava'
import * as nock from 'nock'
import { FindTransactionsCommand, FindTransactionsResponse, IRICommand } from '../../types'
import { createHttpClient } from '../src'
import { headers } from './send.test'

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

export const commandA: FindTransactionsCommand = {
    command: IRICommand.FIND_TRANSACTIONS,
    addresses: ['A'.repeat(81), 'B'.repeat(81)],
}
export const commandB: FindTransactionsCommand = {
    command: IRICommand.FIND_TRANSACTIONS,
    addresses: ['C'.repeat(81)],
}

export const commandC: FindTransactionsCommand = {
    command: IRICommand.FIND_TRANSACTIONS,
    tags: ['A'.repeat(27), 'B'.repeat(27)],
}

export const commandD: FindTransactionsCommand = {
    command: IRICommand.FIND_TRANSACTIONS,
    tags: ['C'.repeat(27)],
}

export const commandE: FindTransactionsCommand = {
    command: IRICommand.FIND_TRANSACTIONS,
    approvees: ['D'.repeat(81)],
}

export const responseA: FindTransactionsResponse = {
    hashes: ['A'.repeat(81), 'C'.repeat(81)],
}
export const responseB: FindTransactionsResponse = {
    hashes: ['B'.repeat(81), 'D'.repeat(81)],
}
export const responseC: FindTransactionsResponse = {
    hashes: ['A'.repeat(81), 'D'.repeat(81), 'E'.repeat(81)],
}
export const responseD: FindTransactionsResponse = {
    hashes: ['B'.repeat(81), 'A'.repeat(81)],
}
export const responseE: FindTransactionsResponse = {
    hashes: ['A'.repeat(81), 'C'.repeat(81)],
}

export const response: FindTransactionsResponse = {
    hashes: ['A'.repeat(81)],
}

export const batchedSendNockA = nock('http://localhost:24265', headers(API_VERSION))
    .persist()
    .post('/', commandA)
    .reply(200, responseA)

export const batchedSendNockB = nock('http://localhost:24265', headers(API_VERSION))
    .persist()
    .post('/', commandB)
    .reply(200, responseB)

export const batchedSendNockC = nock('http://localhost:24265', headers(API_VERSION))
    .persist()
    .post('/', commandC)
    .reply(200, responseC)

export const batchedSendNockD = nock('http://localhost:24265', headers(API_VERSION))
    .persist()
    .post('/', commandD)
    .reply(200, responseD)

export const batchedSendNockE = nock('http://localhost:24265', headers(API_VERSION))
    .persist()
    .post('/', commandE)
    .reply(200, responseE)

test('batchedSend() returns correct response', async t => {
    t.deepEqual(await send(command), response)
})
