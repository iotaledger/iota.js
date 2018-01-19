import { API } from '../'
import { batchedSend, send } from '../../utils/request'
import { BaseCommand, Callback, keysOf } from '../types/commands'
import { AddNeighborsResponse } from '../types/responses'

/**
 *   General function that makes an HTTP request to the local node
 *
 *   @method sendCommand
 *   @param {object} command
 *   @param {function} callback
 *   @returns {object} success
 **/
export default function sendCommand<C extends BaseCommand, R = any>(this: API, command: C, callback?: Callback): Promise<R> {
      const promise: Promise<R> = new Promise((resolve, reject) => {
      const commandsToBatch = ['findTransactions', 'getBalances', 'getInclusionStates', 'getTrytes']
      const commandKeys = ['addresses', 'bundles', 'hashes', 'tags', 'transactions', 'approvees']
      const batchSize = 1000

      if (commandsToBatch.indexOf(command.command) > -1) {
        const keysToBatch = keysOf(command).filter(key => commandKeys.indexOf(key) > -1 && (command[key] as string[]).length > batchSize)

        if (keysToBatch.length) {
          return resolve(batchedSend(command, this.getSettings(), batchSize))
        }
      }

      resolve(send(command, this.getSettings()))
    })

    if (typeof callback === 'function') {
      promise.then(
        callback.bind(null, null),
        callback 
      )
    }

    return promise
}
