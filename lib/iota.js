var utils = require("./utils/utils");
var api = require("./api/api");

function IOTA(settings, callback) {

  // IF NO SETTINGS, SET DEFAULT TO localhost:14265
  settings = settings || {};
  this.host = settings.host ? settings.host : "http://localhost";
  this.port = settings.port ? settings.port : 14265;
  this.provider = this.host + ":" + this.port;

  this.version = null;

  this.api = new api(this.provider);
  // this.mam
  // this.flash
  this.utils = utils;

  // Check whether connected or not

  // this.utils.isConnected(this.provider, function(error, success) {
  //   console.log("23", error, success)
  //   if (callback) {
  //     return callback(error, success);
  //   }
  // })
}
