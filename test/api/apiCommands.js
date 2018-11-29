var chai = require('chai');
var assert = chai.assert;
var apiCommands = require('../../lib/api/apiCommands');

describe('api commands', function() {
    describe('#getBalances', () => {
        describe('when tips are not provided', function () {
            it('should return an object with props "command", "addresses" and "threshold"', function() {
                var command = apiCommands.getBalances(['U'.repeat(81)], 100);
                var expectedCommand = {
                    command: 'getBalances',
                    addresses: ['U'.repeat(81)],
                    threshold: 100
                };

                assert.deepEqual(command, expectedCommand);
            });
        });

        describe('when tips are provided', function () {
            describe('when provided tips is not an array', function () {
                it('should not include "tips" prop in returned object', function() {
                    var invalidTips = [
                        'foo',
                        0,
                        undefined,
                        {}
                    ];

                    var expectedCommand = {
                        command: 'getBalances',
                        addresses: ['U'.repeat(81)],
                        threshold: 100
                    };

                    invalidTips.forEach(function (param) {
                        var command = apiCommands.getBalances(['U'.repeat(81)], 100, param);

                        assert.deepEqual(command, expectedCommand);
                    });
                });

            });

            describe('when provided tips is an array', function () {
                describe('when is empty', function () {
                    it('should not include "tips" prop in returned object', function() {
                        var expectedCommand = {
                            command: 'getBalances',
                            addresses: ['U'.repeat(81)],
                            threshold: 100
                        };

                        var command = apiCommands.getBalances(['U'.repeat(81)], 100, []);

                        assert.deepEqual(command, expectedCommand);
                    });
                });

                describe('when is not empty', function () {
                    it('should include "tips" prop in returned object', function () {
                        var expectedCommand = {
                            command: 'getBalances',
                            addresses: ['U'.repeat(81)],
                            threshold: 100,
                            tips: ['9'.repeat(81)]
                        };

                        var command = apiCommands.getBalances(['U'.repeat(81)], 100, ['9'.repeat(81)]);

                        assert.deepEqual(command, expectedCommand);
                    });
                });
            });
        });
    });
});
