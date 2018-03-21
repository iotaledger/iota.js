import test from 'ava'
import { validateSignatures } from '../../lib/utils/validateSignatures'
import { bundle, bundleWithInvalidSignature, bundleWithInvalidTransactionOrder } from '../samples/bundle'

test('validateSignatures() returns true for bundle with valid signatures.', t => {
    t.is(
      validateSignatures(bundle),
      true,
      'validateSignatures() should return true for bundle with valid signatures.'
    )

    t.is(
      validateSignatures(bundleWithInvalidTransactionOrder),
      true,
      'validateSignatures() should return true for bundle with valid signatures but invalid trasnaction order.'
    )
})

test('validateSignatures() returns false for bundle with invalid signatures.', t => {
    t.is(
      validateSignatures(bundleWithInvalidSignature),
      false,
      'validateSignatures() should return false for bundle with invalid signatures.'
    )
})
