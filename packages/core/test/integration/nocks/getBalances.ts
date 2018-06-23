import * as nock from 'nock'
import { IRICommand, GetBalancesCommand, Balances } from '../../../../types'
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

export const balancesResponse: Balances = {
    balances: [99, 1, 9],
    milestone: 'M'.repeat(81),
    milestoneIndex: 1
}

export const getBalancesNock = nock('http://localhost:14265', headers)
    .persist()
    .post('/', getBalancesCommand)
    .reply(200, balancesResponse)

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
        ...balancesResponse,
        balances: ['1', '9']
    })