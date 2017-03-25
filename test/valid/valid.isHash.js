var chai = require('chai');
var assert = chai.assert;
var valid = require('../../lib/utils/inputValidator');


describe('valid.isHash', function() {

    var tests = [
        'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSJMPIVGPNE',
        'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLS',
        '123adfdsafLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLASD',
        1432432

    ]

    // 0 test
    it('should be invalid hash: ' + tests[0], function() {

        var isHash = valid.isHash(tests[0]);
        assert.isFalse(isHash);
    })

    // 1 test
    it('should be valid hash: ' + tests[1], function() {

        var isHash = valid.isHash(tests[1]);
        assert.isTrue(isHash);
    })

    // 2 test
    it('should be invalid hash: ' + tests[2], function() {

        var isHash = valid.isHash(tests[2]);
        assert.isFalse(isHash);
    })

    // 3 test
    it('should be invalid hash: ' + tests[3], function() {

        var isHash = valid.isHash(tests[3]);
        assert.isFalse(isHash);
    })

});
