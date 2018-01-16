import { Callback } from '../types/commands'
import { GetNeighborsResponse } from '../types/responses'

import commandBuilder from '../commandBuilder'
import sendCommand from './sendCommand'

/**
 *   @method getNeighbors
 *   @returns {function} callback
 *   @returns {object} success
 **/
function getNeighbors(callback: Callback<GetNeighborsResponse>) {
    const command = commandBuilder.getNeighbors()

    return sendCommand(command, callback)
}
