import errors from '../../errors/inputErrors'
import inputValidator from '../../utils/inputValidator'

import { Callback, FindTransactionsSearchValues, keysOf } from '../types/commands'
import { FindTransactionsResponse } from '../types/responses'

import commandBuilder from '../commandBuilder'
import sendCommand from './sendCommand'

/**
 *   @method findTransactions
 *   @param {object} searchValues
 *   @returns {function} callback
 *   @returns {object} success
 **/
function findTransactions(searchValues: FindTransactionsSearchValues, callback: Callback<FindTransactionsResponse>) {
    // If not an object, return error
    if (!inputValidator.isObject(searchValues)) {
        return callback(errors.invalidKey())
    }

    // Get search key from input object
    const searchKeys = keysOf(searchValues)
    const availableKeys = ['bundles', 'addresses', 'tags', 'approvees']

    let keyError: Error | null = null

    searchKeys.forEach(key => {
        if (availableKeys.indexOf(key) === -1) {
            keyError = errors.invalidKey()
            return
        }

        if (key === 'addresses') {
            searchValues.addresses = searchValues.addresses!.map(address => Utils.noChecksum(address))
        }

        const hashes = searchValues[key] as string[]

        // If tags, append to 27 trytes
        if (key === 'tags') {
            searchValues.tags = hashes.map(hash => {
                // Simple padding to 27 trytes
                while (hash.length < 27) {
                    hash += '9'
                }

                // validate hash
                if (!inputValidator.isTrytes(hash, '27')) {
                    keyError = errors.invalidTrytes()
                    return ''
                }

                return hash
            })
        } else {
            // Check if correct array of hashes
            if (!inputValidator.isArrayOfHashes(hashes)) {
                keyError = errors.invalidTrytes()
                return
            }
        }
    })

    // If invalid key found, return
    if (keyError) {
        callback(keyError)
        return
    }

    const command = commandBuilder.findTransactions(searchValues)

    return sendCommand(command, callback)
}
