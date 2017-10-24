var chai = require('chai');
var assert = chai.assert;
var Utils = require('../../lib/utils/utils.js');


describe('utils.convertUnits', function() {

    var tests = [
        {
            value: 100,
            fromUnit: 'Gi',
            toUnit: 'i',
            expected: 100000000000
        },
        {
            value: 10.1,
            fromUnit: 'Gi',
            toUnit: 'i',
            expected: 10100000000
        },
        {
            value: '10.1000',
            fromUnit: 'Gi',
            toUnit: 'i',
            expected: 10100000000
        },
        {
            value: 1,
            fromUnit: 'i',
            toUnit: 'Ti',
            expected: 0.000000000001
        },
        {
            value: 1,
            fromUnit: 'Ti',
            toUnit: 'i',
            expected: 1000000000000
        },
        {
            value: 1000,
            fromUnit: 'Gi',
            toUnit: 'Ti',
            expected: 1
        },
        {
            value: 133.999111111,
            fromUnit: 'Gi',
            toUnit: 'i',
            expected: 133999111111
        }
    ]

    tests.forEach(function(test) {

        it('should convert: ' + test.value + ' ' + test.fromUnit + ' to ' + test.expected + ' ' + test.toUnit, function() {

            var converted = Utils.convertUnits(test.value, test.fromUnit, test.toUnit);

            assert.equal(converted, test.expected);
        });
    })
});
