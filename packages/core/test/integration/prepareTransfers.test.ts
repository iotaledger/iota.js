import { addChecksum } from '@iota/checksum'
import { createHttpClient } from '@iota/http-client'
import { addresses, trytes as expected } from '@iota/samples'
import test from 'ava'
import { stringify } from '../../../guards'
import { Transfer, Trytes } from '../../../types'
import { createPrepareTransfers } from '../../src'
import { getRemainderAddressStartIndex } from '../../src/createPrepareTransfers'
import './nocks/prepareTransfers'

const inputs: ReadonlyArray<any> = [
    {
        address: 'FJHSSHBZTAKQNDTIKJYCZBOZDGSZANCZSWCNWUOCZXFADNOQSYAHEJPXRLOVPNOQFQXXGEGVDGICLMOXX',
        keyIndex: 0,
        security: 2,
        balance: 3,
    },
    {
        address: '9DZXPFSVCSSWXXQPFMWLGFKPBAFTHYMKMZCPFHBVHXPFNJEIJIEEPKXAUBKBNNLIKWHJIYQDFWQVELOCB',
        keyIndex: 1,
        security: 2,
        balance: 4,
    },
]

test('getRemainderAddressStartIndex', t => t.is(getRemainderAddressStartIndex(inputs), 2))

const transfers: ReadonlyArray<Transfer> = [
    {
        address: addChecksum('A'.repeat(81)),
        value: 3,
        tag: 'TAG',
        message: '9',
    },
    {
        address: addChecksum('B'.repeat(81)),
        value: 3,
        tag: 'TAG',
    },
]

const zeroValueTransfer: ReadonlyArray<Transfer> = [
    {
        address: '9'.repeat(81),
        value: 0,
        message: 'TEST9MESSAGE',
        tag: 'TEST9TAG',
    },
]

const expectedZeroValueTrytes: ReadonlyArray<Trytes> = [
    'TEST9MESSAGE999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999UFST9TAG9999999999999999999MBIWC9999999999999999999999JAUJAZERXHKKZUOWISVT9DLBYCZ9WHKOEYIQSHDVXXLPEDCLXCYTHGBGWPBFZJUPGBGRFGHZAIWKZNERW999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999TEST9TAG9999999999999999999999999999999999999999999999999999999999999999999999999',
]

const remainderAddress = addresses[2]

const now = () => 1522219924
const prepareTransfers = createPrepareTransfers(undefined, now, 'lib')
const prepareTransfersWithNetwork = createPrepareTransfers(createHttpClient(), now, 'lib')

test('prepareTransfers() prepares the correct array of trytes offline.', async t => {
    const trytes = await prepareTransfers('SEED', transfers, { inputs, remainderAddress })

    t.deepEqual(trytes, expected, 'prepareTransfers() should prepare the correct array of trytes.')
})

test('prepareTransfers() does not mutate original transfers object offline.', async t => {
    const transfersCopy = transfers.map(transfer => ({ ...transfer }))

    await prepareTransfers('SEED', transfersCopy, { inputs, remainderAddress, hmacKey: '9'.repeat(81) })

    t.deepEqual(transfers, transfersCopy, 'prepareTransfers() should not mutate original transfers object.')
})

test('prepareTransfers() with network prepares the correct array of trytes.', async t => {
    const trytes = await prepareTransfersWithNetwork('SEED', transfers)

    t.deepEqual(trytes, expected, 'prepareTranfers() should prepare the correct array of trytes.')
})

test('prepareTransfer() prepares correct trytes for zero value transfers', async t => {
    const zeroValueTrytes = await prepareTransfersWithNetwork('SEED', zeroValueTransfer)

    t.deepEqual(
        zeroValueTrytes,
        expectedZeroValueTrytes,
        'prepareTransfers() should prepare the correct trytes for zero value transfers'
    )
})

test.cb('prepareTransfers() invokes callback', t => {
    prepareTransfers('SEED', transfers, { inputs, remainderAddress }, t.end)
})

test.cb('prepareTransfers() passes correct arguments to callback', t => {
    prepareTransfers('SEED', transfers, { inputs, remainderAddress }, (err, res) => {
        t.is(err, null, 'prepareTransfers() should pass null as first argument in callback for successful calls.')

        t.deepEqual(res, expected, 'prepareTransfers() should pass the correct trytes as second argument in callback')

        t.end()
    })
})

test('prepareTransfers() throws intuitive error when provided invalid transfers array', async t => {
    const invalidTransfer = {
        address: addChecksum('A'.repeat(81)),
        value: 3,
    } as any

    t.is(
        t.throws(() => prepareTransfers('SEED', invalidTransfer)).message,
        `Invalid transfer array: ${stringify(invalidTransfer)}`,
        'prepareTransfers() should throw intuitive error when provided invalid transfers array'
    )
})

test('prepareTransfers() throws error for inputs without security level.', async t => {
    const input: any = [{
        address: 'I'.repeat(81),
        keyIndex: 0,
        balance: 1,
    }]

    t.is(
        t.throws(() =>
            prepareTransfers(
                'SEED',
                [
                    {
                        address: 'A'.repeat(81),
                        value: 1,
                    },
                ],
                {
                    inputs: input,
                }
            )
        ).message,
        `Invalid input: ${stringify(input)}`,
        'prepareTransfers() should throw error for inputs without security level.'
    )
})
