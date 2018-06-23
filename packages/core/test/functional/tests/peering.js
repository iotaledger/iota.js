//import { bootstrap } from '../environment'
import { test, deepEqual, equal } from '../testRunner'
import { map, parallel, pipe, format } from '../utils'

/**
 * Test if `neighbors` field in `getNodeInfo` command returns correct number of neighbors
 */
export const testNeighborsInGetNodeInfo = async ({ client, neighbors }) => test(
    `Node info returns correct number of neighbors: ${neighbors.length}`,
    equal(await client.getNodeInfo().then(info => info.neighbors), neighbors.length)
)

/**
 * Test if `getNeighbors` command returns correct list of neighbors
 */
export const testGetNeighbors = async ({ client, neighborUris }) => test(
    `getNeighbors returns correct list of neighbors: ${format(neighborUris)}`,
    deepEqual(await client.getNeighbors(), neighborUris)
)

/**
 * Test if number of neighbors does not exceed `maxPeers`
 */
export const testMaxPeers = ({ neighbors, maxPeers }) => test(
    `Number of neighbors does not exceed max peers: ${maxPeers}`,
    equal(neighbors.length > maxPeers, false)
)

/**
 * Tests changes in netowork topology such as:
 * - addition of new nodes & clients to network
 * - addition and removal of neighbors
 * - version and configuration updates
 */
export const testTopologyChange = topology => pipe(
    //bootstrap(topology),
    map(
        parallel(
            testNeighborsInGetNodeInfo,
            testGetNeighbors,
            testMaxPeers
        )
    )
)(topology)

/**
 * Tests additions and removal of neighbors
 */
export const testAddAndRemoveNeighbors = (env = {}) =>
    (
        A = {
            a: { neighbors: [1], ...env },
            b: { neighbors: [0], ...env }
        },
        B = {
            a: { neighbors: [] },
            b: { neighbors: [] }
        },
        ...N
    ) =>
        pipe(
            ...map(testTopologyChange)([A, B, ...N])
        )