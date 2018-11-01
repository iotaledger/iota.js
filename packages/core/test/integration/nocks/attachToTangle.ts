import { bundle, bundleTrytes } from '@iota/samples'
import * as nock from 'nock'
import { AttachToTangleCommand, AttachToTangleResponse, IRICommand } from '../../../../types'
import headers from './headers'

export const attachToTangleCommand: AttachToTangleCommand = {
    command: IRICommand.ATTACH_TO_TANGLE,
    trunkTransaction: bundle[bundle.length - 1].trunkTransaction,
    branchTransaction: bundle[bundle.length - 1].branchTransaction,
    minWeightMagnitude: 14,
    trytes: [...bundleTrytes].reverse(),
}

export const attachToTangleResponse: AttachToTangleResponse = {
    trytes: bundleTrytes,
}

export const attachToTangleNock = nock('http://localhost:14265', headers)
    .persist()
    .post('/', attachToTangleCommand)
    .reply(200, attachToTangleResponse)
