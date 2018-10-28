import { createHttpClient, HttpClientSettings } from '@iota/http-client'
import * as Bluebird from 'bluebird' // tslint:disable-line no-unused-variable
import {
    AttachToTangle,
    BaseCommand, // tslint:disable-line no-unused-variable
    CreateProvider,
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
    // createWereAddressesSpentFrom,
    createGetLatestInclusion,
    createGetNeighbors,
    createGetNewAddress,
    createGetNodeInfo,
    createGetTips,
    createGetTransactionObjects,
    createGetTransactionsToApprove,
    createGetTrytes,
    createInterruptAttachingToTangle,
    createIsPromotable,
    createIsReattachable,
    createPrepareTransfers,
    createPromoteTransaction,
    // createSendTransfer,
    createRemoveNeighbors,
    createReplayBundle,
    createSendTrytes,
    createStoreAndBroadcast,
    createStoreTransactions,
    createTraverseBundle,
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
    GetTransfersOptions // tslint:disable-line no-unused-variable
} from './createGetTransfers'

export interface Settings extends HttpClientSettings {
    readonly attachToTangle?: AttachToTangle
}

export type Func<T> = (...args: any[]) => T

export function returnType<T>(func: Func<T>) {
    return {} as T // tslint:disable-line no-object-literal-type-assertion
}

/**
 * Composes API object from it's components
 *
 * @method composeApi
 *
 * @memberof module:core
 *
 * @param {object | Function} [settings={} | provider] - Connection settings or `provider` factory
 * @param {string} [settings.provider=http://localhost:14265] Uri of IRI node
 * @param {function} [settings.attachToTangle] - Function to override
 * [`attachToTangle`]{@link #module_core.attachToTangle} with
 * @param {string | number} [settings.apiVersion=1] - IOTA Api version to be sent as `X-IOTA-API-Version` header.
 * @param {number} [settings.requestBatchSize=1000] - Number of search values per request.
 *
 * @return {API}
 */
export const composeAPI = (input: Partial<Settings> | CreateProvider = {}) => {
    const isFn = typeof input === 'function'
    const settings: Partial<Settings> = isFn ? {} : input as Partial<Settings>
    const provider: Provider = isFn ? (input as CreateProvider)() : createHttpClient(settings)

    let attachToTangle: AttachToTangle = settings.attachToTangle || createAttachToTangle(provider)

    /**
     * Defines network provider configuration and [`attachToTangle`]{@link #module_core.attachToTangle} method.
     *
     * @method setSettings
     *
     * @memberof API
     *
     * @param {object} settings - Provider settings object
     * @param {string} [settings.provider] - Http `uri` of IRI node
     * @param {function} [settings.attachToTangle] - Function to override
     * [`attachToTangle`]{@link #module_core.attachToTangle} with
     */
    function setSettings(newSettings: Partial<Settings> = {}) {
        provider.setSettings(newSettings)

        if (newSettings.attachToTangle) {
            attachToTangle = newSettings.attachToTangle
        }
    }

    /**
     * Overides default [`attachToTangle`]{@link #module_core.attachToTangle} with a local equivalent or
     * [`PoWBox`](https://powbox.devnet.iota.org/)
     *
     * @method overrideAttachToTangle
     *
     * @memberof API
     *
     * @param {function} attachToTangle - Function to override
     * [`attachToTangle`]{@link #module_core.attachToTangle} with
     */
    function overrideAttachToTangle(attachFn: AttachToTangle) {
        attachToTangle = attachFn
    }

    /** @namespace API */
    const api = {
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
        getTips: createGetTips(provider),
        getTransactionsToApprove: createGetTransactionsToApprove(provider),
        getTrytes: createGetTrytes(provider),
        interruptAttachingToTangle: createInterruptAttachingToTangle(provider),
        removeNeighbors: createRemoveNeighbors(provider),
        storeTransactions: createStoreTransactions(provider),
        // wereAddressesSpentFrom: createWereAddressesSpentFrom(provider),
        sendCommand: provider.send,

        // Wrapper methods
        broadcastBundle: createBroadcastBundle(provider),
        getAccountData: createGetAccountData(provider),
        getBundle: createGetBundle(provider),
        getBundlesFromAddresses: createGetBundlesFromAddresses(provider),
        getLatestInclusion: createGetLatestInclusion(provider),
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
    }

    return isFn
        ? (settingsB: Partial<Settings>) => {
              setSettings(settingsB)
              return api
          }
        : api
}

export const apiType = returnType(composeAPI)

export type API = typeof apiType
