import BigNumber from 'bignumber.js'
import { Tag, Transaction, Transfer, Trytes } from '../api/types'
import { Converter, Curl, Kerl, Signing } from '../crypto'
import * as errors from '../errors'
import ascii from './asciiToTrytes'
import extractJson from './extractJson'
import { isArrayOfTxObjects, isNinesTrytes, isTrytes } from './guards'

enum Unit {
    i = 'i',
    Ki = 'Ki',
    Mi = 'Mi',
    Gi = 'Gi',
    Ti = 'Ti',
    Pi = 'Pi',
}

export const asArray = (x: any) => (Array.isArray(x) ? x : [x])

export const pad9s = (length: number) => (trytes: Trytes) => {
    if (trytes.length > length) {
        return trytes
    }

    return trytes.concat('9').repeat(27 - trytes.length)
}

export const padTag = pad9s(27)
export const padTagArray = (tags: Tag[]) => tags.map(padTag)

/**
 *   Table of IOTA Units based off of the standard System of Units
 **/
export const unitMap = {
    i: { val: new BigNumber(10).pow(0), dp: 0 },
    Ki: { val: new BigNumber(10).pow(3), dp: 3 },
    Mi: { val: new BigNumber(10).pow(6), dp: 6 },
    Gi: { val: new BigNumber(10).pow(9), dp: 9 },
    Ti: { val: new BigNumber(10).pow(12), dp: 12 },
    Pi: { val: new BigNumber(10).pow(15), dp: 15 }, // For the very, very rich
}

/**
 *   converts IOTA units
 *
 *   @method convertUnits
 *   @param {string || int || float} value
 *   @param {string} fromUnit
 *   @param {string} toUnit
 *   @returns {integer} converted
 **/
export function convertUnits(value: string | number, fromUnit: Unit, toUnit: Unit) {
    // Check if wrong unit provided
    if (unitMap[fromUnit] === undefined || unitMap[toUnit] === undefined) {
        throw new Error('Invalid unit provided')
    }

    const valueBn = new BigNumber(value)

    if (valueBn.dp() > unitMap[fromUnit].dp) {
        throw new Error('Input value exceeded max fromUnit precision.')
    }

    const valueRaw = valueBn.times(unitMap[fromUnit].val)
    const valueScaled = valueRaw.dividedBy(unitMap[toUnit].val)

    return valueScaled.toNumber()
}

/**
*   Generates the 9-tryte checksum of an address
*
*   @method addChecksum
*   @param {string | list} inputValue
*   @param {int} checksumLength
@   @param {bool} isAddress default is true
*   @returns {string | list} address (with checksum)
**/
export function addChecksum(inputValue: string, checksumLength?: number, isAddress?: boolean): string
export function addChecksum(inputValue: string[], checksumLength?: number, isAddress?: boolean): string[]
export function addChecksum(inputValue: string | string[], checksumLength: number = 9, isAddress: boolean = true) {
    // the length of the trytes to be validated
    const validationLength = isAddress ? 81 : 0

    // If only single address, turn it into an array
    if (typeof inputValue === 'string') {
        inputValue = [inputValue]
    }

    const inputsWithChecksum: string[] = []

    inputValue.forEach(thisValue => {
        // check if correct trytes
        if (!isTrytes(thisValue, validationLength)) {
            throw new Error('Invalid input')
        }

        const kerl = new Kerl()
        kerl.initialize()

        // Address trits
        const addressTrits = Converter.trits(thisValue)

        // Checksum trits
        const checksumTrits: Int8Array = new Int8Array(Curl.HASH_LENGTH)

        // Absorb address trits
        kerl.absorb(addressTrits, 0, addressTrits.length)

        // Squeeze checksum trits
        kerl.squeeze(checksumTrits, 0, Curl.HASH_LENGTH)

        // First 9 trytes as checksum
        const checksum = Converter.trytes(checksumTrits).substring(81 - checksumLength, 81)
        inputsWithChecksum.push(thisValue + checksum)
    })

    if (typeof inputValue === 'string') {
        return inputsWithChecksum[0]
    } else {
        return inputsWithChecksum
    }
}

/**
 *   Removes the 9-tryte checksum of an address
 *
 *   @method noChecksum
 *   @param {string | list} address
 *   @returns {string | list} address (without checksum)
 **/
export function removeChecksum(address: string): string
export function removeChecksum(address: string[]): string[]
export function removeChecksum(address: string | string[]) {
    if (typeof address === 'string' && address.length === 81) {
        return address
    }

    const addresses = asArray(address)
    const addressesNoChecksum = addresses.map(addr => addr.slice(0, 81))

    // return either string or the list
    if (typeof address === 'string') {
        return addressesNoChecksum[0]
    } else {
        return addressesNoChecksum
    }
}

/**
 *   Validates the checksum of an address
 *
 *   @method isValidChecksum
 *   @param {string} addressWithChecksum
 *   @returns {bool}
 **/
