var chai = require('chai');
var assert = chai.assert;
var valid = require('../../lib/utils/inputValidator');


describe('valid.isTrytes', function() {

    var tests = [
        'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSJMPIVGPNE',
        '123adfdsafLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLASD',
        1432432,
        Array(0, 12, 99, 120),
        Array("A", "B", true),
        Array()
    ]

    // 0 test
    it('should be valid trytes: ' + tests[0], function() {

        var isValid = valid.isTrytes(tests[0]);
        assert.isTrue(isValid);
    })

    // 1 test
    it('should be invalid trytes: ' + tests[1], function() {

        var isValid = valid.isTrytes(tests[1]);
        assert.isFalse(isValid);
    })

    // 2 test
    it('should be invalid trytes: ' + tests[2], function() {

        var isValid = valid.isTrytes(tests[2]);
        assert.isFalse(isValid);
    })

    // 3 test
    it('should be valid trytes: ' + tests[3], function() {

        var isValid = valid.isTrytes(tests[3]);
        assert.isTrue(isValid);
    })

    // 4 test
    it('should be invalid trytes: ' + tests[4], function() {

        var isValid = valid.isTrytes(tests[4]);
        assert.isFalse(isValid);
    })

    // 5 test
    it('should be invalid trytes: ' + tests[5], function() {

        var isValid = valid.isTrytes(tests[5]);
        assert.isFalse(isValid);
    })

});
