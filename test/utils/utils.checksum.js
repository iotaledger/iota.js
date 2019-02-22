var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var Utils = require('../../lib/utils/utils.js');
var Converter = require('../../lib/crypto/converter/converter');

describe('utils.checksum', function () {
    describe('#isValidChecksum', function () {
        var addressesWithChecksum;

        before(function () {
            addressesWithChecksum = [{
                address: 'UYEEERFQYTPFAHIPXDQAQYWYMSMCLMGBTYAXLWFRFFWPYFOICOVLK9A9VYNCKK9TQUNBTARCEQXJHD9VYXOEDEOMRC',
                valid: true
            }, {
                address: 'UYEEERFQYTPFAHIPXDQAQYWYMSMCLMGBTYAXLWFRFFWPYFOICOVLK9A9VYNCKK9TQUNBTARCEQXJHD9VYXOEDEOMRB',
                valid: false
            }];
        });

        it('should validate checksum', function () {
            addressesWithChecksum.forEach(function (addressData) {
                var isValidChecksum = Utils.isValidChecksum(addressData.address);

                assert.equal(isValidChecksum, addressData.valid);
            });
        });
    });

    describe('#addChecksum', () => {
        var validAddressData;

        before(function () {
            validAddressData = [{
                address: 'UYEEERFQYTPFAHIPXDQAQYWYMSMCLMGBTYAXLWFRFFWPYFOICOVLK9A9VYNCKK9TQUNBTARCEQXJHD9VY',
                checksum: 'XOEDEOMRC'
            }, {
                address: 'TWCFEZAMARUPEC9ZGDTCWOGJLSERUHEMGDNCRLSAGBPQPZ9EWJCLLVUWCZWBPMVYQSXEBNAGJHVTESECC',
                checksum: 'WTEXJKVDY'
            }, {
                address: 'BUYCSYQLTYUSTWENTYOACRUVEQH9BIPQWGYYTMLLLMDNOPNTNMNYEJDWIDDESEZSNN9MTMXOVLNSKNUOB',
                checksum: 'MRMLVR9YA'
            }];
        });

        describe('when input is a string', function () {
            describe('when input is an invalid address', function () {
                it('should throw an error with message "Invalid input"', function () {
                    const invalidAddresses = [
                        'A'.repeat(80),
                        'A'.repeat(82),
                        'A'.repeat(80) + 'a'
                    ];

                    invalidAddresses.forEach(function (address) {
                        expect(Utils.addChecksum.bind(null, address)).to.throw('Invalid input');
                    });
                });
            });

            describe('when input is a valid address', function () {
                it('should return address with correct checksum', function () {
                    validAddressData.forEach(function (data) {
                        expect(Utils.addChecksum(data.address)).to.equal(data.address + data.checksum);
                    });
                });

                it('should have correct checksum length', function () {
                    var checksumLength = 3;

                    validAddressData.forEach(function (data) {
                        expect(Utils.addChecksum(data.address, checksumLength)).to.equal(data.address + data.checksum.slice(-checksumLength));
                    });
                });
            });
        });

        describe('when input is an array of strings', function () {
            describe('when input has any invalid address', function () {
                it('should throw an error with message "Invalid input"', function () {
                    const addresses = [
                        // Valid address
                        'A'.repeat(81),
                        'A'.repeat(82),
                        'A'.repeat(80) + 'a'
                    ];

                    expect(Utils.addChecksum.bind(null, addresses)).to.throw('Invalid input');
                });
            });

            describe('when input has all valid addresses', function () {
                it('should return addresses with correct checksum', function () {
                    var actualAddressesWithChecksum = Utils.addChecksum(
                        validAddressData.map(function (data) {
                            return data.address;
                        })
                    );

                    var expectedAddressesWithChecksum = validAddressData.map(function (data) {
                        return data.address + data.checksum;
                    });

                    expect(actualAddressesWithChecksum).to.eql(expectedAddressesWithChecksum);
                });

                it('should have correct checksum length', function () {
                    var checksumLength = 4;

                    var actualAddressesWithChecksum = Utils.addChecksum(
                        validAddressData.map(function (data) {
                            return data.address;
                        }),
                        checksumLength
                    );

                    var expectedAddressesWithChecksum = validAddressData.map(function (data) {
                        return data.address + data.checksum.slice(-checksumLength);
                    });

                    expect(actualAddressesWithChecksum).to.eql(expectedAddressesWithChecksum);
                });
            });
        });

        describe('when input is a trit array', function () {
            describe('when input is an invalid trit array', function () {
                it('should throw an error with message "Invalid input"', function () {
                    const addressesTrits = [
                        'A'.repeat(81),
                        'B'.repeat(81),
                        'C'.repeat(81)
                    ].map(function (address) {
                        var trits = Converter.trits(address);
                        trits.pop();

                        return trits;
                    });

                    addressesTrits.forEach(function (addressTrits) {
                        expect(Utils.addChecksum.bind(null, addressTrits)).to.throw('Invalid input');
                    });
                });
            });

            describe('when input is a valid trit array', function () {
                it('should return addresses trits with correct checksum', function () {
                    const addressData = validAddressData.map(function (data) {
                        return Object.assign({}, data, {
                            address: Converter.trits(data.address),
                            checksum: Converter.trits(data.checksum)
                        });
                    });

                    addressData.forEach(function (data) {
                        var addressTritsWithChecksum = Utils.addChecksum(data.address);
                        expect(addressTritsWithChecksum).to.eql(data.address.concat(data.checksum));

                        // Also assert on trytes
                        expect(Converter.trytes(addressTritsWithChecksum)).to.equal(
                            Converter.trytes(data.address).concat(Converter.trytes(data.checksum))
                        );
                    });
                });

                it('should have correct checksum length', function () {
                    var trytesChecksumLength = 3;
                    var tritsChecksumLength = trytesChecksumLength * 3;

                    const addressData = validAddressData.map(function (data) {
                        return Object.assign({}, data, {
                            address: Converter.trits(data.address),
                            checksum: Converter.trits(data.checksum)
                        });
                    });

                    addressData.forEach(function (data) {
                        var addressTritsWithChecksum = Utils.addChecksum(data.address, tritsChecksumLength);
                        expect(addressTritsWithChecksum).to.eql(data.address.concat(data.checksum.slice(-tritsChecksumLength)));

                        // Also assert on trytes
                        expect(Converter.trytes(addressTritsWithChecksum)).to.equal(
                            Converter.trytes(data.address).concat(Converter.trytes(data.checksum).slice(-trytesChecksumLength))
                        );
                    });
                });
            });
        });

        describe('when input is an array of trit arrays', function () {
            describe('when input has any invalid trit array', function () {
                it('should throw an error with message "Invalid input"', function () {
                    const addressesTrits = [
                        'A'.repeat(81),
                        'B'.repeat(81),
                        'C'.repeat(81)
                    ].map(function (address, idx) {
                        var trits = Converter.trits(address);

                        if (!idx) {
                            trits.pop();
                        }

                        return trits;
                    });

                    expect(Utils.addChecksum.bind(null, addressesTrits)).to.throw('Invalid input');
                });
            });

            describe('when input has all valid trit arrays', function () {
                it('should return an array of addresses trits with correct checksum', function () {
                    const addressData = validAddressData.map(function (data) {
                        return Object.assign({}, data, {
                            address: Converter.trits(data.address),
                            checksum: Converter.trits(data.checksum)
                        });
                    });

                    var actualTritArray = Utils.addChecksum(
                        addressData.map(function (data) {
                            return data.address;
                        })
                    );
                    var expectedTritArray = addressData.map(function (data) {
                        return data.address.concat(data.checksum);
                    });

                    expect(actualTritArray).to.eql(expectedTritArray);

                    expect(actualTritArray.map(function (tritArray) {
                        return Converter.trytes(tritArray);
                    })).to.eql(expectedTritArray.map(function (tritArray) {
                        return Converter.trytes(tritArray);
                    }));
                });

                it('should have correct checksum length', function () {
                    var trytesChecksumLength = 3;
                    var tritsChecksumLength = trytesChecksumLength * 3;

                    const addressData = validAddressData.map(function (data) {
                        return Object.assign({}, data, {
                            address: Converter.trits(data.address),
                            checksum: Converter.trits(data.checksum)
                        });
                    });

                    var actualTritArray = Utils.addChecksum(
                        addressData.map(function (data) {
                            return data.address;
                        }),
                        tritsChecksumLength
                    );
                    var expectedTritArray = addressData.map(function (data) {
                        return data.address.concat(data.checksum.slice(-tritsChecksumLength));
                    });

                    expect(actualTritArray).to.eql(expectedTritArray);

                    expect(actualTritArray.map(function (tritArray) {
                        return Converter.trytes(tritArray);
                    })).to.eql(expectedTritArray.map(function (tritArray) {
                        return Converter.trytes(tritArray);
                    }));
                });
            });
        });
    });
});
