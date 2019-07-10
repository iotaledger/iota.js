import { removeChecksum } from '@iota/checksum'
import { TRYTE_WIDTH } from '@iota/converter'
import { TRANSACTION_HASH_LENGTH } from '@iota/transaction'
import * as Promise from 'bluebird'
import * as errors from '../../errors'
import { getBalancesThresholdValidator, isHash, isTrytesOfExactLength, validate } from '../../guards'
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
     * @param {Hash[]} [tips] - List of tips to calculate the balance from the PoV of these transactions
     * @param {Callback} [callback] - Optional callback
     *
     * @return {Promise}
     * @fulfil {Balances} Object with list of `balances` and corresponding `milestone`
     * @reject {Error}
     * - `INVALID_HASH`: Invalid address
     * - `INVALID_THRESHOLD`: Invalid `threshold`
     * - Fetch error
     */
    (
        addresses: ReadonlyArray<Hash>,
        threshold: number,
        tips?: ReadonlyArray<Hash>,
        callback?: Callback<Balances>
    ): Promise<Balances> => {
        // If no tips are provided, switch arguments
        if (tips && typeof tips === 'function') {
            callback = tips
            tips = []
        }

        return Promise.resolve(
            validate(
                [addresses, (arr: Hash[]) => arr.every(isHash), errors.INVALID_ADDRESS],
                getBalancesThresholdValidator(threshold),
                !!tips && [
                    tips,
                    (arr: Hash[]) => arr.every(h => isTrytesOfExactLength(h, TRANSACTION_HASH_LENGTH / TRYTE_WIDTH)),
                    errors.INVALID_TRANSACTION_HASH,
                ]
            )
        )
            .then(() =>
                send<GetBalancesCommand, GetBalancesResponse>({
                    command: IRICommand.GET_BALANCES,
                    addresses: addresses.map(removeChecksum), // Addresses passed to IRI should not have the checksum
                    threshold,
                    ...(Array.isArray(tips) && tips.length && { tips }),
                })
            )
            .then(res => ({
                ...res,
                balances: res.balances.map(balance => parseInt(balance, 10)),
            }))
            .asCallback(callback)
    }
