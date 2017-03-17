var chai = require('chai');
var assert = chai.assert;
var valid = require('../lib/utils/inputValidator');


describe('valid.isInt', function() {

    var tests = [
        'AFDS',
        '1234',
        432.4321,
        1234
    ]

    // 0 test
    it('should be invalid isInt: 0', function() {

        var isInt = valid.isInt(tests[0]);
        assert.isFalse(isInt);
    })

    // 1 test
    it('should be invalid isInt: 1', function() {

        var isInt = valid.isInt(tests[1]);
        assert.isFalse(isInt);
    })

    // 2 test
    it('should be valid isInt: 2', function() {

        var isInt = valid.isInt(tests[2]);
        assert.isTrue(isInt);
    })

    // 3 test
    it('should be valid isInt: 2', function() {

        var isInt = valid.isInt(tests[3]);
        assert.isTrue(isInt);
    })

});
