import { Callback } from '../types/commands'
import { GetNodeInfoResponse } from '../types/responses'

import commandBuilder from '../commandBuilder'
import sendCommand from './sendCommand'

/**
 *   @method getNodeInfo
 *   @returns {function} callback
 *   @returns {object} success
 **/
function getNodeInfo(callback: Callback<GetNodeInfoResponse>) {
    const command = commandBuilder.getNodeInfo()

    return sendCommand(command, callback)
}
