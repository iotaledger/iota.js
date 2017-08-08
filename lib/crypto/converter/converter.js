var BN = require('bn.js');

/**
 *
 *   Conversion functions
 *
 **/

var RADIX = 3;
var RADIX_BYTES = 256;
var MAX_TRIT_VALUE = 1;
var MIN_TRIT_VALUE = -1;
var BYTE_HASH_LENGTH = 48;

// All possible tryte values
var trytesAlphabet = "9ABCDEFGHIJKLMNOPQRSTUVWXYZ"

// map of all trits representations
var trytesTrits = [
    [ 0,  0,  0],
    [ 1,  0,  0],
    [-1,  1,  0],
    [ 0,  1,  0],
    [ 1,  1,  0],
    [-1, -1,  1],
    [ 0, -1,  1],
    [ 1, -1,  1],
    [-1,  0,  1],
    [ 0,  0,  1],
    [ 1,  0,  1],
    [-1,  1,  1],
    [ 0,  1,  1],
    [ 1,  1,  1],
    [-1, -1, -1],
    [ 0, -1, -1],
    [ 1, -1, -1],
    [-1,  0, -1],
    [ 0,  0, -1],
    [ 1,  0, -1],
    [-1,  1, -1],
    [ 0,  1, -1],
    [ 1,  1, -1],
    [-1, -1,  0],
    [ 0, -1,  0],
    [ 1, -1,  0],
    [-1,  0,  0]
];

/**
 *   Converts trytes into trits
 *
 *   @method trits
 *   @param {String|Int} input Tryte value to be converted. Can either be string or int
 *   @param {Array} state (optional) state to be modified
 *   @returns {Array} trits
 **/
var trits = function( input, state ) {

    var trits = state || [];

    if (Number.isInteger(input)) {

        var absoluteValue = input < 0 ? -input : input;

        while (absoluteValue > 0) {

            var remainder = absoluteValue % 3;
            absoluteValue = Math.floor(absoluteValue / 3);

            if (remainder > 1) {
                remainder = -1;
                absoluteValue++;
            }

            trits[trits.length] = remainder;
        }
        if (input < 0) {

            for (var i = 0; i < trits.length; i++) {

                trits[i] = -trits[i];
            }
        }
    } else {

        for (var i = 0; i < input.length; i++) {

            var index = trytesAlphabet.indexOf(input.charAt(i));
            trits[i * 3] = trytesTrits[index][0];
            trits[i * 3 + 1] = trytesTrits[index][1];
            trits[i * 3 + 2] = trytesTrits[index][2];
        }
    }

    return trits;
}

/**
 *   Converts trits into trytes
 *
 *   @method trytes
 *   @param {Array} trits
 *   @returns {String} trytes
 **/
var trytes = function(trits) {

    var trytes = "";

    for ( var i = 0; i < trits.length; i += 3 ) {

        // Iterate over all possible tryte values to find correct trit representation
        for ( var j = 0; j < trytesAlphabet.length; j++ ) {

            if ( trytesTrits[ j ][ 0 ] === trits[ i ] && trytesTrits[ j ][ 1 ] === trits[ i + 1 ] && trytesTrits[ j ][ 2 ] === trits[ i + 2 ] ) {

                trytes += trytesAlphabet.charAt( j );
                break;

            }

        }

    }

    return trytes;
}

/**
 *   Converts trits into an integer value
 *
 *   @method value
 *   @param {Array} trits
 *   @returns {int} value
 **/
var value = function(trits) {

    var returnValue = 0;

    for ( var i = trits.length; i-- > 0; ) {

        returnValue = returnValue * 3 + trits[ i ];
    }

    return returnValue;
}

/**
 *   Converts an integer value to trits
 *
 *   @method value
 *   @param {Int} value
 *   @returns {Array} trits
 **/
var fromValue = function(value) {

    var destination = [];
    var absoluteValue = value < 0 ? -value : value;
    var i = 0;

    while( absoluteValue > 0 ) {

        var remainder = ( absoluteValue % RADIX );
        absoluteValue = Math.floor( absoluteValue / RADIX );

        if ( remainder > MAX_TRIT_VALUE ) {

            remainder = MIN_TRIT_VALUE;
            absoluteValue++;

        }

        destination[ i ] = remainder;
        i++;

    }

    if ( value < 0 ) {

        for ( var j = 0; j < destination.length; j++ ) {

            // switch values
            destination[ j ] = destination[ j ] === 0 ? 0: -destination[ j ];

        }

    }

    return destination;
}


/**
 *   Converts trits into big integer
 *
 *   @method bigIntFromTrits
 *   @param {Array} trits
 *   @returns {String} BN
 **/
