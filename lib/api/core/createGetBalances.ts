import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { getBalancesThresholdValidator, hashArrayValidator, removeChecksum, validate } from '../../utils'
import { BaseCommand, Callback, Hash, IRICommand, Maybe, Provider } from '../types'

export interface GetBalancesCommand extends BaseCommand {
    command: string
    addresses: string[]
    threshold: number
}

/**
 * @typedef {object} GetBalancesResponse
 *
 * @prop {Array<string>} balances - Array of balances
 * @prop {Hash} milestone - Milestone transaction hash
 * @prop {number} milestoneIndex - Milestone index
 */
export interface GetBalancesResponse {
    balances: string[]
    duration: number
    milestone: string
    milestoneIndex: number
}

export const validateGetBalances = (addresses: Hash[], threshold: number) =>
    validate(hashArrayValidator(addresses), getBalancesThresholdValidator(threshold))

/**
 * @method createGetBalances
 *
 * @param {Provider} provider - Network provider
 *
 * @return {function} {@link getBalances}
 */
export const createGetBalances = (provider: Provider) =>
    /**
     * Fetches _confirmed_ balances of given addresses at the latest solid milestone,
     * by calling [`getBalances`]{@link https://docs.iota.works/iri/api#endpoints/getBalances} command.
     *
     * @example
     * import { generateAddress } from '@iota/crypto'
     * import iota from '@iota/core'
     *
     * const { getBalances } = iota()
     *
     * const address = generateAddress('SEED', 0, 2)
     *  
     * getBalances([address], 100)
     *    .then(({ balances }) => balances.map(parseInt)
     *    .then(balances => {
     *        //...
     *    })
     *    .catch(err => {
     *        // handle errors here
     *    })
     *
     * @method getBalances
     *
     * @param {Hash[]} addresses - List of addresses 
     * @param {number} threshold - Confirmation threshold, currently `100` should be used
     * @param {Callback} [callback] - Optional callback
     * 
     * @return {Promise}
     * @fulfil {GetBalancesResponse} Object with list of balances and corresponding `milestone`
     * @reject {Error}
     * - `INVALID_HASH_ARRAY`: Invalid addresses array
     * - `INVALID_THRESHOLD`: Invalid `threshold`
     * - Fetch error
     */
    (
        addresses: Hash[],
        threshold: number,
        callback?: Callback<GetBalancesResponse>
    ): Promise<GetBalancesResponse> =>
        Promise.resolve(validateGetBalances(addresses, threshold))
            .then(() => provider.sendCommand<GetBalancesCommand, GetBalancesResponse>({
                command: IRICommand.GET_BALANCES,
                addresses: removeChecksum(addresses), // Addresses passed to IRI should not have the checksum
                threshold,
            }))
            .asCallback(callback)
