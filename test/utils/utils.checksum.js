var chai = require('chai');
var assert = chai.assert;
var Utils = require('../../lib/utils/utils.js');

describe('utils.checksum', function() {

    var tests = [
        {
            addressWithChecksum: 'UYEEERFQYTPFAHIPXDQAQYWYMSMCLMGBTYAXLWFRFFWPYFOICOVLK9A9VYNCKK9TQUNBTARCEQXJHD9VYXOEDEOMRC'
        }
    ]

    tests.forEach(function(test) {

        it('should validate checksum: ' + test.addressWithChecksum, function() {

            var isValidChecksum = Utils.isValidChecksum(test.addressWithChecksum);

            assert.equal(isValidChecksum, true);
        });
    })
});
