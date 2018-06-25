import * as nock from 'nock'
import { IRICommand, BroadcastTransactionsCommand } from '../../../../types'
import { bundleTrytes } from '@iota/samples'
import headers from './headers'

export const broadcastTransactionsCommand: BroadcastTransactionsCommand = {
    command: IRICommand.BROADCAST_TRANSACTIONS,
    trytes: bundleTrytes,
}

export const broadcastTransactionsNock = nock('http://localhost:14265', headers)
    .persist()
    .post('/', broadcastTransactionsCommand)
    .reply(200, {})
