import { bundle } from '@iota/samples'
import * as nock from 'nock'
import { GetTransactionsToApproveCommand, GetTransactionsToApproveResponse, IRICommand } from '../../../../types'
import headers from './headers'

export const depth = 3

export const getTransactionsToApproveCommand: GetTransactionsToApproveCommand = {
    command: IRICommand.GET_TRANSACTIONS_TO_APPROVE,
    depth,
}

export const getTransactionsToApproveWithReferenceCommand: GetTransactionsToApproveCommand = {
    command: IRICommand.GET_TRANSACTIONS_TO_APPROVE,
    depth,
    reference: 'R'.repeat(81),
}

export const getTransactionsToApproveResponse: GetTransactionsToApproveResponse = {
    trunkTransaction: bundle[bundle.length - 1].trunkTransaction,
    branchTransaction: bundle[bundle.length - 1].branchTransaction,
    duration: 10,
}

export const getTransactionsToApproveWithReferenceResponse: GetTransactionsToApproveResponse = getTransactionsToApproveResponse

export const getTransactionsToApproveNock = nock('http://localhost:14265', headers)
    .persist()
    .post('/', getTransactionsToApproveCommand)
    .reply(200, getTransactionsToApproveResponse)

export const getTransactionsToApproveWithReferenceNock = nock('http://localhost:14265', headers)
    .persist()
    .post('/', getTransactionsToApproveWithReferenceCommand)
    .reply(200, getTransactionsToApproveResponse)
