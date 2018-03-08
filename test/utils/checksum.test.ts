import test from 'ava'
import { INVALID_ADDRESS } from '../../lib/errors' 
import { addChecksum, isValidChecksum, removeChecksum } from '../../lib/utils'

const addressWithChecksum = 'UYEEERFQYTPFAHIPXDQAQYWYMSMCLMGBTYAXLWFRFFWPYFOICOVLK9A9VYNCKK9TQUNBTARCEQXJHD9VYXOEDEOMRC'
const addressWithoutChecksum = 'UYEEERFQYTPFAHIPXDQAQYWYMSMCLMGBTYAXLWFRFFWPYFOICOVLK9A9VYNCKK9TQUNBTARCEQXJHD9VY'
const addressWithInvalidChecksum = 'UYEEERFQYTPFAHIPXDQAQYWYMSMCLMGBTYAXLWFRFFWPYFOICOVLK9A9VYNCKK9TQUNBTARCEQXJHD9VYXOEDEOMRD'
const invalidAddress = 'UYEEERFQYTPFAHIPXDQAQYWYMSMCLMGBTYAXLWFRFFWPYFOICOVLK9A9VYNCKK9TQUNBTARCEQXJHD'

test('addChecksum()', t => {
    t.is(
        addChecksum(addressWithoutChecksum),
        addressWithChecksum,
        'addChecksum() should add 9-trytes checksum to the end of address.'
    )
    t.is(
        addChecksum(addressWithChecksum),
        addressWithChecksum,
        'addChecksum() should return the exact address, if was passed with checksum.'
    )

    const error = t.throws(
        () => addChecksum(invalidAddress),
        Error,
        'addChecksum() should throw error if address is invalid.' 
    )

    t.is(error.message, INVALID_ADDRESS)
})

test('isValidChecksum()', t => {
    t.is(
        isValidChecksum(addressWithChecksum),
        true,
        'isValidChecksum() should return true for address with valid checksum.'
    )
  
    t.is(
        isValidChecksum(addressWithInvalidChecksum),
        false,
        'isValidChecksum() should return false for address with invalid checksum.'
    )

    t.is(
        isValidChecksum(addressWithoutChecksum),
        false,
        'isValidChecksum() should return false for address without checksum.'
    )

    const error = t.throws(
        () => isValidChecksum(invalidAddress),
        Error,
        'isValidChecksum() should throw error if invalid address was passed.'
    )

    t.is(error.message, INVALID_ADDRESS)
})

test('removeChecksum()', t => {
    t.deepEqual(
        removeChecksum(addressWithChecksum),
        addressWithoutChecksum,
        'removeChecksum() should remove checksum from address with checksum.'
    )

    t.deepEqual(
        removeChecksum(addressWithoutChecksum),
        addressWithoutChecksum,
        'removeChecksum() should return the exact address if was passed without checksum.'
    )

    const error = t.throws(
        () => removeChecksum(invalidAddress),
        Error,
        'removeChecksum() should throw error if invalid address was passed'
    )

    t.is(error.message, INVALID_ADDRESS)
})
