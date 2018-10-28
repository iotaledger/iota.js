import * as nock from 'nock'
import { GetInclusionStatesCommand, GetInclusionStatesResponse, IRICommand } from '../../../../types'
import headers from './headers'

export const getInclusionStatesCommand: GetInclusionStatesCommand = {
    command: IRICommand.GET_INCLUSION_STATES,
    transactions: ['A'.repeat(81), 'B'.repeat(81)],
    tips: ['M'.repeat(81)],
}

export const getInclusionStatesResponse: GetInclusionStatesResponse = {
    states: [true, false],
    duration: 10,
}

export const getBalancesNock = nock('http://localhost:14265', headers)
    .persist()
    .post('/', getInclusionStatesCommand)
    .reply(200, getInclusionStatesResponse)

nock('http://localhost:14265', headers)
    .persist()
    .post('/', {
        command: IRICommand.GET_INCLUSION_STATES,
        transactions: ['9'.repeat(81), '9'.repeat(81)],
        tips: ['M'.repeat(81)],
    })
    .reply(200, getInclusionStatesResponse)