export const isValidChecksum = (addressWithChecksum: string): boolean =>
    addressWithChecksum === addChecksum(removeChecksum(addressWithChecksum))

/**
 *   Converts transaction trytes of 2673 trytes into a transaction object
 *
 *   @method transactionObject
 *   @param {string} trytes
 *   @returns {String} transactionObject
 **/
export function transactionObject(trytes: string): Transaction {
    if (!trytes) {
        throw new Error(errors.INVALID_TRYTES)
    }

    // validity check
    for (let i = 2279; i < 2295; i++) {
        if (trytes.charAt(i) !== '9') {
            throw new Error(errors.INVALID_TRYTES)
        }
    }

    const transactionTrits = Converter.trits(trytes)
    const hash: Int8Array = new Int8Array(Curl.HASH_LENGTH)

    const curl = new Curl()

    // generate the correct transaction hash
    curl.initialize()
    curl.absorb(transactionTrits, 0, transactionTrits.length)
    curl.squeeze(hash, 0, 243)

    return {
        hash: Converter.trytes(hash),
        signatureMessageFragment: trytes.slice(0, 2187),
        address: trytes.slice(2187, 2268),
        value: Converter.value(transactionTrits.slice(6804, 6837)),
        obsoleteTag: trytes.slice(2295, 2322),
        timestamp: Converter.value(transactionTrits.slice(6966, 6993)),
        currentIndex: Converter.value(transactionTrits.slice(6993, 7020)),
        lastIndex: Converter.value(transactionTrits.slice(7020, 7047)),
        bundle: trytes.slice(2349, 2430),
        trunkTransaction: trytes.slice(2430, 2511),
        branchTransaction: trytes.slice(2511, 2592),
        tag: trytes.slice(2592, 2619),
        attachmentTimestamp: Converter.value(transactionTrits.slice(7857, 7884)),
        attachmentTimestampLowerBound: Converter.value(transactionTrits.slice(7884, 7911)),
        attachmentTimestampUpperBound: Converter.value(transactionTrits.slice(7911, 7938)),
        nonce: trytes.slice(2646, 2673),
    }
}

/**
 *   Converts a transaction object into trytes
 *
 *   @method transactionTrytes
 *   @param {object} transactionTrytes
 *   @returns {String} trytes
 **/
export function transactionTrytes(transaction: Transaction): string {
    const valueTrits = Converter.trits(transaction.value)
    while (valueTrits.length < 81) {
        valueTrits[valueTrits.length] = 0
    }

    const timestampTrits = Converter.trits(transaction.timestamp)
    while (timestampTrits.length < 27) {
        timestampTrits[timestampTrits.length] = 0
    }

    const currentIndexTrits = Converter.trits(transaction.currentIndex)
    while (currentIndexTrits.length < 27) {
        currentIndexTrits[currentIndexTrits.length] = 0
    }

    const lastIndexTrits = Converter.trits(transaction.lastIndex)
    while (lastIndexTrits.length < 27) {
        lastIndexTrits[lastIndexTrits.length] = 0
    }

    const attachmentTimestampTrits = Converter.trits(transaction.attachmentTimestamp || 0)
    while (attachmentTimestampTrits.length < 27) {
        attachmentTimestampTrits[attachmentTimestampTrits.length] = 0
    }

    const attachmentTimestampLowerBoundTrits = Converter.trits(transaction.attachmentTimestampLowerBound || 0)
    while (attachmentTimestampLowerBoundTrits.length < 27) {
        attachmentTimestampLowerBoundTrits[attachmentTimestampLowerBoundTrits.length] = 0
    }

    const attachmentTimestampUpperBoundTrits = Converter.trits(transaction.attachmentTimestampUpperBound || 0)
    while (attachmentTimestampUpperBoundTrits.length < 27) {
        attachmentTimestampUpperBoundTrits[attachmentTimestampUpperBoundTrits.length] = 0
    }

    transaction.tag = transaction.tag || transaction.obsoleteTag

    return (
        transaction.signatureMessageFragment +
        transaction.address +
        Converter.trytes(valueTrits) +
        transaction.obsoleteTag +
        Converter.trytes(timestampTrits) +
        Converter.trytes(currentIndexTrits) +
        Converter.trytes(lastIndexTrits) +
        transaction.bundle +
        transaction.trunkTransaction +
        transaction.branchTransaction +
        transaction.tag +
        Converter.trytes(attachmentTimestampTrits) +
        Converter.trytes(attachmentTimestampLowerBoundTrits) +
        Converter.trytes(attachmentTimestampUpperBoundTrits) +
        transaction.nonce
    )
}

/**
 *   Categorizes a list of transfers between sent and received
 *
 *   @method categorizeTransfers
 *   @param {object} transfers Transfers (bundles)
 *   @param {list} addresses List of addresses that belong to the user
 *   @returns {String} trytes
 **/
