import { addEntry, addTrytes, finalizeBundle } from '@iota/bundle'
import { removeChecksum } from '@iota/checksum'
import { trits, trytes } from '@iota/converter'
import { Balances, createGetBalances } from '@iota/core'
import Kerl from '@iota/kerl'
import { digests, key, normalizedBundleHash, signatureFragment, subseed } from '@iota/signing'
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

export interface MultisigInput {
    readonly address: string
    readonly balance: number
    readonly securitySum: number
}

export const multisigInputValidator: Validator<MultisigInput> = (multisigInput: any) => [
    multisigInput,
    ({ address, balance, securitySum }: MultisigInput) =>
        isSecurityLevel(securitySum) && isHash(address) && Number.isInteger(balance) && balance > 0,
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
): Bundle => {
    // Create a new bundle
    let bundle: Transaction[] = []

    const signatureFragments: string[] = []
    const totalBalance: number = input.balance
    let totalValue = 0
    let tag: string = '9'.repeat(27)

    //  Iterate over all transfers, get totalValue
    //  and prepare the signatureFragments, message and tag
    for (let i = 0; i < transfers.length; i++) {
        let signatureMessageLength = 1

        // If message longer than 2187 trytes, increase signatureMessageLength (add multiple transactions)
        if ((transfers[i].message || '').length > 2187) {
            // Get total length, message / maxLength (2187 trytes)
            signatureMessageLength += Math.floor((transfers[i].message || '').length / 2187)

            let msgCopy = transfers[i].message

            // While there is still a message, copy it
            while (msgCopy) {
                let fragment = msgCopy.slice(0, 2187)
                msgCopy = msgCopy.slice(2187, msgCopy.length)

                // Pad remainder of fragment
                for (let j = 0; fragment.length < 2187; j++) {
                    fragment += '9'
                }

                signatureFragments.push(fragment)
            }
        } else {
            // Else, get single fragment with 2187 of 9's trytes
            let fragment = ''

            if (transfers[i].message) {
                fragment = (transfers[i].message || '').slice(0, 2187)
            }

            for (let j = 0; fragment.length < 2187; j++) {
                fragment += '9'
            }

            signatureFragments.push(fragment)
        }

        // If no tag defined, get 27 tryte tag.
        tag = transfers[i].tag || '9'.repeat(27)

        // Pad for required 27 tryte length
        for (let j = 0; tag.length < 27; j++) {
            tag += '9'
        }

        // Add first entries to the bundle
        // Slice the address in case the user provided a checksummed one
        const _bundle = addEntry(bundle, {
            length: signatureMessageLength,
            address: transfers[i].address.slice(0, 81),
            value: transfers[i].value,
            tag,
            timestamp: Math.floor(Date.now() / 1000),
        })

        bundle = _bundle.slice()

        // Sum up total value
        totalValue += transfers[i].value
    }

    if (totalBalance > 0) {
        const toSubtract = 0 - totalBalance

        // Add input as bundle entry
        // Only a single entry, signatures will be added later
        const _bundle = addEntry(bundle, {
            length: input.securitySum,
            address: input.address,
            value: toSubtract,
            tag,
            timestamp: Math.floor(Date.now() / 1000),
        })

        bundle = _bundle.slice()
    }

    if (totalValue > totalBalance) {
        throw new Error('Not enough balance.')
    }

    // If there is a remainder value
    // Add extra output to send remaining funds to
    if (totalBalance > totalValue) {
        const remainder = totalBalance - totalValue

        // Remainder bundle entry if necessary
        if (!remainderAddress) {
            throw new Error('No remainder address defined')
        }

        const _bundle = addEntry(bundle, {
            length: 1,
            address: remainderAddress,
            value: remainder,
            tag,
            timestamp: Math.floor(Date.now() / 1000),
        })
        bundle = _bundle.slice()
    }

    return addTrytes(finalizeBundle(bundle), signatureFragments, bundle.findIndex(tx => tx.value < 0))
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
     * @return {string} digest trytes
     */
    public getKey(seed: string, index: number, security: number) {
        return trytes(key(subseed(trits(seed), index), security))
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
        const keyTrits = key(subseed(trits(seed), index), security)

        return trytes(digests(keyTrits))
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
            const digestTrits = trits(keyDigest)
            kerl.absorb(trits(keyDigest), 0, digestTrits.length)
        })

        // Squeeze address trits
        const addressTrits: Int8Array = new Int8Array(Kerl.HASH_LENGTH)
        kerl.squeeze(addressTrits, 0, Kerl.HASH_LENGTH)

        // Convert trits into trytes and return the address
        return trytes(addressTrits) === multisigAddress
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
     * @return {array} Array of transaction objects
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
            .then((sanitizedTransfers: ReadonlyArray<Transfer>) => {
                if (input.balance) {
                    return createBundle(input, sanitizedTransfers, remainderAddress)
                } else {
                    return createGetBalances(this.provider)([input.address], 100)
                        .then((res: Balances): MultisigInput => ({
                            ...input,
                            balance: res.balances[0],
                        }))
                        .then((inputWithBalance: MultisigInput) =>
                            createBundle(inputWithBalance, sanitizedTransfers, remainderAddress)
                        )
                }
            })
            .asCallback(callback)
    }

    /**
     * Adds the cosigner signatures to the corresponding bundle transaction
     *
     * @member addSignature
     *
     * @memberof Multisig
     *
     * @param {array} bundleToSign
     * @param {number} cosignerIndex
     * @param {string} inputAddress
     * @param {string} key
     * @param {function} callback
     *
     * @return {array} trytes Returns bundle trytes
     */
    public addSignature(bundleToSign: Bundle, inputAddress: string, keyTrytes: string, callback: Callback) {
        const bundle = bundleToSign
        const _bundle: Array<Partial<Transaction>> = []

        // Get the security used for the private key
        // 1 security level = 2187 trytes
        const security = keyTrytes.length / 2187

        // convert private key trytes into trits
        const keyTrits = trits(keyTrytes)

        // First get the total number of already signed transactions
        // use that for the bundle hash calculation as well as knowing
        // where to add the signature
        let numSignedTxs = 0

        for (let i = 0; i < bundle.length; i++) {
            if (bundle[i].address === inputAddress) {
                // If transaction is already signed, increase counter
                if (!isNinesTrytes(bundle[i].signatureMessageFragment as string)) {
                    numSignedTxs++
                } else {
                    // Else sign the transactionse
                    const bundleHash = bundle[i].bundle

                    //  First 6561 trits for the firstFragment
                    const firstFragment = keyTrits.slice(0, 6561)

                    //  Get the normalized bundle hash
                    const normalizedBundle = normalizedBundleHash(bundleHash as string)
                    const normalizedBundleFragments = []

                    // Split hash into 3 fragments
                    for (let k = 0; k < 3; k++) {
                        normalizedBundleFragments[k] = normalizedBundle.slice(k * 27, (k + 1) * 27)
                    }

                    //  First bundle fragment uses 27 trytes
                    const firstBundleFragment = normalizedBundleFragments[numSignedTxs % 3]

                    //  Calculate the new signatureFragment with the first bundle fragment
                    const firstSignedFragment = signatureFragment(firstBundleFragment, firstFragment)

                    //  Convert signature to trytes and assign the new signatureFragment
                    _bundle.push({ signatureMessageFragment: trytes(firstSignedFragment) })

                    for (let j = 1; j < security; j++) {
                        //  Next 6561 trits for the firstFragment
                        const nextFragment = keyTrits.slice(6561 * j, (j + 1) * 6561)

                        //  Use the next 27 trytes
                        const nextBundleFragment = normalizedBundleFragments[(numSignedTxs + j) % 3]

                        //  Calculate the new signatureFragment with the first bundle fragment
                        const nextSignedFragment = signatureFragment(nextBundleFragment, nextFragment)

                        //  Convert signature to trytes and add new bundle entry at i + j position
                        // Assign the signature fragment
                        _bundle.push({ signatureMessageFragment: trytes(nextSignedFragment) })
                    }

                    break
                }
            }
        }

        return callback(null, _bundle.slice())
    }
}

/**
 *   Multisig address constructor
 */
Multisig.prototype.address = Address
