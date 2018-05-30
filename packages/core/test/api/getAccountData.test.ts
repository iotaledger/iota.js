import test from 'ava'
import { provider } from '@iota/http-client'
import { AccountData, createGetAccountData } from '../../src'
import { INSUFFICIENT_BALANCE, INVALID_SEED, INVALID_START_END_OPTIONS } from '../../src/errors'
import { getBalancesCommand, getBalancesResponse } from '../nocks/getBalances'
import '../nocks/findTransactions'
import '../nocks/getInclusionStates'
import '../nocks/getNodeInfo'
import '../nocks/getTrytes'
import '../nocks/wereAddressesSpentFrom'

import { transfers } from '../samples/bundle'

const getAccountData = createGetAccountData(provider())
const seed = 'SEED'

const accountData: AccountData = {
    addresses: [
        getBalancesCommand.addresses[0],
        getBalancesCommand.addresses[1],
        getBalancesCommand.addresses[2]
    ],
    inputs: [
        {
            address: getBalancesCommand.addresses[1],
            balance: getBalancesResponse.balances[1],
            keyIndex: 1,
            security: 2
        }, {
            address: getBalancesCommand.addresses[2],
            balance: getBalancesResponse.balances[2],
            keyIndex: 2,
            security: 2
        },
    ],
    latestAddress: getBalancesCommand.addresses[2],
    transfers,
    balance: getBalancesResponse.balances
        .reduce((acc, balance) => acc + parseInt(balance, 10), 0)
}

test('getAccountData() resolves to correct account data', async t => {
    t.deepEqual(
        await getAccountData(seed, { start: 0 }),
        accountData,
        'getAccountData() should resolve to correct account data'
    )
})

test('getAccountData() rejects with correct errors for invalid inputs', t => {
    const invalidSeed = 'asdasDSFDAFD'
    const invalidStartEndOptions = {
        start: 10,
        end: 9
    }

    t.is(
        t.throws(() => getAccountData(invalidSeed, { start: 0 }), Error).message,
        `${INVALID_SEED}: ${invalidSeed}`,
        'getAccountData() should throw correct error for invalid seed'
    )

    t.is(
        t.throws(() => getAccountData(seed, invalidStartEndOptions), Error).message,
        `${INVALID_START_END_OPTIONS}: ${invalidStartEndOptions}`,
        'getAccountData() should throw correct error for invalid start & end options'
    )
})

test.cb('getAccountData() invokes callback', t => {
    getAccountData(seed, { start: 0 }, t.end)
})

test.cb('getAccountData() passes correct arguments to callback', t => {
    getAccountData(seed, { start: 0 }, (err, res) => {
        t.is(
            err,
            null,
            'getAccountData() should pass null as first argument in callback for successuful requests'
        )

        t.deepEqual(
            res,
            accountData,
            'getAccountData() should pass the correct response as second argument in callback'
        )

        t.end()
    })
})
