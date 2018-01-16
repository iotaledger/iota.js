import { BaseCommand, Callback, keysOf } from '../types/commands'

/**
 *   General function that makes an HTTP request to the local node
 *
 *   @method sendCommand
 *   @param {object} command
 *   @param {function} callback
 *   @returns {object} success
 **/
export default function sendCommand<C extends BaseCommand, R>(command: C, callback?: Callback<R>): Promise<R> | void {
    const promise = new Promise((resolve, reject) => {
        const commandsToBatch = ['findTransactions', 'getBalances', 'getInclusionStates', 'getTrytes']
        const commandKeys = ['addresses', 'bundles', 'hashes', 'tags', 'transactions', 'approvees']
        const batchSize = 1000

        if (commandsToBatch.indexOf(command.command) > -1) {
            const keysToBatch = keysOf(command).filter(key => {
                return commandKeys.indexOf(key) > -1 && command[key].length > batchSize
            })

            if (keysToBatch.length) {
                return this.provider.batchedSend(command, batchSize)
            }
        }

        return this.provider.send(command)
    })
}
