var chai = require('chai');
var assert = chai.assert;
var Utils = require('../../lib/utils/utils.js');

describe('utils.checksum', function() {

    var tests = [
        {
            addressWithChecksum: 'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLSJMPIVGPNE'
        },
        {
            addressWithChecksum: 'VHMZUFRICSIFKLCVRHHNFJHJFRYERVXPIXNOTBMKBMEVBBMVMDWBNDAFKAJUZVYOBBRLFBHQSUAKPBOTSMFGZELQSS'
        },
    ]

    tests.forEach(function(test) {

        it('should validate checksum: ' + test.addressWithChecksum, function() {

            var isValidChecksum = Utils.isValidChecksum(test.addressWithChecksum);

            assert.equal(isValidChecksum, true);
        });
    })
});
