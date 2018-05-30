import * as Promise from 'bluebird'
import { hashValidator, minWeightMagnitudeValidator, trytesArrayValidator, validate } from '@iota/validators'
import * as errors from './errors'
import { AttachToTangle, BaseCommand, Callback, Hash, IRICommand, Provider, TransactionTrytes } from '../../types'

export interface AttachToTangleCommand extends BaseCommand {
    command: IRICommand.ATTACH_TO_TANGLE
    trunkTransaction: Hash
    branchTransaction: Hash
    minWeightMagnitude: number
    trytes: TransactionTrytes[]
}

export interface AttachToTangleResponse {
    trytes: TransactionTrytes[]
}

export const validateAttachToTangle = (
    trunkTransaction: Hash,
    branchTransaction: Hash,
    minWeightMagnitude: number,
    trytes: TransactionTrytes[]
) =>
    validate(
        hashValidator(trunkTransaction, errors.INVALID_TRUNK_TRANSACTION),
        hashValidator(branchTransaction, errors.INVALID_BRANCH_TRANSACTION),
        minWeightMagnitudeValidator(minWeightMagnitude),
        trytesArrayValidator(trytes)
    )

/**  
 * @method createAttachToTangle
 * 
 * @param {Provider} provider - Network provider
 * 
 * @return {Function} {@link attachToTangle}
 */
export const createAttachToTangle = ({ send }: Provider) =>

    /**
     * Performs the Proof-of-Work required to attach a transaction to the tangle by
     * calling [`attachToTangle`]{@link https://docs.iota.works/iri/api#endpoints/attachToTangle} command
     * to an IRI node. It returns a new array of transaction trytes with `hash`, `nonce` and `attachment timestamps`.
     *
     * This method can be replaced with a local equivelant such as
     * [`@iota/pearldiver-webgl`]({@link https://github.com/iotaledger/curl.lib.js}) 
     * or [`@iota/pearldiver-node`]({@link https://github.com/iotaledger/ccurl.interface.js}),
     * or remote [`PoWbox`]{@link https://powbox.testnet.iota.org/}.
     *
     * It requires to pass `trunkTransaction` and `branchTransaction` as returned by
     * `{@link getTransactionsToApprove}`
     *
     * @example
     * attachToTangle(trunkTransaction, branchTransaction, minWightMagnitude, trytes)
     *    .then(attachedTrytes => {
     *        //...
     *    })
     *    .catch(err => {
     *        // handle error
     *    })
     *
     * @method attachToTangle
     *
     * @param {Hash} trunkTransaction - Trunk transaction hash to reference
     * @param {Hash} branchTransaction - Branch transaction hash to reference
     * @param {number} minWeightMagnitude - Number of minimun trailing zeros in tail transaction hash
     * @param {TransactionTrytes[]} trytes - Array of transaction trytes
     * @param {Callback} [callback] - Optional callback
     *  
     * @return {Promise}
     * @fulfil {TransactionTrytes[]} Array of transaction trytes with nonce and attachment timestamps
     * @reject {Error}
     * - `INVALID_HASH`: Invalid `trunkTransaction` or `branchTransaction`
     * - `INVALID_MIN_WEIGHT_MAGNITUDE`: Invalid `minWeightMagnitude` argument
     * - `INVALID_TRYTES_ARRAY`: Invalid array of trytes
     * - Fetch error
     */
    (
        trunkTransaction: Hash,
        branchTransaction: Hash,
        minWeightMagnitude: number,
        trytes: TransactionTrytes[],
        callback?: Callback<TransactionTrytes[]>
    ): Promise<TransactionTrytes[]> =>
        Promise.resolve(validateAttachToTangle(trunkTransaction, branchTransaction, minWeightMagnitude, trytes))
            .then(() => send<AttachToTangleCommand, AttachToTangleResponse>({
                command: IRICommand.ATTACH_TO_TANGLE,
                trunkTransaction,
                branchTransaction,
                minWeightMagnitude,
                trytes,
            }))
            .then(res => res.trytes)
            .asCallback(callback)