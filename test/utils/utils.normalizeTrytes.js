var chai = require('chai');
var assert = chai.assert;
var Utils = require('../../lib/utils/asciiToTrytes.js');

describe('utils.normalizeTrytes', function() {

    var tests = [
        {
            original: 'UYEEERFQYTPFA',
            valid: 'UYEEERFQYTPFA9'
        },
        {
            original: 'UYEEERFQYTPFA9',
            valid: 'UYEEERFQYTPFA9'
        }
    ]

    tests.forEach(function(test) {

        it('should normalize tryte: ' + test.original, function() {

            var normalizedTryte = Utils.normalizeTrytes(test.original);

            assert.equal(normalizedTryte, test.valid);
        });
    })
});
