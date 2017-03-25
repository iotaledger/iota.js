var chai = require('chai');
var assert = chai.assert;
var valid = require('../../lib/utils/inputValidator');


describe('valid.isUri', function() {

    var tests = [
        'udp://8.8.8.8:14265',
        'udp://[2001:db8:a0b:12f0::1]',
        'udp://domain2.com',
        'http://8.8.8.8:14265',
        1234
    ]

    // 0 test
    it('should be valid isUri: ' + tests[0], function() {

        var isUri = valid.isUri(tests[0]);
        assert.isTrue(isUri);
    })

    // 1 test
    it('should be valid isUri: ' + tests[1], function() {

        var isUri = valid.isUri(tests[1]);
        assert.isTrue(isUri);
    })

    // 2 test
    it('should be valid isUri: ' + tests[2], function() {

        var isUri = valid.isUri(tests[2]);
        assert.isTrue(isUri);
    })

    // 3 test
    it('should be invalid isUri: ' + tests[3], function() {

        var isUri = valid.isUri(tests[3]);
        assert.isFalse(isUri);
    })

    // 3 test
    it('should be invalid isUri: ' + tests[4], function() {

        var isUri = valid.isUri(tests[4]);
        assert.isFalse(isUri);
    })
});
