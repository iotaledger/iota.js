var chai = require('chai');
var assert = chai.assert;
var Api = require('../../lib/api/api.js');

describe('api.prepareTransfers', function() {

    var tests = [
        {
            seed: 'JALLWDUOSTSJVL9EEHKW9YQFPBVBJAGLNKRVGSQZCGHQWEMIIILJMTHVAGVDXJVZMBAMOZTSBQNRVNLLS',
            transfers: [{
                address: 'ASASDFASDFASDFASDFASDFASDFASDFASDFASDFASDFASDFASDFASDFASDFASDFASDFASDFASDFASDFASD',
                value: 10,
                message: 'HEREISMYMESSAGE',
                tag: '9TAGALLTHEWAY'
            }],
            options: {
                inputs: [{
                    address: '99ASDFE9ASDFE9ASDFE9ASDFE9ASDFE9ASDFE9ASDFE9ASDFE9ASDFE9ASDFE9ASDFE9ASDFE9ASDFE9A',
                    keyIndex: 3,
                    security: 1
                }],
                address: '99ASDLKJ9ASDLKJ9ASDLKJ9ASDLKJ9ASDLKJ9ASDLKJ9ASDLKJ9ASDLKJ9ASDLKJ9ASDLKJ9ASDLKJ9AR',
                security: 1,
                hmacKey: '9AOIWEUROIADSFJWEAOZXC9AWERSDVHWEJHVYOU9XCVLKJWQOQPOIUREJKDF99AOIWEUROIADSFJWEAOZ',
            }
        },
    ]

    tests.forEach(function(test) {

        it('should create transfers with hmac key: ' + test.options.hmacKey, function() {
            var api = new Api();
            api.getBalances = (inputs, limit, callback) => callback(null, {balances: test.transfers.map(t => t.value)})
            var copyTransfers = (transfers) => transfers.map(t => {
                return {address:t.address, value: t.value, message: t.message, tag: t.tag}
            });
            api.prepareTransfers(test.seed, copyTransfers(test.transfers), test.options, (error, result) => {
                console.log(error);
                console.log(result);
                test.options.hmacKey = undefined;
                api.prepareTransfers(test.seed, copyTransfers(test.transfers), test.options, (err, res) => {
                    console.log(err);
                    console.log(res);
                    assert.notEqual(result[1].substr(0,81), res[1].substr(0,81));
                    assert.equal(result[1].substr(81,81), res[1].substr(0,81));
                });
            });
        });
    })
});
