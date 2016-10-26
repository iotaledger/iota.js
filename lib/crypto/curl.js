var Converter = require("./converter");

/**
**      Cryptographic related functions to IOTA's Curl (sponge function)
**/

// truth table
var truthTable = [1, 0, -1, 1, -1, 0, -1, 1, 0];

/**
*   Initializes the state with 729 trits
*
*   @method initialize
*   @returns {Array} state
**/
var initialize = function(state) {

    var state = state || [];

    for (var i = 0; i < 729; i++) {
        state[i] = 0;
    }

    return state;
}

/**
*
*   @method absorb
**/
var absorb = function(data, state) {

    for (var i = 0; i < data.length; ) {

        var j = 0;

        while (i < data.length && j < 243) {

            state[j++] = data[i++];
        }

        transform(state);
    }
}

/**
*
*   @method squeeze
**/
var squeeze = function(data, state) {

    for (var i = 0; i < 243; i++) {

        data[i] = state[i];
    }

    transform(state);
}

/**
*
*   @method transform
**/
var transform = function(state) {

    var stateCopy = [], index = 0;

    for (var round = 0; round < 27; round++) {

        stateCopy = state.slice();

        for (var i = 0; i < 729; i++) {

            state[i] = truthTable[stateCopy[index] + stateCopy[index += (index < 365 ? 364 : -365)] * 3 + 4];
        }
    }
}

module.exports = {
    initialize  : initialize,
    absorb      : absorb,
    squeeze     : squeeze,
    transform   : transform
};
