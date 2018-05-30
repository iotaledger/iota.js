import * as nock from 'nock'
import { BroadcastTransactionsCommand } from '../../lib/api/core'
import { IRICommand } from '../../lib/api/types'
import { bundleTrytes } from '../samples/bundle'
import headers from './headers'

export const broadcastTransactionsCommand: BroadcastTransactionsCommand = {
    command: IRICommand.BROADCAST_TRANSACTIONS,
    trytes: bundleTrytes
}

export const broadcastTransactionsNock = nock('http://localhost:14265', headers)
    .persist()
    .post('/', broadcastTransactionsCommand)
    .reply(200, {})
