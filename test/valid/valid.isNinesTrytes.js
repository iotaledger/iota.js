var chai = require('chai');
var assert = chai.assert;
var valid = require('../../lib/utils/inputValidator');


describe('valid.isNinesTrytes', function() {

    var tests = [
        '999999999999999999',
        'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSJMPIVGPNE',
        1432432

    ]

    // 0 test
    it('should be valid isNinesTrytes: ' + tests[0], function() {

        var isValid = valid.isNinesTrytes(tests[0]);
        assert.isTrue(isValid);
    })

    // 1 test
    it('should be invalid isNinesTrytes: ' + tests[1], function() {

        var isValid = valid.isNinesTrytes(tests[1]);
        assert.isFalse(isValid);
    })

    // 2 test
    it('should be invalid isNinesTrytes: ' + tests[2], function() {

        var isValid = valid.isNinesTrytes(tests[2]);
        assert.isFalse(isValid);
    })

});
