import { createHttpClient, HttpClientSettings } from '@iota/http-client'
import * as Promise from 'bluebird' // tslint:disable-line no-unused-variable
import {
    AttachToTangle,
    BaseCommand, // tslint:disable-line no-unused-variable
    Inputs, // tslint:disable-line no-unused-variable
    Neighbor, // tslint:disable-line no-unused-variable
    Provider, // tslint:disable-line no-unused-variable
    Transaction, // tslint:disable-line no-unused-variable
    Transfer, // tslint:disable-line no-unused-variable
} from '../../types'
import {
    AccountData, // tslint:disable-line no-unused-variable
    Balances, // tslint:disable-line no-unused-variable
    CheckConsistencyOptions, // tslint:disable-line no-unused-variable
    createAddNeighbors,
    createAttachToTangle,
    createBroadcastBundle,
    createBroadcastTransactions,
    createCheckConsistency,
    createFindTransactionObjects,
    createFindTransactions,
    createGetAccountData,
    createGetBalances,
    createGetBundle,
    createGetInclusionStates,
    createGetInputs,
    createGetNeighbors,
    createGetNewAddress,
    createGetNodeInfo,
    createGetTransactionObjects,
    createGetTransactionsToApprove,
    createGetTrytes,
    createInterruptAttachingToTangle,
    createIsPromotable,
    createIsReattachable,
    createPrepareTransfers,
    createPromoteTransaction,
    createRemoveNeighbors,
    // createSendTransfer,
    createReplayBundle,
    createSendTrytes,
    createStoreAndBroadcast,
    createStoreTransactions,
    createTraverseBundle,
    createWereAddressesSpentFrom,
    FindTransactionsQuery, // tslint:disable-line no-unused-variable
    GetAccountDataOptions, // tslint:disable-line no-unused-variable
    GetInputsOptions, // tslint:disable-line no-unused-variable
    GetNewAddressOptions, // tslint:disable-line no-unused-variable
    GetNodeInfoResponse, // tslint:disable-line no-unused-variable
    PrepareTransfersOptions, // tslint:disable-line no-unused-variable
    PromoteTransactionOptions, // tslint:disable-line no-unused-variable
    TransactionsToApprove, // tslint:disable-line no-unused-variable
} from './'
import { createGetBundlesFromAddresses } from './createGetBundlesFromAddresses'
import {
    createGetTransfers,
    GetTransfersOptions, // tslint:disable-line no-unused-variable
} from './createGetTransfers'

export interface Settings extends HttpClientSettings {
    readonly network?: Provider
    readonly attachToTangle?: AttachToTangle
}

export type Func<T> = (...args: any[]) => T

export function returnType<T>(func: Func<T>) {
    return {} as T // tslint:disable-line no-object-literal-type-assertion
}

/**
 * @method composeApi
 *
 * @summary Creates an API object that's used to send requests to an IRI node.
 *
 * @memberof module:core
 *
 * @param {Object} [settings={}] - Connection settings.
 * @param {Provider} [settings.network=http-client] - Network provider
 * @param {string} [settings.provider=http://localhost:14265] - URI of an IRI node
 * @param {Function} [settings.attachToTangle=attachToTangle] - Function that overrides the default `attachToTangle` endpoint
 * @param {string | number} [settings.apiVersion=1] - IOTA API version to use in the `X-IOTA-API-Version` HTTP header
 * @param {number} [settings.requestBatchSize=1000] - Maximum number of parameters that may be sent in batched API request for [`findTransactions`]{@link #module_core.findTransactions}, [`getBalances`]{@link #module_core.getBalances}, [`getInclusionStates`]{@link #module_core.getInclusionStates}, and [`getTrytes`]{@link #module_core.getTrytes}
 *
 * @example
 * ```js
 * const Iota = require('@iota/core`);
 *
 * const iota = Iota.composeAPI({
 *  provider: 'https://nodes.devnet.thetangle.org:443'
 * });
 * ```
 *
 * @return {API} iota - API object to use to interact with an IRI node.
 */
