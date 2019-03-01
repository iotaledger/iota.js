import { createHttpClient } from '@iota/http-client'
import test from 'ava'
import { INVALID_BRANCH_TRANSACTION, INVALID_TRANSACTION_TRYTES, INVALID_TRUNK_TRANSACTION } from '../../../errors'
import { stringify } from '../../../guards'
import { createAttachToTangle } from '../../src'
import { attachToTangleCommand, attachToTangleResponse } from './nocks/attachToTangle'

const attachToTangle = createAttachToTangle(createHttpClient())

test('attachToTangle() resolves to correct balances response', async t => {
    t.deepEqual(
        await attachToTangle(
            attachToTangleCommand.trunkTransaction,
            attachToTangleCommand.branchTransaction,
            attachToTangleCommand.minWeightMagnitude,
            [...attachToTangleCommand.trytes]
        ),
        attachToTangleResponse.trytes,
        'attachToTangle() should resolve to correct balances'
    )
})

test('attachToTangle() does not mutate original trytes', async t => {
    const trytes = [...attachToTangleCommand.trytes]

    await attachToTangle(
        attachToTangleCommand.trunkTransaction,
        attachToTangleCommand.branchTransaction,
        attachToTangleCommand.minWeightMagnitude,
        trytes
    )

    t.deepEqual(trytes, attachToTangleCommand.trytes, 'attachToTangle() should not mutate original trytes')
})

test('attachToTangle() rejects with correct errors for invalid input', t => {
    const invalidTrytes = ['asdasDSFDAFD']

    t.is(
        t.throws(
            () =>
                attachToTangle(
                    invalidTrytes[0],
                    attachToTangleCommand.branchTransaction,
                    attachToTangleCommand.minWeightMagnitude,
                    attachToTangleCommand.trytes
                ),
            Error
        ).message,
        `${INVALID_TRUNK_TRANSACTION}: ${stringify(invalidTrytes[0])}`,
        'attachToTangle() should throw error for invalid trunk transaction'
    )

    t.is(
        t.throws(
            () =>
                attachToTangle(
                    attachToTangleCommand.trunkTransaction,
                    invalidTrytes[0],
                    attachToTangleCommand.minWeightMagnitude,
                    attachToTangleCommand.trytes
                ),
            Error
        ).message,
        `${INVALID_BRANCH_TRANSACTION}: ${stringify(invalidTrytes[0])}`,
        'attachToTangle() should throw error for invalid branch transaction'
    )

    t.is(
        t.throws(
            () =>
                attachToTangle(
                    attachToTangleCommand.trunkTransaction,
                    attachToTangleCommand.branchTransaction,
                    attachToTangleCommand.minWeightMagnitude,
                    invalidTrytes
                ),
            Error
        ).message,
        `${INVALID_TRANSACTION_TRYTES}: ${stringify(invalidTrytes)}`,
        'attachToTangle() should throw error for invalid trytes'
    )
})

test.cb('attachToTangle() invokes callback', t => {
    attachToTangle(
        attachToTangleCommand.trunkTransaction,
        attachToTangleCommand.branchTransaction,
        attachToTangleCommand.minWeightMagnitude,
        attachToTangleCommand.trytes,
        t.end
    )
})

test.cb('attachToTangle() passes correct arguments to callback', t => {
    attachToTangle(
        attachToTangleCommand.trunkTransaction,
        attachToTangleCommand.branchTransaction,
        attachToTangleCommand.minWeightMagnitude,
        attachToTangleCommand.trytes,
        (err, res) => {
            t.is(err, null, 'attachToTangle() should pass null as first argument in callback for successuful requests')

            t.deepEqual(
                res,
                attachToTangleResponse.trytes,
                'attachToTangle() should pass the correct response as second argument in callback'
            )

            t.end()
        }
    )
})
