var chai = require('chai');
var assert = chai.assert;
var valid = require('../../lib/utils/inputValidator');


describe('valid.isTransfersArray', function() {

    var tests = [
        [{
            address: 'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSJMPIVGPNE',
            value: 1234,
        }],
        [{
            address: 'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSJMPIVGPNE',
            value: 1234.00,
            message: 'AFDSA',
            tag: 'ASDFDSAFDFDSA'
        }],
        [{
            address: 'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSJMP',
            value: '1234',
            message: 'AFDSA',
            tag: 'ASDFDSAFDFDSA'
        }],
        {
            address: 'JALLWDTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSJMP',
            value: 1234,
            message: 'AFDSA',
            tag: 'ASDFDSAFDFDSA'
        }
    ]

    // 0 test
    it('should be invalid isTransfersArray: 0', function() {

        var isTransfersArray = valid.isTransfersArray(tests[0]);
        assert.isFalse(isTransfersArray);
    })

    // 1 test
    it('should be valid isTransfersArray: 1', function() {

        var isTransfersArray = valid.isTransfersArray(tests[1]);
        assert.isTrue(isTransfersArray);
    })

    // 2 test
    it('should be invalid isTransfersArray: 2', function() {

        var isTransfersArray = valid.isTransfersArray(tests[2]);
        assert.isFalse(isTransfersArray);
    })

    // 3 test
    it('should be invalid isTransfersArray: 3', function() {

        var isTransfersArray = valid.isTransfersArray(tests[3]);
        assert.isFalse(isTransfersArray);
    })
});
