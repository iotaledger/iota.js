import { Callback } from '../types/commands'
import { InterruptAttachToTangleResponse } from '../types/responses'

import commandBuilder from '../commandBuilder'
import sendCommand from './sendCommand'

/**
 *   @method interruptAttachingToTangle
 *   @returns {function} callback
 *   @returns {object} success
 **/
function interruptAttachingToTangle(callback: Callback<InterruptAttachToTangleResponse>) {
    const command = commandBuilder.interruptAttachingToTangle()

    return sendCommand(command, callback)
}
