import test from 'ava'
import { createHttpClient } from '../src'
import {
    apiVersion,
    findTransactionsCommand,
    findTransactionsResponse,
    invalidCommand,
    invalidGetTransactionsToApproveCommand,
    invalidGetTransactionsToApproveCommandIgnored,
    invalidGetTransactionsToApproveResponse,
} from './send'

const { send } = createHttpClient({
    provider: 'http://localhost:24265',
    requestBatchSize: 3,
    apiVersion,
})

test('send() returns correct response.', async t => {
    t.deepEqual(await send(findTransactionsCommand), findTransactionsResponse)
})

test('send() returns correct error message for bad request.', t => {
    return send(invalidCommand).catch(error => {
        t.is(error, 'Request error: Bad Request', 'httpClient.send() should throw correct error for bad request.')
    })
})

test('send() parses and returns json encoded error of bad request.', t => {
    return send(invalidGetTransactionsToApproveCommand).catch(error => {
        t.is(
            error,
            `Request error: ${invalidGetTransactionsToApproveResponse.error}`,
            'httpClient.send() should parse and return json encoded error of bad request.'
        )
    })
})

test('send() ignores invalid json of bad requests.', t => {
    return send(invalidGetTransactionsToApproveCommandIgnored).catch(error => {
        t.is(error, 'Request error: Bad Request', 'httpClient.send() should ignore invalid json of bad requests.')
    })
})
