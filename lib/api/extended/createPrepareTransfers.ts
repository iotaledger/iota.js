import * as Promise from 'bluebird'
import { Bundle, Converter, HMAC, Signing } from '../../crypto'
import * as errors from '../../errors'
import {
    addressObjectArrayValidator,
    asFinalTransactionTrytes,
    asTransactionTrytes,
    getOptionsWithDefaults,
    hashValidator,
    isValidChecksum,
    NULL_HASH_TRYTES,
    pad,
    padTag,
    remainderAddressValidator,
    removeChecksum,
    securityLevelValidator,
    seedValidator,
    transferArrayValidator,
    trytesValidator,
    validate,
} from '../../utils'
import { createGetBalances } from '../core'
import { Address, Callback, Inputs, Maybe, Settings, Transaction, Transfer, Trytes } from '../types'
import { createGetInputs, createGetNewAddress } from './index'

export interface PrepareTransfersOptions {
    inputs: Address[]
    address: Trytes // Deprecate
    remainderAddress: Trytes
    security: number
    hmacKey: string
}

const defaults: PrepareTransfersOptions = {
    inputs: [],
    address: '',
    remainderAddress: '',
    security: 2,
    hmacKey: '',
}

const HASH_LENGTH: number = 81
const SIGNATURE_MESSAGE_FRAGMENT_LENGTH: number = 2187
const KEY_FRAGMENT_LENGTH: number = 6561

export const getTritsFragment = (a: Int8Array, i: number, l: number) => a.slice(i * l, (i + 1) * l)
export const getTrytesFragment = (a: Trytes, i: number, l: number) => a.slice(i * l, (i + 1) * l)
export const getTag = (transfer: Transfer) => padTag(transfer.tag || transfer.obsoleteTag || '')

export const addTransfers = (bundle: Bundle, signatureMessageFragments: Trytes[], transfers: Transfer[]) => {
    let offset = 0

    transfers.forEach(transfer => {
        const fragmentsLength = Math.floor(
            transfer.message ? transfer.message.length / SIGNATURE_MESSAGE_FRAGMENT_LENGTH : 1
        )

        offset += fragmentsLength

        bundle.addEntry(
            fragmentsLength,
            transfer.address,
            transfer.value,
            getTag(transfer),
            Math.floor(Date.now() / 1000)
        )

        for (let i = 0; i < fragmentsLength; i++) {
            signatureMessageFragments.push(
                pad(SIGNATURE_MESSAGE_FRAGMENT_LENGTH)(
                    getTrytesFragment(transfer.message, i, SIGNATURE_MESSAGE_FRAGMENT_LENGTH)
                )
            )
        }
    })

    return offset
}

const getInputs = (
    settings: Settings,
    inputs: Inputs,
    totalValue: number,
    seed: Trytes,
    security: number,
    index: number = 0
) => {
    if (inputs) {
        return Promise.resolve(inputs)
    }

    return createGetInputs(settings)(seed, { security })
}

export const addInputs = (bundle: Bundle, inputs: Address[], tag: Trytes) =>
    inputs.forEach(input => {
        bundle.addEntry(input.security, input.address, -input.balance, tag, Math.floor(Date.now() / 1000))
    })

export const getRemainderAddressStartIndex = (inputs: Address[]) =>
    [...inputs].sort((a, b) => a.keyIndex - b.keyIndex)[0].keyIndex

export const addRemainder = (
    settings: Settings,
    bundle: Bundle,
    inputs: Inputs,
    totalValue: number,
    tag: Trytes,
    seed: Trytes,
    security: number,
    remainderAddress?: Trytes
): Promise<Bundle> => {
    const remainderValue = inputs.totalBalance - totalValue

    if (remainderValue === 0) {
        return Promise.resolve(bundle)
    }

    return Promise.resolve(
        remainderAddress ||
            createGetNewAddress(settings)(seed, {
                index: getRemainderAddressStartIndex(inputs.inputs),
                security,
            })
    ).then(finalRemainderAddress => {
        if (typeof finalRemainderAddress === 'string') {
            return bundle.addEntry(1, finalRemainderAddress, remainderValue, tag, Math.floor(Date.now() / 1000))
        }

        throw new Error('Invalid final remainder address')
    })
}

