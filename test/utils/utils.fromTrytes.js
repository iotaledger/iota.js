var chai = require('chai');
var assert = chai.assert;
var Utils = require('../../lib/utils/utils.js');


describe('utils.fromTrytes', function() {

    var tests = [
        {
            message: "KB",
            expected: "A"
        },
        {
            message: "KBB",
            expected: false
        },
        {
            message: "KBZZ",
            expected: "A˘"
        },
        {
            message: "EAKBBCNBPBNBBCKBPBNBBCKBYCPCCBUCSC",
            expected: " ASDFDSAFDSAja9fd"
        },
        {
            message: "CBCBYAWAXACBYAXAWA",
            expected: "994239432"
        },
        {
            message: "ODEALAPCLAEADBEALAQCLAQAEALARCLADBEALASCLAQAEALATCLADBEALAHAPCGDSCUCSCIBIALAEAQD",
            expected: "{ 'a' : 'b', 'c': 'd', 'e': '#asdfd?$' }"
        },
        {
            message: "ODEALAPCLAEADBEALAQCLAQAEALARCLADBEAODLABDTCGDHDTCSCLADBEALAYCGDCDBDLAQAEALAADIDRCWCLADBEALAKDCDKDLAQAEALAPCFDFDPCMDLADBEAJCEAHDFDIDTCQAEAUCPC9DGDTCQAEALAMDTCGDLAEALCEAQDEAQD",
            expected: "{ 'a' : 'b', 'c': {'nested': 'json', 'much': 'wow', 'array': [ true, false, 'yes' ] } }"
        },
        {
            message: "AC1234",
            expected: false
        },
        {
            message: 994239432,
            expected: false
        },
        {
            message: 'HDFDIDTC',
            expected: "true"
        },
        {
            message: Array(9, 'yes', true),
            expected: false
        },
        {
            message: { 'a' : 'b' },
            expected: false
        }
    ]

    tests.forEach(function(test) {

        it('should convert from trytes to string and back. Test: ' + test.message + ', expecting result: ' + test.expected, function() {

            var toString = Utils.fromTrytes(test.message);

            var trytes = Utils.toTrytes(toString);

            if (test.expected) {

                assert.strictEqual(toString, test.expected);
                assert.strictEqual(trytes, test.message);

            } else {

                assert.isNull(toString);

            }
        });

    })
});
