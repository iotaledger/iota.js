const INT_LENGTH = 12;
const BYTE_LENGTH = 48;
const RADIX = 3;
/// hex representation of (3^242)/2
const HALF_3 = Uint32Array.from([
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

/// negates the (unsigned) input array
const bigint_not = function(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = (~arr[i]) >>> 0;
    }
};

/// rshift that works with up to 53
/// JS's shift operators only work on 32 bit integers
/// ours is up to 33 or 34 bits though, so
/// we need to implement shifting manually
const rshift = function(number, shift) {
    return (number / Math.pow(2, shift)) >>> 0;
};

/// swaps endianness
const swap32 = function(val) {
    return ((val & 0xFF) << 24) |
        ((val & 0xFF00) << 8) |
        ((val >> 8) & 0xFF00) |
        ((val >> 24) & 0xFF);
}

/// add with carry
const full_add = function(lh, rh, carry) {
    let v = lh + rh;
    let l = (rshift(v, 32)) & 0xFFFFFFFF;
    let r = (v & 0xFFFFFFFF) >>> 0;
    let carry1 = l != 0;

    if (carry) {
        v = r + 1;
    }
    l = (rshift(v, 32)) & 0xFFFFFFFF;
    r = (v & 0xFFFFFFFF) >>> 0;
    let carry2 = l != 0;

    return [r, carry1 || carry2];
};

/// subtracts rh from base
const bigint_sub = function(base, rh) {
    let noborrow = true;

    for (let i = 0; i < base.length; i++) {
        let [v, c] = full_add(base[i], (~rh[i] >>> 0), noborrow);
        base[i] = v;
        noborrow = c;
    }

    if (!noborrow) {
        throw "noborrow";
    }
};

/// compares two (unsigned) big integers
const bigint_cmp = function(lh, rh) {
    for (let i = lh.length; i-- > 0;) {
        let a = lh[i] >>> 0;
        let b = rh[i] >>> 0;
        if (a < b) {
            return -1;
        } else if (a > b) {
            return 1;
        }
    }
    return 0;
};

/// adds rh to base in place
const bigint_add = function(base, rh) {
    let carry = false;
    for (let i = 0; i < base.length; i++) {
        let [v, c] = full_add(base[i], rh[i], carry);
        base[i] = v;
        carry = c;
    }
};

/// adds a small (i.e. <32bit) number to base
const bigint_add_small = function(base, other) {
    let [v, carry] = full_add(base[0], other, false);
    base[0] = v;

    let i = 1;
    while (carry && i < base.length) {
        let [v, c] = full_add(base[i], 0, carry);
        base[i] = v;
        carry = c;
        i += 1;
    }

    return i;
};

/// converts the given byte array to trits
const words_to_trits = function(words) {
    if (words.length != INT_LENGTH) {
        throw "Invalid words length";
    }

    let trits = new Int8Array(243);
    let base = Uint32Array.from(words);

    base.reverse();

    let flip_trits = false;
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
            let tmp = HALF_3.slice(0);
            bigint_sub(tmp, base);
            base = tmp;
        }
    }


    let rem = 0;

    for (let i = 0; i < 242; i++) {
        rem = 0;
        for (let j = INT_LENGTH - 1; j >= 0; j--) {
            let lhs = (rem != 0 ? rem * 0xFFFFFFFF + rem : 0) + base[j];
            let rhs = RADIX;

            let q = (lhs / rhs) >>> 0;
            let r = (lhs % rhs) >>> 0;

            base[j] = q;
            rem = r;
        }

        trits[i] = rem - 1;
    }

    if (flip_trits) {
        for (let i = 0; i < trits.length; i++) {
            trits[i] = -trits[i];
        }
    }

    return trits;
}

const is_null = function(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] != 0) {
            return false;
            break;
        }
    }
    return true;
}

const trits_to_words = function(trits) {
    if (trits.length != 243) {
        throw "Invalid trits length";
    }

    let base = new Uint32Array(INT_LENGTH);

    if (trits.slice(0, 242).every((a) => a == -1)) {
        base = HALF_3.slice(0);
        bigint_not(base);
        bigint_add_small(base, 1);
    } else {
        let size = 1;
        for (let i = trits.length - 1; i-- > 0;) {
            let trit = trits[i] + 1;

            //multiply by radix
            {
                let sz = size;
                let carry = 0;

                for (var j = 0; j < sz; j++) {
                    let v = base[j] * RADIX + carry;
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
                let sz = bigint_add_small(base, trit);
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
                let tmp = HALF_3.slice(0);
                bigint_sub(tmp, base);
                bigint_not(tmp);
                bigint_add_small(tmp, 1);
                base = tmp;
            }
        }
    }

    base.reverse();

    for (let i = 0; i < base.length; i++) {
        base[i] = swap32(base[i]);
    }

    return base;
};

module.exports = {
    trits_to_words: trits_to_words,
    words_to_trits: words_to_trits
};
