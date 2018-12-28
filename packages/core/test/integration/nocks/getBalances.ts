import { addresses } from '@iota/samples'
import * as nock from 'nock'
import {
    Balances, // tslint:disable-line no-unused-variable
    GetBalancesCommand,
    IRICommand,
} from '../../../../types'
import headers from './headers'

export const getBalancesCommand: GetBalancesCommand = {
    command: IRICommand.GET_BALANCES,
    addresses,
    threshold: 100,
}

export const getBalancesCommandWithTips: GetBalancesCommand = { ...getBalancesCommand, tips: ['M'.repeat(81)] }

export const balancesResponse = {
    balances: [99, 0, 1],
    milestone: 'M'.repeat(81),
    milestoneIndex: 1,
}

export const getBalancesNock = nock('http://localhost:14265', headers)
    .persist()
    .post('/', getBalancesCommand)
    .reply(200, balancesResponse)

export const getBalancesNockWithTips = nock('http://localhost:14265', headers)
    .persist()
    .post('/', getBalancesCommandWithTips)
    .reply(200, balancesResponse)

nock('http://localhost:14265', headers)
    .persist()
    .post('/', {
        ...getBalancesCommand,
        addresses: [addresses[1], addresses[2]],
    })
    .reply(200, {
        ...balancesResponse,
        balances: ['0', '1'],
    })
