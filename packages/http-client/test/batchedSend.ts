import * as nock from 'nock'
import {
    FindTransactionsCommand,
    FindTransactionsResponse,
    GetBalancesCommand,
    GetBalancesResponse,
    GetInclusionStatesCommand,
    GetInclusionStatesResponse,
    GetTrytesCommand,
    GetTrytesResponse,
    IRICommand,
} from '../../types'
import { headers } from './send'

export const apiVersion = 1
export const requestBatchSize = 2

// Test batched requests for:
//
// 1. findTransactions

export const findTransactionsCommand: FindTransactionsCommand = {
    command: IRICommand.FIND_TRANSACTIONS,
    addresses: ['A'.repeat(81), 'B'.repeat(81), 'C'.repeat(81)],
    tags: ['A'.repeat(27), 'B'.repeat(27), 'C'.repeat(27)],
    approvees: ['D'.repeat(81)],
}

export const findTransactionsCommandA: FindTransactionsCommand = {
    command: IRICommand.FIND_TRANSACTIONS,
    addresses: ['A'.repeat(81), 'B'.repeat(81)],
    approvees: ['D'.repeat(81)],
}

export const findTransactionsCommandB: FindTransactionsCommand = {
    command: IRICommand.FIND_TRANSACTIONS,
    addresses: ['C'.repeat(81)],
    approvees: ['D'.repeat(81)],
}

export const findTransactionsCommandC: FindTransactionsCommand = {
    command: IRICommand.FIND_TRANSACTIONS,
    tags: ['A'.repeat(27), 'B'.repeat(27)],
    approvees: ['D'.repeat(81)],
}

export const findTransactionsCommandD: FindTransactionsCommand = {
    command: IRICommand.FIND_TRANSACTIONS,
    tags: ['C'.repeat(27)],
    approvees: ['D'.repeat(81)],
}

export const findTransactionsResponseA: FindTransactionsResponse = {
    hashes: ['A'.repeat(81), 'C'.repeat(81)],
}

export const findTransactionsResponseB: FindTransactionsResponse = {
    hashes: ['B'.repeat(81), 'D'.repeat(81)],
}

export const findTransactionsResponseC: FindTransactionsResponse = {
    hashes: ['A'.repeat(81), 'D'.repeat(81), 'E'.repeat(81)],
}

export const findTransactionsResponseD: FindTransactionsResponse = {
    hashes: ['B'.repeat(81), 'A'.repeat(81)],
}

export const expectedFindTransactionsResponse: FindTransactionsResponse = {
    hashes: ['A'.repeat(81)],
}

export const findTransactionsNockBatchA = nock('http://localhost:24265', headers(apiVersion))
    .persist()
    .post('/', findTransactionsCommandA)
    .reply(200, findTransactionsResponseA)

export const findTransactionsNockBatchB = nock('http://localhost:24265', headers(apiVersion))
    .persist()
    .post('/', findTransactionsCommandB)
    .reply(200, findTransactionsResponseB)

export const findTransactionsNockBatchC = nock('http://localhost:24265', headers(apiVersion))
    .persist()
    .post('/', findTransactionsCommandC)
    .reply(200, findTransactionsResponseC)

export const findTransactionsNockBatchD = nock('http://localhost:24265', headers(apiVersion))
    .persist()
    .post('/', findTransactionsCommandD)
    .reply(200, findTransactionsResponseD)

// 2. getTrytes

export const getTrytesCommand: GetTrytesCommand = {
    command: IRICommand.GET_TRYTES,
    hashes: ['A'.repeat(81), 'B'.repeat(81), 'C'.repeat(81)],
}

export const getTrytesCommandA: GetTrytesCommand = {
    command: IRICommand.GET_TRYTES,
    hashes: ['A'.repeat(81), 'B'.repeat(81)],
}

export const getTrytesCommandB: GetTrytesCommand = {
    command: IRICommand.GET_TRYTES,
    hashes: ['C'.repeat(81)],
}