export const composeAPI = (settings: Partial<Settings> = {}) => {
    let provider: Provider = createHttpClient(settings)
    let attachToTangle: AttachToTangle = settings.attachToTangle || createAttachToTangle(provider)

    /**
     * @method setSettings
     *
     * @summary Defines network provider configuration and [`attachToTangle`]{@link #module_core.attachToTangle} method.
     *
     * @memberof API
     *
     * @param {Object} settings - Provider settings object
     * @param {string} [settings.provider] - URI of an IRI node
     * @param {Provider} [settings.network] - Network provider
     * @param {Function} [settings.attachToTangle] - A new `attachToTangle()` function
     */
    function setSettings(newSettings: Partial<Settings> = {}) {
        if (newSettings.attachToTangle) {
            attachToTangle = newSettings.attachToTangle
        }

        if (newSettings.network) {
            provider = newSettings.network
        }

        provider.setSettings(newSettings)
    }

    /**
     *
     * @method overrideNetwork
     *
     * @summary Overrides the default provider
     *
     * @memberof API
     *
     * @ignore
     *
     * @param {Provider} network - Provider instance to use to override the existing network settings
     */

    function overrideNetwork(network: Provider) {
        provider = network
    }

    /**
     *
     * @method overrideAttachToTangle
     *
     * @summary Overrides the default [`attachToTangle`]{@link #module_core.attachToTangle} method
     *
     * @memberof API
     *
     * @ignore
     *
     * @param {function} attachToTangle - Function that overrides the
     * [`attachToTangle`]{@link #module_core.attachToTangle} method
     */
    function overrideAttachToTangle(attachFn: AttachToTangle) {
        attachToTangle = attachFn
    }

    /** @namespace API */
    return {
        // IRI commands
        addNeighbors: createAddNeighbors(provider),
        attachToTangle,
        broadcastTransactions: createBroadcastTransactions(provider),
        checkConsistency: createCheckConsistency(provider),
        findTransactions: createFindTransactions(provider),
        getBalances: createGetBalances(provider),
        getInclusionStates: createGetInclusionStates(provider),
        getNeighbors: createGetNeighbors(provider),
        getNodeInfo: createGetNodeInfo(provider),
        getTransactionsToApprove: createGetTransactionsToApprove(provider),
        getTrytes: createGetTrytes(provider),
        interruptAttachingToTangle: createInterruptAttachingToTangle(provider),
        removeNeighbors: createRemoveNeighbors(provider),
        storeTransactions: createStoreTransactions(provider),
        wereAddressesSpentFrom: createWereAddressesSpentFrom(provider),
        sendCommand: provider.send,

        // Wrapper methods
        broadcastBundle: createBroadcastBundle(provider),
        getAccountData: createGetAccountData(provider),
        getBundle: createGetBundle(provider),
        getBundlesFromAddresses: createGetBundlesFromAddresses(provider),
        getNewAddress: createGetNewAddress(provider),
        getTransactionObjects: createGetTransactionObjects(provider),
        findTransactionObjects: createFindTransactionObjects(provider),
        getInputs: createGetInputs(provider),
        getTransfers: createGetTransfers(provider), // Deprecated
        isPromotable: createIsPromotable(provider),
        isReattachable: createIsReattachable(provider), // Deprecated
        prepareTransfers: createPrepareTransfers(provider),
        promoteTransaction: createPromoteTransaction(provider, attachToTangle),
        replayBundle: createReplayBundle(provider, attachToTangle),
        // sendTransfer: createSendTransfer(provider, attachToTangle),
        sendTrytes: createSendTrytes(provider, attachToTangle),
        storeAndBroadcast: createStoreAndBroadcast(provider),
        traverseBundle: createTraverseBundle(provider),
        setSettings,
        overrideAttachToTangle,
        overrideNetwork,
    }
}

export const apiType = returnType(composeAPI)

export type API = typeof apiType
