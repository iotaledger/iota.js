import * as Bluebird from 'bluebird'

import {
    createAddNeighbors,
    createAttachToTangle,
    createBroadcastTransactions,
    createCheckConsistency,
    createFindTransactions,
    createGetBalances,
    createGetInclusionStates,
    createGetNeighbors,
    createGetNodeInfo,
    createGetTips,
    createGetTransactionsToApprove,
    createGetTrytes,
    createInterruptAttachingToTangle,
    createRemoveNeighbors,
    createStoreTransactions,
    createWereAddressesSpentFrom,
    defaultAttachFn,
    FindTransactionsQuery,
    GetBalancesResponse,
    GetNodeInfoResponse,
    GetTransactionsToApproveResponse,
    sendCommand,
    validateAttachToTangle,
} from './core'

import {
    AccountData,
    createBroadcastBundle,
    createFindTransactionObjects,
    createGetAccountData,
    createGetBundle,
    createGetBundlesFromAddresses,
    createGetInputs,
    createGetLatestInclusion,
    createGetNewAddress,
    createGetTransactionObjects,
    createGetTransfers,
    createIsPromotable,
    createIsReattachable,
    createPrepareTransfers,
    createPromoteTransaction,
    createReplayBundle,
    createSendTransfer,
    createSendTrytes,
    createStoreAndBroadcast,
    createTraverseBundle,
    GetAccountDataOptions,
    GetInputsOptions,
    GetNewAddressOptions,
    GetTransfersOptions,
    PrepareTransfersOptions,
    PromoteTransactionOptions,
} from './extended'

import { validateSettings } from './settings'

import { AttachToTangle, BaseCommand, Inputs, Neighbor, Settings, Transaction, Transfer } from './types'

export type Func<T> = ([...args]: any) => T

export function returnType<T>(func: Func<T>) {
    return {} as T // tslint:disable-line no-object-literal-type-assertion
}

/**
 * Composes API object from it's components
 *
 * @method composeApi
 * @param {object} [settings] - connection settings
 **/
export const composeApi = (settings: Partial<Settings> = {}) => {
    const _settings: Settings = validateSettings(settings) // tslint:disable-line variable-name
    let _attachFn = defaultAttachFn(_settings) // tslint:disable-line variable-name

    const api = {
        // core
        addNeighbors: createAddNeighbors(_settings),
        attachToTangle: createAttachToTangle(_attachFn),
        broadcastTransactions: createBroadcastTransactions(_settings),
        checkConsistency: createCheckConsistency(_settings),
        findTransactions: createFindTransactions(_settings),
        getBalances: createGetBalances(_settings),
        getInclusionStates: createGetInclusionStates(_settings),
        getNeighbors: createGetNeighbors(_settings),
        getNodeInfo: createGetNodeInfo(_settings),
        getTips: createGetTips(_settings),
        getTransactionsToApprove: createGetTransactionsToApprove(_settings),
        getTrytes: createGetTrytes(_settings),
        interruptAttachingToTangle: createInterruptAttachingToTangle(_settings),
        removeNeighbors: createRemoveNeighbors(_settings),
        storeTransactions: createStoreTransactions(_settings),
        wereAddressesSpentFrom: createWereAddressesSpentFrom(_settings),
        sendCommand,

        // extended
        broadcastBundle: createBroadcastBundle(_settings),
        createGetAccountData: createGetAccountData(_settings),
        createGetBundle: createGetBundle(_settings),
        createGetBundlesFromAddresses: createGetBundlesFromAddresses(_settings),
        createGetLatestInclusion: createGetLatestInclusion(_settings),
        createGetNewAddress: createGetNewAddress(_settings),
        createGetTransactionObjects: createGetTransactionObjects(_settings),
        findTransactionObjects: createFindTransactionObjects(_settings),
        getInputs: createGetInputs(_settings),
        getTransfers: createGetTransfers(_settings),
        isPromotable: createIsPromotable(_settings),
        isReattachable: createIsReattachable(_settings),
        prepareTransfers: createPrepareTransfers(_settings),
        promoteTransaction: createPromoteTransaction(_settings),
        replayBundle: createReplayBundle(_settings),
        sendTransfer: createSendTransfer(_settings),
        sendTrytes: createSendTrytes(_settings),
        storeAndBroadcast: createStoreAndBroadcast(_settings),
        traverseBundle: createTraverseBundle(_settings),

        // settings
        setSettings: (newSettings: Partial<Settings> = {}) => {
            Object.assign(_settings, validateSettings(newSettings))
        },

        overrideAttachToTangle: (attachFn: AttachToTangle) => {
            _attachFn = attachFn
        },
    }

    return api
}

export const apiType = returnType(composeApi)

export type Api = typeof apiType
