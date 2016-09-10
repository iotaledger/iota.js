var request = require('request');

var makeNodeRequest = function(command, cb) {

  var options = {
    url: 'http://localhost:14265',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': JSON.stringify(command).length
    },
    json: command
  };

  return request(options, cb);
}

module.exports = makeNodeRequest;
