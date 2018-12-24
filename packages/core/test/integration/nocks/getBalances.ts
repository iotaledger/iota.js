import * as nock from 'nock'
import {
    Balances, // tslint:disable-line no-unused-variable
    GetBalancesCommand,
    IRICommand,
} from '../../../../types'
import headers from './headers'

export const getBalancesCommand: GetBalancesCommand = {
    command: IRICommand.GET_BALANCES,
    addresses: [
        'FJHSSHBZTAKQNDTIKJYCZBOZDGSZANCZSWCNWUOCZXFADNOQSYAHEJPXRLOVPNOQFQXXGEGVDGICLMOXX',
        '9DZXPFSVCSSWXXQPFMWLGFKPBAFTHYMKMZCPFHBVHXPFNJEIJIEEPKXAUBKBNNLIKWHJIYQDFWQVELOCB',
        'OTSZGTNPKFSGJLUPUNGGXFBYF9GVUEHOADZZTDEOJPWNEIVBLHOMUWPILAHTQHHVSBKTDVQIAEQOZXGFB',
    ],
    threshold: 100,
}

export const balancesResponse = {
    balances: [99, 0, 1],
    milestone: 'M'.repeat(81),
    milestoneIndex: 1,
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
            'OTSZGTNPKFSGJLUPUNGGXFBYF9GVUEHOADZZTDEOJPWNEIVBLHOMUWPILAHTQHHVSBKTDVQIAEQOZXGFB',
        ],
    })
    .reply(200, {
        ...balancesResponse,
        balances: ['0', '1'],
    })
