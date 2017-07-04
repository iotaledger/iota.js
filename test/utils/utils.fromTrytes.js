var chai = require('chai');
var assert = chai.assert;
var Utils = require('../../lib/utils/utils.js');


describe('utils.fromTrytes', function() {

    var tests = [
        {
            message: " ASDFDSAFDSAja9fd",
            expected: true
        },
        {
            message: "994239432",
            expected: true
        },
        {
            message: "{ 'a' : 'b', 'c': 'd', 'e': '#asdfd?$' }",
            expected: true
        },
        {
            message: "{ 'a' : 'b', 'c': {'nested': 'json', 'much': 'wow', 'array': [ true, false, 'yes' ] } }",
            expected: true
        },
        {
            message: 994239432,
            expected: false
        },
        {
            message: 'true',
            expected: true
        },
        {
            message: Array(9, 'yes', true),
            expected: false
        },
        {
            message: { 'a' : 'b' },
            expected: false
        }
    ]

    tests.forEach(function(test) {

        it('should convert trytes to string and back. Test: ' + test.message + ' with result: ' + test.expected, function() {

            var trytes = Utils.toTrytes(test.message);

            var toString = Utils.fromTrytes(trytes);

            if (test.expected) {

                assert.strictEqual(toString, test.message);

            } else {

                assert.isNull(toString);

            }
        });

    })
});
