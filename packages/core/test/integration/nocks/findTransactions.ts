import { addresses } from '@iota/samples'
import * as nock from 'nock'
import { FindTransactionsCommand, FindTransactionsResponse, IRICommand } from '../../../../types'
import headers from './headers'

export const emptyFindTransactionsCommand: FindTransactionsCommand = {
    command: IRICommand.FIND_TRANSACTIONS,
    addresses: [addresses[2]],
}

export const emptyFindTransactionsResponse: FindTransactionsResponse = {
    hashes: [],
}

export const findTransactionsByAddressesCommand: FindTransactionsCommand = {
    command: IRICommand.FIND_TRANSACTIONS,
    addresses: [addresses[1]],
}

export const findTransactionsByBundlesCommand: FindTransactionsCommand = {
    command: IRICommand.FIND_TRANSACTIONS,
    bundles: ['A'.repeat(81), 'B'.repeat(81)],
}

export const findTransactionsByTagsCommand: FindTransactionsCommand = {
    command: IRICommand.FIND_TRANSACTIONS,
    tags: ['A'.repeat(27), 'B'.repeat(27)],
}

export const findTransactionsByApproveesCommand: FindTransactionsCommand = {
    command: IRICommand.FIND_TRANSACTIONS,
    approvees: ['A'.repeat(81), 'B'.repeat(81)],
}

export const findTransactionsByAddressesResponse: FindTransactionsResponse = {
    hashes: ['A'.repeat(81), 'B'.repeat(81)],
}

export const findTransactionsByBundlesResponse: FindTransactionsResponse = {
    hashes: ['A'.repeat(81), 'B'.repeat(81)],
}

export const findTransactionsByTagsResponse: FindTransactionsResponse = {
    hashes: ['A'.repeat(81), 'B'.repeat(81)],
}

export const findTransactionsByApproveesResponse: FindTransactionsResponse = {
    hashes: ['A'.repeat(81), 'B'.repeat(81)],
}

export const findTransactionsByAddressesNock = nock('http://localhost:14265', headers)
    .persist()
    .post('/', findTransactionsByAddressesCommand)
    .reply(200, findTransactionsByAddressesResponse)

export const findTransactionsByBundlesNock = nock('http://localhost:14265', headers)
    .persist()
    .post('/', findTransactionsByBundlesCommand)
    .reply(200, findTransactionsByBundlesResponse)

export const findTransactionsByTagsNock = nock('http://localhost:14265', headers)
    .persist()
    .post('/', findTransactionsByTagsCommand)
    .reply(200, findTransactionsByTagsResponse)

export const findTransactionsByApproveesNock = nock('http://localhost:14265', headers)
    .persist()
    .post('/', findTransactionsByApproveesCommand)
    .reply(200, findTransactionsByApproveesResponse)

export const emptyFindTransactionsNock = nock('http://localhost:14265', headers)
    .persist()
    .post('/', emptyFindTransactionsCommand)
    .reply(200, emptyFindTransactionsResponse)

export const findTransactionsResponse: FindTransactionsResponse = {
    hashes: ['A'.repeat(81), 'B'.repeat(81)],
}

nock('http://localhost:14265', headers)
    .persist()
    .post('/', {
        command: IRICommand.FIND_TRANSACTIONS,
        addresses,
    })
    .reply(200, findTransactionsResponse)

nock('http://localhost:14265', headers)
    .persist()
    .post('/', {
        command: IRICommand.FIND_TRANSACTIONS,
        bundles: ['9'.repeat(81)],
    })
    .reply(200, findTransactionsResponse)

nock('http://localhost:14265', headers)
    .persist()
    .post('/', {
        command: IRICommand.FIND_TRANSACTIONS,
        addresses: [addresses[1], addresses[2]],
    })
    .reply(200, findTransactionsResponse)
