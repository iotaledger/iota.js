import { CDA } from '@iota/cda'
import { trytesToTrits } from '@iota/converter'
import { generateAddress } from '@iota/core'
import * as BluebirdPromise from 'bluebird'
import * as nock from 'nock'
import { describe } from 'riteway'
import { IRICommand } from '../../types'
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
const delay = (t: number) => new Promise(resolve => setTimeout(resolve, t))

const headers = {
    reqheaders: {
        'Content-Type': 'application/json',
        'X-IOTA-API-Version': '1',
    },
}

describe('account.generateCDA()', async assert => {
    const accountParams = {
        seed: trytesToTrits('RQMMPLNFUUCULIIHEYKYBUXUFEDPKTXDQQQRUOBUVIVWIOAXDPNHLAJDSPCXKJNPTPJYBBCJKPVMONYDK'),
        persistencePath,
        emitTransferEvents: false,
    }

    const account = createAccount(accountParams)

    assert({
        given: 'timeoutAt, multiUse & expectedAmount conditions',
        should: 'throw error',
        actual: await (async () => {
            try {
                await account.generateCDA({
                    timeoutAt: futureTime,
                    multiUse: true,
                    expectedAmount: 9,
                })
            } catch (error) {
                return error.message
            }
        })(),
        expected: 'Only one of the following fields can be set: multiUse, expectedAmount',
    })

    assert({
        given: 'timeoutAt & multiUse conditions',
        should: 'generate 1st CDA',
        actual: await account.generateCDA({
            timeoutAt: futureTime,
            multiUse: false,
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
        actual: await account.generateCDA({
            timeoutAt: futureTime,
            expectedAmount: 9,
        }),
        expected: {
            address: 'KRXPZHNMGVJKBIQXV9ALWFOPGIGNVTJFNVKHSYZLI9AABBHKSPBTKKPRVI9ID9QXXKZGTXSSSBMUQFVLWJYJMXKPRS',
            timeoutAt: futureTime,
            multiUse: false,
            expectedAmount: 9,
        },
    })

    assert({
        given: 'past time as timeoutAt',
        should: 'throw "Expired timeout" Error',
        actual: await (async () => {
            try {
                await account.generateCDA({
                    timeoutAt: pastTime,
                    expectedAmount: 9,
                })
            } catch (error) {
                return error
            }
        })(),
        expected: new Error('Expired timeout'),
    })
})

describe('account.generateCDA/account.sendToCDA', async assert => {
    // ---
    // account 0 is poor
    const seed0 = '9'.repeat(81)
    const address01 = generateAddress(seed0, 1, 2, false)
    const address01has0Balance = () => {
        return nock('http://localhost:14265', headers)
            .post('/', {
                command: IRICommand.GET_BALANCES,
                addresses: [address01],
                threshold: 100,
            })
            .times(1)
            .reply(200, {
                balances: [0],
                milestone: 'M'.repeat(81),
                milestoneIndex: 1,
            })
    }
    const account0 = createAccount({
        seed: trytesToTrits(seed0),
        persistencePath,
        emitTransferEvents: false,
        timeSource: () => BluebirdPromise.resolve(Math.floor(Date.now() / 1000)),
    })

    // ---
    // account A has 11i balance in snapshot (A1: 9i + A2: 1i), sends 10i to B, receives remainder of 1i in A3
    const seedA = 'RQFLPKU9BIEGPPEIXEHH9RFDUMSYXMPZOVBKBITSPEFMSOIBYHMFVHRNRF9YNZYQRNBYCS9OULYHBFPHZ'
    const addressA1 = generateAddress(seedA, 1, 2, false)
    const addressA2 = generateAddress(seedA, 2, 2, false)
    const addressA3 = generateAddress(seedA, 3, 2, false)
    const balanceA1 = 9
    const balanceA2 = 2
    const remainderA3 = 1
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
    const accountARequestedFromAnyInA1 = () =>
        accountA.generateCDA({
            timeoutAt: Math.floor(Date.now() / 1000) + 5,
            multiUse: true,
        })
    const accountARequestedFromAnyInA2 = () =>
        accountA.generateCDA({
            timeoutAt: futureTime,
            expectedAmount: balanceA2,
        })
    const accountAHas9iInA1 = () =>
        nock('http://localhost:14265', headers)
            .post('/', {
                command: IRICommand.GET_BALANCES,
                addresses: [addressA1],
                threshold: 100,
            })
            .times(1)
            .reply(200, {
                balances: [balanceA1],
                milestone: 'M'.repeat(81),
                milestoneIndex: 1,
            })
    const accountAHas2iInA2 = () =>
        nock('http://localhost:14265', headers)
            .post('/', {
                command: IRICommand.GET_BALANCES,
                addresses: [addressA2],
                threshold: 100,
            })
            .times(1)
            .reply(200, {
                balances: [balanceA2],
                milestone: 'M'.repeat(81),
                milestoneIndex: 1,
            })

    const accountARemainderReceivesExpectedBalance = () =>
        nock('http://localhost:14265', headers)
            .post('/', {
                command: IRICommand.GET_BALANCES,
                addresses: [addressA3],
                threshold: 100,
            })
            .times(1)
            .reply(200, {
                balances: [remainderA3],
                milestone: 'M'.repeat(81),
                milestoneIndex: 1,
            })

    // ---
    // account B requests from 0 and A, receives from A
    const seedB = 'ZKKZDWNKIWYQHCNTHKAEARYIWUYUBDWVXWWT9FQDOKPNZURMGRFJABUYTLYEQKDVJCNQYKLTVIVSTY9LI'
    const accountB = createAccountWithPreset({
        ...preset,
        now: () => futureTime,
    })({
        seed: trytesToTrits(seedB),
        emitTransferEvents: false,
        persistencePath,
    })

    const addressB1 = generateAddress(seedB, 1, 2, false)
    const addressB2 = generateAddress(seedB, 2, 2, false)

    // request from 0 and A
    let cdaB1
    const accountBRequestsFromAny = () =>
        accountB.generateCDA({
            timeoutAt: futureTime,
            multiUse: true,
        })

    // request 9i from A
    const accountBRequests10iFromAccountA = () =>
        accountB.generateCDA({
            timeoutAt: futureTime,
            expectedAmount: 10,
        })

    cdaB1 = await accountBRequestsFromAny()

    const assertRemoteSpentState = (address: string, state: boolean) =>
        nock('http://localhost:14265', headers)
            .post('/', {
                command: IRICommand.WERE_ADDRESSES_SPENT_FROM,
                addresses: [address],
            })
            .times(1)
            .reply(200, {
                states: [state],
            })

    const accountASends10iToB = (cda: CDA) => {
        const hash = 'ZZKVOZRYHZVYORKHDLWRNIWKWLZMVBNFSPQC99PYHVJFRYRHXVUTHPQOVPJBRNFLYWDNKBBUJOTDQVTDE'
        const transactionsToApprove = {
            trunkTransaction: '9'.repeat(81),
            branchTransaction: '9'.repeat(81),
        }

        nock('http://localhost:14265', headers)
            .post('/', {
                command: IRICommand.FIND_TRANSACTIONS,
                addresses: [cda.address.slice(0, 81)],
            })
            .times(1)
            .reply(200, {
                hashes: [hash],
            })

        nock('http://localhost:14265', headers)
            .post('/', {
                command: IRICommand.GET_TRYTES,
                hashes: [hash],
            })
            .times(1)
            .reply(200, {
                trytes: [accountASends10iToBTrytes[0]],
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

    assert({
        given: 'that account0 has 0 persisted CDAs, sendToCDA',
        should: 'throw "Insufficient balance" error',
        actual: await (async () => {
            try {
                await assertRemoteSpentState(addressB1, false)
                return await account0.sendToCDA({ ...cdaB1, value: 1 })
            } catch (error) {
                return error.message
            }
        })(),
        expected: 'Insufficient balance',
    })

    assert({
        given: 'that account0 has 1 persisted, unfunded CDA, sendToCDA',
        should: 'throw "Insufficient balance" error',
        actual: await (async () => {
            try {
                await address01has0Balance()
                await account0.generateCDA({
                    timeoutAt: futureTime,
                    multiUse: true,
                })

                await assertRemoteSpentState(addressB1, false)
                return await account0.sendToCDA({ ...cdaB1, value: 1 })
            } catch (error) {
                return error.message
            }
        })(),
        expected: 'Insufficient balance',
    })

    assert({
        given: 'that account A has 11i balance in snapshot (A1: 9i, A2: 2i)',
        should: 'send 10i to B',
        actual: await (async () => {
            try {
                await accountARequestedFromAnyInA1()
                await accountARequestedFromAnyInA2()
                await accountAHas9iInA1()
                await accountAHas2iInA2()
                await assertRemoteSpentState(addressB2, false)
                await delay(5500)
                const cdaB2 = await accountBRequests10iFromAccountA()
                await accountASends10iToB(cdaB2)
                return await accountA.sendToCDA({
                    ...cdaB2,
                    value: cdaB2.expectedAmount,
                })
            } catch (error) {
                return error.message
            }
        })(),
        expected: accountASends10iToBTrytes,
    })

    assert({
        given: 'that previous transfer of 10i to B is included, account A',
        should: 'be able to spend 1i from remainder address A3',
        actual: await (async () => {
            try {
                await accountARemainderReceivesExpectedBalance()
                await assertRemoteSpentState(addressB1, false)

                return await accountA.sendToCDA({
                    ...cdaB1,
                    value: 1,
                })
            } catch (error) {
                return error.message
            }
        })(),
        expected: accountASpendsFromRemainderTrytes,
    })

    assert({
        given: 'that account A has used all inputs in previous transfers, sendToCDA',
        should: 'throw "insufficient balance" error',
        actual: await (async () => {
            try {
                await accountARemainderReceivesExpectedBalance()
                await assertRemoteSpentState(addressB1, false)

                return await accountA.sendToCDA({
                    ...cdaB1,
                    value: 1,
                })
            } catch (error) {
                return error.message
            }
        })(),
        expected: 'Insufficient balance',
    })

    assert({
        given: 'that CDA is spent from',
        should: 'throw error',
        actual: await (async () => {
            try {
                await assertRemoteSpentState(addressB1, true)

                return await accountA.sendToCDA({
                    ...cdaB1,
                    value: 1,
                })
            } catch (error) {
                return error.message
            }
        })(),
        expected: `Aborted sending to spent address; ${addressB1}`,
    })
})
