import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { depthValidator, transactionHashValidator, Validatable, validate } from '../../utils'
import { BaseCommand, Callback, IRICommand, Provider } from '../types'

export interface GetTransactionsToApproveResponse {
    trunkTransaction: string
    branchTransaction: string
    duration?: number
}

export interface GetTransactionsToApproveCommand extends BaseCommand {
    command: IRICommand.GET_TRANSACTIONS_TO_APPROVE
    depth: number
    reference?: string
}

export const validateGetTransactionsToApprove = (depth: number, reference?: string) => {
    const validators: Validatable[] = [depthValidator(depth)]

    if (reference) {
        validators.push(transactionHashValidator(reference))
    }

    validate(...validators)
}

/**
 * @method createGetTransactionsToApprove 
 * 
 * @param {Provider} provider - Network provider
 * 
 * @return {function} {@link getTransactionsToApprove}
 */
export const createGetTransactionsToApprove = (provider: Provider) =>

    /**
     * Does the _tip selection_ by calling
     * [`getTransactionsToApprove`]{@link https://docs.iota.works/iri/api#endpoints/getTransactionsToApprove} command.
     * It returns a pair of approved transactions, which are chosen randomly after validating the transaction trytes,
     * the signatures and cross-checking for conflicting transactions.
     *
     * Tip selection is executed by a Random Walk (RW) starting at some random point in given `depth`
     * ending up to the pair of selected tips. For more information about tip selection please refer to the
     * [`whitepaper`]{@link http://iotatoken.com/IOTA_Whitepaper.pdf}.
     *
     * The `reference` option allows to select tips in a way that the reference transaction is being approved too. 
     * This is particularly useful for promoting transactions, for example with `{@link promoteTransaction}`.
     * 
     * `getTransactionsToApprove` can be used along with `{@link prepareTransfers}`. The transaction trytes
     * and approved transactions can be passed to an `{@link attachToTangle}` method.
     * Finally the attached trytes can be stored and broadcasted by calling {@link storeAndBroadCast}.
     *
     * @example
     *
     * const seed = 'SEED'
     *
     * const transfers = [{
     *    address: generateAddress(seed, 0, 2),
     *    value: 0,
     *    tag: '',
     *    message: ''
     * }]
     *
     * const depth = 3
     * const minWeightMagnitude = 14
     *
     * Promise.all(
     *    prepareTransfers(seed, transfers),
     *    getTransactionsToApprove(depth)
     * )
     *    .then(([trytes, tips]) => {
     *        // Extract approved tips
     *        const { trunkTransaction, branchTransaction } = tips
     *
     *        // Persit the transaction trytes in storage before broadcasting 
     *        
     *        // Do the proof of work
     *        return attachToTangle(trunkTransaction, branchTransaction, minWeightMagnitude, trytes)
     *    })
     *    .then(storeAndBroadcast)
     *    .catch(err => {
     *        // handle errors here
     *    })
     *
     * @method getTransactionsToApprove 
     *
     * @param {number} depth - The depth at which Random Walk starts. A value of `3` is typically used by wallets,
     * meaning that RW starts 3 milestones back.
     * @param {Hash} [reference] - Optional reference transaction hash
     * @param {Callback} [callback] - Optional callback
     *
     * @return {Promise}
     * @fulfil {trunkTransaction, branchTransaction} A pair of approved transactions
     * @reject {Error}
     * - `INVALID_DEPTH`
     * - `INVALID_HASH`: Invalid reference hash
     * - Fetch error
     */
    function (
        depth: number,
        reference?: string,
        callback?: Callback<GetTransactionsToApproveResponse>
    ): Promise<GetTransactionsToApproveResponse> {
        return Promise.resolve(validateGetTransactionsToApprove(depth, reference))
            .then(() =>
                provider.sendCommand<GetTransactionsToApproveCommand, GetTransactionsToApproveResponse>({
                    command: IRICommand.GET_TRANSACTIONS_TO_APPROVE,
                    depth,
                    reference,
                })
            )
            .then(({ trunkTransaction, branchTransaction }: GetTransactionsToApproveResponse) => ({
                trunkTransaction,
                branchTransaction,
            }))
            .asCallback(arguments.length === 2 && typeof arguments[1] === 'function' ? arguments[1] : callback)
    }
