import test from 'ava'
import * as nock from 'nock'
import { createHttpClient } from '../src'
import {
    expectedFindTransactionsResponse as batchedResponse,
    findTransactionsCommand as batchedCommand,
    requestBatchSize,
} from './batchedSend'
import { agents, apiVersion, findTransactionsCommand as command, findTransactionsResponse as response, headers } from './send'

const bumpedApiVersion = apiVersion + 1

nock('http://localhost:34265', headers(apiVersion))
    .post('/', command)
    .reply(200, response)

nock('http://localhost:44265', headers(bumpedApiVersion))
    .post('/', command)
    .reply(200, response)

test('setSettings() sets provider uri', async t => {
    const client = createHttpClient()

    client.setSettings({
        provider: 'http://localhost:34265',
    })

    t.deepEqual(await client.send(command), response)
})

test('setSettings() sets X-IOTA-API-Version', async t => {
    const client = createHttpClient()

    client.setSettings({
        provider: 'http://localhost:44265',
        apiVersion: bumpedApiVersion,
    })

    t.deepEqual(await client.send(command), response)
})

test('setSettings() sets request batch size', async t => {
    const client = createHttpClient({
        provider: 'http://localhost:24265',
        requestBatchSize: 1000,
        apiVersion,
    })

    client.setSettings({
        requestBatchSize,
    })

    t.deepEqual(await client.send(batchedCommand), batchedResponse)
})


test('setSettings() sets an agent to the client with dependancy to cross-fetch', async (t) => {


    const runningNode = (process: NodeJS.Process) => typeof process === 'object' && typeof process.versions === 'object' && typeof process.versions.node !== 'undefined';

    if (!runningNode) {
        t.pass("Not running via node...");
        return;
    }

    const agent = agents({
        host: 'http://some.proxy.com',
        port: 1234,
    });

    const fakeFetch = (req: any, res: any) => new Promise<any>((resolve, reject) => {
        t.is(req.agent.host, agent.host);
        t.is(req.agent.port, agent.port);
        resolve();
    });

    (global as any).fetch = fakeFetch;

    const httpsClient = createHttpClient({
        provider: 'http://localhost:34265',
        agent
    });
    
    await t.throws(httpsClient.send(command));

})
