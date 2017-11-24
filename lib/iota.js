var utils = require("./utils/utils");
var makeRequest = require('./utils/makeRequest');
var api = require("./api/api");
var Multisig = require('./multisig/multisig');


function IOTA(settings) {
    this.setSettings(settings);
}


/**
*   Reset the libraries settings and internal objects
*
*   @method setSettings
*   @param {Object} settings
*       @property {String}          host        Protocol and hostname of node (e.g., "http://localhost").
*       @property {int}             port        API port number of node (e.g., 14265).
*       @property {String}          provider    Full node URI.  If not set, will be generated automatically from `host` and `port`.
*       @property {String|Boolean}  sandbox     Whether the node is a sandbox node.  See https://dev.iota.org/sandbox/
*       @property {String|Boolean}  token       Auth token (only used if `sandbox` is true).
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
    this.valid = require("./utils/inputValidator");
    this.multisig = new Multisig(this._makeRequest);
};


/**
*   Change the Node the user connects to.
*
*   @method changeNode
*   @param {Object} settings See `setSettings` method for properties.
**/
IOTA.prototype.changeNode = function(settings) {
    this.setSettings(settings);
};

module.exports = IOTA;
