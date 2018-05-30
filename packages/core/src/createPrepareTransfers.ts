import * as Promise from 'bluebird'
import {
    addEntry,
    addHMAC as HMAC,
    addTrytes,
    finalizeBundle,
    key,
    normalizedBundleHash,
    signatureFragment,
    trits,
    trytes,
} from '@iota/crypto'
import {
    addressObjectArrayValidator,
    asArray,
    asFinalTransactionTrytes,
    asyncPipe,
    getOptionsWithDefaults,
    hashValidator,
    isValidChecksum,
    NULL_HASH_TRYTES,
    padTag,
    padTrytes,
    remainderAddressValidator,
    removeChecksum,
    securityLevelValidator,
    seedValidator,
    transferArrayValidator,
    trytesValidator,
    validate,
} from '@iota/utils'

import { createGetBalances, createGetInputs, createGetNewAddress, GetInputsOptions } from './'
import * as errors from './errors'
import { Address, Callback, Inputs, Maybe, Provider, Transaction, Transfer, Trytes } from './types'

export interface PrepareTransfersOptions {
    inputs: Address[]
    address?: Trytes // Deprecate
    remainderAddress?: Trytes
    security: number
    hmacKey?: Trytes
}

const HASH_LENGTH: number = 81
const SIGNATURE_MESSAGE_FRAGMENT_LENGTH: number = 2187
const KEY_FRAGMENT_LENGTH: number = 6561

const defaults: PrepareTransfersOptions = {
    inputs: [],
    address: undefined,
    remainderAddress: undefined,
    security: 2,
    hmacKey: undefined,
}

export const getPrepareTransfersOptions = (options: Partial<PrepareTransfersOptions>) => {
    const optionsWithDefaults = getOptionsWithDefaults(defaults)(options)

    return {
        ...optionsWithDefaults,
        remainderAddress: options.address || options.remainderAddress || undefined
    }
}

export interface PrepareTransfersProps {
    transactions: Transaction[],
    trytes: Trytes[],
    transfers: Transfer[],
    seed: Trytes, security: number,
    inputs: Address[],
    timestamp: number,
    remainderAddress?: Trytes,
    address?: Trytes,
    hmacKey?: Trytes
}

/**
 * Create a `{@link prepareTransfers}` function by passing an optional `{@link Provider}`.
 * It is possible to prepare the transfers and do the signing offline, by omiting the provider option.
 *
 * @method createPrepareTransfers
 * 
 * @param {Provider} [provider] - Optional network provider, which is used to fetch inputs and remainder address.
 * In case this is omitted, proper input objects and remainder should be passed in `{@link prepareTransfers}`, if required.
 * 
 * @return {Function} {@link prepareTransfers}
 */
export const createPrepareTransfers = (provider?: Provider, now: () => number = () => Date.now()) => {
    const addInputs = createAddInputs(provider)
    const addRemainder = createAddRemainder(provider)

    /**
     * Prepares the transaction trytes by generating a bundle, filling in transfers and inputs,
     * adding remainder and signing.
     *
     * It can be used to generate and sign bundles either online or offline.
     * For offline usage, please see {@createPrepareTransfers} which creates a `prepareTransfers`
     * without a network provider.
     *
     * @method prepareTransfers
     * 
     * @param {string} seed
     * 
     * @param {object} transfers
     * 
     * @param {object} options
     * @property {Input[]} [inputs] Inputs used for signing. Needs to have correct security, keyIndex and address value
     * @property {Hash} [address] Remainder address
     * @property {Number} [security] security level to be used for getting inputs and addresses
     * @property {Hash} [hmacKey] HMAC key used for attaching an HMAC
     * 
     * @param {function} callback
     * 
     * @return {Promise}
     * @fulfil {array} trytes Returns bundle trytes
     * @reject {Error}
     * - `INVALID_SEED`
     * - `INVALID_TRANSFER_ARRAY`
     * - `INVALID_INPUTS`
     * - `INVALID_REMAINDER_ADDRESS`
     * - `INSUFFICIENT_BALANCE`
     * - `SENDING_BACK_TO_INPUTS`
     * - Fetch error, if connected to network
     */
    return (
        seed: Trytes,
        transfers: Transfer[],
        options: Partial<PrepareTransfersOptions> = {},
        callback?: Callback<Trytes[]>
    ): Promise<Trytes[]> => {
        const props = Promise.resolve(validatePrepareTransfersProps({
            transactions: [],
            trytes: [],
            seed,
            transfers,
            timestamp: Math.floor((typeof now === 'function' ? now() : Date.now()) / 1000),
            ...getPrepareTransfersOptions(options),
        }))

        return asyncPipe<PrepareTransfersProps>(
            addHMACPlaceholder,
            addTransfers,
            addInputs,
            addRemainder,
            verifyNotSendingToInputs,
            finalize,
            addSignatures,
            addHMAC,
            asTransactionTrytes
        )(props)
            .then(({ trytes }) => trytes)
            .asCallback(callback)
    }
}

export const validatePrepareTransfersProps = (props: PrepareTransfersProps) => {
    const { seed, transfers, inputs, address, remainderAddress, security } = props
    const validators = [
        seedValidator(seed),
        securityLevelValidator(security),
        transferArrayValidator(transfers),
    ]

    if (remainderAddress || address) {
        remainderAddressValidator(remainderAddress || address)
    }

    if (inputs.length) {
        addressObjectArrayValidator(inputs)
    }

    validate(...validators)

    return props
}

