import { testAddAndRemoveNeighbors } from './tests/peering'

const client = {
    getNodeInfo: () => Promise.resolve({ neighbors: 1 }),
    getNeighbors: () => Promise.resolve(['tcp://...'])
}

const a = []
const b = [{ client, neighbors: ['a'], neighborUris: ['tcp://...'], maxPeers: 10 }]

testAddAndRemoveNeighbors()(b)(a).catch(err => console.log(err))