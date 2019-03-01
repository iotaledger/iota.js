import { createHttpClient } from '@iota/http-client'
import test from 'ava'
import { INSUFFICIENT_BALANCE, INVALID_SEED, INVALID_START_END_OPTIONS } from '../../../errors'
import { stringify } from '../../../guards'
import { Inputs } from '../../../types'
import {
    createGetInputs,
    createInputsObject,
    hasSufficientBalance,
    inputsToAddressOptions,
} from '../../src/createGetInputs'
import './nocks/findTransactions'
import { balancesResponse, getBalancesCommand } from './nocks/getBalances'
import './nocks/wereAddressesSpentFrom'

const getInputs = createGetInputs(createHttpClient())
const seed = 'SEED'

const { balances } = balancesResponse

const inputs: Inputs = {
    inputs: [
        {
            address: getBalancesCommand.addresses[0],
            balance: balances[0],
            keyIndex: 0,
            security: 2,
        },
        {
            address: getBalancesCommand.addresses[2],
            balance: balances[2],
            keyIndex: 2,
            security: 2,
        },
    ],
    totalBalance: balances[0] + balances[2],
}

test('inputsToAddressOptions() translates getInputs() options to compatible getNewAddress() options', t => {
    t.deepEqual(
        inputsToAddressOptions({
            start: 3,
            end: 9,
            security: 2,
            threshold: 100,
        }),
        {
            index: 3,
            total: 7,
            security: 2,
            returnAll: true,
            checksum: false,
        },
        'inputsToAddressOptions() should translate getInputs() options with `end`, to getNewAddress() compatible options'
    )

    t.deepEqual(
        inputsToAddressOptions({
            start: 3,
            end: undefined,
            security: 2,
            threshold: 100,
        }),
        {
            index: 3,
            total: undefined,
            security: 2,
            returnAll: true,
            checksum: false,
        },
        'inputsToAddressOptions() should translate getInputs() options without `end`, to getNewAddress() compatible options'
    )
})

test('createInputsObject() aggregates addresses and balances', t => {
    t.deepEqual(
        createInputsObject(getBalancesCommand.addresses, balances, 0, 2),
        inputs,
        'createInputsObject() should aggregate addresses and balances correctly'
    )
})

test('hasSufficientBalance() throws error for insufficient balance', t => {
    t.is(
        t.throws(() => hasSufficientBalance(inputs, 110), Error).message,
        `${INSUFFICIENT_BALANCE}`,
        'hasSufficientBalance() should throw error for insufficient balance'
    )
})

test('getInputs() resolves to correct inputs', async t => {
    t.deepEqual(
        await getInputs(seed, { start: 0, threshold: 100 }),
        inputs,
        'getInputs() should resolve to correct balances'
    )
})

test('getInputs() rejects with correct errors for invalid input', t => {
    const invalidSeed = 'asdasDSFDAFD'
    const invalidStartEndOptions = {
        start: 10,
        end: 9,
    }

    t.is(
        t.throws(() => getInputs(invalidSeed), Error).message,
        `${INVALID_SEED}: ${stringify(invalidSeed)}`,
        'getInputs() should throw correct error for invalid seed'
    )

    t.is(
        t.throws(() => getInputs(seed, invalidStartEndOptions), Error).message,
        `${INVALID_START_END_OPTIONS}: ${stringify(invalidStartEndOptions)}`,
        'getInputs() should throw correct error for invalid start & end options'
    )
})

test('getInputs() with threshold rejects with correct error if balance is insufficient', t => {
    return getInputs(seed, { start: 0, threshold: 110 }).catch((err: Error) =>
        t.is(
            err.message,
            `${INSUFFICIENT_BALANCE}`,
            'getInputs() with threshold should reject with correct error if balance is insufficient'
        )
    )
})

test.cb('getInputs() passes correct arguments to callback', t => {
    getInputs(seed, { start: 0, threshold: 100 }, (err, res) => {
        t.is(err, null, 'getInputs() should pass null as first argument in callback for successuful requests')

        t.deepEqual(res, inputs, 'getInputs() should pass the correct response as second argument in callback')

        t.end()
    })
})
