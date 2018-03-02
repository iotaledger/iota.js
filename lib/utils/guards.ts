import { Address, Hash, Tag, Transaction, Transfer, Trytes } from '../api/types'
import { HASH_SIZE, TAG_SIZE, TRYTES_SIZE } from './constants'

export const isArray = Array.isArray
export const isInteger = Number.isInteger

export const isTrytesOfLength = (trytes: string, length: number) =>
    typeof trytes === 'string' && new RegExp(`^[9A-Z]{${length}}$`).test(trytes)

// Checks if input is correct trytes consisting of [9A-Z]; optionally validate length
export const isTrytes = (trytes: string, length?: number): trytes is Trytes => {
    if (length && length > 0) {
        return isTrytesOfLength(trytes, length)
    }

    return typeof trytes === 'string' && new RegExp(`^[9A-Z]$`).test(trytes)
}

// Checks if input is correct hash (81 trytes)
export const isHash = (hash: string): hash is Hash => isTrytes(hash, HASH_SIZE)
export const isAddressTrytes = isHash // deprecated

// Deprecated
export const isNinesTrytes = (trytes: string): boolean => typeof trytes === 'string' && /^[9]+$/.test(trytes)

// Checks if input is correct hash
export const isTransfer = (transfer: any): transfer is Transfer =>
    isHash(transfer.address) &&
    isInteger(transfer.value) &&
    isTrytes(transfer.message) &&
    isTrytes(transfer.tag || transfer.obsoleteTag, TAG_SIZE)

export const isTransfersArray = (transfers: any[]): transfers is Transfer[] =>
    isArray(transfers) && transfers.every(isTransfer)

export const isHashArray = (hashes: string[]): boolean => Array.isArray(hashes) && hashes.every(isHash)

// Checks if input is list of correct trytes
export const isTrytesArray = (trytesArray: string[]): trytesArray is Trytes[] =>
    isArray(trytesArray) && trytesArray.every(trytes => isTrytes(trytes, TRYTES_SIZE))

// Checks if attached trytes if last 241 trytes are non-zero
export const isAttachedTrytesArray = (trytesArray: string[]): trytesArray is Trytes[] =>
    isArray(trytesArray) &&
    trytesArray.length > 0 &&
    trytesArray.every(
        trytes => isTrytes(trytes, TRYTES_SIZE) && /^[9]+$/.test(trytes.slice(TRYTES_SIZE - 3 * HASH_SIZE))
    )

export const isTransaction = (tx: any): tx is Transaction =>
    isHash(tx.hash) &&
    isTrytes(tx.signatureMessageFragment, 2187) &&
    isHash(tx.address) &&
    isInteger(tx.value) &&
    isTrytes(tx.obsoleteTag, 27) &&
    isInteger(tx.timestamp) &&
    isInteger(tx.currentIndex) &&
    isInteger(tx.lastIndex) &&
    isHash(tx.bundle) &&
    isHash(tx.trunkTransaction) &&
    isHash(tx.branchTransaction) &&
    isTrytes(tx.tag, 27) &&
    isInteger(tx.attachmentTimestamp) &&
    isInteger(tx.attachmentTimestampLowerBound) &&
    isInteger(tx.attachmentTimestampUpperBound) &&
    isTrytes(tx.nonce, 27)

// Checks if correct bundle with transaction object
export const isTransactionArray = (bundle: any[]): bundle is Transaction[] =>
    Array.isArray(bundle) && bundle.length > 0 && bundle.every(isTransaction)

export const isAddress = (input: any): input is Address =>
    isHash(input.address) && isSecurityLevel(input.security) && isInteger(input.keyIndex) && input.keyIndex >= 0

export const isAddressArray = (inputs: any[]): inputs is Address[] =>
    Array.isArray(inputs) && inputs.length > 0 && inputs.every(isAddress)

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
    if (typeof uri !== 'string') {
        return false
    }

    const getInside = /^(udp|tcp):\/\/([\[][^\]\.]*[\]]|[^\[\]:]*)[:]{0,1}([0-9]{1,}$|$)/i

    const stripBrackets = /[\[]{0,1}([^\[\]]*)[\]]{0,1}/

    const uriTest = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))|(^\s*((?=.{1,255}$)(?=.*[A-Za-z].*)[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?)*)\s*$)/

    return getInside.test(uri) && uriTest.test(stripBrackets.exec(getInside.exec(uri)![1])![1])
}

export const isUriArray = (uris: string[]): boolean => isArray(uris) && uris.every(isUri)

/* Check if start & end options are valid */
export const isStartEndOptions = ({ start, end }: { start: number; end: number }): boolean =>
    !!(end && (start > end || end > start + 500))

export const isTag = (tag: string): tag is Tag => isTrytes(tag, TAG_SIZE)

export const isTagArray = (tags: string[]): tags is Tag[] => tags.every(isTag)

export const isSecurityLevel = (security: number): boolean => Number.isInteger(security) && security > 0

export const isTailTransaction = (transaction: Transaction): boolean => transaction.currentIndex !== 0
