import * as nock from 'nock'
import { GetNodeInfoCommand, GetNodeInfoResponse, IRICommand } from '../../../../types'
import headers from './headers'

export const getNodeInfoCommand: GetNodeInfoCommand = {
    command: IRICommand.GET_NODE_INFO,
}

export const getNodeInfoResponse: GetNodeInfoResponse = {
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
}

export const getBalancesNock = nock('http://localhost:14265', headers)
    .persist()
    .post('/', getNodeInfoCommand)
    .reply(200, getNodeInfoResponse)
