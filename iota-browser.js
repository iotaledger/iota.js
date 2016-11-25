
var IOTA = require('./lib/iota.js');

// dont override global variable
if (typeof window !== 'undefined' && typeof window.IOTA === 'undefined') {
    window.IOTA = IOTA;
}

module.exports = IOTA;
