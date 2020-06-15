/**
 * @module validators
 */

import * as errors from '../../errors'
export { errors }

/* Address related guards & validators */
import { isValidChecksum } from '@iota/checksum'

/**
 * This method takes an address with a checksum and validates that the checksum is correct.
 * 
 * ## Related methods
 * 
 * To generate a new address with a checksum, use the [`getNewAddress()`]{@link #module_core.getNewAddress} method.
 * 
 * @method isAddress
 * 
 * @summary Validates the checksum of the given address.
 *  
 * @memberof module:validators
 *
 * @param {string} address - Address with a checksum
 * 
 * @example
 * ```js
 * let valid = Validator.isAddress('9FNJWLMBECSQDKHQAGDHDPXBMZFMQIMAFAUIQTDECJVGKJBKHLEBVU9TWCTPRJGYORFDSYENIQKBVSYKW9NSLGS9UW');
 * ```
 * 
 * @return {boolean} valid - Whether the checksum is valid
 * 
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

export { isAttached, isTail, isHead, isTransaction } from '@iota/transaction'
