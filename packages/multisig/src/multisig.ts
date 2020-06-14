import { addEntry, addSignatureOrMessage, finalizeBundle } from '@iota/bundle'
import { removeChecksum } from '@iota/checksum'
import { tritsToTrytes, trytesToTrits, valueToTrits } from '@iota/converter'
import { Balances, createGetBalances } from '@iota/core'
import Kerl from '@iota/kerl'
import {
    digests,
    FRAGMENT_LENGTH,
    key,
    NORMALIZED_FRAGMENT_LENGTH,
    normalizedBundle,
    signatureFragment,
    subseed,
} from '@iota/signing'
import {
    address,
    bundle as bundleHash,
    SIGNATURE_OR_MESSAGE_LENGTH,
    SIGNATURE_OR_MESSAGE_OFFSET,
    signatureOrMessage,
    TRANSACTION_LENGTH,
} from '@iota/transaction'
import * as Promise from 'bluebird'
import * as errors from '../../errors'
import {
    arrayValidator,
    isHash,
    isNinesTrytes,
    isSecurityLevel,
    remainderAddressValidator,
    transferValidator,
    validate,
    Validator,
} from '../../guards'
import { Bundle, Callback, Provider, Transaction, Transfer } from '../../types'
import Address from './address'

export { Bundle, Callback, Provider, Transaction, Transfer }

export interface MultisigInput {
    readonly address: string
    readonly balance: number
    readonly securitySum: number
}

export const multisigInputValidator: Validator<MultisigInput> = (multisigInput: any) => [
    multisigInput,
    (input: MultisigInput) =>
        isSecurityLevel(input.securitySum) &&
        isHash(input.address) &&
        Number.isInteger(input.balance) &&
        input.balance > 0,
    errors.INVALID_INPUT,
]

export const sanitizeTransfers = (transfers: ReadonlyArray<Transfer>): ReadonlyArray<Transfer> =>
    transfers.map(transfer => ({
        ...transfer,
        message: transfer.message || '',
        tag: transfer.tag || '',
        address: removeChecksum(transfer.address),
    }))

/* tslint:disable:variable-name */
export const createBundle = (
    input: MultisigInput,
    transfers: ReadonlyArray<Transfer>,
    remainderAddress?: string
): Int8Array => {
    // Create a new bundle
    let bundle: Int8Array = transfers.reduce((acc, transfer) => {
        const message = trytesToTrits(transfer.message || '')
        const signatureOrMessageTrits = new Int8Array(
            (1 + Math.floor(message.length / SIGNATURE_OR_MESSAGE_LENGTH)) * SIGNATURE_OR_MESSAGE_LENGTH
        )

        signatureOrMessageTrits.set(message, SIGNATURE_OR_MESSAGE_OFFSET)

        return addEntry(acc, {
            signatureOrMessage: signatureOrMessageTrits,
            address: trytesToTrits(removeChecksum(transfer.address)),
            value: valueToTrits(transfer.value),
            obsoleteTag: trytesToTrits(transfer.tag || ''),
            issuanceTimestamp: valueToTrits(Math.floor(Date.now() / 1000)),
        })
    }, new Int8Array(0))

    const totalBalance = input.balance
    const totalValue = transfers.reduce((acc, transfer) => (acc += transfer.value), 0)
    const remainder = totalBalance - totalValue

    if (remainder < 0) {
        throw new Error('Not enough balance.')
    }

    if (totalBalance > 0) {
        // Add input as bundle entry
        // Only a single entry, signatures will be added later
        bundle = addEntry(bundle, {
            signatureOrMessage: new Int8Array(input.securitySum * SIGNATURE_OR_MESSAGE_LENGTH),
            address: trytesToTrits(input.address),
            value: valueToTrits(0 - totalBalance),
            issuanceTimestamp: valueToTrits(Math.floor(Date.now() / 1000)),
        })
    }

    // If there is a remainder value
    // Add extra output to send remaining funds to
    if (remainder > 0) {
        // Remainder bundle entry if necessary
        if (!remainderAddress) {
            throw new Error('No remainder address defined')
        }

        bundle = addEntry(bundle, {
            signatureOrMessage: new Int8Array(SIGNATURE_OR_MESSAGE_LENGTH),
            address: trytesToTrits(remainderAddress),
            value: valueToTrits(remainder),
            issuanceTimestamp: valueToTrits(Math.floor(Date.now() / 1000)),
        })
    }

    return finalizeBundle(bundle)
}

/**
 * @class Multisig
 *
 * @memberof module:multisig
 */
export default class Multisig {
    public address = Address

    private provider: Provider // tslint:disable-line variable-name

    constructor(provider: Provider) {
        this.provider = provider
    }

    /**
     * Gets the key value of a seed
     *
     * @member getKey
     *
     * @memberof Multisig
     *
     * @param {string} seed
     * @param {number} index
     * @param {number} security Security level to be used for the private key / address. Can be 1, 2 or 3
     *
     * @return {Int8Array} digest trytes
     */
    public getKey(seed: string, index: number, security: number) {
        return key(subseed(trytesToTrits(seed), index), security)
    }

