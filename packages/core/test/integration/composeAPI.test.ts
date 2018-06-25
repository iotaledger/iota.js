import test from 'ava'
import { createHttpClient } from '@iota/http-client'
import { composeAPI, API } from '../../src'
import { getNodeInfoResponse } from './nocks/getNodeInfo'

test('composeAPI() composes API with provider factory', async t => {
    const api: any = (composeAPI(createHttpClient) as (s?: Partial<object>) => API)()

    t.deepEqual(await api.getNodeInfo(), getNodeInfoResponse, 'composeAPI() should compose API with provider factory')
})

test('composeAPI() composes API with default provider', async t => {
    const api: any = composeAPI()

    t.deepEqual(await api.getNodeInfo(), getNodeInfoResponse, 'getNodeInfo() should compose API with default provider')
})
