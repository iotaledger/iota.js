import { CDATransfer } from '@iota/cda'
import { trytesToTrits } from '@iota/converter'
import { generateAddress } from '@iota/core'
import * as BluebirdPromise from 'bluebird'
import * as nock from 'nock'
import { describe, Try } from 'riteway'
import { IRICommand, Trytes } from '../../types'
import { createAccount, createAccountWithPreset } from '../src/account'
import { preset } from '../src/preset'
import {
    accountASends10iToB as accountASends10iToBTrytes,
    accountASpendsFromRemainder as accountASpendsFromRemainderTrytes,
} from './trytes'

const persistencePath = './test/temp'
const currentTime = Math.floor(Date.now() / 1000)
const futureTime = 6833278800
const pastTime = currentTime - 7 * 24 * 60 * 60 * 1000

const noChecksum = (address: Trytes) => address.slice(0, 81)

const headers = {
    reqheaders: {
        'Content-Type': 'application/json',
        'X-IOTA-API-Version': '1',
    },
}

const assertAddressTransactions = (address: Trytes, hashes: Trytes[]) =>
    nock('http://localhost:14265', headers)
        .post('/', {
            command: IRICommand.FIND_TRANSACTIONS,
            addresses: [noChecksum(address)],
        })
        .times(1)
        .reply(200, {
            hashes,
        })

const assertRemoteSpentState = (address: Trytes, state: boolean) =>
    nock('http://localhost:14265', headers)
        .post('/', {
            command: IRICommand.WERE_ADDRESSES_SPENT_FROM,
            addresses: [noChecksum(address)],
        })
        .times(1)
        .reply(200, {
            states: [state],
        })

const assertBalance = (address: Trytes, balance: number) =>
    nock('http://localhost:14265', headers)
        .post('/', {
            command: IRICommand.GET_BALANCES,
            addresses: [noChecksum(address)],
        })
        .times(1)
        .reply(200, {
            balances: [balance],
            milestone: 'M'.repeat(81),
            milestoneIndex: 1,
        })

const assertTransfer = (transfer: CDATransfer, trytes: Trytes[]) => {
    const hash = 'ZZKVOZRYHZVYORKHDLWRNIWKWLZMVBNFSPQC99PYHVJFRYRHXVUTHPQOVPJBRNFLYWDNKBBUJOTDQVTDE'
    const transactionsToApprove = {
        trunkTransaction: '9'.repeat(81),
        branchTransaction: '9'.repeat(81),
    }

    assertAddressTransactions(transfer.address, [hash])

    nock('http://localhost:14265', headers)
        .post('/', {
            command: IRICommand.GET_TRYTES,
            hashes: [hash],
        })
        .times(1)
        .reply(200, {
            trytes: [trytes[0]],
        })

    nock('http://localhost:14265', headers)
        .persist()
        .post('/', { command: IRICommand.GET_NODE_INFO })
        .reply(200, {
            appName: 'IRI',
            appVersion: '',
            duration: 100,
            jreAvailableProcessors: 4,
            jreFreeMemory: 13020403,
            jreMaxMemory: 1241331231,
            jreTotalMemory: 4245234332,
            latestMilestone: 'M'.repeat(81),
            latestMilestoneIndex: 1,
            latestSolidSubtangleMilestone: 'M'.repeat(81),
            latestSolidSubtangleMilestoneIndex: 1,
            neighbors: 5,
            packetsQueueSize: 23,
            time: 213213214,
            tips: 123,
            transactionsToRequest: 10,
        })

    nock('http://localhost:14265', headers)
        .post('/', {
            command: IRICommand.GET_INCLUSION_STATES,
            transactions: [hash],
            tips: ['M'.repeat(81)],
        })
        .times(1)
        .reply(200, {
            states: [false],
        })

    nock('http://localhost:14265', headers)
        .post('/', {
            command: IRICommand.CHECK_CONSISTENCY,
            tails: [hash],
        })
        .times(1)
        .reply(200, {
            states: [false],
        })

    nock('http://localhost:14265', headers)
        .post('/', {
            command: IRICommand.GET_TRANSACTIONS_TO_APPROVE,
            depth: 3,
        })
        .times(1)
        .reply(200, {
            ...transactionsToApprove,
        })

    nock('http://localhost:14265', headers)
        .post('/', {
            command: IRICommand.ATTACH_TO_TANGLE,
            trytes: [...accountASends10iToBTrytes],
            ...transactionsToApprove,
            minWeightMagnitude: 9,
        })
        .times(1)
        .reply(200, {
            trytes: [...accountASends10iToBTrytes],
        })
}

