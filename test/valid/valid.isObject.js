var chai = require('chai');
var assert = chai.assert;
var valid = require('../../lib/utils/inputValidator');


describe('valid.isObject', function() {
    var positives = [
        {},
        { foo: '' }
    ];

    var negatives = [
        null,
        undefined,
        'foo',
        []
    ];

    positives.forEach(function (test) {
        it('should be a valid object', function() {
            var isObject = valid.isObject(test);
            assert.isTrue(isObject);
        })
    });

    negatives.forEach(function (test) {
        it('should be an invalid object', function() {
            var isObject = valid.isObject(test);
            assert.isFalse(isObject);
        })
    });
});
