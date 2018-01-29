import test from 'ava'

import {
    formatGetBalancesResponse,
    makeGetBalancesCommand,
    normalizeBalances
} from '../../lib/api/core/getBalances'

const getBalancesResponse = {
    balances: ['1', '2', '3'],
    duration: 10,
    milestone: 'M',
    milestoneIndex: 1
}

test('normalizeBalances()', t => {
    const addresses = ['A', 'B', 'C']
    const balances = ['1', '2', '3']
    const expected = {
        A: { balance: '1' },
        B: { balance: '2' },
        C: { balance: '3' }
    }
    const actual = normalizeBalances(addresses)(balances)
    t.deepEqual(actual, expected)
})

test('makeGetBalancesCommand()', t => {
    const addresses = ['A', 'B', 'C']
    const expected = {
        command: 'getBalances',
        addresses: ['A', 'B', 'C'],
        threshold: 100
    }
    const actual = makeGetBalancesCommand(addresses, 100)
    t.deepEqual(actual, expected)
})

test('formatGetBalancesResponse() defaults to normalized format', t => {
    const addresses = ['A', 'B', 'C']
    const expected = 'object'
    const actual = typeof formatGetBalancesResponse(addresses)(getBalancesResponse)
    t.deepEqual(actual, expected)
})

test('formatGetBalancesResponse() ouputs balances in normalized format', t => {
    const addresses = ['A', 'B', 'C']
    const normalizeOutput = true
    const expected = {
        balances: {
            A: { balance: '1' },
            B: { balance: '2' },
            C: { balance: '3' }
        },
        duration: 10,
        milestone: 'M',
        milestoneIndex: 1
    }
    const actual = formatGetBalancesResponse(addresses, normalizeOutput)(getBalancesResponse)
    t.deepEqual(actual, expected)
})

test('formatGetBalancesResponse() outputs balances in array format', t => {
    const addresses = ['A', 'B', 'C']
    const normalizeOutput = false
    const expected = {
        balances: ['1', '2', '3'],
        duration: 10,
        milestone: 'M',
        milestoneIndex: 1
    }
    const actual = formatGetBalancesResponse(addresses, normalizeOutput)(getBalancesResponse)
    t.deepEqual(actual, expected)
})
