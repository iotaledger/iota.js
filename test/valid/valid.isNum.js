var chai = require('chai');
var assert = chai.assert;
var valid = require('../../lib/utils/inputValidator');


describe('valid.isNum', function() {

    var validNumbers = [
      10.190,
      '102.91',
      1234,
      432.4321,
      -100,
      -10.29,
      '-10.2111'
    ]

    var invalidNumbers = [
      'AFDS',
      '-100-11.100',
      '100.-01',
      '10-1'
    ]

    for(n of invalidNumbers) {
      (function(n) {
        it('should be invalid: ' + n, function() {
            var isNum = valid.isNum(n);
            assert.isFalse(isNum);
        })
      })(n)
    }

    for(n of validNumbers) {
      (function(n) {
        it('should be valid: ' + n, function() {
            var isNum = valid.isNum(n);
            assert.isTrue(isNum);
        })
      })(n)
    }

});
