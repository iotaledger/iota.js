var chai = require('chai')
var assert = chai.assert
var Request = require('../../lib/utils/makeRequest.js')

describe('utils.makeRequest', function () {
  var batchSize = 2

  var tests = [
    {
      command: {
        command: 'findTransactions',
        addresses: new Array(batchSize + 1)
      },
      keys: ['addresses'],
      resIndex: 0,
      res: [
        [
          {hash: '9'.repeat(81)},
          {hash: '9'.repeat(81)},
          {hash: 'A'.repeat(81)}
        ], [
          {hash: 'B'.repeat(81)}
        ]
      ],
      expected: [
        '9'.repeat(81),
        'A'.repeat(81),
        'B'.repeat(81)
      ].map(function (hash) {
        return {
          hash: hash
        }
      })
    }, {
      command: {
        command: 'getBalances',
        addresses: new Array(batchSize + 1)
      },
      keys: ['addresses'],
      resIndex: 0,
      res: [
        {
          milestoneIndex: 2,
          balances: new Array(batchSize).fill(0)
        }, {
          milestoneIndex: 1,
          balances: [999]
        }
      ],
      expected: {
        milestoneIndex: 1,
        balances: new Array(batchSize).fill(0).concat([999])
      }
    }, {
      command: {
        command: 'getInclusionStates',
        transactions: new Array(batchSize + 1)
      },
      keys: ['transactions'],
      resIndex: 0,
      res: [new Array(batchSize).fill(true)].concat([[false]]),
      expected: Array(batchSize).fill(true).concat([false])
    }, {
      command: {
        command: 'getTrytes',
        transactions: new Array(3 * batchSize + 1)
      },
      keys: ['transactions'],
      resIndex: 0,
      res: new Array(3).fill(new Array(batchSize).fill('9')).concat([['99']]),
      expected: new Array(3 * batchSize).fill('9').concat(['99'])
    }
  ]

  var testIntersection = {
    command: {
      command: 'findTransactions',
      addresses: ['A', 'B', 'C', 'D', 'E'],
      tags: ['A', 'B', 'C'],
      testIntersection: true
    },
    keys: ['addresses', 'tags'],
    resIndex: 0,
    res: [
      [
        {hash: 'A', address: 'A', tag: 'A'},
        {hash: 'B', address: 'B', tag: 'A'},
        {hash: 'C', address: 'B', tag: 'B'}
      ], [
        {hash: 'D', address: 'C', tag: 'A'},
        {hash: 'E', address: 'D', tag: 'C'}
      ], [
        {hash: 'F', address: 'E', tag: 'B'},
        {hash: 'G', address: 'A', tag: 'N'}
      ], [
        {hash: 'A', address: 'A', tag: 'A'},
        {hash: 'B', address: 'B', tag: 'A'},
        {hash: 'C', address: 'B', tag: 'B'},
        {hash: 'H', address: 'C', tag: 'B'},
        {hash: 'I', address: 'N', tag: 'B'}
      ], [
        {hash: 'L', address: 'B', tag: 'C'}
      ]
    ],
    expected: [
      {hash: 'A', address: 'A', tag: 'A'},
      {hash: 'B', address: 'B', tag: 'A'},
      {hash: 'C', address: 'B', tag: 'B'},
      {hash: 'D', address: 'C', tag: 'A'},
      {hash: 'E', address: 'D', tag: 'C'},
      {hash: 'F', address: 'E', tag: 'B'},
      {hash: 'H', address: 'C', tag: 'B'},
      {hash: 'L', address: 'B', tag: 'C'}
    ]
  }

  Request.prototype.send = function (command, callback) {
    var test = command.testIntersection
      ? testIntersection : tests.find(test => test.command.command === command.command)

    var res = test.res[test.resIndex]
    test.resIndex++

    return callback(null, res)
  }

  var request = new Request()

  tests.forEach(function (test) {
    it('Shoud batch requests for: ' + test.command.command, function () {
      request.batchedSend(test.command, test.keys, batchSize, function (err, res) {
        if (!err) {
          assert.deepEqual(res, test.expected)
        }
      })
    })
  })

  it('Should intersect results in findTransactions', function () {
    request.batchedSend(testIntersection.command, testIntersection.keys, batchSize, function (err, res) {
      if (!err) {
        assert.deepEqual(res, testIntersection.expected)
      }
    })
  })
})
