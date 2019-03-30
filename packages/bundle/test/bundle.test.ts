import { tritsToTrytes, trytesToTrits, valueToTrits } from '@iota/converter'
import Kerl from '@iota/kerl'
import { MAX_TRYTE_VALUE, normalizedBundle, signatureFragments } from '@iota/signing'
import {
    ADDRESS_LENGTH,
    bundle,
    BUNDLE_LENGTH,
    BUNDLE_OFFSET,
    ISSUANCE_TIMESTAMP_LENGTH,
    OBSOLETE_TAG_LENGTH,
    obsoleteTag as obsoleteTagCopy,
    SIGNATURE_OR_MESSAGE_LENGTH,
    TAG_LENGTH,
    TRANSACTION_ESSENCE_LENGTH,
    TRANSACTION_LENGTH,
    transactionEssence,
    VALUE_LENGTH,
} from '@iota/transaction'
import { addEntry, addSignatureOrMessage, createBundle, finalizeBundle } from '../src'

import { describe, Try } from 'riteway'
import * as errors from '../../errors'

import {
    addresses,
    finalBundle as expectedFinalBundle,
    finalSignedBundle as expectedFinalSignedBundle,
    interimBundle as expectedInterimBundle,
    issuanceTimestamp,
    obsoleteTag,
    seed,
    signaturesOrMessages,
    tag,
    values,
} from './samples'

const bundleHash = (bundleTrits: Int8Array) => {
    const sponge = new Kerl()
    const out = new Int8Array(BUNDLE_LENGTH)

    for (let offset = 0; offset < bundle.length; offset += TRANSACTION_LENGTH) {
        sponge.absorb(transactionEssence(bundleTrits, offset), 0, TRANSACTION_ESSENCE_LENGTH)
    }

    sponge.squeeze(out, 0, BUNDLE_LENGTH)

    return out
}

const entries = [
    {
        signatureOrMessage: signaturesOrMessages[0],
        address: addresses[0],
        value: values[0],
        obsoleteTag,
        issuanceTimestamp,
        tag,
    },
    {
        signatureOrMessage: signaturesOrMessages[1],
        address: addresses[1],
        value: values[1],
        obsoleteTag,
        issuanceTimestamp,
        tag,
    },
    {
        signatureOrMessage: signaturesOrMessages[2],
        address: addresses[2],
        value: values[2],
        obsoleteTag,
        issuanceTimestamp,
        tag,
    },
]
const actualInterimBundle = createBundle(entries)
const actualInterimBundlePartial = createBundle(entries.slice(0, entries.length - 1))
const actualFinalBundle = finalizeBundle(actualInterimBundle)
const actualFinalSignedBundle = signatureFragments(seed, 0, 2, bundle(actualFinalBundle)).then(signature =>
    addSignatureOrMessage(actualFinalBundle, signature, 1)
)

