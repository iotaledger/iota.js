
module.exports = {

  invalidTrytes: function() {
    throw new Error("Invalid Trytes provided");
  },
  invalidAttachedTrytes: function() {
    throw new Error("Invalid attached Trytes provided");
  },
  invalidTransfers: function() {
    throw new Error("Invalid transfers object");
  },
  invalidKey: function() {
    throw new Error("You have provided an invalid key value");
  },
  invalidTrunkOrBranch: function(hash) {
    throw new Error("You have provided an invalid hash as a trunk/branch: " + hash);
  },
  notInt: function() {
    throw new Error("One of your inputs is not an integer");
  }
}
