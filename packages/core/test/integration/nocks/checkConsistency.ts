import * as nock from 'nock'
import { CheckConsistencyCommand, CheckConsistencyResponse, IRICommand } from '../../../../types'
import headers from './headers'

export const checkConsistencyCommand: CheckConsistencyCommand = {
    command: IRICommand.CHECK_CONSISTENCY,
    tails: ['A'.repeat(81), 'B'.repeat(81)],
}

export const checkConsistencyResponse: CheckConsistencyResponse = {
    state: true,
    info: '',
}

export const checkConsistencyNock = nock('http://localhost:14265', headers)
    .persist()
    .post('/', checkConsistencyCommand)
    .reply(200, checkConsistencyResponse)

export const checkConsistencyWithInfoCommand: CheckConsistencyCommand = {
    command: IRICommand.CHECK_CONSISTENCY,
    tails: ['A'.repeat(81), 'B'.repeat(81), 'C'.repeat(81)],
}

export const checkConsistencyWithInfoResponse: CheckConsistencyResponse = {
    state: false,
    info: 'test response',
}

export const checkConsistencyWithInfoNock = nock('http://localhost:14265', headers)
    .persist()
    .post('/', checkConsistencyWithInfoCommand)
    .reply(200, checkConsistencyWithInfoResponse)
