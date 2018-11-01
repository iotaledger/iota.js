import { bundle, bundleTrytes, bundleWithZeroValue, bundleWithZeroValueTrytes } from '@iota/samples'
import * as nock from 'nock'
import { GetTrytesCommand, GetTrytesResponse, IRICommand } from '../../../../types'
import headers from './headers'

export const getTrytesCommand: GetTrytesCommand = {
    command: IRICommand.GET_TRYTES,
    hashes: ['A'.repeat(81), 'B'.repeat(81)],
}

export const getTrytesResponse: GetTrytesResponse = {
    trytes: ['9'.repeat(2673), '9'.repeat(2673)],
}

export const getBalancesNock = nock('http://localhost:14265', headers)
    .persist()
    .post('/', getTrytesCommand)
    .reply(200, getTrytesResponse)

nock('http://localhost:14265', headers)
    .persist()
    .post('/', {
        command: IRICommand.GET_TRYTES,
        hashes: [bundleWithZeroValue[0].hash],
    })
    .reply(200, {
        trytes: bundleWithZeroValueTrytes,
    })

nock('http://localhost:14265', headers)
    .persist()
    .post('/', {
        command: IRICommand.GET_TRYTES,
        hashes: [bundle[0].hash],
    })
    .reply(200, {
        trytes: [bundleTrytes[0]],
    })

nock('http://localhost:14265', headers)
    .persist()
    .post('/', {
        command: IRICommand.GET_TRYTES,
        hashes: [bundle[1].hash],
    })
    .reply(200, {
        trytes: [bundleTrytes[1]],
    })

nock('http://localhost:14265', headers)
    .persist()
    .post('/', {
        command: IRICommand.GET_TRYTES,
        hashes: [bundle[2].hash],
    })
    .reply(200, {
        trytes: [bundleTrytes[2]],
    })

nock('http://localhost:14265', headers)
    .persist()
    .post('/', {
        command: IRICommand.GET_TRYTES,
        hashes: [bundle[3].hash],
    })
    .reply(200, {
        trytes: [bundleTrytes[3]],
    })
