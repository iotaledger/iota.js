var chai = require('chai');
var assert = chai.assert;
var valid = require('../../lib/utils/inputValidator');


describe('valid.isNum', function() {

    var tests = [
        'AFDS',
        '1234',
        432.4321,
        1234
    ]

    // 0 test
    it('should be invalid isNum: 0', function() {

        var isNum = valid.isNum(tests[0]);
        assert.isFalse(isNum);
    })

    // 1 test
    it('should be invalid isNum: 1', function() {

        var isNum = valid.isNum(tests[1]);
        assert.isTrue(isNum);
    })

    // 2 test
    it('should be valid isNum: 2', function() {

        var isNum = valid.isNum(tests[2]);
        assert.isTrue(isNum);
    })

    // 3 test
    it('should be valid isNum: 2', function() {

        var isNum = valid.isNum(tests[3]);
        assert.isTrue(isNum);
    })

});