describe('createBundle(entries: ReadonlyArray<Partial<BundleEntry>>)', async assert => {
    assert({
        given: 'entries with signatureOrMessage of length that is not multiple of fragment length',
        should: 'throw RangeError',
        actual: Try(createBundle, [{ signatureOrMessage: new Int8Array(SIGNATURE_OR_MESSAGE_LENGTH - 1) }]),
        expected: new RangeError(errors.ILLEGAL_SIGNATURE_OR_MESSAGE_LENGTH),
    })

    assert({
        given: 'entries with signatureOrMessage of 0 length',
        should: 'throw RangeError',
        actual: Try(createBundle, [{ signatureOrMessage: new Int8Array(0) }]),
        expected: new RangeError(errors.ILLEGAL_SIGNATURE_OR_MESSAGE_LENGTH),
    })

    assert({
        given: 'entries with address of illegal length (< exact length)',
        should: 'throw RangeError',
        actual: Try(createBundle, [{ address: new Int8Array(ADDRESS_LENGTH - 1) }]),
        expected: new RangeError(errors.ILLEGAL_ADDRESS_LENGTH),
    })

    assert({
        given: 'entries with address of illegal length (> exact length)',
        should: 'throw RangeError',
        actual: Try(createBundle, [{ address: new Int8Array(ADDRESS_LENGTH + 1) }]),
        expected: new RangeError(errors.ILLEGAL_ADDRESS_LENGTH),
    })

    assert({
        given: 'entries with value of illegal length (> max length)',
        should: 'throw RangeError',
        actual: Try(createBundle, [{ value: new Int8Array(VALUE_LENGTH + 1) }]),
        expected: new RangeError(errors.ILLEGAL_VALUE_LENGTH),
    })

    assert({
        given: 'entries with obsoleteTag of illegal length (> max length)',
        should: 'throw RangeError',
        actual: Try(createBundle, [{ obsoleteTag: new Int8Array(OBSOLETE_TAG_LENGTH + 1) }]),
        expected: new RangeError(errors.ILLEGAL_OBSOLETE_TAG_LENGTH),
    })

    assert({
        given: 'entries with issuanceTimestamp of illegal length (> max length)',
        should: 'throw RangeError',
        actual: Try(createBundle, [{ issuanceTimestamp: new Int8Array(ISSUANCE_TIMESTAMP_LENGTH + 1) }]),
        expected: new RangeError(errors.ILLEGAL_ISSUANCE_TIMESTAMP_LENGTH),
    })

    assert({
        given: 'entries with tag of illegal length (> max length)',
        should: 'throw RangeError',
        actual: Try(createBundle, [{ tag: new Int8Array(TAG_LENGTH + 1) }]),
        expected: new RangeError(errors.ILLEGAL_TAG_LENGTH),
    })

    assert({
        given: 'valid entries',
        should: 'produce correct interim bundle',
        actual: actualInterimBundle,
        expected: expectedInterimBundle,
    })

    assert({
        given: 'empty entries',
        should: 'produce empty interim bundle',
        actual: createBundle([{}]),
        expected: new Int8Array(TRANSACTION_LENGTH),
    })

    assert({
        given: 'no entries',
        should: 'produce no bundle',
        actual: createBundle(),
        expected: new Int8Array(0),
    })
})

