var chai = require('chai');
var assert = chai.assert;
var valid = require('../../lib/utils/inputValidator');


describe('valid.isInputs', function() {

    var tests = [
        [{
            address: 'JALLWDTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSJMP',
            security: 0,
            keyIndex: 1
        }],
        [{
            address: 'JALLWDTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSJMP',
            security: 'fd',
            keyIndex: 1
        }],
        [{
            address: 'JALLWDTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSJMP',
            security: 0,
            keyIndex: 'fds'
        }],
        [{
            address: 'JADTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSJMP',
            security: 0,
            keyIndex: 1
        }]
    ]

    // 0 test
    it('should be valid isInputs: 0', function() {

        var isInputs = valid.isInputs(tests[0]);
        assert.isTrue(isInputs);
    })

    // 1 test
    it('should be invalid isInputs: 1', function() {

        var isInputs = valid.isInputs(tests[1]);
        assert.isFalse(isInputs);
    })

    // 2 test
    it('should be invalid isInputs: 2', function() {

        var isInputs = valid.isInputs(tests[2]);
        assert.isFalse(isInputs);
    })

    // 3 test
    it('should be invalid isInputs: 3', function() {

        var isInputs = valid.isInputs(tests[3]);
        assert.isFalse(isInputs);
    })
});