export const addHMACPlaceholder = (props: PrepareTransfersProps) => {
    const { transfers, hmacKey } = props

    if (!hmacKey) {
        return props
    }

    const index = transfers.findIndex(transfer => transfer.value > 0)

    return {
        ...props,
        transfers: transfers.map((transfer, i) => i === index
            ? { ...transfer, message: NULL_HASH_TRYTES + transfer.message }
            : transfer
        )
    }
}

export const addTransfers = (props: PrepareTransfersProps) => {
    const { transactions, transfers, timestamp } = props

    return {
        ...props,
        transactions: transfers.reduce((acc, { address, value, tag, message }) => {
            const length = message.length ? Math.ceil(message.length / SIGNATURE_MESSAGE_FRAGMENT_LENGTH) : 1
            const signatureMessageFragments = Array(length).fill(null).map((_, i) =>
                message.slice(i * KEY_FRAGMENT_LENGTH, (i + 1) * KEY_FRAGMENT_LENGTH))

            return addEntry(acc, {
                length,
                address: removeChecksum(address),
                value,
                tag,
                timestamp,
                signatureMessageFragments
            })
        }, transactions)
    }
}

export const createAddInputs = (provider?: Provider) => {
    const getInputs = provider ? createGetInputs(provider) : undefined

    return (props: PrepareTransfersProps) => {
        const { transactions, transfers, inputs, timestamp, seed, security } = props
        const threshold = transfers.reduce((sum, { value }) => sum += value, 0)

        if (!getInputs && threshold > inputs.reduce((acc, input) => acc += parseInt(input.balance, 10), 0)) {
            throw new Error(inputs.length ? errors.INSUFFICIENT_BALANCE : errors.INVALID_INPUTS)
        }

        return (
            inputs.length
                ? Promise.resolve(inputs)
                : getInputs!(seed, { security, threshold }).then(response => response.inputs)
        )
            .then((res) => ({
                ...props,
                inputs: res,
                transactions: res.reduce((acc, input) => addEntry(acc, {
                    length: input.security,
                    address: removeChecksum(input.address),
                    value: -input.balance,
                    timestamp: timestamp || Math.floor(Date.now() / 1000)
                }), transactions)
            }))
    }
}

export const createAddRemainder = (provider?: Provider) => {
    const getNewAddress = provider ? createGetNewAddress(provider) : undefined

    return (props: PrepareTransfersProps) => {
        const { transactions, remainderAddress, seed, security, inputs, timestamp } = props

        // Values of transactions in the bundle should sum up to 0.
        const value = transactions.reduce((acc, transaction) => acc += transaction.value, 0)

        // Value > 0 indicates insufficient balance in inputs.
        if (value > 0) {
            throw new Error(errors.INSUFFICIENT_BALANCE)
        }

        // If value is already zero no remainder is required
        if (value === 0) {
            return props
        }

        if (!provider && !remainderAddress) {
            throw new Error(errors.INVALID_REMAINDER_ADDRESS)
        }

        return (
            remainderAddress
                ? Promise.resolve(remainderAddress)
                : getNewAddress!(seed, {
                    index: getRemainderAddressStartIndex(inputs),
                    security
                })
        )
            .then(address => {
                address = asArray(address)[0]

                return {
                    ...props,
                    remainderAddress: address,
                    transactions: addEntry(transactions, {
                        length: 1,
                        address,
                        value: Math.abs(value),
                        timestamp: timestamp || Math.floor(Date.now() / 1000)
                    })
                }
            })
    }
}

export const getRemainderAddressStartIndex = (inputs: Address[]): number =>
    [...inputs].sort((a, b) => a.keyIndex - b.keyIndex)[0].keyIndex

export const verifyNotSendingToInputs = (props: PrepareTransfersProps) => {
    const { transactions } = props
    const outputs = transactions.filter(transaction => transaction.value > 0)
    const inputs = asArray(transactions).filter(transaction => transaction.value < 0)

    if (outputs.some(output => inputs.indexOf(input => input.address === output.address) !== -1)) {
        throw new Error(errors.SENDING_BACK_TO_INPUTS)
    }

    return props
}

export const finalize = (props: PrepareTransfersProps) => ({
    ...props,
    transactions: finalizeBundle(props.transactions)
})

export const addSignatures = (props: PrepareTransfersProps) => {
    const { transactions, inputs, seed } = props
    const normalizedBundle = normalizedBundleHash(transactions[0].bundle)

    return {
        ...props,
        transactions: addTrytes(
            transactions,
            inputs.reduce((acc, { keyIndex, security }) => {
                const keyTrits = key(trits(seed), keyIndex, security)

                return acc.concat(
                    Array(security).fill(null).map((_, i) => trytes(
                        signatureFragment(
                            normalizedBundle.slice(i * HASH_LENGTH / 3, (i + 1) * HASH_LENGTH / 3),
                            keyTrits.slice(i * KEY_FRAGMENT_LENGTH, (i + 1) * KEY_FRAGMENT_LENGTH)
                        )
                    ))
                )
            }, []),
            transactions.findIndex(({ value }) => value < 0)
        )
    }
}

export const addHMAC = (props: PrepareTransfersProps) => {
    const { hmacKey, transactions } = props

    return hmacKey
        ? { ...props, transactions: HMAC(transactions, trits(hmacKey)) }
        : props
}

export const asTransactionTrytes = (props: PrepareTransfersProps) => ({
    ...props,
    trytes: asFinalTransactionTrytes(props.transactions)
})
