/* copyright Paul Handy, 2017 */

function sum( a, b ) {

    var s = a + b;

    switch( s ) {

        case 2: return -1;
        case -2: return 1;
        default: return s;

    }
}

function cons( a, b ) {

    if( a === b ) {

        return a;

    }

    return 0;
}

function any( a, b ) {

    var s = a + b;

    if ( s > 0 ) {

        return 1;

    } else if ( s < 0 ) {

        return -1;

    }

    return 0;
}

function full_add( a, b, c ) {

    var s_a     =   sum( a, b );
    var c_a     =   cons( a, b );
    var c_b     =   cons( s_a, c );
    var c_out   =   any( c_a, c_b );
    var s_out   =   sum( s_a, c );

    return [ s_out, c_out ];

}

function add( a, b ) {

    var out = new Array( Math.max( a.length, b.length ) );
    var carry = 0;
    var a_i, b_i;

    for( var i = 0; i < out.length; i++ ) {

        a_i = i < a.length ? a[ i ] : 0;
        b_i = i < b.length ? b[ i ] : 0;
        var f_a = full_add( a_i, b_i, carry );
        out[ i ] = f_a[ 0 ];
        carry = f_a[ 1 ];

    }

    return out;

}

module.exports = add;
