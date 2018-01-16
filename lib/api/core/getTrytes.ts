import errors from '../../errors/inputErrors'
import inputValidator from '../../utils/inputValidator'

import { Callback } from '../types/commands'
import { GetTrytesResponse } from '../types/responses'

import commandBuilder from '../commandBuilder'
import sendCommand from './sendCommand'

/**
 *   @method getTrytes
 *   @param {array} hashes
 *   @returns {function} callback
 *   @returns {object} success
 **/
function getTrytes(hashes: string[], callback: Callback<GetTrytesResponse>) {
    if (!inputValidator.isArrayOfHashes(hashes)) {
        return callback(errors.invalidTrytes())
    }

    const command = commandBuilder.getTrytes(hashes)

    return sendCommand(command, callback)
}
