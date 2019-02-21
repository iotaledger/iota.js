import { test } from 'ava'
import {
    BaseCommand,
    FindTransactionsCommand,
    GetBalancesCommand,
    GetInclusionStatesCommand,
    GetTrytesCommand,
    IRICommand,
} from '../../types'
import { isBatchableCommand } from '../src/httpClient'

const findTransactionsCommand: FindTransactionsCommand = {
    command: IRICommand.FIND_TRANSACTIONS,
    addresses: ['A'.repeat(81), 'B'.repeat(81)],
}

const getTrytesCommand: GetTrytesCommand = {
    command: IRICommand.GET_TRYTES,
    hashes: ['A'.repeat(81), 'B'.repeat(81)],
}

const getBalancesCommand: GetBalancesCommand = {
    command: IRICommand.GET_BALANCES,
    addresses: ['A'.repeat(81), 'B'.repeat(81)],
    threshold: 100,
}

const getInclusionStatesCommand: GetInclusionStatesCommand = {
    command: IRICommand.GET_INCLUSION_STATES,
    transactions: ['A'.repeat(81), 'B'.repeat(81)],
    tips: ['T'.repeat(81)],
}

interface CustomCommand extends BaseCommand {
    key: ReadonlyArray<string>
}

const nonBatchableCommand: CustomCommand = {
    command: 'command',
    key: ['key'],
}

test('isBatchableCommand() returns true for batchable findTransactions commands.', t => {
    t.is(isBatchableCommand(findTransactionsCommand), true)
})

test('isBatchableCommand() returns true for batchable getTrytes commands.', t => {
    t.is(isBatchableCommand(getTrytesCommand), true)
})

test('isBatchableCommand() returns true for batchable getBalances commands.', t => {
    t.is(isBatchableCommand(getBalancesCommand), true)
})

test('isBatchableCommand() returns true for batchable getInclusionStates commands.', t => {
    t.is(isBatchableCommand(getInclusionStatesCommand), true)
})

test('isBatchableCommand() returns false for non-batchable commands.', t => {
    t.is(isBatchableCommand(nonBatchableCommand), false)
})
