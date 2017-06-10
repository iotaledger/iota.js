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
            api.getBalances = (inputs, limit, callback) => 
                callback(null, {
                    balances: test.transfers.map(t => t.value)
                })
            api.prepareTransfers(test.seed, test.transfers, test.options, (error, result) => {
                console.log(error);
                console.log(result);
                assert.notEqual(null, result);
            });
        });
    })
});
