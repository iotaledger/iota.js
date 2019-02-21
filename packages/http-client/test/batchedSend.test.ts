import test from 'ava'
import { createHttpClient } from '../src'
import {
    apiVersion,
    expectedFindTransactionsResponse,
    expectedGetBalancesResponse,
    expectedGetInclusionStatesResponse,
    expectedGetTrytesResponse,
    findTransactionsCommand,
    getBalancesCommand,
    getInclusionStatesCommand,
    getTrytesCommand,
    requestBatchSize,
} from './batchedSend'

const { send } = createHttpClient({
    provider: 'http://localhost:24265',
    requestBatchSize,
    apiVersion,
})

test('batchedSend() returns correct findTransactions response.', async t => {
    t.deepEqual(await send(findTransactionsCommand), expectedFindTransactionsResponse)
})

test('batchedSend() returns correct getTrytes response.', async t => {
    t.deepEqual(await send(getTrytesCommand), expectedGetTrytesResponse)
})

test('batchedSend() returns correct getBalances response.', async t => {
    t.deepEqual(await send(getBalancesCommand), expectedGetBalancesResponse)
})

test('batchedSend() returns correct getInclusionStates response.', async t => {
    t.deepEqual(await send(getInclusionStatesCommand), expectedGetInclusionStatesResponse)
})