describe('addEntry(bundle: Int8Array, entry: Partial<BundleEntry>)', async assert => {
    assert({
        given: 'given bundle of length that is not multiple of transaction length',
        should: 'throw RangeError',
        actual: Try(addEntry, new Int8Array(TRANSACTION_LENGTH - 1), entries[0]),
        expected: new RangeError(errors.ILLEGAL_TRANSACTION_BUFFER_LENGTH),
    })

    assert({
        given: 'entry with signatureOrMessage of length that is not multiple of fragment length',
        should: 'throw RangeError',
        actual: Try(addEntry, new Int8Array(0), {
            signatureOrMessage: new Int8Array(SIGNATURE_OR_MESSAGE_LENGTH - 1),
        }),
        expected: new RangeError(errors.ILLEGAL_SIGNATURE_OR_MESSAGE_LENGTH),
    })

    assert({
        given: 'entry with signatureOrMessage of 0 length',
        should: 'throw RangeError',
        actual: Try(addEntry, new Int8Array(0), { signatureOrMessage: new Int8Array(0) }),
        expected: new RangeError(errors.ILLEGAL_SIGNATURE_OR_MESSAGE_LENGTH),
    })

    assert({
        given: 'entry with address of illegal length (< exact length)',
        should: 'throw RangeError',
        actual: Try(addEntry, new Int8Array(0), { address: new Int8Array(ADDRESS_LENGTH - 1) }),
        expected: new RangeError(errors.ILLEGAL_ADDRESS_LENGTH),
    })

    assert({
        given: 'entry with address of illegal length (> exact length)',
        should: 'throw RangeError',
        actual: Try(addEntry, new Int8Array(0), { address: new Int8Array(ADDRESS_LENGTH + 1) }),
        expected: new RangeError(errors.ILLEGAL_ADDRESS_LENGTH),
    })

    assert({
        given: 'entry with value of illegal length (> max length)',
        should: 'throw RangeError',
        actual: Try(addEntry, new Int8Array(0), { value: new Int8Array(VALUE_LENGTH + 1) }),
        expected: new RangeError(errors.ILLEGAL_VALUE_LENGTH),
    })

    assert({
        given: 'entry with obsoleteTag of illegal length (> max length)',
        should: 'throw RangeError',
        actual: Try(addEntry, new Int8Array(0), {
            obsoleteTag: new Int8Array(OBSOLETE_TAG_LENGTH + 1),
        }),
        expected: new RangeError(errors.ILLEGAL_OBSOLETE_TAG_LENGTH),
    })

    assert({
        given: 'entry with issuanceTimestamp of illegal length (> max length)',
        should: 'throw RangeError',
        actual: Try(addEntry, new Int8Array(0), {
            issuanceTimestamp: new Int8Array(ISSUANCE_TIMESTAMP_LENGTH + 1),
        }),
        expected: new RangeError(errors.ILLEGAL_ISSUANCE_TIMESTAMP_LENGTH),
    })

    assert({
        given: 'entry with tag of illegal length (> max length)',
        should: 'throw RangeError',
        actual: Try(addEntry, new Int8Array(0), { ...entries[0], tag: new Int8Array(TAG_LENGTH + 1) }),
        expected: new RangeError(errors.ILLEGAL_TAG_LENGTH),
    })

    assert({
        given: 'valid entry',
        should: 'produce correct interim bundle',
        actual: addEntry(actualInterimBundlePartial, entries[entries.length - 1]),
        expected: expectedInterimBundle,
    })

    assert({
        given: 'empty entry',
        should: 'do nothing',
        actual: addEntry(new Int8Array(0), {}),
        expected: new Int8Array(TRANSACTION_LENGTH),
    })
})

describe('finalizeBundle(bundle: Int8Array)', async assert => {
    assert({
        given: 'given bundle of 0 length',
        should: 'throw RangeError',
        actual: Try(finalizeBundle, new Int8Array(0)),
        expected: new RangeError(errors.ILLEGAL_TRANSACTION_BUFFER_LENGTH),
    })

    assert({
        given: 'given bundle of length that is not multiple of transaction length',
        should: 'throw RangeError',
        actual: Try(finalizeBundle, new Int8Array(TRANSACTION_LENGTH - 1)),
        expected: new RangeError(errors.ILLEGAL_TRANSACTION_BUFFER_LENGTH),
    })

    assert({
        given: 'valid interim bundle',
        should: 'produce correct final bundle',
        actual: actualFinalBundle,
        expected: expectedFinalBundle,
    })

    assert({
        given: 'insecure bundle (normalized bundle hash contains value 13)',
        should: 'increment obsolete tag and recompute bundle hash',
        actual: {
            insecureInterimBundle:
                normalizedBundle(bundleHash(actualInterimBundle)).indexOf(MAX_TRYTE_VALUE /* 13 */) > -1,
            secureFinalBundle: normalizedBundle(bundle(actualFinalBundle)).indexOf(MAX_TRYTE_VALUE /* 13 */) === -1,
            obsoleteTag: obsoleteTagCopy(actualFinalBundle),
        },
        expected: {
            insecureInterimBundle: true,
            secureFinalBundle: true,
            obsoleteTag: trytesToTrits('EF9999999999999999999999999'),
        },
    })
})

