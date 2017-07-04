var Converter = require("./converter");

/**
**      Cryptographic related functions to IOTA's Curl (sponge function)
**/

function Curl() {

    // truth table
    this.truthTable = [1, 0, -1, 1, -1, 0, -1, 1, 0];
}

/**
*   Initializes the state with 729 trits
*
*   @method initialize
**/
Curl.prototype.initialize = function(state) {

    if (state) {

        this.state = state;

    } else {

        this.state = [];

        for (var i = 0; i < 729; i++) {
            this.state[i] = 0;
        }
    }
}

/**
*   Sponge absorb function
*
*   @method absorb
**/
Curl.prototype.absorb = function(data) {

    for (var i = 0; i < data.length; ) {

        var j = 0;

        while (i < data.length && j < 243) {

            this.state[j++] = data[i++];
        }

        this.transform(this.state);
    }
}

/**
*   Sponge squeeze function
*
*   @method squeeze
**/
Curl.prototype.squeeze = function(data) {

    for (var i = 0; i < 243; i++) {

        data[i] = this.state[i];
    }

    this.transform(this.state);
}

/**
*   Sponge transform function
*
*   @method transform
**/
Curl.prototype.transform = function() {

    var stateCopy = [], index = 0;

    for (var round = 0; round < 27; round++) {

        stateCopy = this.state.slice();

        for (var i = 0; i < 729; i++) {

            this.state[i] = this.truthTable[stateCopy[index] + stateCopy[index += (index < 365 ? 364 : -365)] * 3 + 4];
        }
    }
}

module.exports = Curl
