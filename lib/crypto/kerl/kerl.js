var CryptoJS = require("crypto-js");
var Converter = require("../converter/converter");

function Kerl() {

    this.HASH_LENGTH = 243;
    this.BIT_HASH_LENGTH = 384;
    this.BYTE_HASH_LENGTH = this.BIT_HASH_LENGTH / 8;

    this.k = CryptoJS.algo.SHA3.create( );
    this.k.init( {outputLength: this.BIT_HASH_LENGTH} );
}

Kerl.prototype.initialize = function(state) {

    this.byte_state = [ ];
    this.trit_state = [ ];

    if ( !state ) {

        this.trit_state = new Array( this.HASH_LENGTH * 3 ).fill( 0 );
        return;

    }

    // initialize empty trit state
    for ( var i = 0; i < ( this.HASH_LENGTH * 3 ); i++ ) {

        this.trit_state[ i ] = state[ i ];

    }

}

Kerl.prototype.reset = function() {

    this.k.reset();

}

Kerl.prototype.absorb = function(trits, offset, length) {


    if ( length && ( ( length % 243 ) !== 0 ) ) {

        throw new Error('Illegal length provided');

    }

    do {

        var i = 0;
        var limit = ( length < this.HASH_LENGTH ? length : this.HASH_LENGTH );

        while ( i < limit ) {

            this.trit_state[ i++ ] = trits[ offset++ ];

        }

        // last trit 0
        this.trit_state[ 242 ] = 0;

        // convert trit state to bytes
        var bytesToAbsorb = Converter.bytesFromBigInt(Converter.bigIntFromTrits(this.trit_state, this.HASH_LENGTH), this.BYTE_HASH_LENGTH);

        // absorb the trit stat as wordarray
        this.k.update( CryptoJS.lib.WordArray.create( Converter.wordsFromBytes( bytesToAbsorb ), bytesToAbsorb.length ) );

    } while ( ( length -= this.HASH_LENGTH ) > 0 );

}



Kerl.prototype.squeeze = function(trits, offset, length) {

    if ( length && ( ( length % 243 ) !== 0 ) ) {

        throw new Error('Illegal length provided');

    }
    do {

        // get the hash digest
        var kCopy = this.k.clone( );
        var final = kCopy.finalize( );
        this.byte_state = Converter.bytesFromWords( final.words, final.sigBytes );

        // Convert bytes to trits and then map it into the internal state
        this.trit_state = Converter.tritsFromBigInt( Converter.bigIntFromBytes( this.byte_state, this.BYTE_HASH_LENGTH ), this.HASH_LENGTH );

        // last trit will be zero
        this.trit_state[ 242 ] = 0;

        var i = 0;
        var limit = ( length < this.HASH_LENGTH ? length : this.HASH_LENGTH );

        while ( i < limit ) {

            trits[ offset++ ] = this.trit_state[ i++ ];

        }

        this.reset( );

        var i = this.byte_state.length;
        for ( ; i-- > 0; ) {

            this.byte_state[ i ] = this.byte_state[ i ] ^ 0xFF;

        }

        this.k.update( CryptoJS.lib.WordArray.create( Converter.wordsFromBytes( this.byte_state ), final.sigBytes ) );

    } while ( ( length -= this.HASH_LENGTH ) > 0 );
}

module.exports = Kerl;
