var INT_LENGTH = 12;
var BYTE_LENGTH = 48;
var RADIX = 3;
/// hex representation of (3^242)/2
var HALF_3 = new Uint32Array([
    0xa5ce8964,
    0x9f007669,
    0x1484504f,
    0x3ade00d9,
    0x0c24486e,
    0x50979d57,
    0x79a4c702,
    0x48bbae36,
    0xa9f6808b,
    0xaa06a805,
    0xa87fabdf,
    0x5e69ebef
]);

var clone_uint32Array = function(array) {
  var source = new Uint32Array(array);

  return new Uint32Array(source);
};

var ta_slice = function(array) {
  if (array.slice !== undefined) {
      return array.slice();
  }

  return clone_uint32Array(array);
};

var ta_reverse = function(array) {
  if (array.reverse !== undefined) {
    array.reverse();
    return;
  }

  var i = 0,
    n = array.length,
    middle = Math.floor(n / 2),
    temp = null;

  for (; i < middle; i += 1) {
    temp = array[i];
    array[i] = array[n - 1 - i];
    array[n - 1 - i] = temp;
  }
};

/// negates the (unsigned) input array
var bigint_not = function(arr) {
    for (var i = 0; i < arr.length; i++) {
        arr[i] = (~arr[i]) >>> 0;
    }
};

/// rshift that works with up to 53
/// JS's shift operators only work on 32 bit integers
/// ours is up to 33 or 34 bits though, so
/// we need to implement shifting manually
var rshift = function(number, shift) {
    return (number / Math.pow(2, shift)) >>> 0;
};

/// swaps endianness
var swap32 = function(val) {
    return ((val & 0xFF) << 24) |
        ((val & 0xFF00) << 8) |
        ((val >> 8) & 0xFF00) |
        ((val >> 24) & 0xFF);
}

/// add with carry
var full_add = function(lh, rh, carry) {
    var v = lh + rh;
    var l = (rshift(v, 32)) & 0xFFFFFFFF;
    var r = (v & 0xFFFFFFFF) >>> 0;
    var carry1 = l != 0;

    if (carry) {
        v = r + 1;
    }
    l = (rshift(v, 32)) & 0xFFFFFFFF;
    r = (v & 0xFFFFFFFF) >>> 0;
    var carry2 = l != 0;

    return [r, carry1 || carry2];
};

/// subtracts rh from base
var bigint_sub = function(base, rh) {
    var noborrow = true;

    for (var i = 0; i < base.length; i++) {
        var vc = full_add(base[i], (~rh[i] >>> 0), noborrow);
        base[i] = vc[0];
        noborrow = vc[1];
    }

    if (!noborrow) {
        throw "noborrow";
    }
};

/// compares two (unsigned) big integers
var bigint_cmp = function(lh, rh) {
    for (var i = lh.length; i-- > 0;) {
        var a = lh[i] >>> 0;
        var b = rh[i] >>> 0;
        if (a < b) {
            return -1;
        } else if (a > b) {
            return 1;
        }
    }
    return 0;
};

/// adds rh to base in place
var bigint_add = function(base, rh) {
    var carry = false;
    for (var i = 0; i < base.length; i++) {
        var vc = full_add(base[i], rh[i], carry);
        base[i] = vc[0];
        carry = vc[1];
    }
};

/// adds a small (i.e. <32bit) number to base
var bigint_add_small = function(base, other) {
    var vc = full_add(base[0], other, false);
    base[0] = vc[0];
    var carry = vc[1];

    var i = 1;
    while (carry && i < base.length) {
        var vc = full_add(base[i], 0, carry);
        base[i] = vc[0];
        carry = vc[1];
        i += 1;
    }

    return i;
};

/// converts the given byte array to trits
var words_to_trits = function(words) {
    if (words.length != INT_LENGTH) {
        throw "Invalid words length";
    }

    var trits = new Int8Array(243);
    var base = new Uint32Array(words);

    ta_reverse(base);

    var flip_trits = false;
    if (base[INT_LENGTH - 1] >> 31 == 0) {
        // positive two's complement number.
        // add HALF_3 to move it to the right place.
        bigint_add(base, HALF_3);
    } else {
        // negative number.
        bigint_not(base);
        if (bigint_cmp(base, HALF_3) > 0) {
            bigint_sub(base, HALF_3);
            flip_trits = true;
        } else {
            /// bigint is between (unsigned) HALF_3 and (2**384 - 3**242/2).
            bigint_add_small(base, 1);
            var tmp = ta_slice(HALF_3);
            bigint_sub(tmp, base);
            base = tmp;
        }
    }


    var rem = 0;

    for (var i = 0; i < 242; i++) {
        rem = 0;
        for (var j = INT_LENGTH - 1; j >= 0; j--) {
            var lhs = (rem != 0 ? rem * 0xFFFFFFFF + rem : 0) + base[j];
            var rhs = RADIX;

            var q = (lhs / rhs) >>> 0;
            var r = (lhs % rhs) >>> 0;

            base[j] = q;
            rem = r;
        }

        trits[i] = rem - 1;
    }

    if (flip_trits) {
        for (var i = 0; i < trits.length; i++) {
            trits[i] = -trits[i];
        }
    }

    return trits;
}

var is_null = function(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] != 0) {
            return false;
            break;
        }
    }
    return true;
}

var trits_to_words = function(trits) {
    if (trits.length != 243) {
        throw "Invalid trits length";
    }

    var base = new Uint32Array(INT_LENGTH);

    if (trits.slice(0, 242).every(function(a) {
            a == -1
        })) {
        base = ta_slice(HALF_3);
        bigint_not(base);
        bigint_add_small(base, 1);
    } else {
        var size = 1;
        for (var i = trits.length - 1; i-- > 0;) {
            var trit = trits[i] + 1;

            //multiply by radix
            {
                var sz = size;
                var carry = 0;

                for (var j = 0; j < sz; j++) {
                    var v = base[j] * RADIX + carry;
                    carry = rshift(v, 32);
                    base[j] = (v & 0xFFFFFFFF) >>> 0;
                }

                if (carry > 0) {
                    base[sz] = carry;
                    size += 1;
                }
            }

            //addition
            {
                var sz = bigint_add_small(base, trit);
                if (sz > size) {
                    size = sz;
                }
            }
        }

        if (!is_null(base)) {
            if (bigint_cmp(HALF_3, base) <= 0) {
                // base >= HALF_3
                // just do base - HALF_3
                bigint_sub(base, HALF_3);
            } else {
                // base < HALF_3
                // so we need to transform it to a two's complement representation
                // of (base - HALF_3).
                // as we don't have a wrapping (-), we need to use some bit magic
                var tmp = ta_slice(HALF_3);
                bigint_sub(tmp, base);
                bigint_not(tmp);
                bigint_add_small(tmp, 1);
                base = tmp;
            }
        }
    }

    ta_reverse(base);

    for (var i = 0; i < base.length; i++) {
        base[i] = swap32(base[i]);
    }

    return base;
};

module.exports = {
    trits_to_words: trits_to_words,
    words_to_trits: words_to_trits
};
