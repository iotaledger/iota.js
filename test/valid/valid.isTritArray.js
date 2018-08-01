var chai = require('chai')
var assert = chai.assert
var inputValidator = require('../../lib/utils/inputValidator.js')
var isTritArray = inputValidator.isTritArray

describe('utils.isTransactionHash', function () {
  it('should return true for input of Array type', function () {
    assert.strictEqual(isTritArray([-1, 0, 1]), true)
  })

  it('should return true for input of Int8Array type', function () {
    assert.strictEqual(isTritArray(new Int8Array(1).fill(1)), true)
  })

  it('should return false for input of invalid trits', function () {
    assert.strictEqual(isTritArray([-1, 0, 2]), false)
    assert.strictEqual(isTritArray(new Int8Array(1).fill(2)), false)
  })

  it('should return true for empty array and unspecified length', function () {
    assert.strictEqual(isTritArray([]), true)
  })

  it('should return true for length that match', function () {
    assert.strictEqual(isTritArray([1], 1), true)
  })

  it('should return false if lengths do not match', function () {
    assert.strictEqual(isTritArray([1, -1, 0], 4), false)
    assert.strictEqual(isTritArray([1, -1, 0], 2), false)
  })
})
