import errors from '../../errors/inputErrors'
import inputValidator from '../../utils/inputValidator'

import { Callback } from '../types/commands'
import { RemoveNeighborsResponse } from '../types/responses'

import commandBuilder from '../commandBuilder'
import sendCommand from './sendCommand'

/**
 *   @method removeNeighbors
 *   @param {Array} uris List of URI's
 *   @returns {function} callback
 *   @returns {object} success
 **/
function removeNeighbors(uris: string[], callback: Callback<RemoveNeighborsResponse>) {
    // Validate URIs
    for (let i = 0; i < uris.length; i++) {
        if (!inputValidator.isUri(uris[i])) {
            return callback(errors.invalidUri(uris[i]))
        }
    }

    const command = commandBuilder.removeNeighbors(uris)

    return sendCommand(command, callback)
}