describe('account.generateCDA()', async assert => {
    const seed = 'RQMMPLNFUUCULIIHEYKYBUXUFEDPKTXDQQQRUOBUVIVWIOAXDPNHLAJDSPCXKJNPTPJYBBCJKPVMONYDK'

    const accountParams = {
        seed,
        persistencePath,
        emitTransferEvents: false,
    }

    const account = createAccount(accountParams)

    assert({
        given: 'timeoutAt, multiUse & expectedAmount conditions',
        should: 'throw error',
        actual: (await Try(account.generateCDA, {
            timeoutAt: futureTime,
            multiUse: true,
            expectedAmount: 9,
        })).toString(),
        expected: 'TypeError: Only one of the following fields can be set: multiUse, expectedAmount',
    })

    assert({
        given: 'timeoutAt & multiUse conditions',
        should: 'generate 1st CDA',
        actual: await Try(() => {
            const address = generateAddress(seed, 1, 2, false)

            assertRemoteSpentState(address, false)
            assertAddressTransactions(address, [])

            return account.generateCDA({
                timeoutAt: futureTime,
                multiUse: false,
            })
        }),
        expected: {
            address: 'FSPPZHWG9FCUBVTNGMPIUVLMXRUAIWFEXRF9IYHPIYJRIORYOOEDBJN9WBFODDFLAKUOKYFZGDLHZNCXXPZZJZPHFT',
            timeoutAt: futureTime,
            multiUse: false,
            expectedAmount: 0,
        },
    })

    assert({
        given: 'timeoutAt & expectedAmount conditions',
        should: 'generate 2nd CDA',
        actual: await Try(() => {
            const address = generateAddress(seed, 2, 2, false)

            assertRemoteSpentState(address, false)
            assertAddressTransactions(address, [])

            return account.generateCDA({
                timeoutAt: futureTime,
                expectedAmount: 9,
            })
        }),
        expected: {
            address: 'KRXPZHNMGVJKBIQXV9ALWFOPGIGNVTJFNVKHSYZLI9AABBHKSPBTKKPRVI9ID9QXXKZGTXSSSBMUQFVLWJYJMXKPRS',
            timeoutAt: futureTime,
            multiUse: false,
            expectedAmount: 9,
        },
    })

    assert({
        given: 'timeoutAt & expectedAmount conditions',
        should: 'generate 5th CDA if 3rd & 4th are spent',
        actual: await Try(() => {
            const c = generateAddress(seed, 3, 2, false)
            const d = generateAddress(seed, 4, 2, false)
            const e = generateAddress(seed, 5, 2, false)

            assertRemoteSpentState(c, true)
            assertAddressTransactions(c, [])

            assertRemoteSpentState(d, false)
            assertAddressTransactions(d, ['9'.repeat(81)])

            assertRemoteSpentState(e, false)
            assertAddressTransactions(e, [])

            return account.generateCDA({
                timeoutAt: futureTime,
                expectedAmount: 9,
            })
        }),
        expected: {
            address: 'AJYHQPBOFNUY9BSANYJUNAWWCIZVFVLLTWDUCN9GOMH9GAYUS9QTZITDQRIQUPGMKZZMSJMQVA999V9VX9OUCRAPFV',
            timeoutAt: futureTime,
            multiUse: false,
            expectedAmount: 9,
        },
    })

    assert({
        given: 'past time as timeoutAt',
        should: 'throw "Expired timeout" Error',
        actual: (await Try(account.generateCDA, {
            timeoutAt: pastTime,
            expectedAmount: 9,
        })).toString(),
        expected: 'Error: Expired timeout.',
    })

    /*
    const s = ''
    const acc = createAccount({
        seed: s,
        persistencePath,
        provider: '',
    })

    assert({
        given: 'a new address',
        should: 'attach it to tangle',
        actual: await Try(async () => {
            const { address } = await acc.generateCDA({ timeoutAt: futureTime, expectedAmount: 1 })
            return new Promise(resolve => acc.on('attachToTangle', ([tail]) => resolve(tail.address)))
        }),
        expected: generateAddress(s, 1, 2, false),
    })
    */
})

