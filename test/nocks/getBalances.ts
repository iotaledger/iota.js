import * as nock from 'nock'
import { GetBalancesCommand, GetBalancesResponse } from '../../lib/api/core'
import { IRICommand } from '../../lib/api/types'
import headers from './headers'

export const getBalancesCommand: GetBalancesCommand = {
    command: IRICommand.GET_BALANCES, 
    addresses: [
        'FJHSSHBZTAKQNDTIKJYCZBOZDGSZANCZSWCNWUOCZXFADNOQSYAHEJPXRLOVPNOQFQXXGEGVDGICLMOXX', 
        '9DZXPFSVCSSWXXQPFMWLGFKPBAFTHYMKMZCPFHBVHXPFNJEIJIEEPKXAUBKBNNLIKWHJIYQDFWQVELOCB',
        'OTSZGTNPKFSGJLUPUNGGXFBYF9GVUEHOADZZTDEOJPWNEIVBLHOMUWPILAHTQHHVSBKTDVQIAEQOZXGFB'
    ],
    threshold: 100
}

export const getBalancesResponse: GetBalancesResponse = {
    balances: ['99', '1', '9'],
    milestone: 'M'.repeat(81),
    milestoneIndex: 1,
    duration: 10
}

export const getBalancesNock = nock('http://localhost:14265', headers)
    .persist()
    .post('/', getBalancesCommand)
    .reply(200, getBalancesResponse)

nock('http://localhost:14265', headers)
    .persist()
    .post('/', {
        ...getBalancesCommand,
        addresses: [
            '9DZXPFSVCSSWXXQPFMWLGFKPBAFTHYMKMZCPFHBVHXPFNJEIJIEEPKXAUBKBNNLIKWHJIYQDFWQVELOCB',
            'OTSZGTNPKFSGJLUPUNGGXFBYF9GVUEHOADZZTDEOJPWNEIVBLHOMUWPILAHTQHHVSBKTDVQIAEQOZXGFB'
        ]
    })
    .reply(200, {
        ...getBalancesResponse,
        balances: ['1', '9']
    })
