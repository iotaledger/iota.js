var chai = require('chai');
var assert = chai.assert;
var valid = require('../../lib/utils/inputValidator');


describe('valid.isSafeString', function() {

    var tests = ['a', '$', '£', '€', '∑']

    // 0 test
    it('should be a safe string: ' + tests[0], function() {

        var isValid = valid.isSafeString(tests[0]);
        assert.isTrue(isValid);
    })

    // 1 test
    it('should be a safe string: ' + tests[1], function() {

        var isValid = valid.isSafeString(tests[1]);
        assert.isTrue(isValid);
    })

    // 2 test
    it('should not be a safe string: ' + tests[2], function() {

        var isValid = valid.isSafeString(tests[2]);
        assert.isFalse(isValid);
    })

    // 3 test
    it('should not be a safe string: ' + tests[3], function() {

        var isValid = valid.isSafeString(tests[3]);
        assert.isFalse(isValid);
    })

    // 4 test
    it('should not be a safe string: ' + tests[4], function() {

        var isValid = valid.isSafeString(tests[4]);
        assert.isFalse(isValid);
    })

});
