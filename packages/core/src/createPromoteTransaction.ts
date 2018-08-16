import * as Bluebird from 'bluebird'
import * as errors from '../../errors'
import { arrayValidator, hashValidator, transferValidator, validate } from '../../guards'
import { AttachToTangle, Callback, getOptionsWithDefaults, Maybe, Provider, Transaction, Transfer } from '../../types'
import { createCheckConsistency } from './'
import { getPrepareTransfersOptions } from './createPrepareTransfers'
import { createSendTransfer } from './createSendTransfer'

export interface PromoteTransactionOptions {
    readonly delay: number
    interrupt: boolean | (() => void)
}

const defaults: PromoteTransactionOptions = {
    delay: 1000,
    interrupt: false,
}

export const getPromoteTransactionOptions = getOptionsWithDefaults(defaults)

export const spammer = (): Transfer => ({
    address: '9'.repeat(81),
    value: 0,
    tag: '9'.repeat(27),
    message: '9'.repeat(27 * 81),
})

export const generateSpam = (n: number = 1): ReadonlyArray<Transfer> => new Array(n).map(spammer)

/**
 * @method createPromoteTransaction
 *
 * @memberof module:core
 *
 * @param {Provider} provider - Network provider
 *
 * @param {Function} [attachFn] - Optional `AttachToTangle` function to override the
 * [default method]{@link #module_core.attachToTangle}.
 *
 * @return {Function} {@link #module_core.promoteTransaction `promoteTransaction`}
 */
export const createPromoteTransaction = (provider: Provider, attachFn?: AttachToTangle) => {
    const checkConsistency = createCheckConsistency(provider)
    const sendTransfer = createSendTransfer(provider, attachFn)

    /**
     * Promotes a transaction by adding other transactions (spam by default) on top of it.
     * Will promote `maximum` transfers on top of the current one with `delay` interval. Promotion
     * is interruptable through `interrupt` option.
     *
     * @method promoteTransaction
     *
     * @memberof module:core
     *
     * @param {string} tail
     * @param {int} depth
     * @param {int} minWeightMagnitude
     * @param {array} transfer
     * @param {object} [options]
     * @param {number} [options.delay] - Delay between spam transactions in `ms`
     * @param {boolean|function} [options.interrupt] - Interrupt signal, which can be a function that evaluates
     * to boolean
     * @param {function} [callback]
     *
     * @returns {Promise}
     * @fulfil {Transaction[]}
     * @reject {Error}
     * - `INCONSISTENT SUBTANGLE`: In this case promotion has no effect and reatchment is required.
     * - Fetch error
     */
    return function promoteTransaction(
        tailTransaction: string,
        depth: number,
        minWeightMagnitude: number,
        spamTransfers: ReadonlyArray<Transfer> = generateSpam(),
        options?: Partial<PromoteTransactionOptions>,
        callback?: Callback<ReadonlyArray<Transaction>>
    ): Bluebird<Maybe<ReadonlyArray<Transaction>>> {
        // Switch arguments
        if (typeof options === 'undefined') {
            options = {}
        } else if (typeof options === 'function') {
            callback = options
            options = {}
        }

        const { delay, interrupt } = getPromoteTransactionOptions(options)
        const spamTransactions: Transaction[] = []
        const sendTransferOptions = {
            ...getPrepareTransfersOptions({}),
            reference: tailTransaction,
        }

        return Bluebird.resolve(
            validate(hashValidator(tailTransaction), arrayValidator(transferValidator)(spamTransfers))
        )
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
                if (
                    (delay && delay > 0) ||
                    interrupt === true ||
                    (typeof interrupt === 'function' && (await interrupt()))
                ) {
                    spamTransactions.push(...transactions)

                    setTimeout(() => {
                        promoteTransaction(tailTransaction, depth, minWeightMagnitude, spamTransfers, {
                            delay,
                            interrupt,
                        })
                    }, delay)
                } else {
                    return [...spamTransactions]
                }
            })
            .asCallback(typeof arguments[4] === 'function' ? arguments[4] : callback)
    }
}
