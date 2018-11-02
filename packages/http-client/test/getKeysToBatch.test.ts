import test from 'ava'
import { FindTransactionsCommand, IRICommand } from '../../types'
import { BatchableCommand, getKeysToBatch } from '../src/httpClient'

const BATCH_SIZE = 2

const tags: string[] = ['A' + '9'.repeat(26), 'B' + '9'.repeat(26), 'C' + '9'.repeat(26)]

const approvees: string[] = ['A'.repeat(81), 'B'.repeat(81), 'C'.repeat(81)]

const command: FindTransactionsCommand = {
    command: IRICommand.FIND_TRANSACTIONS,
    addresses: ['9'.repeat(81)],
    tags,
    approvees,
}

const commandWithoutBatchableKeys: FindTransactionsCommand = {
    command: IRICommand.FIND_TRANSACTIONS,
    addresses: ['A'.repeat(81), 'B'.repeat(81)],
}

test('getKeysToBatch() should return correct keys.', t => {
    t.deepEqual(getKeysToBatch(command as BatchableCommand<FindTransactionsCommand>, BATCH_SIZE), ['tags', 'approvees'])
})

test('getKeysToBatch() should return no empty array for non-batchable keys.', t => {
    t.deepEqual(
        getKeysToBatch(commandWithoutBatchableKeys as BatchableCommand<FindTransactionsCommand>, BATCH_SIZE),
        []
    )
})
