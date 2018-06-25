import { test } from 'ava'
import { BaseCommand, FindTransactionsCommand, IRICommand } from '../../types'
import { isBatchableCommand } from '../src/httpClient'

const batchableCommand: FindTransactionsCommand = {
    command: IRICommand.FIND_TRANSACTIONS,
    addresses: ['A'.repeat(81), 'B'.repeat(81)],
}

interface CustomCommand extends BaseCommand {
    key: ReadonlyArray<string>
}

const nonBatchableCommand: CustomCommand = {
    command: 'command',
    key: ['key'],
}

test('isBatchableCommand() returns true for batchable commands.', t => {
    t.is(isBatchableCommand(batchableCommand), true)
})

test('isBatchableCommand() returns false for non-batchable commands.', t => {
    t.is(isBatchableCommand(nonBatchableCommand), false)
})
