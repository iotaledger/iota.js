import * as nock from 'nock'
import {
    FindTransactionsCommand,
    FindTransactionsResponse,
    GetTransactionsToApproveCommand,
    IRICommand,
} from '../../types'

export const apiVersion = 1

export const requestBatchSize = 3

export const headers = (version: string | number = apiVersion) => ({
    reqheaders: {
        'Content-Type': 'application/json',
        'X-IOTA-API-Version': version.toString(),
    },
})

export const findTransactionsCommand: FindTransactionsCommand = {
    command: IRICommand.FIND_TRANSACTIONS,
    addresses: ['A'.repeat(81), 'B'.repeat(81), 'C'.repeat(81)],
    tags: ['A'.repeat(27), 'B'.repeat(27), 'C'.repeat(27)],
    approvees: ['D'.repeat(81), 'E'.repeat(81), 'F'.repeat(81)],
}

export const findTransactionsResponse: FindTransactionsResponse = {
    hashes: ['H'.repeat(81)],
}

export const invalidCommand: FindTransactionsCommand = {
    command: IRICommand.FIND_TRANSACTIONS,
    addresses: ['asdfsf'],
}

export const invalidGetTransactionsToApproveCommand = {
    command: IRICommand.GET_TRANSACTIONS_TO_APPROVE,
    depth: 42000,
}

export const invalidGetTransactionsToApproveResponse = {
    error: 'Invalid depth input',
    duration: 0,
}

export const invalidGetTransactionsToApproveCommandIgnored: GetTransactionsToApproveCommand = {
    command: IRICommand.GET_TRANSACTIONS_TO_APPROVE,
    depth: 42001,
}

export const validSendNock = nock('http://localhost:24265', headers())
    .persist()
    .post('/', findTransactionsCommand)
    .reply(200, findTransactionsResponse)

export const InvalidSendNock = nock('http://localhost:24265', headers())
    .persist()
    .post('/', invalidCommand)
    .reply(400)

export const InvalidGetTransactionsToApproveCommandNock = nock('http://localhost:24265', headers())
    .persist()
    .post('/', invalidGetTransactionsToApproveCommand)
    .reply(400, invalidGetTransactionsToApproveResponse)

export const invalidJSONResponseNock = nock('http://localhost:24265', headers())
    .persist()
    .post('/', invalidGetTransactionsToApproveCommandIgnored)
    .reply(400, 'Invalid json')

export const basicAuthNock = nock('https://localhost:24265', {
    ...headers(),
    Authorization: `Basic ${Buffer.from('user:password').toString('base64')}`,
} as any)
    .persist()
    .post('/', findTransactionsCommand)
    .reply(200, findTransactionsResponse)
