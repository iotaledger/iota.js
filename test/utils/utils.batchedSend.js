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
          '9'.repeat(81),
          '9'.repeat(81),
          'A'.repeat(81)
        ], [
          'B'.repeat(81)
        ]
      ],
      expected: [
        '9'.repeat(81),
        'A'.repeat(81),
        'B'.repeat(81)
      ]
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

  var testIntersectionWithMultipleKeys = {
    command: {
      command: 'findTransactions',
      addresses: ['A', 'B', 'C', 'D', 'E'],
      tags: ['A', 'B', 'C'],
      testIntersection: true,
      withMultipleKeys: true
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

  var testIntersectionWithSingleKey = {
      command: {
          command: 'findTransactions',
          addresses: ['A', 'B', 'C', 'D', 'E'],
          testIntersection: true,
          withMultipleKeys: false
      },
      resIndex: 0,
      keys: ['addresses'],
      res: [
          ['A', 'B', 'C'],
          ['D', 'E'],
          ['A', 'B', 'C', 'H', 'I'],
      ],
      expected: ['A', 'B', 'C', 'D', 'E', 'H', 'I']
    }

    Request.prototype.send = function (command, callback) {
    var test = {};

    if (command.testIntersection ) {
      if (command.withMultipleKeys) {
        test = testIntersectionWithMultipleKeys;
      } else {
        test = testIntersectionWithSingleKey;
      }
    } else {
      test = tests.find(test => test.command.command === command.command)
    }

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

  describe('when input keys length is greater than one', function () {
    it('Should intersect results in findTransactions', function () {
       request.batchedSend(testIntersectionWithMultipleKeys.command, testIntersectionWithMultipleKeys.keys, batchSize, function (err, res) {
          if (!err) {
              assert.deepEqual(res, testIntersectionWithMultipleKeys.expected)
          }
        })
    })
  })

  describe('when input keys length is equal to one', function () {
    it('Should intersect results in findTransactions', function () {
        request.batchedSend(testIntersectionWithSingleKey.command, testIntersectionWithSingleKey.keys, batchSize, function (err, res) {
          if (!err) {
              assert.deepEqual(res, testIntersectionWithSingleKey.expected)
          }
        })
    })
  })
})
