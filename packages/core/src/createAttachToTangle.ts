import * as Promise from 'bluebird'
import {
    integerValidator,
    transactionHashValidator,
    trytesArrayValidator,
    validate,
} from '@iota/validators'
import {
    INVALID_TRUNK_TRANSACTION,
    INVALID_BRANCH_TRANSACTION
} from './errors'
import {
    AttachToTangle,
    AttachToTangleCommand,
    AttachToTangleResponse,
    Callback,
    Hash,
    IRICommand,
    Provider,
    TransactionTrytes
} from '../../types'

/**  
 * @method createAttachToTangle
 * 
 * @param {Provider} provider - Network provider
 * 
 * @return {Function} {@link attachToTangle}
 */
export const createAttachToTangle = ({ send }: Provider): AttachToTangle => {

    /**
     * Performs the Proof-of-Work required to attach a transaction to the Tangle by
     * calling [`attachToTangle`](https://docs.iota.works/iri/api#endpoints/attachToTangle) command.
     * Returns list of transaction trytes and overwrites the following fields:
     *  - `hash`
     *  - `nonce`
     *  - `attachmentTimestamp`
     *  - `attachmentTimsetampLowerBound`
     *  - `attachmentTimestampUpperBound`
     *
     * This method can be replaced with a local equivelant such as
     * [`@iota/pearldiver-webgl`](https://github.com/iotaledger/curl.lib.js) 
     * or [`@iota/pearldiver-node`](https://github.com/iotaledger/ccurl.interface.js),
     * or remote [`PoWbox`](https://powbox.testnet.iota.org/).
     *
     * `trunkTransaction` and `branchTransaction` hashes are given by
     * `{@link getTransactionsToApprove}`.
     *
     * ### Example
     * ```js
     * getTransactionsToApprove(depth)
     *   .then(({ trunkTransaction, branchTransaction }) =>
     *     attachToTangle(trunkTransaction, branchTransaction, minWightMagnitude, trytes)
     *   )
     *   .then(attachedTrytes => {
     *     // ...
     *   })
     *   .catch(err => {
     *     // ...
     *   })
     * ```
     *
     * @method attachToTangle
     *
     * @param {Hash} trunkTransaction - Trunk transaction as returned by {@link getTransactionsToApprove}
     * @param {Hash} branchTransaction - Branch transaction as returned by {@link getTransactionsToApprove}
     * @param {number} minWeightMagnitude - Number of minimun trailing zeros in tail transaction hash
     * @param {TransactionTrytes[]} trytes - List of transaction trytes
     * @param {Callback} [callback] - Optional callback
     *  
     * @return {Promise}
     * @fulfil {TransactionTrytes[]} Array of transaction trytes with nonce and attachment timestamps
     * @reject {Error}
     * - `INVALID_TRUNK_TRANSACTION`: Invalid `trunkTransaction` 
     * - `INVALID_BRANCH_TRANSACTION`: Invalid `branchTransaction`
     * - `INVALID_MIN_WEIGHT_MAGNITUDE`: Invalid `minWeightMagnitude` argument
     * - `INVALID_TRYTES_ARRAY`: Invalid array of trytes
     * - `INVALID_TRANSACTIONS_TO_APPROVE`: Invalid transactions to approve
     * - Fetch error
     */
    return function attachToTangle(
        trunkTransaction: Hash,
        branchTransaction: Hash,
        minWeightMagnitude: number,
        trytes: ReadonlyArray<TransactionTrytes>,
        callback?: Callback<ReadonlyArray<TransactionTrytes>>
    ): Promise<ReadonlyArray<TransactionTrytes>> {
        return Promise.resolve(
            validate(
                integerValidator(minWeightMagnitude),
                trytesArrayValidator(trytes),
                transactionHashValidator(trunkTransaction, INVALID_TRUNK_TRANSACTION),
                transactionHashValidator(branchTransaction, INVALID_BRANCH_TRANSACTION)
            )
        )
            .then(() => send<AttachToTangleCommand, AttachToTangleResponse>({
                command: IRICommand.ATTACH_TO_TANGLE,
                trunkTransaction,
                branchTransaction,
                minWeightMagnitude,
                trytes,
            }))
            .then(({ trytes }) => trytes)
            .asCallback(typeof arguments[2] === 'function' ? arguments[2] : callback)
    }
}