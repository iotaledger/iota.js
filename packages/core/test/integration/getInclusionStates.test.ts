import { createHttpClient } from '@iota/http-client'
import test from 'ava'
import { INVALID_TRANSACTION_HASH } from '../../../errors'
import { stringify } from '../../../guards'
import { createGetInclusionStates } from '../../src'
import { getInclusionStatesCommand, getInclusionStatesResponse } from './nocks/getInclusionStates'

const getInclusionStates = createGetInclusionStates(createHttpClient())

test('getInclusionStates() resolves to correct inclusion states', async t => {
    t.deepEqual(
        await getInclusionStates(getInclusionStatesCommand.transactions),
        getInclusionStatesResponse.states,
        'getInclusionStates() should resolve to correct inclusion states'
    )

    const invalidHashes = ['asdasDSFDAFD']

    t.is(
        t.throws(() => getInclusionStates(invalidHashes), { instanceOf: Error }).message,
        `${INVALID_TRANSACTION_HASH}: ${stringify(invalidHashes)}`,
        'getInclusionStates() throws error for invalid hashes'
    )
})

test.cb('getInclusionStates() invokes callback', t => {
    getInclusionStates(getInclusionStatesCommand.transactions, t.end)
})

test.cb('getInclusionStates() passes correct arguments to callback', t => {
    getInclusionStates(getInclusionStatesCommand.transactions, (err, res) => {
        t.is(err, null, 'getInclusionStates() should pass null as first argument in callback for successuful requests')

        t.deepEqual(
            res,
            getInclusionStatesResponse.states,
            'getInclusionStates() should pass the correct response as second argument in callback'
        )

        t.end()
    })
})
