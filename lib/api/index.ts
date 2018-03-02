import * as Bluebird from 'bluebird'

import {
    addNeighbors,
    broadcastTransactions,
    checkConsistency,
    curlViaNode,
    findTransactions,
    FindTransactionsQuery,
    getBalances,
    GetBalancesResponse,
    getInclusionStates,
    getNeighbors,
    getNodeInfo,
    GetNodeInfoResponse,
    getTips,
    getTransactionsToApprove,
    GetTransactionsToApproveResponse,
    getTrytes,
    interruptAttachingToTangle,
    makeAttachToTangle,
    removeNeighbors,
    sendCommand,
    storeTransactions,
    wereAddressesSpentFrom,
} from './core'

import {
    AccountData,
    broadcastBundle,
    findTransactionObjects,
    getAccountData,
    GetAccountDataOptions,
    getBundle,
    getBundlesFromAddresses,
    getInputs,
    GetInputsOptions,
    getLatestInclusion,
    getNewAddress,
    GetNewAddressOptions,
    getTransactionObjects,
    getTransfers,
    GetTransfersOptions,
    isPromotable,
    isReattachable,
    makePromoteTransaction,
    makeReplayBundle,
    makeSendTransfer,
    makeSendTrytes,
    prepareTransfers,
    PrepareTransfersOptions,
    PromoteTransactionOptions,
    storeAndBroadcast,
    traverseBundle,
} from './extended'

import { setSettings, Settings } from './settings'

import { BaseCommand, Inputs, Neighbor, Transaction, Transfer } from './types'

/**
 * Composes API object from it's components
 *
 * @method composeApi
 * @param {object} [settings] - connection settings
 **/
export const composeApi = (settings: Partial<Settings> = {}) => {
    const curl = settings.curl || curlViaNode
    const api = {
        // core
        addNeighbors,
        attachToTangle: makeAttachToTangle(curl),
        broadcastTransactions,
        checkConsistency,
        findTransactions,
        getBalances,
        getInclusionStates,
        getNeighbors,
        getNodeInfo,
        getTips,
        getTransactionsToApprove,
        getTrytes,
        interruptAttachingToTangle,
        removeNeighbors,
        sendCommand,
        storeTransactions,
        wereAddressesSpentFrom,

        // extended
        broadcastBundle,
        findTransactionObjects,
        getAccountData,
        getBundle,
        getBundlesFromAddresses,
        getInputs,
        getLatestInclusion,
        getNewAddress,
        getTransactionObjects,
        getTransfers,
        isPromotable,
        isReattachable,
        prepareTransfers,
        promoteTransaction: makePromoteTransaction(curl),
        replayBundle: makeReplayBundle(curl),
        sendTransfer: makeSendTransfer(curl),
        sendTrytes: makeSendTrytes(curl),
        setSettings,
        storeAndBroadcast,
        traverseBundle,
    }

    api.setSettings(settings)

    return api
}
