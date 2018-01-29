import { API, Callback } from '../types'
/**
 *   Broadcasts and stores transaction trytes
 *
 *   @method storeAndBroadcast
 *   @param {array} trytes
 *   @returns {function} callback
 *   @returns {object} success
 **/
export default function storeAndBroadcast(
    this: API,
    trytes: string[],
    callback?: Callback<void>
): Promise<void> {

    const promise: Promise<void> = this.storeTransactions(trytes)
        .then(() => this.broadcastTransactions(trytes, callback))

    if (typeof callback === 'function') {
        promise.then(callback.bind(null, null), callback)
    }

    return promise
}
