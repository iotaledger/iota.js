
module.exports = {

  invalidTrytes: function() {
    throw new Error("Invalid Trytes provided");
  },
  invalidKey: function() {
    throw new Error("You have provided an invalid key value");
  },
  invalidTrunkOrBranch: function(hash) {
    throw new Error("You have provided an invalid hash as a trunk/branch: " + hash);
  },
  notInt: function() {
    throw new Error("One of your inputs is not an integer");
  },
  noConnection: function(host, port) {
    throw new Error("CONNECTION ERROR: Could not connect to host: " + host + " at port: " + port);
  }
}
