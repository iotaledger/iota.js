import { Input, Transaction, Transfer } from './types'

const isArray = Array.isArray

/**
 *   checks if input is correct address
 *
 *   @method isAddress
 *   @param {string} address
 *   @returns {boolean}
 **/
function isAddress(address: string) {
    // TODO: In the future check checksum

    if (typeof address !== 'string') {
        return false
    }

    // Check if address with checksum
    if (address.length === 90) {
        if (!isTrytes(address, '90')) {
            return false
        }
    } else {
        if (!isTrytes(address, '81')) {
            return false
        }
    }

    return true
}

/**
 *   checks if input is correct trytes consisting of A-Z9
 *   optionally validate length
 *
 *   @method isTrytes
 *   @param {string} trytes
 *   @param {integer} length optional
 *   @returns {boolean}
 **/
function isTrytes(trytes: string, length: string = '0'): boolean {
    const regexTrytes = new RegExp(`^[9A-Z]{${length}}$`)

    return isString(trytes) && regexTrytes.test(trytes)
}

/**
 *   checks if input is correct trytes consisting of A-Z9
 *   optionally validate length
 *
 *   @method isNinesTrytes
 *   @param {string} trytes
 *   @returns {boolean}
 **/
function isNinesTrytes(trytes: string): boolean {
    return isString(trytes) && /^[9]+$/.test(trytes)
}

/**
 *   checks if integer value
 *
 *   @method isValue
 *   @param {string} value
 *   @returns {boolean}
 **/
function isValue(value: number): boolean {
    // check if correct number
    return Number.isInteger(value)
}

/**
 *   checks whether input is a value or not. Can be a string, float or integer
 *
 *   @method isNum
 *   @param {int}
 *   @returns {boolean}
 **/
const isNum = (input: string) => /^(\d+\.?\d{0,15}|\.\d{0,15})$/.test(input)

/**
 *   checks if input is correct hash (81 trytes)
 *
 *   @method isHash
 *   @param {string} hash
 *   @returns {boolean}
 **/
const isHash = (hash: string): boolean => isTrytes(hash, '81')

/**
 *   checks whether input is a string or not
 *
 *   @method isString
 *   @param {string}
 *   @returns {boolean}
 **/
const isString = (x: string) => typeof x === 'string'

/**
 *   checks whether input is object or not
 *
 *   @method isObject
 *   @param {object}
 *   @returns {boolean}
 **/
const isObject = (object: object) => typeof object === 'object'

/**
 *   checks if input is correct hash
 *
 *   @method isTransfersArray
 *   @param {array} hash
 *   @returns {boolean}
 **/
function isTransfersArray(transfersArray: Transfer[]): boolean {
    if (!isArray(transfersArray)) {
        return false
    }

    for (const transfer of transfersArray) {
        const { address, value, message, tag, obsoleteTag } = transfer

        // Check if valid address
        if (!isAddress(address)) {
            return false
        }

        // Validity check for value
        if (!isValue(value)) {
            return false
        }

        // Check if message is correct trytes of any length
        if (!isTrytes(message, '0,')) {
            return false
        }

        // Check if tag is correct trytes of {0,27} trytes
        if (!isTrytes(tag || obsoleteTag, '0,27')) {
            return false
        }
    }

    return true
}

/**
 *   checks if input is list of correct trytes
 *
 *   @method isArrayOfHashes
 *   @param {list} hashesArray
 *   @returns {boolean}
 **/
function isArrayOfHashes(hashesArray: string[]): boolean {
    if (!isArray(hashesArray)) {
        return false
    }

    for (const hash of hashesArray) {
        // Check if address with checksum
        if (hash.length === 90) {
            if (!isTrytes(hash, '90')) {
                return false
            }
        } else {
            if (!isTrytes(hash, '81')) {
                return false
            }
        }
    }

    return true
}

/**
 *   checks if input is list of correct trytes
 *
 *   @method isArrayOfTrytes
 *   @param {list} trytesArray
 *   @returns {boolean}
 **/
function isArrayOfTrytes(trytesArray: string[]): boolean {
    if (!isArray(trytesArray)) {
        return false
    }

    for (const tryteValue of trytesArray) {
        // Check if correct 2673 trytes
        if (!isTrytes(tryteValue, '2673')) {
            return false
        }
    }

    return true
}

export type Trytes = string

/**
 *   checks if attached trytes if last 241 trytes are non-zero
 *
 *   @method isArrayOfAttachedTrytes
 *   @param {array} trytesArray
 *   @returns {boolean}
 **/
