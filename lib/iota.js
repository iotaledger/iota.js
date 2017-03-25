var utils = require("./utils/utils");
var makeRequest = require('./utils/makeRequest');
var api = require("./api/api");
var Multisig = require('./multisig/multisig');


function IOTA(settings) {

    // IF NO SETTINGS, SET DEFAULT TO localhost:14265
    settings = settings || {};
    this.host = settings.host ? settings.host : "http://localhost";
    this.port = settings.port ? settings.port : 14265;
    this.provider = settings.provider || this.host.replace(/\/$/, '') + ":" + this.port;
    this.sandbox = settings.sandbox || false;
    this.token = settings.token || false;

    if (this.sandbox) {

        // remove backslash character
        this.sandbox = this.provider.replace(/\/$/, '');
        this.provider = this.sandbox + '/commands';
    }

    this._makeRequest = new makeRequest(this.provider, this.token);
    this.api = new api(this._makeRequest, this.sandbox);
    // this.mam
    // this.flash
    this.utils = utils;
    this.valid = require("./utils/inputValidator");
    this.multisig = new Multisig(this._makeRequest);
}



/**
*   Change the Node the user connects to (won't work with sandbox)
*
*   @method changeNode
*   @param {Object} settings
**/
IOTA.prototype.changeNode = function(settings) {

    settings = settings || {};
    this.host = settings.host ? settings.host : "http://localhost";
    this.port = settings.port ? settings.port : 14265;
    this.provider = settings.provider || this.host + ":" + this.port;

    this._makeRequest.setProvider(this.provider);
};

module.exports = IOTA;
