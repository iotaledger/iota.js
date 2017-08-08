
module.exports = {

  invalidResponse: function(response) {
    return new Error("Invalid Response: " + response);
  },
  noConnection: function(host) {
    return new Error("No connection to host: " + host);
  },
  requestError: function(error) {
    return new Error("Request Error: " + error);
  }
}
