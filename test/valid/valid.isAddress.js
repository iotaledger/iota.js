var chai = require('chai');
var assert = chai.assert;
var valid = require('../../lib/utils/inputValidator');


describe('valid.isAddress', function() {

    var tests = [
        'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSJMPIVGPNE',
        'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLS',
        'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSASD',
        '123adfdsafLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLASD',
        1432432

    ]

    // 0 test
    it('should be valid address: ' + tests[0], function() {

        var isAddress = valid.isAddress(tests[0]);
        assert.isTrue(isAddress);
    })

    // 1 test
    it('should be valid address: ' + tests[1], function() {

        var isAddress = valid.isAddress(tests[1]);
        assert.isTrue(isAddress);
    })

    // 2 test
    it('should be invalid address: ' + tests[2], function() {

        var isAddress = valid.isAddress(tests[2]);
        assert.isFalse(isAddress);
    })

    // 3 test
    it('should be invalid address: ' + tests[3], function() {

        var isAddress = valid.isAddress(tests[3]);
        assert.isFalse(isAddress);
    })

    // 4 test
    it('should be invalid address: ' + tests[4], function() {

        var isAddress = valid.isAddress(tests[4]);
        assert.isFalse(isAddress);
    })

});
