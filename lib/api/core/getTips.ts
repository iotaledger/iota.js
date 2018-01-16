import { Callback } from '../types/commands'
import { GetTipsResponse } from '../types/responses'

import commandBuilder from '../commandBuilder'
import sendCommand from './sendCommand'

/**
 *   @method getTips
 *   @returns {function} callback
 *   @returns {object} success
 **/
function getTips(callback: Callback<GetTipsResponse>) {
    const command = commandBuilder.getTips()

    return sendCommand(command, callback)
}
