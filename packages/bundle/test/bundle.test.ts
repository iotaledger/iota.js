import test from 'ava'
import { addEntry, addTrytes, createBundle, finalizeBundle } from '../src'

const NULL_HASH = '9'.repeat(81)
const NULL_NONCE = '9'.repeat(27)
const addresses = ['A'.repeat(81), 'B'.repeat(81)]
const tag = 'TAG' + '9'.repeat(24)

const bundle = [
    {
        address: addresses[0],
        value: -2,
        tag,
        obsoleteTag: tag,
        currentIndex: 0,
        lastIndex: 2,
        timestamp: 1522219,
        signatureMessageFragment: '9'.repeat(81 * 27),
        trunkTransaction: NULL_HASH,
        branchTransaction: NULL_HASH,
        attachmentTimestamp: 0,
        attachmentTimestampLowerBound: 0,
        attachmentTimestampUpperBound: 0,
        bundle: NULL_HASH,
        nonce: NULL_NONCE,
        hash: NULL_HASH,
    },
    {
        address: addresses[0],
        value: 0,
        tag,
        obsoleteTag: tag,
        currentIndex: 1,
        lastIndex: 2,
        timestamp: 1522219,
        signatureMessageFragment: '9'.repeat(81 * 27),
        trunkTransaction: NULL_HASH,
        branchTransaction: NULL_HASH,
        attachmentTimestamp: 0,
        attachmentTimestampLowerBound: 0,
        attachmentTimestampUpperBound: 0,
        bundle: NULL_HASH,
        nonce: NULL_NONCE,
        hash: NULL_HASH,
    },
    {
        address: addresses[1],
        value: 2,
        tag,
        obsoleteTag: tag,
        currentIndex: 2,
        lastIndex: 2,
        timestamp: 1522219,
        signatureMessageFragment: '9'.repeat(81 * 27),
        trunkTransaction: NULL_HASH,
        branchTransaction: NULL_HASH,
        attachmentTimestamp: 0,
        attachmentTimestampLowerBound: 0,
        attachmentTimestampUpperBound: 0,
        bundle: NULL_HASH,
        nonce: NULL_NONCE,
        hash: NULL_HASH,
    },
]

test('createBundle() returns correct transactions.', t => {
    t.deepEqual(
        createBundle([
            {
                length: 2,
                address: addresses[0],
                value: -2,
                tag: 'TAG',
                timestamp: 1522219,
            },
            {
                length: 1,
                address: addresses[1],
                value: 2,
                tag: 'TAG',
                timestamp: 1522219,
            },
        ]),
        bundle,
        'createBundle() should return correct transactions.'
    )
})

test('addEntry() adds new entry and returns correct transactions.', t => {
    t.deepEqual(
        addEntry(bundle.slice(0, 2), {
            length: 1,
            address: addresses[1],
            value: 2,
            tag: 'TAG',
            timestamp: 1522219,
        }),
        bundle,
        'addEntry() should add new entry and return correct trasnactions.'
    )
})

test('addTrytes() adds trytes and returns correct transactions.', t => {
    t.deepEqual(
        addTrytes(bundle, ['TRYTES', 'TRYTES', 'TRYTES']),
        bundle.map(transaction => ({
            ...transaction,
            signatureMessageFragment: 'TRYTES' + '9'.repeat(81 * 27 - 6),
        })),
        'addEntry should add trytes and return correct transactions.'
    )
})

test('finalizeBundle() adds correct bundle hash.', t => {
    const bundleHash = 'VRGXKZDODWIVGFYFCCXJRNDCQJVYUVBRIWJXKFGBIEWUPHHTJLTKH99JW9OLJ9JCIXCEIRRXJKLWOBDZZ'
    const incrObsoleteTag = 'ZUH'.concat('9'.repeat(24))

    const expected = bundle.map((transaction, i) => ({
        ...transaction,
        obsoleteTag: i === 0 ? incrObsoleteTag : transaction.obsoleteTag,
        bundle: bundleHash,
    }))

    t.deepEqual(finalizeBundle(bundle), expected, 'finalizeBundle() should add correct bundle hash.')
})