export const expectedGetTrytesResponse: GetTrytesResponse = {
    trytes: ['A'.repeat(2673), 'B'.repeat(2673), 'C'.repeat(2673)],
}

export const getTrytesResponseA: GetTrytesResponse = {
    trytes: ['A'.repeat(2673), 'B'.repeat(2673)],
}

export const getTrytesResponseB: GetTrytesResponse = {
    trytes: ['C'.repeat(2673)],
}

export const getTrytesNockBatchA = nock('http://localhost:24265', headers(apiVersion))
    .persist()
    .post('/', getTrytesCommandA)
    .reply(200, getTrytesResponseA)

export const getTrytesNockBatchB = nock('http://localhost:24265', headers(apiVersion))
    .persist()
    .post('/', getTrytesCommandB)
    .reply(200, getTrytesResponseB)

// 3. getBalances

export const getBalancesCommand: GetBalancesCommand = {
    command: IRICommand.GET_BALANCES,
    addresses: ['A'.repeat(81), 'B'.repeat(81), 'C'.repeat(81)],
    threshold: 100,
}

export const getBalancesCommandA: GetBalancesCommand = {
    command: IRICommand.GET_BALANCES,
    addresses: ['A'.repeat(81), 'B'.repeat(81)],
    threshold: 100,
}

export const getBalancesCommandB: GetBalancesCommand = {
    command: IRICommand.GET_BALANCES,
    addresses: ['C'.repeat(81)],
    threshold: 100,
}

export const expectedGetBalancesResponse: GetBalancesResponse = {
    balances: ['1', '2', '3'],
    milestone: 'B'.repeat(81),
    milestoneIndex: 2,
    duration: 0,
}

export const getBalancesResponseA: GetBalancesResponse = {
    balances: ['1', '2'],
    milestone: 'B'.repeat(81),
    milestoneIndex: 2,
    duration: 0,
}

export const getBalancesResponseB: GetBalancesResponse = {
    balances: ['3'],
    milestone: 'A'.repeat(81),
    milestoneIndex: 1,
    duration: 0,
}

export const getBalancesNockBatchA = nock('http://localhost:24265', headers(apiVersion))
    .persist()
    .post('/', getBalancesCommandA)
    .reply(200, getBalancesResponseA)

export const getBalancesNockBatchB = nock('http://localhost:24265', headers(apiVersion))
    .persist()
    .post('/', getBalancesCommandB)
    .reply(200, getBalancesResponseB)

// 4. getInclusionStates

export const getInclusionStatesCommand: GetInclusionStatesCommand = {
    command: IRICommand.GET_INCLUSION_STATES,
    transactions: ['A'.repeat(81), 'B'.repeat(81), 'C'.repeat(81)],
    tips: ['T'.repeat(81)],
}

export const getInclusionStatesCommandA: GetInclusionStatesCommand = {
    command: IRICommand.GET_INCLUSION_STATES,
    transactions: ['A'.repeat(81), 'B'.repeat(81)],
    tips: ['T'.repeat(81)],
}

export const getInclusionStatesCommandB: GetInclusionStatesCommand = {
    command: IRICommand.GET_INCLUSION_STATES,
    transactions: ['C'.repeat(81)],
    tips: ['T'.repeat(81)],
}

export const expectedGetInclusionStatesResponse: GetInclusionStatesResponse = {
    states: [true, false, true],
    duration: 0,
}

export const getInclusionStatesResponseA: GetInclusionStatesResponse = {
    states: [true, false],
    duration: 0,
}

export const getInclusionStatesResponseB: GetInclusionStatesResponse = {
    states: [true],
    duration: 0,
}

export const getInclusionStatesNockBatchA = nock('http://localhost:24265', headers(apiVersion))
    .persist()
    .post('/', getInclusionStatesCommandA)
    .reply(200, getInclusionStatesResponseA)

export const geInclusionStatesNockBatchB = nock('http://localhost:24265', headers(apiVersion))
    .persist()
    .post('/', getInclusionStatesCommandB)
    .reply(200, getInclusionStatesResponseB)
