import * as nock from 'nock'
import { StoreTransactionsCommand } from '../../lib/api/core'
import { IRICommand } from '../../lib/api/types'
import { bundleTrytes } from '../samples/bundle'
import headers from './headers'

export const storeTransactionsCommand: StoreTransactionsCommand = {
    command: IRICommand.STORE_TRANSACTIONS,
    trytes: bundleTrytes
}

export const storeTransactionsNock = nock('http://localhost:14265', headers)
    .persist()
    .post('/', storeTransactionsCommand)
    .reply(200, {})
