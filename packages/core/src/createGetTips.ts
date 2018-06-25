import * as Promise from 'bluebird'
import { Callback, GetTipsCommand, GetTipsResponse, Hash, IRICommand, Provider } from '../../types'

/**
 * @method createGetTips
 *
 * @memberof module:core
 *
 * @param {Provider} provider - Network provider
 *
 * @return {function} {@link #module_core.getTips `getTips`}
 */
export const createGetTips = ({ send }: Provider) =>
    /**
     * Returns a list of tips (transactions not referenced by other transactions),
     * as seen by the connected node.
     *
     * @example
     *
     * ```js
     * getTips()
     *   .then(tips => {
     *     // ...
     *   })
     *   .catch(err => {
     *     // ...
     *   })
     * ```
     *
     * @method getTips
     *
     * @memberof module:core
     *
     * @param {Callback} [callback] - Optional callback
     *
     * @return {Promise}
     * @fulfil {Hash[]} List of tip hashes
     * @reject {Error}
     * - Fetch error
     */
    (callback?: Callback<ReadonlyArray<Hash>>): Promise<ReadonlyArray<Hash>> =>
        send<GetTipsCommand, GetTipsResponse>({ command: IRICommand.GET_TIPS })
            .then(({ hashes }) => hashes)
            .asCallback(callback)
