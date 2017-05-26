var chai = require('chai');
var assert = chai.assert;
var Converter = require('../../lib/crypto/converter');


describe('converter.fromValue', function() {

    var tests = [
        { 
            value: 1,
            expected: [1]
        },
        { 
            value: 3,
            expected: [0, 1]
        },
        { 
            value: 2,
            expected: [-1, 1]
        },
        { 
            value: -3,
            expected: [0, -1]
        },
        { 
            value: -2,
            expected: [1, -1]
        },
    ]

    tests.forEach(function(test) {

        it('should convert: ' + test.value + ' to ' + test.expected, function() {

            var converted = Converter.fromValue(test.value);

            assert.deepEqual(converted, test.expected);
        });
    })
});
