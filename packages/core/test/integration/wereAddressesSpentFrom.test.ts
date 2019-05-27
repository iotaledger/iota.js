import { createHttpClient } from '@iota/http-client'
import test from 'ava'
import { INVALID_ADDRESS } from '../../../errors'
import { stringify } from '../../../guards'
import { createWereAddressesSpentFrom } from '../../src/createWereAddressesSpentFrom'
import { wereAddressesSpentFromCommand, wereAddressesSpentFromResponse } from './nocks/wereAddressesSpentFrom'

const wereAddressesSpentFrom = createWereAddressesSpentFrom(createHttpClient(), 'lib')

const addressesWithChecksum = wereAddressesSpentFromCommand.addresses.map((address: string) =>
    address.concat('9'.repeat(9))
)

test('wereAddressesSpentFrom() resolves to correct balances response', async t => {
    t.deepEqual(
        await wereAddressesSpentFrom(wereAddressesSpentFromCommand.addresses),
        wereAddressesSpentFromResponse.states,
        'wereAddressesSpentFrom() should resolve to correct balances'
    )
})

test('wereAddressesSpentFrom() removes checksum from addresses', async t => {
    t.deepEqual(
        await wereAddressesSpentFrom([...addressesWithChecksum]),
        wereAddressesSpentFromResponse.states,
        'wereAddressesSpentFrom() by addresses should remove checksum from addresses'
    )
})

test('wereAddressesSpentFrom() does not mutate original addresses', async t => {
    const addresses = [...addressesWithChecksum]

    await wereAddressesSpentFrom(addresses)

    t.deepEqual(addresses, addressesWithChecksum, 'wereAddressesSpentFrom() should not mutate original addresses')
})

test('wereAddressesSpentFrom() rejects with correct error for invalid addresses', t => {
    const invalidAddresses = ['asdasDSFDAFD']

    t.is(
        t.throws(() => wereAddressesSpentFrom(invalidAddresses), Error).message,
        `${INVALID_ADDRESS}: ${stringify(invalidAddresses)}`,
        'wereAddressesSpentFrom() should throw error for invalid addresses'
    )
})

test.cb('wereAddressesSpentFrom() invokes callback', t => {
    wereAddressesSpentFrom(wereAddressesSpentFromCommand.addresses, t.end)
})

test.cb('wereAddressesSpentFrom() passes correct arguments to callback', t => {
    wereAddressesSpentFrom(wereAddressesSpentFromCommand.addresses, (err, res) => {
        t.is(
            err,
            null,
            'wereAddressesSpentFrom() should pass null as first argument in callback for successuful requests'
        )

        t.deepEqual(
            res,
            wereAddressesSpentFromResponse.states,
            'wereAddressesSpentFrom() should pass the correct response as second argument in callback'
        )

        t.end()
    })
})
