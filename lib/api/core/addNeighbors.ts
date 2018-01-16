import errors from '../../errors/inputErrors'
import inputValidator from '../../utils/inputValidator'

import commandBuilder from '../commandBuilder'
import { Callback } from '../types/commands'
import { AddNeighborsResponse } from '../types/responses'

import sendCommand from './sendCommand'

/**
 *   @method addNeighbors
 *   @param {Array} uris List of URI's
 *   @returns {function} callback
 *   @returns {object} success
 **/
function addNeighbors(uris: string[], callback: Callback<AddNeighborsResponse>) {
    // Validate URIs
    for (let i = 0; i < uris.length; i++) {
        if (!inputValidator.isUri(uris[i])) {
            return callback(errors.invalidUri(uris[i]))
        }
    }

    const command = commandBuilder.addNeighbors(uris)

    return sendCommand(command, callback)
}
