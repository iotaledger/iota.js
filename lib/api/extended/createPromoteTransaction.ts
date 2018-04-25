import * as errors from '../../errors'
import { generateSpam, getOptionsWithDefaults, hashValidator, transferArrayValidator, validate } from '../../utils'
import { AttachToTangle, Callback, Maybe, Provider, Transaction, Transfer } from '../types'
import { createIsPromotable, createSendTransfer, getPrepareTransfersOptions } from './index'

export interface PromoteTransactionOptions {
    delay: number
    interrupt: boolean | (() => void)
}

const defaults: PromoteTransactionOptions = {
    delay: 1000,
    interrupt: false,
}

export const getPromoteTransactionOptions = getOptionsWithDefaults(defaults)

/**
 * @method createPromoteTransaction 
 * 
 * @param {Provider} provider - Network provider
 *
 * @param {Function} [attachFn] - Optional {@link AttachToTangle} function to override the
 * [default method]{@link attachToTangle}.
 * 
 * @return {Function} {@link promoteTransaction}
 */
export const createPromoteTransaction = (provider: Provider, attachFn?: AttachToTangle) => {
    const isPromotable = createIsPromotable(provider)
    const sendTransfer = createSendTransfer(provider, attachFn)

    /**
     * Promotes a transaction by adding other transactions (spam by default) on top of it.
     * Will promote `maximum` transfers on top of the current one with `delay` interval. Promotion
     * is interruptable through `interrupt` option.
     *
     * @method promoteTransaction
     * 
     * @param {string} tail
     * @param {int} depth
     * @param {int} minWeightMagnitude
     * @param {array} transfer
     * @param {object} [options]
     * @param {number} [options.delay] - Delay between spam transactions in ms
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
    const promoteTransaction = (
        tailTransaction: string,
        depth: number,
        minWeightMagnitude: number,
        spamTransfers: Transfer[] = generateSpam(),
        options?: Partial<PromoteTransactionOptions>,
        callback?: Callback<Transaction[]>
    ): Promise<Maybe<Transaction[]>> => {
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
            reference: tailTransaction
        }

        return Promise.resolve(validate(hashValidator(tailTransaction), transferArrayValidator(spamTransfers)))
            .then(() => isPromotable(tailTransaction))
            .then(ok => {
                if (!ok) {
                    throw new Error(errors.INCONSISTENT_SUBTANGLE)
                }

                return sendTransfer(spamTransfers[0].address, depth, minWeightMagnitude, spamTransfers, sendTransferOptions)
            })
            .then(async (transactions: Transaction[]) => {
                if (
                    (delay && delay > 0) ||
                    interrupt === true ||
                    (typeof interrupt === 'function' && (await interrupt()))
                ) {
                    spamTransactions.concat(transactions)

                    setTimeout(() => {
                        promoteTransaction(tailTransaction, depth, minWeightMagnitude, spamTransfers, {
                            delay,
                            interrupt,
                        })
                    }, delay)
                } else {
                    return spamTransactions
                }
            })
    }

    return promoteTransaction
}
