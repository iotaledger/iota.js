import { address, addressWithChecksum, addressWithInvalidChecksum } from '@iota/samples'
import test from 'ava'
import { addChecksum, errors, isValidChecksum, removeChecksum } from '../src'

const invalidAddress = 'UYEEERFQYTPFAHIPXDQAQYWYMSMCLMGBTYAXLWFRFFWPYFOICOVLK9A9VYNCKK9TQUNBTARCEQXJHD'

test('addChecksum() adds 9-trytes checksum', t => {
    t.is(addChecksum(address), addressWithChecksum, 'addChecksum() should add 9-trytes checksum to the end of address.')
})

test('addChecksum() returns the exact address, if was passed with checksum', t => {
    t.is(
        addChecksum(addressWithChecksum),
        addressWithChecksum,
        'addChecksum() should return the exact address, if was passed with checksum.'
    )
})

test('addChecksum() throws error for invalid addresses', t => {
    const error = t.throws(
        () => addChecksum(invalidAddress),
        Error,
        'addChecksum() should throw error if address is invalid.'
    )

    t.is(error.message, errors.INVALID_ADDRESS, 'addChecksum() should throw correct error message.')
})

test('addChecksum() adds checksum of arbitrary length', t => {
    const trytes = '9'.repeat(81)
    const trytesWithChecksum = trytes + 'KZW'

    t.is(addChecksum(trytes, 3, false), trytesWithChecksum, 'addChecsum() should add checksum of arbitrary length.')
})

test('isValidChecksum() correctly validates the checksum', t => {
    t.is(
        isValidChecksum(addressWithInvalidChecksum),
        false,
        'isValidChecksum() should return false for address with invalid checksum.'
    )

    t.is(isValidChecksum(address), false, 'isValidChecksum() should return false for address without checksum.')
})

test('isValidChecksum() throws error for invalid address', t => {
    const error = t.throws(
        () => isValidChecksum(invalidAddress),
        Error,
        'isValidChecksum() should throw error if invalid address was passed.'
    )

    t.is(error.message, errors.INVALID_ADDRESS, 'isValidChecksum() should throw correct error message.')
})

test('removeChecksum() removes checksum from addresses with checksum', t => {
    t.deepEqual(
        removeChecksum(addressWithChecksum),
        address,
        'removeChecksum() should remove checksum from address with checksum.'
    )
})

test('removeChecksum() returns the exact address, if was passed without checksum', t => {
    t.deepEqual(
        removeChecksum(address),
        address,
        'removeChecksum() should return the exact address if was passed without checksum.'
    )
})

test('removeChecksum() throws error for invalid addresses', t => {
    const error = t.throws(
        () => removeChecksum(invalidAddress),
        Error,
        'removeChecksum() should throw error if invalid address was passed.'
    )

    t.is(error.message, errors.INVALID_ADDRESS, 'removeChecksum() should throw correct error message.')
})
