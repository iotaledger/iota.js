var chai = require('chai');
var assert = chai.assert;
var valid = require('../../lib/utils/inputValidator');


describe('valid.isValue', function() {

    var tests = [
        1234432,
        '12344321',
        11234.0001,
        -130500,
        '12432.04321'

    ]

    // 0 test
    it('should be valid isValue: ' + tests[0], function() {

        var isValid = valid.isValue(tests[0]);
        assert.isTrue(isValid);
    })

    // 1 test
    it('should be invalid isValue: ' + tests[1], function() {

        var isValid = valid.isValue(tests[1]);
        assert.isFalse(isValid);
    })

    // 2 test
    it('should be invalid isValue: ' + tests[2], function() {

        var isValid = valid.isValue(tests[2]);
        assert.isFalse(isValid);
    })

    // 3 test
    it('should be invalid isValue: ' + tests[3], function() {

        var isValid = valid.isValue(tests[3]);
        assert.isTrue(isValid);
    })

    // 4 test
    it('should be invalid isValue: ' + tests[4], function() {

        var isValid = valid.isValue(tests[4]);
        assert.isFalse(isValid);
    })

});
