var Converter = require("../converter/converter");

/**
**      Cryptographic related functions to IOTA's Curl (sponge function)
**/

var NUMBER_OF_ROUNDS = 81;
var HASH_LENGTH = 243;
var STATE_LENGTH = 3 * HASH_LENGTH;

function Curl(rounds) {
    if (rounds) {
      this.rounds = rounds;
    } else {
      this.rounds = NUMBER_OF_ROUNDS;
    }
    // truth table
    this.truthTable = [1, 0, -1, 2, 1, -1, 0, 2, -1, 1, 0];
}

Curl.HASH_LENGTH = HASH_LENGTH;

/**
*   Initializes the state with STATE_LENGTH trits
*
*   @method initialize
**/
Curl.prototype.initialize = function(state, length) {

    if (state) {

        this.state = state;

    } else {

        this.state = [];

        for (var i = 0; i < STATE_LENGTH; i++) {

            this.state[i] = 0;

        }
    }
}

Curl.prototype.reset = function() {
  this.initialize();
}

/**
*   Sponge absorb function
*
*   @method absorb
**/
Curl.prototype.absorb = function(trits, offset, length) {

    do {

        var i = 0;
        var limit = (length < HASH_LENGTH ? length : HASH_LENGTH);

        while (i < limit) {

            this.state[i++] = trits[offset++];
        }

        this.transform();

    } while (( length -= HASH_LENGTH ) > 0)

}

/**
*   Sponge squeeze function
*
*   @method squeeze
**/
Curl.prototype.squeeze = function(trits, offset, length) {

    do {

        var i = 0;
        var limit = (length < HASH_LENGTH ? length : HASH_LENGTH);

        while (i < limit) {

            trits[offset++] = this.state[i++];
        }

        this.transform();

    } while (( length -= HASH_LENGTH ) > 0)
}

/**
*   Sponge transform function
*
*   @method transform
**/
Curl.prototype.transform = function() {

    var stateCopy = [], index = 0;

    for (var round = 0; round < this.rounds; round++) {

        stateCopy = this.state.slice();

        for (var i = 0; i < STATE_LENGTH; i++) {

            this.state[i] = this.truthTable[stateCopy[index] + (stateCopy[index += (index < 365 ? 364 : -365)] << 2) + 5];
        }
    }
}

module.exports = Curl