describe('account.generateCDA/account.sendToCDA', async assert => {
    const seed0 = '9'.repeat(81)
    const seedA = 'RQFLPKU9BIEGPPEIXEHH9RFDUMSYXMPZOVBKBITSPEFMSOIBYHMFVHRNRF9YNZYQRNBYCS9OULYHBFPHZ'
    const seedB = 'ZKKZDWNKIWYQHCNTHKAEARYIWUYUBDWVXWWT9FQDOKPNZURMGRFJABUYTLYEQKDVJCNQYKLTVIVSTY9LI'

    const account0 = createAccount({
        seed: trytesToTrits('9'.repeat(81)),
        persistencePath,
        emitTransferEvents: false,
        timeSource: () => BluebirdPromise.resolve(Math.floor(Date.now() / 1000)),
    })

    const accountA = createAccountWithPreset({
        ...preset,
        test: {
            now: () => futureTime,
        },
    })({
        seed: trytesToTrits(seedA),
        emitTransferEvents: false,
        persistencePath,
    })

    const accountB = createAccountWithPreset({
        ...preset,
        now: () => futureTime,
    })({
        seed: trytesToTrits(seedB),
        emitTransferEvents: false,
        persistencePath,
    })

    const a1 = generateAddress(seedA, 1, 2, false)
    assertRemoteSpentState(a1, false)
    assertAddressTransactions(a1, [])
    await accountA.generateCDA({
        timeoutAt: Math.floor(Date.now() / 1000) + 5,
        multiUse: true,
    })

    const a2 = generateAddress(seedA, 2, 2, false)
    assertRemoteSpentState(a2, false)
    assertAddressTransactions(a2, [])
    await accountA.generateCDA({
        timeoutAt: futureTime,
        expectedAmount: 3,
    })

    const a3 = generateAddress(seedA, 3, 2, false)
    const a4 = generateAddress(seedA, 4, 2, false)

    const b1 = generateAddress(seedB, 1, 2, false)
    assertRemoteSpentState(b1, false)
    assertAddressTransactions(b1, [])
    const B1 = await accountB.generateCDA({
        timeoutAt: futureTime,
        multiUse: true,
    })

    const b2 = generateAddress(seedB, 2, 2, false)
    assertRemoteSpentState(b2, false)
    assertAddressTransactions(b2, [])
    const B2 = await accountB.generateCDA({
        timeoutAt: futureTime,
        expectedAmount: 10,
    })

    const b3 = generateAddress(seedB, 3, 2, false)
    assertRemoteSpentState(b3, false)
    assertAddressTransactions(b3, [])
    const B3 = await accountB.generateCDA({
        timeoutAt: futureTime,
        expectedAmount: 1,
        multiUse: false,
    })

    assert({
        given: 'that account has 0 persisted CDAs, sendToCDA',
        should: 'throw "Insufficient balance" error',
        actual: (await Try(() => {
            assertRemoteSpentState(B1.address, false)
            assertAddressTransactions(B1.address, [])
            return account0.sendToCDA({ ...B1, value: 1 })
        })).toString(),
        expected: 'Error: Insufficient balance',
    })

    assert({
        given: 'an expired CDA, sendToCDA',
        should: 'throw "Expired timeout" error',
        actual: (await Try(() => {
            const address = 'A'.repeat(90)
            assertRemoteSpentState(address, false)
            return account0.sendToCDA({ address, timeoutAt: pastTime, value: 1 })
        })).toString(),
        expected: 'Error: Expired timeout.',
    })

    assert({
        given: 'that account has 1 persisted, unfunded CDA, sendToCDA',
        should: 'throw "Insufficient balance" error',
        actual: (await Try(async () => {
            const address = generateAddress(seed0, 1, 2, false)
            assertRemoteSpentState(address, false)
            assertAddressTransactions(address, [])

            const value = 1
            await account0.generateCDA({
                timeoutAt: futureTime,
                expectedAmount: value,
            })

            assertBalance(address, value - 1)
            assertRemoteSpentState(B1.address, false)

            return account0.sendToCDA({ ...B1, value })
        })).toString(),
        expected: 'Error: Insufficient balance',
    })

    assert({
        given: 'that account has 1 persisted, funded but spent CDA, sendToCDA',
        should: 'throw "Insufficient balance" error & drop the spent input',
        actual: await Try(async () => {
            let rejected = ''
            const emitted = new Promise(resolve =>
                account0.on('error', (error: Error, input: any) => {
                    if (input !== undefined && input.address && input.balance) {
                        resolve({
                            error: error.toString(),
                            address: input.address,
                            balance: input.balance,
                        })
                    }
                })
            )
            const address = generateAddress(seed0, 1, 2, false)
            const value = 1

            assertBalance(address, value)
            assertRemoteSpentState(address, true)
            assertRemoteSpentState(B1.address, false)

            try {
                await account0.sendToCDA({ ...B1, value })
            } catch (error) {
                rejected = error.toString()
            }

            return {
                rejected,
                emitted: await emitted,
            }
        }),
        expected: {
            rejected: 'Error: Insufficient balance',
            emitted: {
                error: 'Error: Skipping spent input.',
                address: generateAddress(seed0, 1, 2, false),
                balance: 1,
            },
        },
    })

    assert({
        given: 'that account A has 12i balance in snapshot (A1: 9i, A2: 3i)',
        should: 'send 10i to B',
        actual: await Try(() => {
            assertBalance(a1, 9)
            assertBalance(a2, 3)
            assertRemoteSpentState(a1, false)
            assertRemoteSpentState(a2, false)
            assertRemoteSpentState(a3, false)
            assertAddressTransactions(a3, [])
            assertRemoteSpentState(B2.address, false)
            assertTransfer(B2, accountASends10iToBTrytes)

            return accountA.sendToCDA({
                ...B2,
                value: B2.expectedAmount,
            })
        }),
        expected: accountASends10iToBTrytes,
    })

    assert({
        given: 'that previous transfer of 10i to B is included, account A',
        should: 'be able to spend 1i from remainder address A3',
        actual: await Try(() => {
            assertBalance(a3, 2)
            assertRemoteSpentState(a3, false)
            assertRemoteSpentState(a4, false)
            assertAddressTransactions(a4, [])
            assertRemoteSpentState(B1.address, false)

            return accountA.sendToCDA({
                ...B1,
                value: 1,
            })
        }),
        expected: accountASpendsFromRemainderTrytes,
    })

    assert({
        given:
            'that account A has used all inputs in previous transfers (except one with insufficient balance of 1i), sendToCDA',
        should: 'throw "insufficient balance" error',
        actual: (await Try(() => {
            assertBalance(a4, 1)
            assertRemoteSpentState(a4, false)
            assertRemoteSpentState(B1.address, false)

            return accountA.sendToCDA({
                ...B1,
                value: 2,
            })
        })).toString(),
        expected: 'Error: Insufficient balance',
    })

    assert({
        given: 'that CDA is spent from',
        should: 'throw error',
        actual: (await Try(() => {
            assertRemoteSpentState(B1.address, true)

            return accountA.sendToCDA({
                ...B1,
                value: 2,
            })
        })).toString(),
        expected: `Error: Aborted sending to spent address; ${noChecksum(B1.address)}`,
    })

    assert({
        given: 'a CDA with multiUse=false',
        should: 'allow only one transfer',
        actual: (await Try(async () => {
            const value = 1
            const transfer = { ...B3, value }

            assertBalance(a4, value)
            assertRemoteSpentState(a4, false)
            assertRemoteSpentState(B3.address, false)
            await accountA.sendToCDA(transfer)

            assertBalance(a4, value)
            assertRemoteSpentState(B3.address, false)
            return accountA.sendToCDA(transfer)
        })).toString(),
        expected: `Error: Aborted sending twice to the same address; ${noChecksum(B3.address)}`,
    })
})