    /**
     * Gets the digest value of a seed
     *
     * @member getDigest
     *
     * @memberof Multisig
     *
     * @param {string} seed
     * @param {number} index
     * @param {number} security Security level to be used for the private key / address. Can be 1, 2 or 3
     *
     * @return {string} digest trytes
     **/
    public getDigest(seed: string, index: number, security: number) {
        const keyTrits = key(subseed(trytesToTrits(seed), index), security)

        return tritsToTrytes(digests(keyTrits))
    }

    /**
     * Validates  a generated multisig address
     *
     * @member validateAddress
     *
     * @memberof Multisig
     *
     * @param {string} multisigAddress
     * @param {array} digests
     *
     * @return {boolean}
     */
    public validateAddress(multisigAddress: string, digestsArr: ReadonlyArray<string>) {
        const kerl = new Kerl()

        // initialize Kerl with the provided state
        kerl.initialize()

        // Absorb all key digests
        digestsArr.forEach(keyDigest => {
            const digestTrits = trytesToTrits(keyDigest)
            kerl.absorb(trytesToTrits(keyDigest), 0, digestTrits.length)
        })

        // Squeeze address trits
        const addressTrits: Int8Array = new Int8Array(Kerl.HASH_LENGTH)
        kerl.squeeze(addressTrits, 0, Kerl.HASH_LENGTH)

        // Convert trits into trytes and return the address
        return tritsToTrytes(addressTrits) === multisigAddress
    }

    /**
     * Prepares transfer by generating the bundle with the corresponding cosigner transactions
     * Does not contain signatures
     *
     * @member initiateTransfer
     *
     * @memberof Multisig
     *
     * @param {object} input the input addresses as well as the securitySum, and balance where:
     * - `address` is the input multisig address
     * - `securitySum` is the sum of security levels used by all co-signers
     * - `balance` is the expected balance, if you wish to override getBalances
     * @param {string} remainderAddress Has to be generated by the cosigners before initiating the transfer, can be null if fully spent
     * @param {object} transfers
     * @param {function} callback
     *
     * @return {Int8Array} Bundle trits
     */
    public initiateTransfer(
        input: MultisigInput,
        transfers: ReadonlyArray<Transfer>,
        remainderAddress?: string,
        callback?: Callback<Bundle>
    ): Promise<Bundle> {
        return Promise.resolve(
            validate(
                multisigInputValidator(input),
                arrayValidator<Transfer>(transferValidator)(transfers),
                !!remainderAddress && remainderAddressValidator(remainderAddress)
            )
        )
            .then(() => sanitizeTransfers(transfers))
            .then((sanitizedTransfers: ReadonlyArray<Transfer>) =>
                input.balance
                    ? createBundle(input, sanitizedTransfers, remainderAddress)
                    : (createGetBalances(this.provider) as any)([input.address])
                          .then(
                              (res: Balances): MultisigInput => ({
                                  ...input,
                                  balance: res.balances[0],
                              })
                          )
                          .then((inputWithBalance: MultisigInput) =>
                              createBundle(inputWithBalance, sanitizedTransfers, remainderAddress)
                          )
            )
            .asCallback(callback)
    }

    /**
     * Adds the cosigner signatures to the corresponding bundle transaction
     *
     * @member addSignature
     *
     * @memberof Multisig
     *
     * @param {Int8Array} bundle
     * @param {number} cosignerIndex
     * @param {string} inputAddress
     * @param {string} keyTrits
     * @param {function} callback
     *
     * @return {Int8Array} bundle with signature trits
     */
    public addSignature(bundle: Int8Array, inputAddress: string, keyTrits: Int8Array, callback: Callback) {
        const bundleHashTrits = bundleHash(bundle)
        const normalizedBundleHash = normalizedBundle(bundleHashTrits)
        let signatureIndex = 0

        for (const offset = 0; offset < bundle.length * TRANSACTION_LENGTH; offset + TRANSACTION_LENGTH) {
            if (tritsToTrytes(address(bundle)) === inputAddress && isNinesTrytes(signatureOrMessage(bundle))) {
                const signature = new Int8Array(keyTrits.length)

                for (let i = 0; i < keyTrits.length / FRAGMENT_LENGTH; i++) {
                    signature.set(
                        signatureFragment(
                            normalizedBundleHash.slice(
                                i * NORMALIZED_FRAGMENT_LENGTH,
                                (i + 1) * NORMALIZED_FRAGMENT_LENGTH
                            ),
                            keyTrits.slice(i * FRAGMENT_LENGTH, (i + 1) * FRAGMENT_LENGTH)
                        ),
                        i * FRAGMENT_LENGTH
                    )
                }

                const bundleTrits = addSignatureOrMessage(bundle, signature, signatureIndex)
                const bundleTrytes = []

                for (let jOffset = 0; jOffset < bundleTrits.length; jOffset += TRANSACTION_LENGTH) {
                    bundleTrytes.push(tritsToTrytes(bundleTrits.slice(jOffset, jOffset + TRANSACTION_LENGTH)))
                }

                return callback(null, bundleTrytes.slice())
            }

            signatureIndex += 1
        }

        return callback(new Error('Could not find signature index for address: ' + inputAddress))
    }
}

/**
 *   Multisig address constructor
 */
Multisig.prototype.address = Address
