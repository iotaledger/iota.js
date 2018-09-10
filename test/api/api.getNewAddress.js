var chai = require('chai');
var assert = chai.assert;
var API = require('../../lib/api/api')

describe('api.getNewAddress', function () {
  this.timeout(10000)

  var seedPlain = 'SEED'
  var seedTrits = [1,0,-1,-1,-1,1,-1,-1,1,1,1,0]
  var addresses = [
    'FJHSSHBZTAKQNDTIKJYCZBOZDGSZANCZSWCNWUOCZXFADNOQSYAHEJPXRLOVPNOQFQXXGEGVDGICLMOXX',
    '9DZXPFSVCSSWXXQPFMWLGFKPBAFTHYMKMZCPFHBVHXPFNJEIJIEEPKXAUBKBNNLIKWHJIYQDFWQVELOCB',
    'OTSZGTNPKFSGJLUPUNGGXFBYF9GVUEHOADZZTDEOJPWNEIVBLHOMUWPILAHTQHHVSBKTDVQIAEQOZXGFB'
  ]
  var expected = '9DZXPFSVCSSWXXQPFMWLGFKPBAFTHYMKMZCPFHBVHXPFNJEIJIEEPKXAUBKBNNLIKWHJIYQDFWQVELOCB'
  var i = 0

  API.prototype.wereAddressesSpentFrom = function (address, cb) {
    return cb(null, tests[i].wereAddressesSpentFrom[address])
  }

  API.prototype.findTransactions = function (query, cb) {
    console.log(query)
    return cb(null, tests[i].findTransactions[query.addresses[0]])
  }

  const api = new API()

  var tests = [
    {
      title: 'Should skip spent addresses',
      wereAddressesSpentFrom: {
        [addresses[0]]: [true],
        [addresses[1]]: [false]
      },
      findTransactions: {
        [addresses[0]]: [],
        [addresses[1]]: []
      },
      expected: expected
    }, {
      title: 'Should skip addresses with transactions',
      wereAddressesSpentFrom: {
        [addresses[0]]: [false],
        [addresses[1]]: [false]
      },
      findTransactions: {
        [addresses[0]]: ['A'],
        [addresses[1]]: []
      },
      expected: expected
    }
  ]

  tests.forEach(function (t) {
    it(t.title, function () {
      var seed = i ? seedTrits : seedPlain
      api.getNewAddress(seed, function (err, address) {
        assert.deepEqual(address, t.expected)
        i++
      })
    })
  })
})