var bigIntFromTrits = function( trits ) {

    var value = new BN( 0 );

    for (var i = trits.length; i-- > 0; ) {

        // Multiply by 3 and add the respective trit value
        value = value.mul( new BN( 3 ) ).add( new BN( trits[ i ] ) );
    }

    // Return byte array
    return value.toString( );

}


/**
 *   Converts a big integer value into trits
 *
 *   @method tritsFromBytes
 *   @param {Number || String} value
 *   @param {Number} length
 *   @returns {Array} trits
 **/
var tritsFromBigInt = function( value, length ) {

    // if no length provide, set default value
    if (!length) length = 243;

    var destination = new Array( length ).fill(0);

    value = new BN( value );
    var absoluteValue = value.abs( );
    var i = 0;

    while ( absoluteValue.gt( new BN( 0 ) ) ) {

        // Remainder is the modulo of 3 (radix)
        var remainder = absoluteValue.mod( new BN( RADIX ) ).toNumber();
        // Divide the absoluteValue by 3 (radix)
        absoluteValue = absoluteValue.div( new BN( RADIX ) );

        if ( remainder > MAX_TRIT_VALUE ) {

            remainder = MIN_TRIT_VALUE;
            absoluteValue = absoluteValue.add( new BN( 1 ) );

        }

        destination[ i ] = remainder;
        i++;

    }

    if ( value.isNeg() ) {

        for ( var i = 0; i < destination.length; i++ ) {

            destination[ i ] = destination[ i ] === 0 ? 0 : -destination[ i ];

        }

    }

    return destination;
}

/**
 *   Converts a big integer value into bytes
 *
 *   @method bytesFromBigInt
 *   @param {String} value
 *   @returns {Array} bytes
 **/
var bytesFromBigInt = function ( value ) {

    var bigInt = new BN( value );
    var byteArrayTemp = [];

    for ( var i = 0; i < 48; i++ ) {

        // right shift
        var rsh = bigInt.abs( ).shrn( i * 8 );
        var last = byteArrayTemp.length - 1;

        // if zero or 128
        if ( !rsh.isZero( ) || ( byteArrayTemp[ last ] & 0x80 ) ) {

            byteArrayTemp.push( rsh.mod( new BN( 1 << 8 ) ).toNumber( ) );

        }

    }


    var byteArray = byteArrayTemp.reverse( ).map( function ( x ) {

        // smaller than or equal to 127
        if ( x <= 0x7F ) {

            return x;

        }

        else {

            // subtract by 256
            return x - 0x100;

        }

    });

    // If negative, reverse
    if ( bigInt.isNeg() ) {

        byteArray = byteArray.map( function ( x ) {

            // Bitwise OR https://www.w3schools.com/jsref/jsref_operators.aspnot
            return ~x;

        });

        byteArray = byteArray.reverse( );

        for ( var i = 0; i < byteArray.length; i++ ) {

            var add = (byteArray[i] & 0xFF) + 1;

            if ( add <= 0x7F ) {

                byteArray[ i ] = add;

            }

            else {

                byteArray[ i ] = add - 0x100;

            }

            if ( byteArray[ i ] !== 0 ) {

                break;

            }

        }

        byteArray = byteArray.reverse( );
    }

    var result = [ ];
    var i = 0;

    while ( i + byteArray.length < BYTE_HASH_LENGTH ) {

        result[ i++ ] = byteArray[ 0 ] < 0 ? -1 : 0;

    }

    var j = byteArray.length;

    for ( ; j-- > 0; ) {

        result[ i++ ] = byteArray[ byteArray.length - 1 - j ];
    }

    return result;

}

/**
 *   Converts bytes into big integer value
 *
 *   @method bigIntFromBytes
 *   @param {Array} bytes
 *   @returns {String} value
 **/
var bigIntFromBytes = function (bytes) {

    var signum, mag;

    if ( bytes.length === 0 ) {

        throw new Error('Illegal byte array length of 0.');

    }

    if (bytes[0] < 0) {

        mag = makePositive( bytes );
        signum = -1;

    }

    else {

        mag = stripLeadingZeroBytes( bytes );
        signum = ( mag.length === 0 ? 0 : 1 );

    }

    var bigInt = new BN( 0 );
    var i = 0;
    mag = mag.reverse( );

    mag = mag.map(function ( x ) {

        if ( x >= 0 ) {

            return x;

        }

        else {

            return x + 0x100000000;

        }

    });

    for ( ; i < mag.length; i++ ) {

        // shift left
        bigInt = bigInt.add(new BN( mag[ i ] ).shln( i * 32 ) );

    }

    return bigInt.mul( new BN( signum ) ).toString( );

}


