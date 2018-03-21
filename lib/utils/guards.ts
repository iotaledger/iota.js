import { Address, Hash, Tag, Transaction, Transfer, Trytes } from '../api/types'
import { HASH_SIZE, TAG_SIZE, TRANSACTION_TRYTES_SIZE } from './constants'

export const isArray = Array.isArray  // deprecated
export const isInteger = Number.isInteger // deprecated
export const isValue = isInteger // deprecated

export const isTrytesOfExactLength = (trytes: string, length: number) =>
    typeof trytes === 'string' && new RegExp(`^[9A-Z]{${ length }}$`).test(trytes)

export const isTrytesOfMaxLength = (trytes: string, length: number) =>
    typeof trytes === 'string' && new RegExp(`^[9A-Z]{1,${ length }}$`).test(trytes)

// Checks if input is correct trytes consisting of [9A-Z]; optionally validate length
export const isTrytes = (trytes: string, length: string | number = '1,'): trytes is Trytes =>
  typeof trytes === 'string' && new RegExp(`^[9A-Z]{${ length }}$`).test(trytes)

// Checks if input is correct hash (81 trytes)
export const isHash = (hash: any): hash is Hash =>
    isTrytesOfExactLength(hash, HASH_SIZE) ||
    isTrytesOfExactLength(hash, HASH_SIZE + 9) // address w/ checksum is valid hash

export const isTransactionHash = (hash: any): hash is Hash =>
    isTrytesOfExactLength(hash, HASH_SIZE)

export const isAddressTrytes = isHash // Deprecated

export const isEmpty = (trytes: any): trytes is Trytes => typeof trytes === 'string' && /^[9]+$/.test(trytes)
export const isNinesTrytes = isEmpty 

// Checks if input is correct hash
export const isTransfer = (transfer: Transfer): transfer is Transfer =>
    isHash(transfer.address) &&
    Number.isInteger(transfer.value) &&
    transfer.value >= 0 &&
    (!transfer.message.length || isTrytes(transfer.message)) &&
    (!transfer.tag.length || isTrytes(transfer.tag)) &&
    transfer.tag.length <= 27

export const isTransfersArray = (transfers: any[]): transfers is Transfer[] =>
    Array.isArray(transfers) &&
    transfers.every(isTransfer)

export const isHashArray = (hashes: any[]): hashes is Hash[] =>
    Array.isArray(hashes) &&
    hashes.every(isHash)

export const isTransactionHashArray = (hashes: any[]): hashes is Hash[] =>
    Array.isArray(hashes) &&
    hashes.every(isTransactionHash)

// Checks if input is list of correct trytes
export const isTrytesArray = (trytesArray: any[]): trytesArray is Trytes[] =>
    isArray(trytesArray) &&
    trytesArray.every(trytes => isTrytes(trytes, TRANSACTION_TRYTES_SIZE))

// Checks if attached trytes if last 241 trytes are non-zero
export const isAttachedTrytesArray = (trytesArray: any[]): trytesArray is Trytes[] =>
    Array.isArray(trytesArray) &&
    trytesArray.length > 0 &&
    trytesArray.every(trytes => 
        isTrytesOfExactLength(trytes, TRANSACTION_TRYTES_SIZE) &&
        !(/^[9]+$/.test(trytes.slice(TRANSACTION_TRYTES_SIZE - 3 * HASH_SIZE)))
    )

export const isTransaction = (tx: any): tx is Transaction =>
    isHash(tx.hash) &&
    isTrytesOfExactLength(tx.signatureMessageFragment, 2187) &&
    isHash(tx.address) &&
    isInteger(tx.value) &&
    isTrytesOfExactLength(tx.obsoleteTag, 27) &&
    isInteger(tx.timestamp) &&
    isInteger(tx.currentIndex) &&
    isInteger(tx.lastIndex) &&
    isHash(tx.bundle) &&
    isHash(tx.trunkTransaction) &&
    isHash(tx.branchTransaction) &&
    isTrytesOfExactLength(tx.tag, 27) &&
    isInteger(tx.attachmentTimestamp) &&
    isInteger(tx.attachmentTimestampLowerBound) &&
    isInteger(tx.attachmentTimestampUpperBound) &&
    isTrytesOfExactLength(tx.nonce, 27)

// Checks if correct bundle with transaction object
export const isTransactionArray = (bundle: any[]): bundle is Transaction[] =>
    Array.isArray(bundle) &&
    bundle.length > 0 &&
    bundle.every(isTransaction)

export const isAddress = (address: any): address is Address =>
    isHash(address.address) &&
    isSecurityLevel(address.security) &&
    Number.isInteger(address.keyIndex) &&
    address.keyIndex >= 0

export const isAddressArray = (addresses: any[]): addresses is Address[] =>
    Array.isArray(addresses) &&
    addresses.length > 0 &&
    addresses.every(isAddress)

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
export const isUri = (uri: any): uri is Trytes => {
    if (typeof uri !== 'string') {
        return false
    }

    const getInside = /^(udp|tcp):\/\/([\[][^\]\.]*[\]]|[^\[\]:]*)[:]{0,1}([0-9]{1,}$|$)/i

    const stripBrackets = /[\[]{0,1}([^\[\]]*)[\]]{0,1}/

    const uriTest = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))|(^\s*((?=.{1,255}$)(?=.*[A-Za-z].*)[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?)*)\s*$)/

    return getInside.test(uri) && uriTest.test(stripBrackets.exec(getInside.exec(uri)![1])![1])
}

export const isUriArray = (uris: any[]): uris is string[] =>
    Array.isArray(uris) &&
    uris.every(isUri)

/* Check if start & end options are valid */
export const isStartEndOptions = ({ start, end }: { start: number, end: number }): boolean =>
    !end || (start <= end && end < start + 500)

export const isTag = (tag: any): tag is Tag =>
    isTrytesOfMaxLength(tag, TAG_SIZE)

export const isTagArray = (tags: any[]): tags is Tag[] =>
    Array.isArray(tags) &&
    tags.every(isTag)

export const isSecurityLevel = (security: any): security is number =>
    Number.isInteger(security) &&
    security > 0

export const isTailTransaction = (transaction: any): transaction is Transaction =>
    isTransaction(transaction) &&
    transaction.currentIndex === 0

export const isInputArray = (ins: Address[]): boolean => ins.every(input =>
    isHash(input.address) &&
    isInteger(input.keyIndex) &&
    input.keyIndex >= 0 &&
    isSecurityLevel(input.security)
)