function isArrayOfAttachedTrytes(trytesArray: Trytes[]): boolean {
    if (!isArray(trytesArray)) {
        return false
    }

    for (const tryteValue of trytesArray) {
        // Check if correct 2673 trytes
        if (!isTrytes(tryteValue, '2673')) {
            return false
        }

        const lastTrytes = tryteValue.slice(2673 - 3 * 81)

        if (/^[9]+$/.test(lastTrytes)) {
            return false
        }
    }

    return true
}

interface Validator {
    key: keyof Transaction
    validator: (...args: any[]) => boolean
    args: any
}

/**
 *   checks if correct bundle with transaction object
 *
 *   @method isArrayOfTxObjects
 *   @param {array} bundle
 *   @returns {boolean}
 **/
function isArrayOfTxObjects(bundle: Transaction[]): boolean {
    if (!isArray(bundle) || bundle.length === 0) {
        return false
    }

    let validArray = true

    bundle.forEach(txObject => {
        const keysToValidate: Validator[] = [
            {
                key: 'hash',
                validator: isHash,
                args: null,
            },
            {
                key: 'signatureMessageFragment',
                validator: isTrytes,
                args: 2187,
            },
            {
                key: 'address',
                validator: isHash,
                args: null,
            },
            {
                key: 'value',
                validator: isValue,
                args: null,
            },
            {
                key: 'obsoleteTag',
                validator: isTrytes,
                args: 27,
            },
            {
                key: 'timestamp',
                validator: isValue,
                args: null,
            },
            {
                key: 'currentIndex',
                validator: isValue,
                args: null,
            },
            {
                key: 'lastIndex',
                validator: isValue,
                args: null,
            },
            {
                key: 'bundle',
                validator: isHash,
                args: null,
            },
            {
                key: 'trunkTransaction',
                validator: isHash,
                args: null,
            },
            {
                key: 'branchTransaction',
                validator: isHash,
                args: null,
            },
            {
                key: 'tag',
                validator: isTrytes,
                args: 27,
            },
            {
                key: 'attachmentTimestamp',
                validator: isValue,
                args: null,
            },
            {
                key: 'attachmentTimestampLowerBound',
                validator: isValue,
                args: null,
            },
            {
                key: 'attachmentTimestampUpperBound',
                validator: isValue,
                args: null,
            },
            {
                key: 'nonce',
                validator: isTrytes,
                args: 27,
            },
        ]

        for (const keyToValidate of keysToValidate) {
            const { key, validator, args } = keyToValidate

            // If input does not have keyIndex and address, return false
            if (!txObject.hasOwnProperty(key)) {
                validArray = false
                break
            }

            // If input validator function does not return true, exit
            if (!validator(txObject[key], args)) {
                validArray = false
                break
            }
        }
    })

    return validArray
}

/**
 *   checks if correct inputs list
 *
 *   @method isInputs
 *   @param {array} inputs
 *   @returns {boolean}
 **/
function isInputs(inputs: Input[]): boolean {
    if (!isArray(inputs)) {
        return false
    }

    for (const input of inputs) {
        // If input does not have keyIndex and address, return false
        if (
            !input.hasOwnProperty('security') ||
            !input.hasOwnProperty('keyIndex') ||
            !input.hasOwnProperty('address')
        ) {
            return false
        }

        if (!isAddress(input.address)) {
            return false
        }

        if (!isValue(input.security)) {
            return false
        }

        if (!isValue(input.keyIndex)) {
            return false
        }
    }

    return true
}

/**
 *   Checks that a given uri is valid
 *
 *   Valid Examples:
 *   udp://[2001:db8:a0b:12f0::1]:14265
 *   udp://[2001:db8:a0b:12f0::1]
 *   udp://8.8.8.8:14265
 *   udp://domain.com
 *   udp://domain2.com:14265
 *
 *   @method isUri
 *   @param {string} node
 *   @returns {bool} valid
 **/
function isUri(node: string): boolean {
    const getInside = /^(udp|tcp):\/\/([\[][^\]\.]*[\]]|[^\[\]:]*)[:]{0,1}([0-9]{1,}$|$)/i

    const stripBrackets = /[\[]{0,1}([^\[\]]*)[\]]{0,1}/

    const uriTest = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))|(^\s*((?=.{1,255}$)(?=.*[A-Za-z].*)[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?)*)\s*$)/

    if (!getInside.test(node)) {
        return false
    }

    return uriTest.test(stripBrackets.exec(getInside.exec(node)![1])![1])
}

export default {
    isArray,
    isAddress,
    isTrytes,
    isNinesTrytes,
    isValue,
    isNum,
    isObject,
    isHash,
    isString,
    isTransfersArray,
    isArrayOfHashes,
    isArrayOfTrytes,
    isArrayOfAttachedTrytes,
    isArrayOfTxObjects,
    isInputs,
    isUri,
}
