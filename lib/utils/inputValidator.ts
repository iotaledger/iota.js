import {
    Address,
    Addresses,
    Transaction,
    Transfer
} from '../api/types'

export const isArray = Array.isArray // Deprecate

export const isValue = Number.isInteger // Deprecate

/* Checks if input is correct address */
export const isAddress = (
  address: string
): boolean => isHash(address) // Deprecate

/**
 * Checks if input is correct trytes consisting of A-Z9
 * optionally validate length
 */
export const isTrytes = (trytes: string, length: number = 0): boolean =>
    typeof trytes === 'string' && new RegExp(`^[9A-Z]{${length}}$`).test(trytes)

/**
 * Checks if input is correct trytes consisting of A-Z9
 * optionally validate length
 */
export const isNinesTrytes = (trytes: string): boolean => // Deprecate
    typeof trytes === 'string' && /^[9]+$/.test(trytes)

/* Checks if input is correct hash (81 trytes) */
export const isHash = (hash: string): boolean => isTrytes(hash, 81)

/* Checks if input is correct hash */
export const isTransfersArray = (transfers: Transfer[]): boolean =>
    Array.isArray(transfers) &&
    transfers.every(tx =>
        isAddress(tx.address) &&
        Number.isInteger(tx.value) &&
        isTrytes(tx.message, 0) &&
        isTrytes((tx.tag || tx.obsoleteTag) as string, 27))

/* Checks if input is list of correct trytes */
export const isArrayOfHashes = (hashes: string[]): boolean =>
    Array.isArray(hashes) &&
    hashes.every(hash => isHash(hash))

/* Checks if input is list of correct trytes */
export const isArrayOfTrytes = (trytesArray: string[]): boolean =>
    Array.isArray(trytesArray) && trytesArray.every(trytes => isTrytes(trytes, 2673))

/* Checks if attached trytes if last 241 trytes are non-zero */
export const isArrayOfAttachedTrytes = (trytesArray: string[]): boolean =>
    Array.isArray(trytesArray) &&
    trytesArray.length > 0 &&
    trytesArray.every(trytes => isTrytes(trytes, 2673) && /^[9]+$/.test(trytes.slice(2673 - 3 * 81)))

/* Checks if correct bundle with transaction object */
export const isArrayOfTxObjects = (bundle: Transaction[]): boolean =>
    isArray(bundle) &&
    bundle.length > 0 && 
    bundle.every(tx =>
        isHash(tx.hash) &&
        isTrytes(tx.signatureMessageFragment, 2187) &&
        isHash(tx.address) &&
        Number.isInteger(tx.value) &&
        isTrytes(tx.obsoleteTag, 27) &&
        Number.isInteger(tx.timestamp) &&
        Number.isInteger(tx.currentIndex) &&
        Number.isInteger(tx.lastIndex) &&
        isHash(tx.bundle) &&
        isHash(tx.trunkTransaction) &&
        isHash(tx.branchTransaction) &&
        isTrytes(tx.tag, 27) &&
        Number.isInteger(tx.attachmentTimestamp) &&
        Number.isInteger(tx.attachmentTimestampLowerBound) &&
        Number.isInteger(tx.attachmentTimestampUpperBound) &&
        isTrytes(tx.nonce, 27))

/* Checks if correct inputs list */
export const isInputs = (inputs: Address[]): boolean =>
    Array.isArray(inputs) &&
    inputs.length > 0 &&
    inputs.every(input =>
        isAddress(input.address) &&
        Number.isInteger(input.security) && input.security > 0 &&
        Number.isInteger(input.keyIndex) && input.keyIndex > -1)

/**
 * Checks that a given uri is valid
 *
 * Valid Examples:
 * udp://[2001:db8:a0b:12f0::1]:14265
 * udp://[2001:db8:a0b:12f0::1]
 * udp://8.8.8.8:14265
 * udp://domain.com
 * udp://domain2.com:14265
 */
export const isUri = (uri: string): boolean => {
    const getInside = /^(udp|tcp):\/\/([\[][^\]\.]*[\]]|[^\[\]:]*)[:]{0,1}([0-9]{1,}$|$)/i

    const stripBrackets = /[\[]{0,1}([^\[\]]*)[\]]{0,1}/

    const uriTest = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))|(^\s*((?=.{1,255}$)(?=.*[A-Za-z].*)[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?)*)\s*$)/

    return getInside.test(uri) && uriTest.test(stripBrackets.exec(getInside.exec(uri)![1])![1])
}

/* Check if start & end options are valid */
export const isStartEndOptions = (start: number, end: number): boolean =>
    !!(end && (start > end || end > start + 500))

export const isArrayOfTags = (tags: string[]): boolean =>
    tags.every(tag => isTrytes(tag, 27))

export const isAddresses = (addresses: Addresses | string[]): boolean =>
    (Array.isArray(addresses) ? addresses : Object.keys(addresses))
        .every(isAddress)
