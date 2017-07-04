var chai = require('chai');
var assert = chai.assert;
var valid = require('../../lib/utils/inputValidator');


describe('valid.isString', function() {

    var tests = [
        'AFDS',
        '1234',
        1234
    ]

    // 0 test
    it('should be valid isString: 0', function() {

        var isString = valid.isString(tests[0]);
        assert.isTrue(isString);
    })

    // 1 test
    it('should be valid isString: 1', function() {

        var isString = valid.isString(tests[1]);
        assert.isTrue(isString);
    })

    // 2 test
    it('should be invalid isString: 2', function() {

        var isString = valid.isString(tests[2]);
        assert.isFalse(isString);
    })

});
