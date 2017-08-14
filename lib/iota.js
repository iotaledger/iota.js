var iotaCrypto = require('iota.crypto.js');
var utils = iotaCrypto.utils;
var makeRequest = require('./makeRequest');
var api = require("./api");


function IOTA(settings) {
    this.setSettings(settings);
}


/**
*   Reset the libraries settings and internal objects
*
*   @method setSettings
*   @param {Object} settings
**/
IOTA.prototype.setSettings = function(settings) {
    // IF NO SETTINGS, SET DEFAULT TO localhost:14265
    settings = settings || {};
    this.version = require('../package.json').version;
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
    this.valid = iotaCrypto.valid;
};


/**
*   Change the Node the user connects to
*
*   @method changeNode
*   @param {Object} settings
**/
IOTA.prototype.changeNode = function(settings) {
    this.setSettings(settings);
};

module.exports = IOTA;
