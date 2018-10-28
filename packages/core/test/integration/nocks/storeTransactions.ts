import { bundleTrytes } from '@iota/samples'
import * as nock from 'nock'
import { IRICommand, StoreTransactionsCommand } from '../../../../types'
import headers from './headers'

export const storeTransactionsCommand: StoreTransactionsCommand = {
    command: IRICommand.STORE_TRANSACTIONS,
    trytes: bundleTrytes,
}

export const storeTransactionsNock = nock('http://localhost:14265', headers)
    .persist()
    .post('/', storeTransactionsCommand)
    .reply(200, {})