describe('addSignatureOrMessage(bundle: Int8Array, signatureOrMessage: Int8Array, index: number)', async assert => {
    assert({
        given: 'given bundle of 0 length',
        should: 'throw RangeError',
        actual: Try(addSignatureOrMessage, new Int8Array(0), new Int8Array(SIGNATURE_OR_MESSAGE_LENGTH), 0),
        expected: new RangeError(errors.ILLEGAL_TRANSACTION_BUFFER_LENGTH),
    })

    assert({
        given: 'given bundle of length that is not multiple of transaction length',
        should: 'throw RangeError',
        actual: Try(
            addSignatureOrMessage,
            new Int8Array(TRANSACTION_LENGTH - 1),
            new Int8Array(SIGNATURE_OR_MESSAGE_LENGTH),
            0
        ),
        expected: new RangeError(errors.ILLEGAL_TRANSACTION_BUFFER_LENGTH),
    })

    assert({
        given: 'given signatureOrMessage of length that is not multiple of fragment length',
        should: 'throw RangeError',
        actual: Try(
            addSignatureOrMessage,
            new Int8Array(TRANSACTION_LENGTH),
            new Int8Array(SIGNATURE_OR_MESSAGE_LENGTH - 1),
            0
        ),
        expected: new RangeError(errors.ILLEGAL_SIGNATURE_OR_MESSAGE_LENGTH),
    })

    assert({
        given: 'given signatureOrMessage of 0 length',
        should: 'throw RangeError',
        actual: Try(addSignatureOrMessage, new Int8Array(TRANSACTION_LENGTH), new Int8Array(0), 0),
        expected: new RangeError(errors.ILLEGAL_SIGNATURE_OR_MESSAGE_LENGTH),
    })

    assert({
        given: 'index = undefined',
        should: 'throw TypeError',
        actual: Try(
            addSignatureOrMessage,
            new Int8Array(TRANSACTION_LENGTH),
            new Int8Array(SIGNATURE_OR_MESSAGE_LENGTH),
            undefined as any
        ),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_INDEX),
    })

    assert({
        given: 'index = NaN',
        should: 'throw TypeError',
        actual: Try(
            addSignatureOrMessage,
            new Int8Array(TRANSACTION_LENGTH),
            new Int8Array(SIGNATURE_OR_MESSAGE_LENGTH),
            NaN as any
        ),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_INDEX),
    })

    assert({
        given: 'index = null',
        should: 'throw TypeError',
        actual: Try(
            addSignatureOrMessage,
            new Int8Array(TRANSACTION_LENGTH),
            new Int8Array(SIGNATURE_OR_MESSAGE_LENGTH),
            null as any
        ),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_INDEX),
    })

    assert({
        given: 'index = Infinity',
        should: 'throw TypeError',
        actual: Try(
            addSignatureOrMessage,
            new Int8Array(TRANSACTION_LENGTH),
            new Int8Array(SIGNATURE_OR_MESSAGE_LENGTH),
            Infinity
        ),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_INDEX),
    })

    assert({
        given: 'index = "0" (string)',
        should: 'throw TypeError',
        actual: Try(
            addSignatureOrMessage,
            new Int8Array(TRANSACTION_LENGTH),
            new Int8Array(SIGNATURE_OR_MESSAGE_LENGTH),
            '0' as any
        ),
        expected: new TypeError(errors.ILLEGAL_TRANSACTION_INDEX),
    })

    assert({
        given: 'out-of-range index (< 0)',
        should: 'throw TypeError',
        actual: Try(
            addSignatureOrMessage,
            new Int8Array(TRANSACTION_LENGTH),
            new Int8Array(SIGNATURE_OR_MESSAGE_LENGTH),
            -1
        ),
        expected: new RangeError(errors.ILLEGAL_TRANSACTION_INDEX),
    })

    assert({
        given: 'out-of-range index (> 0)',
        should: 'throw RangeError',
        actual: Try(
            addSignatureOrMessage,
            new Int8Array(TRANSACTION_LENGTH * 3),
            new Int8Array(SIGNATURE_OR_MESSAGE_LENGTH * 2),
            2
        ),
        expected: new RangeError(errors.ILLEGAL_TRANSACTION_INDEX),
    })

    assert({
        given: 'valid final bundle',
        should: 'produce correct signed bundle',
        actual: tritsToTrytes(await actualFinalSignedBundle),
        expected: tritsToTrytes(expectedFinalSignedBundle),
    })
})
