import { addEntry, addSignatureOrMessage, finalizeBundle, valueSum } from '@iota/bundle'
import { removeChecksum } from '@iota/checksum'
import { tritsToTrytes, tritsToValue, trytesToTrits, valueToTrits } from '@iota/converter'
import { signatureFragments } from '@iota/signing'
import {
    address,
    bundle,
    SIGNATURE_OR_MESSAGE_LENGTH,
    SIGNATURE_OR_MESSAGE_OFFSET,
    TRANSACTION_LENGTH,
    value,
} from '@iota/transaction'
import * as Promise from 'bluebird'
import * as errors from '../../errors'
import {
    arrayValidator,
    inputValidator,
    isTrytes,
    remainderAddressValidator,
    securityLevelValidator,
    transferValidator,
    validate,
} from '../../guards'
import {
    Address,
    asArray,
    Callback,
    getOptionsWithDefaults,
    NativeGenerateSignatureFunction,
    Provider,
    Transaction, // tslint:disable-line no-unused-variable
    Transfer,
    Trytes,
} from '../../types'
import { asyncPipe } from '../../utils'
import { createGetInputs, createGetNewAddress } from './'
import HMAC from './hmac'

const HASH_LENGTH = 81
const NULL_HASH_TRYTES = '9'.repeat(HASH_LENGTH)
const SECURITY_LEVEL = 2

export interface PrepareTransfersOptions {
    readonly inputs: ReadonlyArray<Address>
    readonly address?: Trytes // Deprecate
    readonly remainderAddress?: Trytes
    readonly security: number
    readonly hmacKey?: Trytes
    readonly nativeGenerateSignatureFunction?: NativeGenerateSignatureFunction
}

const defaults: PrepareTransfersOptions = {
    inputs: [],
    address: undefined,
    remainderAddress: undefined,
    security: 2,
    hmacKey: undefined,
}

const isTritArray = (tritArray: any, length?: number): boolean =>
    (tritArray instanceof Array || tritArray instanceof Int8Array) &&
    typeof tritArray.every === 'function' &&
    (tritArray as number[]).every(trit => [-1, 0, 1].indexOf(trit) > -1) &&
    (typeof length === 'number' ? tritArray.length === length : true)

export const getPrepareTransfersOptions = (options: Partial<PrepareTransfersOptions>) => ({
    ...getOptionsWithDefaults(defaults)(options),
    remainderAddress: options.address || options.remainderAddress || undefined,
})

export interface PrepareTransfersProps {
    readonly transactions: Int8Array
    readonly trytes: ReadonlyArray<Trytes>
    readonly transfers: ReadonlyArray<Transfer>
    readonly seed: Int8Array
    readonly security: number
    readonly inputs: ReadonlyArray<Address>
    readonly timestamp: number
    readonly remainderAddress?: Trytes
    readonly address?: Trytes
    readonly hmacKey?: Trytes
    readonly nativeGenerateSignatureFunction?: NativeGenerateSignatureFunction
}

/**
 * Create a [`prepareTransfers`]{@link #module_core.prepareTransfers} function by passing an optional network `provider`.
 * It is possible to prepare and sign transactions offline, by omitting the provider option.
 *
 * @method createPrepareTransfers
 *
 * @memberof module:core
 *
 * @param {Provider} [provider] - Optional network provider to fetch inputs and remainder address.
 * In case this is omitted, proper input objects and remainder should be passed
 * to [`prepareTransfers`]{@link #module_core.prepareTransfers}, if required.
 *
 * @return {Function} {@link #module_core.prepareTransfers `prepareTransfers`}
 */
