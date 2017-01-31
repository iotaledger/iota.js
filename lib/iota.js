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
    this.validate = require("./utils/inputValidator");
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




var iota = new IOTA({
    'provider': 'http://85.93.93.110:14265'
})

iota.api.prepareTransfers("TESTTRANSACTIONSSEED99999OMGFGWOWZER", [{"address":"LXFFUASEAWAERLJLELYIFOBSHHVJNDYKOGEVIPWSVRDPTQWJTVZV9PTAUZE9FYGOPWPQVJYLEHRDNHVHHUOSXDWRDY","value":1000}], function(error, response) {
    console.log(error, response);
})

return

var key = iota.multisig.getKey("LXFFUASEAWAERLJLELYIFOBSHHVJNDYKOGEVIPWSVRDPTQWJTVZV9PTAUZE9FYGOPWPQVJYLEHRDNHVHHUOSXDWRDY", 0, 1);

console.log(key.length);

return
// iota.multisig.initiateTransfer(["LXFFUASEAWAERLJLELYIFOBSHHVJNDYKOGEVIPWSVRDPTQWJTVZV9PTAUZE9FYGOPWPQVJYLEHRDNHVHHUOSXDWRDY", "EOYLWWCSCSJUUVQAYADEKIBWWTWJZWLPGFK9AOOAOPNCEJQCKZISKVMETFPUSQMRMFDOHWGPRVFVZJCZP"], 'ZZOZOOGFBPBJFRCRVQZOUYUNTBWTDYXJJRSNUERYTUOKSTLRJRKBJMZUZTMTQGNYKU9KAHYWZKURJ9BTL', 3, [{'address': 'ZGHXPZYDKXPEOSQTAQOIXEEI9K9YKFKCWKYYTYAUWXK9QZAVMJXWAIZABOXHHNNBJIEBEUQRTBWGLYMTX', 'value': 44051455818579}], function(e,s) {
//     console.log(e,s)
// })

module.exports = IOTA;
