import { createHttpClient } from '@iota/http-client'
import { transfers } from '@iota/samples'
import test from 'ava'
import { INVALID_SEED, INVALID_START_END_OPTIONS } from '../../../errors'
import { stringify } from '../../../guards'
import { Hash } from '../../../types'
import { AccountData, createGetAccountData } from '../../src'
import './nocks/findTransactions'
import { balancesResponse, getBalancesCommand } from './nocks/getBalances'
import './nocks/getInclusionStates'
import './nocks/getNodeInfo'
import './nocks/getTrytes'
import './nocks/wereAddressesSpentFrom'

const getAccountData = createGetAccountData(createHttpClient(), 'lib')
const seed = 'SEED'

const { balances } = balancesResponse

const accountAddresses = [
    getBalancesCommand.addresses[0],
    getBalancesCommand.addresses[1],
    getBalancesCommand.addresses[2],
]

const accountData: AccountData = {
    addresses: accountAddresses,
    inputs: [
        {
            address: getBalancesCommand.addresses[2],
            balance: balances[2],
            keyIndex: 2,
            security: 2,
        },
    ],
    latestAddress: getBalancesCommand.addresses[2],
    transfers,
    transactions: transfers.reduce(
        (acc: ReadonlyArray<Hash>, bundle) =>
            acc.concat(
                bundle
                    .filter(({ address }) => accountAddresses.indexOf(address) > -1)
                    .map(transaction => transaction.hash)
            ),
        []
    ),
    balance: 1,
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
        end: 9,
    }

    t.is(
        t.throws(() => getAccountData(invalidSeed, { start: 0 }), Error).message,
        `${INVALID_SEED}: ${stringify(invalidSeed)}`,
        'getAccountData() should throw correct error for invalid seed'
    )

    t.is(
        t.throws(() => getAccountData(seed, invalidStartEndOptions), Error).message,
        `${INVALID_START_END_OPTIONS}: ${stringify(invalidStartEndOptions)}`,
        'getAccountData() should throw correct error for invalid start & end options'
    )
})

test('getAccountData() with start > 0 resolves to correct account data.', async t => {
    const expected = {
        ...accountData,
        addresses: accountData.addresses.slice(1, 3),
        balance: balancesResponse.balances.slice(1, 3).reduce((acc, balance) => acc + balance, 0),
    }

    t.deepEqual(
        await getAccountData(seed, { start: 1 }),
        expected,
        'getAccountData() with start > 0 should resolve to correct account data'
    )
})

test.cb('getAccountData() invokes callback', t => {
    getAccountData(seed, { start: 0 }, t.end)
})

test.cb('getAccountData() passes correct arguments to callback', t => {
    getAccountData(seed, { start: 0 }, (err, res) => {
        t.is(err, null, 'getAccountData() should pass null as first argument in callback for successuful requests')

        t.deepEqual(
            res,
            accountData,
            'getAccountData() should pass the correct response as second argument in callback'
        )

        t.end()
    })
})
