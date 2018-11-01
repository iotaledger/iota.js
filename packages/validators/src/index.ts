/**
 * @module validators
 */

import * as errors from '../../errors'
export { errors }

/* Address related guards & validators */
import { isValidChecksum } from '@iota/checksum'

/**
 * Checks integrity of given address by validating the checksum.
 *
 * @method isAddress
 *
 * @param {string} address - Address trytes, with checksum
 *
 * @return {boolean}
 */
export const isAddress = (address: any) => {
    let isValid = false

    try {
        isValid = isValidChecksum(address)
    } catch (err) {
        return false
    }
    return isValid
}

export const addressValidator = (address: any) => [address, isAddress]

/* Misc */
export {
    arrayValidator,
    depthValidator,
    hashValidator,
    inputValidator,
    isHash,
    isInput,
    isNinesTrytes,
    isEmpty,
    isSecurityLevel,
    isStartEndOptions,
    isTag,
    isTransfer,
    isTrytes,
    isTrytesOfExactLength,
    isTrytesOfMaxLength,
    isUri,
    minWeightMagnitudeValidator,
    securityLevelValidator,
    seedValidator,
    tagValidator,
    transferValidator,
    trytesValidator,
    uriValidator,
    validate,
    Validatable,
    Validator,
} from '../../guards'

import { isArray, isHash, isInput, isTag, isTransfer, isTrytes, isUri } from '../../guards'

export const isAddressArray = isArray(isAddress)
export const isHashArray = isArray(isHash)
export const isInputArray = isArray(isInput)
export const isTagArray = isArray(isTag)
export const isTransferArray = isArray(isTransfer)
export const isTransfersArray = isTransferArray
export const isTrytesArray = isArray((x: any) => isTrytes(x))
export const isUriArray = isArray(isUri)

/* Transaction guards & validators */

export {
    isAttachedTrytes,
    isAttachedTrytesArray,
    isTailTransaction,
    isTransaction,
    isTransactionArray,
    isTransactionTrytes,
    isTransactionHash,
    isTransactionHashArray,
    transactionHashValidator,
    transactionValidator,
    tailTransactionValidator,
    transactionTrytesValidator,
    attachedTrytesValidator,
} from '@iota/transaction'
