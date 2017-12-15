var async = require("async");
var errors = require("../errors/requestErrors");

function xmlHttpRequest() {
  if (typeof XMLHttpRequest !== 'undefined') {
    return new XMLHttpRequest();
  }

  var module = 'xmlhttprequest';
  var request = require(module).XMLHttpRequest;
  return new request();
}

function makeRequest(provider, token) {

    this.provider = provider || "http://localhost:14265";
    this.token = token;
}

/**
*   Change the HTTP provider
*
*   @method setProvider
*   @param {String} provider
**/
makeRequest.prototype.setProvider = function(provider) {

    this.provider = provider || "http://localhost:14265";
}

/**
*   creates an XMLHttpRequest Object
*
*   @method open
*   @param {object} command
*   @returns {object} request
**/
makeRequest.prototype.open = function() {

    var request = xmlHttpRequest();
    request.open('POST', this.provider, true);
    request.setRequestHeader('Content-Type','application/json');
    request.setRequestHeader('X-IOTA-API-Version', '1');

    if (this.token) {
        //request.withCredentials = true;
        request.setRequestHeader('Authorization', 'token ' + this.token);
    }

    return request;
}

/**
*   sends an http request to a specified host
*
*   @method send
*   @param {object} command
*   @param {function} callback
**/
makeRequest.prototype.send = function(command, callback) {

    var self = this;
    var request = this.open();

    request.onreadystatechange = function() {

        if (request.readyState === 4) {

            var result = request.responseText;
            // Prepare the result
            return self.prepareResult(result, command.command, callback);
        }
    }

    try {

        request.send(JSON.stringify(command));
    } catch(error) {

        return callback(errors.invalidResponse(error));
    }
}

/**
*   sends a batched http request to a specified host
*   supports findTransactions, getBalances, getInclusionStates & getTrytes commands
*
*   @method batchedSend
*   @param {object} command
*   @param {function} callback
**/
makeRequest.prototype.batchedSend = function (command, keys, batchSize, callback) {
  var self = this
  var requestStack = []

  keys.forEach(function (key) {
    while (command[key].length) {
      var batch = command[key].splice(0, batchSize)
      var params = {}

      Object.keys(command).forEach(function (k) {
        if (k === key || keys.indexOf(k) === -1) {
          params[k] = k === key ? batch : command[k]
        }
      })

      requestStack.push(params)
    }
  })

  async.mapSeries(requestStack, function (command, cb) {
    self.send(command, function (err, res) {
      if (err) {
        return cb(err)
      }

      cb(null, res)
    })
  }, function (err, res) {
    if (err) {
      return callback(err)
    }

    switch (command.command) {
      case 'getBalances':
        var balances = res.reduce(function (a, b) {
          return a.concat(b.balances)
        }, [])

        res = res.sort(function (a, b) {
          return a.milestoneIndex - b.milestoneIndex
        }).shift()

        res.balances = balances

        callback(null, res)

        break

      case 'findTransactions':
        var seenTxs = new Set()

        if (keys.length === 1) {
          return callback(null, res.reduce(function (a, b) {
            return a.concat(b)
          }, []).filter(function (tx) {
            var seen = seenTxs.has(tx.hash)

            if (!seen) {
              seenTxs.add(tx.hash)

              return true
            }

            return false
          }))
        }

        var keysToTxFields = {
          'bundles': 'bundle',
          'addresses': 'address',
          'hashes': 'hash',
          'tags': 'tag'
        }

        callback(null, res.map(function (batch) {
          return batch.filter(function (tx) {
            return keys.every(function (key) {
              return requestStack.some(function (command) {
                return command.hasOwnProperty(key) &&
                  command[key].findIndex(function (value) {
                    return value === tx[keysToTxFields[key]]
                  }) !== -1
              })
            })
          })
        }).reduce(function (a, b) {
          return a.concat(b)
        }, []).filter(function (tx) {
          if (!seenTxs.has(tx.hash)) {
            seenTxs.add(tx.hash)

            return true
          }
          return false
        }))

        break

      default:
        callback(null, res.reduce(function (a, b) {
          return a.concat(b)
        }, []))
    }
  })
}

/**
*   sends an http request to a specified host
*
*   @method sandboxSend
*   @param {object} command
*   @param {function} callback
**/
makeRequest.prototype.sandboxSend = function(job, callback) {

    // Check every 15 seconds if the job finished or not
    // If failed, return error

    var newInterval = setInterval(function() {

        var request = xmlHttpRequest();

        request.onreadystatechange = function() {

            if (request.readyState === 4) {

                var result;

                // Prepare the result, check that it's JSON
                try {

                    result = JSON.parse(request.responseText);
                } catch(e) {

                    return callback(errors.invalidResponse(e));
                }

                if (result.status === "FINISHED") {

                    var attachedTrytes = result.attachToTangleResponse.trytes;
                    clearInterval(newInterval);

                    return callback(null, attachedTrytes);

                }
                else if (result.status === "FAILED") {

                    clearInterval(newInterval);
                    return callback(new Error("Sandbox transaction processing failed. Please retry."))
                }
            }
        }

        try {
            request.open('GET', job, true);
            request.send(JSON.stringify());
        } catch(error) {

            return callback(new Error("No connection to Sandbox, failed with job: ", job));
        }

    }, 5000)

}

/**
*   prepares the returned values from the request
*
*   @method prepareResult
*   @param {string} result
*   @param {function} callback
**/
makeRequest.prototype.prepareResult = function(result, requestCommand, callback) {

    // Result map of the commands we want to format
    var resultMap = {
        'getNeighbors'          :   'neighbors',
        'addNeighbors'          :   'addedNeighbors',
        'removeNeighbors'       :   'removedNeighbors',
        'getTips'               :   'hashes',
        'findTransactions'      :   'hashes',
        'getTrytes'             :   'trytes',
        'getInclusionStates'    :   'states',
        'attachToTangle'        :   'trytes'
    }

    var error;

    try {
        result = JSON.parse(result);
    } catch(e) {
        error = errors.invalidResponse(result);
        result = null;
    }

    //
    //    TODO: PREPARE ERROR MESSAGES BETTER
    //
    if (!error && result.error) {
        error = errors.requestError(result.error);
        result = null;
    }

    if (!error && result.exception) {
        error = errors.requestError(result.exception);
        result = null;
    }

    // If correct result and we want to prepare the result
    if (result && resultMap.hasOwnProperty(requestCommand)) {

        // If the response is from the sandbox, don't prepare the result
        if (requestCommand === 'attachToTangle' && result.hasOwnProperty('id')) {

            result = result;
        } else {

            result = result[resultMap[requestCommand]];
        }
    }

    return callback(error, result);
}


module.exports = makeRequest;
