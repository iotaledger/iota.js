import * as nock from 'nock'
import { IRICommand } from '../../../../types'
import {
    WereAddressesSpentFromCommand,
    WereAddressesSpentFromResponse,
} from '../../../src/createWereAddressesSpentFrom'
import headers from './headers'

import { addresses } from '@iota/samples'

export const wereAddressesSpentFromCommand: WereAddressesSpentFromCommand = {
    command: IRICommand.WERE_ADDRESSES_SPENT_FROM,
    addresses,
}

export const wereAddressesSpentFromResponse: WereAddressesSpentFromResponse = {
    states: [true, false, false],
}

export const wereAddressesSpentFromNock = nock('http://localhost:14265', headers)
    .persist()
    .post('/', wereAddressesSpentFromCommand)
    .reply(200, wereAddressesSpentFromResponse)

nock('http://localhost:14265', headers)
    .persist()
    .post('/', {
        command: IRICommand.WERE_ADDRESSES_SPENT_FROM,
        addresses: [addresses[0]],
    })
    .reply(200, {
        states: [true],
    })

nock('http://localhost:14265', headers)
    .persist()
    .post('/', {
        command: IRICommand.WERE_ADDRESSES_SPENT_FROM,
        addresses: [addresses[1]],
    })
    .reply(200, {
        states: [false],
    })

nock('http://localhost:14265', headers)
    .persist()
    .post('/', {
        command: IRICommand.WERE_ADDRESSES_SPENT_FROM,
        addresses: [addresses[2]],
    })
    .reply(200, {
        states: [false],
    })

nock('http://localhost:14265', headers)
    .persist()
    .post('/', {
        command: IRICommand.WERE_ADDRESSES_SPENT_FROM,
        addresses: [addresses[1], addresses[2]],
    })
    .reply(200, {
        states: [false, false],
    })
