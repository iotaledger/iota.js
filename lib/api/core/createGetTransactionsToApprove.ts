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
 * @method getTransactionsToApprove
 * @param {int} depth
 * @param {string} reference
 * @returns {function} callback
 * @returns {object} success
 **/
export const createGetTransactionsToApprove = (provider: Provider) => function(
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
        .then(({ trunkTransaction, branchTransaction }) => ({
            trunkTransaction,
            branchTransaction,
        }))
        .asCallback(arguments.length === 2 && typeof arguments[1] === 'function' ? arguments[1] : callback)
}
