var chai = require('chai');
var assert = chai.assert;
var valid = require('../lib/utils/inputValidator');


describe('valid.isDecimal', function() {

    var tests = [
        1234432,
        '12344321',
        11234.0001,
        '12432.04321'

    ]

    // 0 test
    it('should be valid isDecimal: ' + tests[0], function() {

        var isValid = valid.isDecimal(tests[0]);
        assert.isTrue(isValid);
    })

    // 1 test
    it('should be valid isDecimal: ' + tests[1], function() {

        var isValid = valid.isDecimal(tests[1]);
        assert.isTrue(isValid);
    })

    // 2 test
    it('should be valid isDecimal: ' + tests[2], function() {

        var isValid = valid.isDecimal(tests[2]);
        assert.isTrue(isValid);
    })

    // 3 test
    it('should be valid isDecimal: ' + tests[3], function() {

        var isValid = valid.isDecimal(tests[3]);
        assert.isTrue(isValid);
    })

});