export function categorizeTransfers(transfers: Transaction[][], addresses: string[]) {
    const categorized: {
        sent: Transaction[][]
        received: Transaction[][]
    } = {
        sent: [],
        received: [],
    }

    // Iterate over all bundles and sort them between incoming and outgoing transfers
    transfers.forEach(bundle => {
        let spentAlreadyAdded = false

        // Iterate over every bundle entry
        bundle.forEach((bundleEntry, bundleIndex) => {
            // If bundle address in the list of addresses associated with the seed
            // add the bundle to the
            if (addresses.indexOf(bundleEntry.address) > -1) {
                // Check if it's a remainder address
                const isRemainder = bundleEntry.currentIndex === bundleEntry.lastIndex && bundleEntry.lastIndex !== 0

                // check if sent transaction
                if (bundleEntry.value < 0 && !spentAlreadyAdded && !isRemainder) {
                    categorized.sent.push(bundle)

                    // too make sure we do not add transactions twice
                    spentAlreadyAdded = true
                } else if (bundleEntry.value >= 0 && !spentAlreadyAdded && !isRemainder) {
                    // check if received transaction, or 0 value (message)
                    // also make sure that this is not a 2nd tx for spent inputs
                    categorized.received.push(bundle)
                }
            }
        })
    })

    return categorized
}

/**
 *   Validates the signatures
 *
 *   @method validateSignatures
 *   @param {array} signedBundle
 *   @param {string} inputAddress
 *   @returns {bool}
 **/
export function validateSignatures(signedBundle: Transaction[], inputAddress: string) {
    let bundleHash
    const signatureFragments: string[] = []

    for (let i = 0; i < signedBundle.length; i++) {
        if (signedBundle[i].address === inputAddress) {
            bundleHash = signedBundle[i].bundle

            // if we reached remainder bundle
            if (isNinesTrytes(signedBundle[i].signatureMessageFragment)) {
                break
            }

            signatureFragments.push(signedBundle[i].signatureMessageFragment)
        }
    }

    if (!bundleHash) {
        return false
    }

    return Signing.validateSignatures(inputAddress, signatureFragments, bundleHash)
}

/**
 *   Checks is a Bundle is valid. Validates signatures and overall structure. Has to be tail tx first.
 *
 *   @method isValidBundle
 *   @param {array} bundle
 *   @returns {bool} valid
 **/
export function isBundle(bundle: Transaction[]) {
    // If not correct bundle
    if (!isArrayOfTxObjects(bundle)) {
        return false
    }

    let totalSum = 0
    const bundleHash = bundle[0].bundle

    // Prepare to absorb txs and get bundleHash
    const bundleFromTxs: Int8Array = new Int8Array(Curl.HASH_LENGTH)

    const kerl = new Kerl()
    kerl.initialize()

    // Prepare for signature validation
    const signaturesToValidate: Array<{
        address: string
        signatureFragments: string[]
    }> = []

    bundle.forEach((bundleTx, index) => {
        totalSum += bundleTx.value

        // currentIndex has to be equal to the index in the array
        if (bundleTx.currentIndex !== index) {
            return false
        }

        // Get the transaction trytes
        const thisTxTrytes = transactionTrytes(bundleTx)

        // Absorb bundle hash + value + timestamp + lastIndex + currentIndex trytes.
        const thisTxTrits = Converter.trits(thisTxTrytes.slice(2187, 2187 + 162))
        kerl.absorb(thisTxTrits, 0, thisTxTrits.length)

        // Check if input transaction
        if (bundleTx.value < 0) {
            const thisAddress = bundleTx.address

            const newSignatureToValidate = {
                address: thisAddress,
                signatureFragments: Array(bundleTx.signatureMessageFragment),
            }

            // Find the subsequent txs with the remaining signature fragment
            for (let i = index; i < bundle.length - 1; i++) {
                const newBundleTx = bundle[i + 1]

                // Check if new tx is part of the signature fragment
                if (newBundleTx.address === thisAddress && newBundleTx.value === 0) {
                    newSignatureToValidate.signatureFragments.push(newBundleTx.signatureMessageFragment)
                }
            }

            signaturesToValidate.push(newSignatureToValidate)
        }
    })

    // Check for total sum, if not equal 0 return error
    if (totalSum !== 0) {
        return false
    }

    // get the bundle hash from the bundle transactions
    kerl.squeeze(bundleFromTxs, 0, Curl.HASH_LENGTH)

    const bundleHashFromTxs = Converter.trytes(bundleFromTxs)

    // Check if bundle hash is the same as returned by tx object
    if (bundleHashFromTxs !== bundleHash) {
        return false
    }

    // Last tx in the bundle should have currentIndex === lastIndex
    if (bundle[bundle.length - 1].currentIndex !== bundle[bundle.length - 1].lastIndex) {
        return false
    }

    // Validate the signatures
    for (let i = 0; i < signaturesToValidate.length; i++) {
        const isValidSignature = Signing.validateSignatures(
            signaturesToValidate[i].address,
            signaturesToValidate[i].signatureFragments,
            bundleHash
        )

        if (!isValidSignature) {
            return false
        }
    }

    return true
}
