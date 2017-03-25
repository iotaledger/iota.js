var chai = require('chai');
var assert = chai.assert;
var valid = require('../../lib/utils/inputValidator');


describe('valid.isArrayOfHashes', function() {

    var tests = [
        [
            'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSJMPIVGPNE',
            'ABCDWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQRVNLLSJ'
        ],
        [
            'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSJMPIVGPNE',
            'fdsafBCDWDUOSTSJEEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQRVNLLSJ'
        ],
        'ABCDWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQRVNLLSJ',
        {
            address: 'JALLWDTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSJMP'
        }
    ]

    // 0 test
    it('should be valid isArrayOfHashes: 0', function() {

        var isArrayOfHashes = valid.isArrayOfHashes(tests[0]);
        assert.isTrue(isArrayOfHashes);
    })

    // 1 test
    it('should be invalid isArrayOfHashes: 1', function() {

        var isArrayOfHashes = valid.isArrayOfHashes(tests[1]);
        assert.isFalse(isArrayOfHashes);
    })

    // 2 test
    it('should be invalid isArrayOfHashes: 2', function() {

        var isArrayOfHashes = valid.isArrayOfHashes(tests[2]);
        assert.isFalse(isArrayOfHashes);
    })

    // 3 test
    it('should be invalid isArrayOfHashes: 3', function() {

        var isArrayOfHashes = valid.isArrayOfHashes(tests[3]);
        assert.isFalse(isArrayOfHashes);
    })
});
