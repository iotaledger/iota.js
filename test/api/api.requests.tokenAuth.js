var chai = require('chai');
var assert = chai.assert;
var sinon = require('sinon');
var proxy = require('proxyquire');

proxy('../../lib/utils/makeRequest', {
   xmlhttprequest: {
       XMLHttpRequest: sinon.useFakeXMLHttpRequest()
   } 
})

var IOTA = require('../../lib/iota');

describe('api, when sending requests with host, port, and token auth', function() {
    var iota;
    var xhr;
    var requests;

    before(function(done) {
        xhr = sinon.useFakeXMLHttpRequest();
        xhr.onCreate = function(req) {
            requests.push(req);
        };

        requests = [];

        iota = new IOTA({
            host: 'http://iota.org',
            port: 14500,
            token: 'hashedtoken'
        });

        iota.api.getNodeInfo(done);

        requests[0].respond(200, { "Content-Type": "application/json" }, '{ "id": 12, "comment": "Hey there" }');
    })

    after(function() {
        xhr.restore()
    })

    it('should have the proper url', function() {
        assert.equal(requests[0].url, 'http://iota.org:14500');
    });

    it('should properly set token auth header', function() {
        assert.equal(requests[0].requestHeaders['Authorization'], 'token hashedtoken')
    })
});
