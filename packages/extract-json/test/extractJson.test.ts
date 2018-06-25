import test from 'ava'
import {
    bundleWithEmptyJSON,
    bundleWithInvalidJSON,
    bundleWithJSON,
    bundleWithMultipleJSONMessageFragments,
    parsedJSON,
    parsedJSONOfMultipleMessageFragments,
} from '@iota/samples'
import { extractJson, errors } from '../src'

test('extractJson() parses JSON object.', t => {
    t.is(
        extractJson(bundleWithJSON),
        parsedJSON,
        'extractJson() should return parsed object for bundle with valid tryte encoded JSON.'
    )
})

test('extractJson() parses JSON object over multiple signature message fragments.', t => {
    t.is(
        extractJson(bundleWithMultipleJSONMessageFragments),
        parsedJSONOfMultipleMessageFragments,
        'extractJson() should return parsed object for bundle with valid tryte encoded JSON in multiple message fragments.'
    )
})

test('extractJson() parses empty JSON object.', t => {
    t.is(
        extractJson(bundleWithEmptyJSON),
        '{}',
        'extractJson() should return empty object for bundle with empty tryte encoded JSON.'
    )
})

test('extraJson() parses boolean values.', t => {
    t.is(
        extractJson(
            bundleWithEmptyJSON.map(tx => ({
                ...tx,
                signatureMessageFragment: 'UCPC9DGDTC' + '9'.repeat(81 * 27 - 10),
            }))
        ),
        'false',
        'extractJson() should parse "false" boolean values.'
    )

    t.is(
        extractJson(
            bundleWithEmptyJSON.map(tx => ({ ...tx, signatureMessageFragment: 'HDFDIDTC' + '9'.repeat(81 * 27 - 8) }))
        ),
        'true',
        'extractJson() should parse "true" boolean values.'
    )
})

test('extraJson() parses string values.', t => {
    t.is(
        extractJson(
            bundleWithEmptyJSON.map(tx => ({
                ...tx,
                signatureMessageFragment: 'GAWCTC9D9DCDFAGA' + '9'.repeat(81 * 27 - 16),
            }))
        ),
        JSON.stringify('hello!'),
        'extractJson() should parse string values.'
    )
})

test('extraJson() parses JSON arrays.', t => {
    t.is(
        extractJson(
            bundleWithEmptyJSON.map(tx => ({
                ...tx,
                signatureMessageFragment: 'JCVAQAWAQAGAHDWCFDTCTCFAGALC' + '9'.repeat(81 * 27 - 28),
            }))
        ),
        JSON.stringify([1, 2, 'three!']),
        'extractJson() should parse arrays.'
    )
})

test('extraJson() parses null.', t => {
    t.is(
        extractJson(
            bundleWithEmptyJSON.map(tx => ({ ...tx, signatureMessageFragment: 'BDID9D9D' + '9'.repeat(81 * 27 - 8) }))
        ),
        JSON.stringify(null),
        'extractJson() should parse null.'
    )
})

test('extractJson() throws error for invalid bundle.', t => {
    t.is(
        t.throws(() => extractJson([]), Error).message,
        errors.INVALID_BUNDLE,
        'extractJson() should throw correct error for invalid bundle.'
    )
})

test('extractJson() throws error for invalid bundle.', t => {
    t.is(
        t.throws(() => extractJson([]), Error).message,
        errors.INVALID_BUNDLE,
        'extractJson() should throw correct error for invalid bundle.'
    )
})

test('extractJson() throws error for invalid JSON.', t => {
    t.is(
        t.throws(() => extractJson(bundleWithInvalidJSON), Error).message,
        errors.INVALID_JSON,
        'extractJson() should throw correct error for invalid JSON.'
    )
})
