var chai = require('chai');
var assert = chai.assert;
var API = require('../../lib/api/api');

describe('api.getBalances', function () {
    var api = new API();

    beforeEach(function () {
        API.prototype.sendCommand = function (command, callback) {
            return callback(null, command);
        }
    });

    describe('when called with four arguments', function () {
        describe('when invalid tips are provided', function () {
            it('should throw an error with message "Invalid Trytes provided"', function () {
                api.getBalances(['U'.repeat(81)], 100, ['0'], function (err) {
                    assert.equal(err.message, 'Invalid Trytes provided');
                });
            });
        });

        describe('when empty tips are provided', function () {
            it('should call "sendCommand" with an object not containing "tips" prop', function () {
                api.getBalances(['U'.repeat(81)], 100, [], function (err, command) {
                    var expectedCommand = {
                        command: 'getBalances',
                        addresses: ['U'.repeat(81)],
                        threshold: 100
                    };

                    assert.deepEqual(command, expectedCommand);
                });
            });
        });

        describe('when valid tips are provided', function () {
            it('should call "sendCommand" with an object containing "tips" prop', function () {
                api.getBalances(['U'.repeat(81)], 100, ['9'.repeat(81)], function (err, command) {
                    var expectedCommand = {
                        command: 'getBalances',
                        addresses: ['U'.repeat(81)],
                        threshold: 100,
                        tips: ['9'.repeat(81)]
                    };

                    assert.deepEqual(command, expectedCommand);
                });
            });
        });
    });

    describe('when called with three arguments', function () {
        it('should call "sendCommand" with an object not containing "tips" prop', function () {
            api.getBalances(['U'.repeat(81)], 100, function (err, command) {
                var expectedCommand = {
                    command: 'getBalances',
                    addresses: ['U'.repeat(81)],
                    threshold: 100
                };

                assert.deepEqual(command, expectedCommand);
            });
        });
    });
});
