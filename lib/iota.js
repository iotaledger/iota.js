var utils = require("./utils/utils");
var api = require("./api/api");
var makeRequest = require('./utils/makeRequest');


function IOTA(settings) {

  // IF NO SETTINGS, SET DEFAULT TO localhost:14265
  var settings = settings || {};
  this.host = settings.host ? settings.host : "http://localhost";
  this.port = settings.port ? settings.port : 14265;
  this.provider = this.host + ":" + this.port;

  this.version = null;
  this._makeRequest = new makeRequest(this.provider);
  this.api = new api(this._makeRequest);
  // this.mam
  // this.flash
  this.utils = utils;
}

/**
  *   Change the Node the user connects to
  *
  *   @method setProvider
  *   @param {Object} settings
**/
IOTA.prototype.changeNode = function(settings) {

  var settings = settings || {};
  this.host = settings.host ? settings.host : "http://localhost";
  this.port = settings.port ? settings.port : 14265;
  this.provider = this.host + ":" + this.port;

  this._makeRequest.setProvider(this.provider);
}

module.exports = IOTA;
