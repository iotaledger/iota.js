import errors from '../../errors/inputErrors'
import inputValidator from '../../utils/inputValidator'
import Utils from '../../utils/utils'

import { Callback, keysOf } from '../types/commands'
import { GetBalancesResponse } from '../types/responses'

import commandBuilder from '../commandBuilder'
import sendCommand from './sendCommand'

/**
 *   @method getBalances
 *   @param {array} addresses
 *   @param {int} threshold
 *   @returns {function} callback
 *   @returns {object} success
 **/
function getBalances(addresses: string[], threshold: number, callback: Callback<GetBalancesResponse>) {
    // Check if correct transaction hashes
    if (!inputValidator.isArrayOfHashes(addresses)) {
        return callback(errors.invalidTrytes())
    }

    const command = commandBuilder.getBalances(addresses.map(address => Utils.noChecksum(address)), threshold)

    return sendCommand(command, callback)
}
