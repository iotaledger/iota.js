var chai = require('chai');
var assert = chai.assert;
var Utils = require('../../lib/utils/utils.js');


describe('utils.toTrytes', function() {

    var tests = [
        {
            message: " ΣASDFDSAFDSAja9fd",
            expected: null
        },
        {
            message: " ASDFDSAFDSAja9fd",
            expected: true
        },
        {
            message: "994239432",
            expected: true
        },
        {
            message: "{ 'a' : 'b', 'c': 'd', 'e': '#asdfd?$' }",
            expected: true
        },
        {
            message: "{ 'a' : 'b', 'c': {'nested': 'json', 'much': 'wow', 'array': [ true, false, 'yes' ] } }",
            expected: true
        },
        {
            message: "{ 'a' : 'b', 'c': {'nested': 'json', 'much': 'wow', 'array': [ true, false, 'yes' ] } }",
            expected: true
        },
        {
            message: "{'message': 'IOTA is a revolutionary new transactional settlement and data transfer layer for the Internet of Things. It's based on a new distributed ledger, the Tangle, which overcomes the inefficiencies of current Blockchain designs and introduces a new way of reaching consensus in a decentralized peer-to-peer system. For the first time ever, through IOTA people can transfer money without any fees. This means that even infinitesimally small nanopayments can be made through IOTA. IOTA is the missing puzzle piece for the Machine Economy to fully emerge and reach its desired potential. We envision IOTA to be the public, permissionless backbone for the Internet of Things that enables true interoperability between all devices. Tangle: A directed acyclic graph (DAG) as a distributed ledger which stores all transaction data of the IOTA network. It is a Blockchain without the blocks and the chain (so is it really a Blockchain?). The Tangle is the first distributed ledger to achieve scalability, no fee transactions, data integrity and transmission as well as quantum-computing protection. Contrary to today's Blockchains, consensus is no-longer decoupled but instead an intrinsic part of the system, leading to a completely decentralized and self-regulating peer-to-peer network. All IOTA\'s which will ever exist have been created with the genesis transaction. This means that the total supply of IOTA\'s will always stay the same and you cannot mine IOTA\'s. Therefore keep in mind, if you do Proof of Work in IOTA you are not generating new IOTA tokens, you\'re simply verifying other transactions.'}",
            expected: true
        },
        {
            message: 994239432,
            expected: false
        },
        {
            message: true,
            expected: false
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

        it('should convert: ' + test.message + ' to trytes with result: ' + test.expected, function() {

            var trytes = Utils.toTrytes(test.message);

            if (test.expected) {

                assert.isNotNull(trytes);

            } else {

                assert.isNull(trytes);
            }
        });

    })
});
