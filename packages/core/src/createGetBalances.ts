import { removeChecksum } from '@iota/checksum'
import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { arrayValidator, getBalancesThresholdValidator, hashValidator, validate } from '../../guards'
import { Balances, Callback, GetBalancesCommand, GetBalancesResponse, Hash, IRICommand, Provider } from '../../types'

/**
 * @method createGetBalances
 *
 * @memberof module:core
 *
 * @param {Provider} provider - Network provider
 *
 * @return {function} {@link #module_core.getBalances `getBalances`}
 */
export const createGetBalances = ({ send }: Provider) =>
    /**
     * Fetches _confirmed_ balances of given addresses at the latest solid milestone,
     * by calling [`getBalances`](https://docs.iota.works/iri/api#endpoints/getBalances) command.
     *
     * @example
     * ```js
     * getBalances([address], 100)
     *   .then(({ balances }) => {
     *     // ...
     *   })
     *   .catch(err => {
     *     // ...
     *   })
     * ```
     *
     * @method getBalances
     *
     * @memberof module:core
     *
     * @param {Hash[]} addresses - List of addresses
     * @param {number} threshold - Confirmation threshold, currently `100` should be used
     * @param {Callback} [callback] - Optional callback
     *
     * @return {Promise}
     * @fulfil {Balances} Object with list of `balances` and corresponding `milestone`
     * @reject {Error}
     * - `INVALID_HASH`: Invalid address
     * - `INVALID_THRESHOLD`: Invalid `threshold`
     * - Fetch error
     */
    (addresses: ReadonlyArray<Hash>, threshold: number, callback?: Callback<Balances>): Promise<Balances> =>
        Promise.resolve(
            validate(
                arrayValidator(hashValidator)(addresses, errors.INVALID_ADDRESS),
                getBalancesThresholdValidator(threshold)
            )
        )
            .then(() =>
                send<GetBalancesCommand, GetBalancesResponse>({
                    command: IRICommand.GET_BALANCES,
                    addresses: removeChecksum(addresses), // Addresses passed to IRI should not have the checksum
                    threshold,
                })
            )
            .then(res => ({
                ...res,
                balances: res.balances.map(balance => parseInt(balance, 10)),
            }))
            .asCallback(callback)
