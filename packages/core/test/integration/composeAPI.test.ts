import { createHttpClient } from '@iota/http-client'
import test from 'ava'
import { API, composeAPI } from '../../src'
import { getNodeInfoResponse } from './nocks/getNodeInfo'

test('composeAPI() composes API with network provider as argument', async t => {
    const api: API = composeAPI({ network: createHttpClient() })

    t.deepEqual(
        await api.getNodeInfo(),
        getNodeInfoResponse,
        'composeAPI() should compose API with network provider as argument'
    )
})

test('composeAPI() composes API with default provider', async t => {
    const api: any = composeAPI()

    t.deepEqual(await api.getNodeInfo(), getNodeInfoResponse, 'getNodeInfo() should compose API with default provider')
})
