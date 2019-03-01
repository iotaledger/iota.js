import { createHttpClient } from '@iota/http-client'
import test from 'ava'
import { INVALID_REFERENCE_HASH } from '../../../errors'
import { stringify } from '../../../guards'
import { createGetTransactionsToApprove } from '../../src'
import {
    getTransactionsToApproveCommand,
    getTransactionsToApproveResponse,
    getTransactionsToApproveWithReferenceCommand,
    getTransactionsToApproveWithReferenceResponse,
} from './nocks/getTransactionsToApprove'

const getTransactionsToApprove = createGetTransactionsToApprove(createHttpClient())

test('getTransactionsToApprove() resolves to correct response', async t => {
    t.deepEqual(
        await getTransactionsToApprove(getTransactionsToApproveCommand.depth),
        {
            trunkTransaction: getTransactionsToApproveResponse.trunkTransaction,
            branchTransaction: getTransactionsToApproveResponse.branchTransaction,
        },
        'getTransactionsToApprove() should resolve to correct reposne with trunk and branch transactions'
    )
})

test('getTransactionsToApprove() with reference option resolves to correct response', async t => {
    t.deepEqual(
        await getTransactionsToApprove(
            getTransactionsToApproveWithReferenceCommand.depth,
            getTransactionsToApproveWithReferenceCommand.reference
        ),
        {
            trunkTransaction: getTransactionsToApproveWithReferenceResponse.trunkTransaction,
            branchTransaction: getTransactionsToApproveWithReferenceResponse.branchTransaction,
        },
        'getTransactionsToApprove() with reference option should resolve to correct trunk and branch transactions'
    )
})

test('getTransactionsToApprove() rejects with correct error for invalid reference option', t => {
    const invalidHash = 'asdasDSFDAFD'

    t.is(
        t.throws(() => getTransactionsToApprove(getTransactionsToApproveCommand.depth, invalidHash), Error).message,
        `${INVALID_REFERENCE_HASH}: ${stringify(invalidHash)}`,
        'getTransactionsToApprove() should throw error for invalid reference option'
    )
})

test.cb('getTransactionsToApprove() invokes callback', t => {
    getTransactionsToApprove(getTransactionsToApproveCommand.depth, undefined, t.end)
})

test.cb('getTransactionsToApprove() passes correct arguments to callback', t => {
    getTransactionsToApprove(getTransactionsToApproveCommand.depth, undefined, (err, res) => {
        t.is(
            err,
            null,
            'getTransactionsToApprove() should pass null as first argument in callback for successuful requests'
        )

        t.deepEqual(
            res,
            {
                trunkTransaction: getTransactionsToApproveResponse.trunkTransaction,
                branchTransaction: getTransactionsToApproveResponse.branchTransaction,
            },
            'getTransactionsToApprove() should pass the correct response as second argument in callback'
        )

        t.end()
    })
})
