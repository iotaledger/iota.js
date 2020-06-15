import * as Bluebird from 'bluebird'
import * as errors from '../../errors'
import { arrayValidator, hashValidator, transferValidator, validate } from '../../guards'
import { AttachToTangle, Callback, Maybe, Provider, Transaction, Transfer } from '../../types'
import { createCheckConsistency } from './'
import { getPrepareTransfersOptions } from './createPrepareTransfers'
import { createSendTransfer } from './createSendTransfer'

export interface PromoteTransactionOptions {
    readonly delay: number
    interrupt: boolean | (() => boolean)
}

const defaults: PromoteTransactionOptions = {
    delay: 0,
    interrupt: false,
}

export const spam = {
    address: '9'.repeat(81),
    value: 0,
    tag: '9'.repeat(27),
    message: '9'.repeat(27 * 81),
}

export const generateSpam = (n: number = 1): ReadonlyArray<Transfer> => new Array(n).fill(spam)

/**
 * @method createPromoteTransaction
 *
 * @memberof module:core
 * 
 * @ignore
 *
 * @param {Provider} provider - Network provider
 *
 * @param {Function} [attachFn] - Optional `attachToTangle` function to override the
 * [default method]{@link #module_core.attachToTangle}.
 *
 * @return {Function} {@link #module_core.promoteTransaction `promoteTransaction`}
 */
export const createPromoteTransaction = (provider: Provider, attachFn?: AttachToTangle) => {
    const checkConsistency = createCheckConsistency(provider)
    const sendTransfer = createSendTransfer(provider, attachFn)

    /**
     * This method promotes only consistent transactions by checking them with the [`checkConsistency()`]{@link #module_core.checkConsistency} method.
     * 
     * ## Related methods
     * 
     * Use the [`isPromotable()`]{@link #module_core.isPromotable} method to check if a transaction can be [promoted](https://docs.iota.org/docs/getting-started/0.1/transactions/reattach-rebroadcast-promote).
     * 
     * If a transaction can't be promoted, use the [`replayBundle()`]{@link #module_core.replayBundle} method to [reattach](https://docs.iota.org/docs/getting-started/0.1/transactions/reattach-rebroadcast-promote) it to the Tangle.
     * 
     * @method promoteTransaction
     * 
     * @summary [Promotes](https://docs.iota.org/docs/getting-started/0.1/transactions/reattach-rebroadcast-promote#promote) a given tail transaction.
     *  
     * @memberof module:core
     *
     * @param {Hash} tail - Tail transaction hash
     *
     * @param {number} depth - The [depth](https://docs.iota.org/docs/getting-started/0.1/transactions/depth) at which to start the weighted random walk. The [Trinity wallet](https://trinity.iota.org/) uses a value of `3`,
     * meaning that the weighted random walk starts 3 milestones in the past.
     *
     * @param {number} minWeightMagnitude - [Minimum weight magnitude](https://docs.iota.org/docs/getting-started/0.1/network/minimum-weight-magnitude)
     *
     * @param {Array} [spamTransfers={address: '9999...999', value:0, tag:'999...999',message: '999...999' }] - Array of transfer objects to use to promote the transaction
     * 
     * @param {Object} [options] - Options object
     *
     * @param {number} [options.delay] - Delay in milliseconds before sending each zero-value transaction
     *
     * @param {boolean|Function} [options.interrupt] - Either a boolean or a function that evaluates to a boolean to stop the method from sending transactions
     *
     * @param {Callback} [callback] - Optional callback function
     * 
     * @example
     * 
     * ```js
     * iota.promoteTransaction('FOSJBUZEHOBDKIOJ9RXBRPPZSJHWMXCDFJLIJSLJG9HRKEEJGAHWATEVCYERPQXDWFHQRGZOGIILZ9999',
     * 3,14)
     * .then(transactions => {
     *   console.log(`Promoted the tail transaction, using the following transactions: \n` +
     *   JSON.stringify(transactions));
     * })
     * .catch(error => {
     *     console.log(`Something went wrong: ${error}`);
     * })
     * ```
     *
     * @returns {Promise}
     * 
     * @fulfil {Transaction[]} transactions - Array of zero-value transaction objects that were sent
     * 
     * @reject {Error} error - An error that contains one of the following:
     * - `INCONSISTENT_SUBTANGLE`: In this case, promotion has no effect and a reattachment is required by calling the [`replayBundle()`]{@link #module_core.replayBundle} method
     * - Fetch error: The connected IOTA node's API returned an error. See the [list of error messages](https://docs.iota.org/docs/node-software/0.1/iri/references/api-errors) 
     */
    return function promoteTransaction(
        tailTransaction: string,
        depth: number,
        minWeightMagnitude: number,
        spamTransfers: ReadonlyArray<Transfer> = generateSpam(),
        options?: Partial<PromoteTransactionOptions>,
        callback?: Callback<ReadonlyArray<ReadonlyArray<Transaction>>>
    ): Bluebird<Maybe<ReadonlyArray<ReadonlyArray<Transaction>>>> {
        // Switch arguments
        if (!options) {
            options = { ...defaults }
        } else if (typeof options === 'function') {
            callback = options
            options = { ...defaults }
        }

        const spamTransactions: Array<ReadonlyArray<Transaction>> = []
        const sendTransferOptions = {
            ...getPrepareTransfersOptions({}),
            reference: tailTransaction,
        }

        const timeout = options.delay
        const delay = () => new Promise(resolve => setTimeout(resolve, timeout))

        const promote = (): Promise<ReadonlyArray<ReadonlyArray<Transaction>>> =>
            delay()
                .then(() => checkConsistency(tailTransaction, { rejectWithReason: true }))
                .then(consistent => {
                    if (!consistent) {
                        throw new Error(errors.INCONSISTENT_SUBTANGLE)
                    }

                    return sendTransfer(
                        spamTransfers[0].address,
                        depth,
                        minWeightMagnitude,
                        spamTransfers,
                        sendTransferOptions
                    )
                })
                .then(async transactions => {
                    spamTransactions.push([...transactions])

                    if (options && timeout) {
                        if (
                            options.interrupt === true ||
                            (typeof options.interrupt === 'function' && (await options.interrupt()))
                        ) {
                            return [...spamTransactions]
                        }

                        return promote()
                    } else {
                        return [...spamTransactions]
                    }
                })

        return Bluebird.resolve(
            validate(
                hashValidator(tailTransaction),
                [delay, n => typeof n === 'function' || (typeof n === 'number' && n >= 0), errors.INVALID_DELAY],
                !!spamTransfers && arrayValidator(transferValidator)(spamTransfers)
            )
        )
            .then(promote)
            .asCallback(callback)
    }
}
