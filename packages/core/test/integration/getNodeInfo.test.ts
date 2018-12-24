import { createHttpClient } from '@iota/http-client'
import test from 'ava'
import { createGetNodeInfo } from '../../src'
import { getNodeInfoResponse } from './nocks/getNodeInfo'

const getNodeInfo = createGetNodeInfo(createHttpClient())

test('getNodeInfo() resolves to correct node info response', async t => {
    t.deepEqual(await getNodeInfo(), getNodeInfoResponse, 'getNodeInfo() should resolve to correct node info')
})

test.cb('getNodeInfo() invokes callback', t => {
    getNodeInfo(t.end)
})

test.cb('getNodeInfo() passes correct arguments to callback', t => {
    getNodeInfo((err, info) => {
        t.is(err, null, 'getNodeInfo() should pass null as first argument in callback for successuful requests')

        t.deepEqual(
            info,
            getNodeInfoResponse,
            'getNodeInfo() should pass the correct response as second argument in callback'
        )

        t.end()
    })
})