/**
 *   Strips the leading zero bytes from byte array 
 *
 *   @method stripLeadingZeroBytes
 *   @param {Array} bytes
 *   @returns {Array} result
 **/
function stripLeadingZeroBytes(bytes) {

    var byteLength = bytes.length;
    var keep = 0;

    while ( keep < bytes.length && bytes[keep] === 0 ) {

        keep++;

    }

    var intLength = Math.floor( ( byteLength - keep + 3 ) / 4 );
    var result = new Array( intLength );
    var b = byteLength - 1;
    var i = intLength - 1;

    for ( ; i >= 0; i-- ) {

        result[ i ] = bytes[ b-- ] & 0xff;
        var bytesRemaining = b - keep + 1;
        var bytesToTransfer = Math.min( 3, bytesRemaining );
        var j = 8;

        for ( ; j <= 8 * bytesToTransfer; j += 8 ) {

            result[ i ] |= ((bytes[ b-- ] & 0xff ) << j );

        }

    }

    return result;

}

/**
 *   Makes byte array positive
 *
 *   @method makePositive
 *   @param {Array} bytes
 *   @returns {Array} result
 **/
function makePositive(bytes) {

    var keep = 0;
    var byteLength = bytes.length;
    while ( keep < byteLength && bytes[ keep ] === -1 ) {

        keep++;

    }

    var k = keep;

    while ( k < byteLength && bytes[ k ]===0 ) {

        k++;

    }

    var extraByte = (k === byteLength) ? 1 : 0;
    var intLength = Math.floor((byteLength - keep + extraByte + 3) / 4);
    var result = new Array(intLength);
    var b = byteLength - 1;
    var i = intLength - 1;

    for ( ; i >= 0; i-- ) {

        result[ i ] = bytes[ b-- ] & 0xff;
        var numBytesToTransfer = Math.min( 3, b - keep + 1 );

        if ( numBytesToTransfer < 0 ) {

            numBytesToTransfer = 0;

        }
        var j = 8;

        for ( ; j <= 8 * numBytesToTransfer; j += 8 ) {

            result[ i ] |= ( ( bytes[ b-- ] & 0xff ) << j );

        }

        var mask = -1 >>> ( 8 * (3 - numBytesToTransfer ) );

        result[ i ] = ~result[ i ] & mask;

    }

    var i = result.length - 1;

    for ( ; i >= 0; i-- ) {

        result[ i ] = ( result[ i ] & 0xffffffff ) + 1;

        if ( result[ i ] !== 0 ) {

            break;

        }

    }

    return result;

}

/**
 *   Words from Bytes conversion
 *
 *   Credit: https://gist.github.com/artjomb/7ef1ee574a411ba0dd1933c1ef4690d1
 *
 *   @method wordsFromBytes
 *   @param {Array} ba Byte array
 */
var wordsFromBytes = function (ba) {

    ba = ba.map(function (x) {
        return x & 0xFF;
    });

    var wa = [ ];

    for ( var i = 0; i < ba.length; i++ ) {

        wa[ ( i / 4 ) | 0 ] |= ba[ i ] << ( 24 - 8 * i );

    }

    return wa;
}

/**
 *   Bytes from Words conversion
 *
 *   @method bytesFromWords
 *   @param {Array} wordArray
 *   @param {int} length
 *
 */
var bytesFromWords = function(wordArray, length) {

    var result = [],
        bytes,
        i = 0;

    while ( length > 0 ) {

        bytes = wordToByteArray(wordArray[ i ], Math.min( 4, length ) );
        length -= bytes.length;
        result.push( bytes );
        i++;

    }

    return [ ].concat.apply( [ ], result ).map( function ( x ) {

        if (x<=127) {

            return x;

        }

        return x - 256;

    });
}

/**
 *   Words to Byte Array
 *
 *   @method wordToByteArray
 *   @param {Array} word
 *   @param {int} length
 *
 */
function wordToByteArray(word, length) {

    var ba = [],
        i,
        xFF = 0xFF;

    if ( length > 0 )
        ba.push( word >>> 24 );

    if ( length > 1 )
        ba.push( ( word >>> 16 ) & xFF );

    if ( length > 2 )
        ba.push( ( word >>> 8 ) & xFF );

    if ( length > 3 )
        ba.push( word & xFF );

    return ba;
}



module.exports = {
    trits           : trits,
    trytes          : trytes,
    value           : value,
    fromValue       : fromValue,
    tritsFromBigInt : tritsFromBigInt,
    bigIntFromTrits : bigIntFromTrits,
    bytesFromBigInt : bytesFromBigInt,
    bigIntFromBytes : bigIntFromBytes,
    wordsFromBytes  : wordsFromBytes,
    bytesFromWords  : bytesFromWords
};
