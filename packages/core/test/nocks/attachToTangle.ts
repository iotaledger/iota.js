import * as nock from 'nock'
import { AttachToTangleCommand, AttachToTangleResponse } from '../../lib/api/core'
import { IRICommand } from '../../lib/api/types'
import { attachedTrytes } from '../samples/attachedTrytes'
import { bundle, bundleTrytes } from '../samples/bundle'
import headers from './headers'

export const attachToTangleCommand: AttachToTangleCommand = {
    command: IRICommand.ATTACH_TO_TANGLE,
    trunkTransaction: bundle[bundle.length - 1].trunkTransaction,
    branchTransaction: bundle[bundle.length - 1].branchTransaction,
    minWeightMagnitude: 14,
    trytes: [...bundleTrytes].reverse()
}

export const attachToTangleResponse: AttachToTangleResponse = {
    trytes: bundleTrytes 
}

export const attachToTangleNock = nock('http://localhost:14265', headers)
    .persist()
    .post('/', attachToTangleCommand)
    .reply(200, attachToTangleResponse)