export const createPrepareTransfers = (provider?: Provider, now: () => number = () => Date.now(), caller?: string) => {
    const addInputs = createAddInputs(provider)
    const addRemainder = createAddRemainder(provider)

    /**
     * Prepares the transaction trytes by generating a bundle, filling in transfers and inputs,
     * adding remainder and signing. It can be used to generate and sign bundles either online or offline.
     * For offline usage, please see [`createPrepareTransfers`]{@link #module_core.createPrepareTransfers}
     * which can create a `prepareTransfers` function without a network provider.
     *
     * **Note:** After calling this method, persist the returned transaction trytes in local storage. Only then you should broadcast to network.
     * This will allow for reattachments and prevent key reuse if trytes can't be recovered by querying the network after broadcasting.
     *
     * @method prepareTransfers
     *
     * @memberof module:core
     *
     * @param {string} seed
     *
     * @param {object} transfers
     *
     * @param {object} [options]
     * @param {Input[]} [options.inputs] Inputs used for signing. Needs to have correct security, keyIndex and address value
     * @param {Hash} [options.inputs[].address] Input address trytes
     * @param {number} [options.inputs[].keyIndex] Key index at which address was generated
     * @param {number} [options.inputs[].security] Security level
     * @param {number} [options.inputs[].balance] Balance in iotas
     * @param {Hash} [options.address] Remainder address
     * @param {Number} [options.security = 2] Security level to be used for getting inputs and remainder address
     * @property {Hash} [options.hmacKey] HMAC key used for attaching an HMAC
     *
     * @param {function} [callback] Optional callback
     *
     * @return {Promise}
     * @fulfil {array} Returns bundle trytes
     * @reject {Error}
     * - `INVALID_SEED`
     * - `INVALID_TRANSFER_ARRAY`
     * - `INVALID_INPUT`
     * - `INVALID_REMAINDER_ADDRESS`
     * - `INSUFFICIENT_BALANCE`
     * - `NO_INPUTS`
     * - `SENDING_BACK_TO_INPUTS`
     * - Fetch error, if connected to network
     */
    return function prepareTransfers(
        seed: Int8Array | Trytes,
        transfers: ReadonlyArray<Transfer>,
        options: Partial<PrepareTransfersOptions> = {},
        callback?: Callback<ReadonlyArray<Trytes>>
    ): Promise<ReadonlyArray<Trytes>> {
        if (caller !== 'lib') {
            if (options.address) {
                /* tslint:disable-next-line:no-console */
                console.warn(
                    '`options.address` is deprecated and will be removed in v2.0.0. Use `options.remainderAddress` instead.'
                )
            }

            if (
                typeof seed === 'string' ? isTrytes(seed) && seed.length < 81 : isTritArray(seed) && seed.length < 243
            ) {
                /* tslint:disable-next-line:no-console */
                console.warn(
                    'WARNING: Seeds with less length than 81 trytes are not secure! Use a random, 81-trytes long seed!'
                )
            }
        }

        if (!isTrytes(seed as Trytes) && !isTritArray(seed)) {
            throw new Error(errors.INVALID_SEED)
        }

        const props = Promise.resolve(
            validatePrepareTransfers({
                transactions: new Int8Array(0),
                trytes: [],
                seed: typeof seed === 'string' ? trytesToTrits(seed) : new Int8Array(seed),
                transfers,
                timestamp: Math.floor((typeof now === 'function' ? now() : Date.now()) / 1000),
                ...getPrepareTransfersOptions(options),
            })
        )

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
            .then(res => res.trytes)
            .asCallback(callback)
    }
}

export const validatePrepareTransfers = (props: PrepareTransfersProps) => {
    const { transfers, inputs, security } = props
    const remainderAddress = props.address || props.remainderAddress

    validate(
        securityLevelValidator(security),
        arrayValidator(transferValidator)(transfers),
        !!remainderAddress && remainderAddressValidator(remainderAddress),
        inputs.length > 0 && arrayValidator(inputValidator)(inputs)
    )

    return props
}

export const addHMACPlaceholder = (props: PrepareTransfersProps): PrepareTransfersProps => {
    const { hmacKey, transfers } = props

    return hmacKey
        ? {
              ...props,
              transfers: transfers.map((transfer, i) =>
                  transfer.value > 0
                      ? {
                            ...transfer,
                            message: NULL_HASH_TRYTES + (transfer.message || ''),
                        }
                      : transfer
              ),
          }
        : props
}

export const addTransfers = (props: PrepareTransfersProps): PrepareTransfersProps => {
    const { transactions, transfers, timestamp } = props

    return {
        ...props,
        transactions: transfers.reduce((acc, transfer) => {
            const messageTrits = trytesToTrits(transfer.message || '')
            const signatureOrMessage = new Int8Array(
                (1 + Math.floor(messageTrits.length / SIGNATURE_OR_MESSAGE_LENGTH)) * SIGNATURE_OR_MESSAGE_LENGTH
            )
            signatureOrMessage.set(messageTrits, SIGNATURE_OR_MESSAGE_OFFSET)

            return addEntry(acc, {
                signatureOrMessage,
                address: trytesToTrits(removeChecksum(transfer.address)),
                value: valueToTrits(transfer.value),
                obsoleteTag: trytesToTrits(transfer.tag || ''),
                issuanceTimestamp: valueToTrits(timestamp),
                tag: trytesToTrits(transfer.tag || ''),
            })
        }, transactions),
    }
}

export const createAddInputs = (provider?: Provider) => {
    const getInputs = provider ? createGetInputs(provider) : undefined

    return (props: PrepareTransfersProps): Promise<PrepareTransfersProps> => {
        const { transactions, transfers, inputs, timestamp, seed, security } = props
        const threshold = transfers.reduce((sum, transfer) => (sum += transfer.value), 0)

        if (threshold === 0) {
            return Promise.resolve(props)
        }

        if (inputs.length && threshold > inputs.reduce((acc, input) => (acc += input.balance), 0)) {
            throw new Error(inputs.length ? errors.INSUFFICIENT_BALANCE : errors.NO_INPUTS)
        }

        return (!getInputs || inputs.length
            ? Promise.resolve(inputs)
            : getInputs(tritsToTrytes(seed), { security, threshold }).then(response => response.inputs)
        ).then(res => ({
            ...props,
            inputs: res,
            transactions: res.reduce(
                (acc, input) =>
                    addEntry(acc, {
                        signatureOrMessage: new Int8Array(input.security * SIGNATURE_OR_MESSAGE_LENGTH),
                        address: trytesToTrits(removeChecksum(input.address)),
                        value: valueToTrits(-input.balance),
                        issuanceTimestamp: valueToTrits(timestamp),
                    }),
                transactions
            ),
        }))
    }
}