export const addSignatures = (bundle: Bundle, inputs: Address[], seed: Trytes, offset: number) => {
    const normalizedBundleHash = bundle.normalizedBundle(bundle.bundle[0].bundle as string)

    inputs.forEach(input => {
        const key = Signing.key(Converter.trits(seed), input.keyIndex, input.security)

        for (let j = 0; j < input.security; j++) {
            bundle.bundle[offset++].signatureMessageFragment = Converter.trytes(
                Signing.signatureFragment(
                    getTritsFragment(normalizedBundleHash, j, HASH_LENGTH / 3),
                    getTritsFragment(key, j, KEY_FRAGMENT_LENGTH)
                )
            )
        }
    })
}

export const addHMACPlaceholder = (transfers: Transfer[], hmacKey: Trytes) => {
    if (hmacKey) {
        const i = transfers.findIndex(transfer => transfer.value > 0)
        const result = [...transfers]
        if (i > -1) {
            result[i] = { ...result[i], message: NULL_HASH_TRYTES + transfers[i].message }
        }
    }
}

export const addHMAC = (bundle: Bundle, transfers: Transfer[], hmacKey: Trytes) => {
    if (hmacKey && transfers.findIndex(transfer => transfer.value > 0) > -1) {
        new HMAC(Converter.trits(hmacKey)).addHMAC(bundle)
    }
}

export const getPrepareTransfersOptions = getOptionsWithDefaults(defaults)

/**
 *   Prepares transfer by generating bundle, finding and signing inputs
 *
 *   @method prepareTransfers
 *   @param {string} seed
 *   @param {object} transfers
 *   @param {object} options
 *       @property {array} inputs Inputs used for signing. Needs to have correct security, keyIndex and address value
 *       @property {string} address Remainder address
 *       @property {int} security security level to be used for getting inputs and addresses
 *       @property {string} hmacKey HMAC key used for attaching an HMAC
 *   @param {function} callback
 *   @returns {array} trytes Returns bundle trytes
 **/
export const createPrepareTransfers = (settings: Settings) => {
    const prepareTransfers = (
        seed: Trytes,
        transfers: Transfer[],
        options: Partial<PrepareTransfersOptions> = {},
        callback?: Callback<Trytes[]>
    ): Promise<Trytes[]> => {
        const { inputs, hmacKey, address, remainderAddress, security } = getPrepareTransfersOptions(options)
        const remainder = remainderAddress || address
        const bundle = new Bundle()
        const timestamp = Math.floor(Date.now() / 1000)
        const totalBalance = inputs ? inputs.reduce((acc, input) => acc + parseInt(input.balance, 10), 0) : 0
        const totalValue = transfers.reduce((acc, transfer) => acc + transfer.value, 0)
        const signatureMessageFragments: Trytes[] = []
        const tag = getTag(transfers[transfers.length - 1])

        return Promise.resolve(
            validate(
                seedValidator(seed),
                addressObjectArrayValidator(inputs),
                transferArrayValidator(transfers),
                remainderAddressValidator(remainder)
            )
        )
            .then(() => addHMACPlaceholder(transfers, hmacKey))
            .then(() => addTransfers(bundle, signatureMessageFragments, transfers))
            .then((offset: number) =>
                getInputs(settings, { inputs, totalBalance }, totalValue, seed, security)
                    .tap(() => addInputs(bundle, inputs, tag))
                    .then((newInputs: Maybe<Inputs>) => {
                        if (newInputs) {
                            addRemainder(settings, bundle, newInputs, totalValue, tag, seed, security, remainder)
                        }
                    })
                    .then(() => addSignatures(bundle, inputs, seed, offset))
            )
            .then(() => {
                bundle.finalize()
                bundle.addTrytes(signatureMessageFragments)
            })
            .then(() => addHMAC(bundle, transfers, hmacKey))
            .then(() => asFinalTransactionTrytes(bundle.bundle as Transaction[]))
            .asCallback(callback)
    }

    const setSettings = (newSettings: Settings) => {
        settings = newSettings
    }

    // tslint:disable-next-line prefer-object-spread
    return Object.assign(prepareTransfers, { setSettings })
}
