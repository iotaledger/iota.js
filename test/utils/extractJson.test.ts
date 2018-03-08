import test from 'ava'
import { INVALID_TRYTE_ENCODED_JSON } from '../../lib/errors'
import { extractJson } from '../../lib/utils'
import {
    bundleWithEmptyJSON,
    bundleWithInvalidJSON,
    bundleWithJSON,
    bundleWithMultipleJSONMessageFragments,
    parsedJSON,
    parsedJSONOfMultipleMessageFragments
} from '../samples/bundle'


test('extractJson()', t => {
   t.is(
        extractJson(bundleWithJSON),
        parsedJSON,
        'extractJson() should return parsed object for bundle with valid tryte encoded JSON.'
    )

    t.is(
        extractJson(bundleWithMultipleJSONMessageFragments),
        parsedJSONOfMultipleMessageFragments,
        'extractJson() should return parsed object for bundle with valid tryte encoded JSON in multiple message fragments.'
    )

    t.is(
        extractJson(bundleWithEmptyJSON),
        '{}',
        'extractJson() should return empty object for bundle with empty tryte encoded JSON.'
    )
})