export const createAddRemainder = (provider?: Provider) => {
    const getNewAddress = provider ? createGetNewAddress(provider, 'lib') : undefined

    return (props: PrepareTransfersProps): PrepareTransfersProps | Promise<PrepareTransfersProps> => {
        const { transactions, remainderAddress, seed, security, inputs, timestamp } = props

        // Values of transactions in the bundle should sum up to 0.
        const sum = valueSum(transactions, 0, transactions.length)

        // Value > 0 indicates insufficient balance in inputs.
        if (sum > 0) {
            throw new Error(errors.INSUFFICIENT_BALANCE)
        }

        // If value is already zero no remainder is required
        if (sum === 0) {
            return props
        }

        if (!provider && !remainderAddress) {
            throw new Error(errors.INVALID_REMAINDER_ADDRESS)
        }

        return (remainderAddress
            ? Promise.resolve(remainderAddress)
            : getNewAddress!(tritsToTrytes(seed), {
                  index: getRemainderAddressStartIndex(inputs),
                  security,
              })
        ).then(addresses => {
            const addressTrytes = asArray(addresses)[0]

            return {
                ...props,
                remainderAddress: addressTrytes,
                transactions: addEntry(transactions, {
                    signatureOrMessage: new Int8Array(SIGNATURE_OR_MESSAGE_LENGTH),
                    address: trytesToTrits(addressTrytes as Trytes),
                    value: valueToTrits(Math.abs(sum)),
                    issuanceTimestamp: valueToTrits(timestamp),
                }),
            }
        })
    }
}

export const getRemainderAddressStartIndex = (inputs: ReadonlyArray<Address>): number =>
    [...inputs].sort((a, b) => b.keyIndex - a.keyIndex)[0].keyIndex + 1

export const verifyNotSendingToInputs = (props: PrepareTransfersProps): PrepareTransfersProps => {
    const { transactions } = props

    for (let offset = 0; offset < transactions.length; offset += TRANSACTION_LENGTH) {
        if (tritsToValue(value(transactions, offset)) < 0) {
            for (let jOffset = 0; jOffset < transactions.length; jOffset += TRANSACTION_LENGTH) {
                if (jOffset !== offset) {
                    if (
                        tritsToValue(value(transactions, jOffset)) > 0 &&
                        tritsToTrytes(address(transactions, jOffset)) === tritsToTrytes(address(transactions, offset))
                    ) {
                        throw new Error(errors.SENDING_BACK_TO_INPUTS)
                    }
                }
            }
        }
    }

    return props
}

export const finalize = (props: PrepareTransfersProps): PrepareTransfersProps => ({
    ...props,
    transactions: finalizeBundle(props.transactions),
})

export const addSignatures = (props: PrepareTransfersProps): Promise<PrepareTransfersProps> => {
    const { transactions, inputs, seed, nativeGenerateSignatureFunction } = props
    let signatureIndex: number

    for (let i = 0; i < transactions.length / TRANSACTION_LENGTH; i++) {
        if (tritsToValue(value(transactions, i * TRANSACTION_LENGTH)) < 0) {
            signatureIndex = i
            break
        }
    }

    return Promise.all(
        inputs.map(({ keyIndex, security }) =>
            signatureFragments(
                seed,
                keyIndex,
                security || SECURITY_LEVEL,
                bundle(transactions),
                nativeGenerateSignatureFunction
            )
        )
    ).then(signatures => ({
        ...props,
        transactions: signatures.reduce((acc, signature) => {
            const transactionsCopy = addSignatureOrMessage(acc, signature, signatureIndex)
            signatureIndex += signature.length / SIGNATURE_OR_MESSAGE_LENGTH
            return transactionsCopy
        }, transactions),
    }))
}

export const addHMAC = (props: PrepareTransfersProps): PrepareTransfersProps => {
    const { hmacKey, transactions } = props

    return hmacKey ? { ...props, transactions: HMAC(transactions, trytesToTrits(hmacKey)) } : props
}

export const asTransactionTrytes = (props: PrepareTransfersProps): PrepareTransfersProps => {
    const { transactions } = props
    const trytes: Trytes[] = []

    for (let offset = 0; offset < transactions.length; offset += TRANSACTION_LENGTH) {
        trytes.push(tritsToTrytes(transactions.subarray(offset, offset + TRANSACTION_LENGTH)))
    }

    return {
        ...props,
        trytes: trytes.reverse().slice(),
    }
}
