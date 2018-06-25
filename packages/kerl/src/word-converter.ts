import * as errors from './errors'

/* tslint:disable variable-name */
const INT_LENGTH = 12
const RADIX = 3

// hex representation of (3^242)/2
const HALF_3 = new Uint32Array([
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
    0x5e69ebef,
])

function clone_uint32Array(array: Uint32Array) {
    const source = new Uint32Array(array)

    return new Uint32Array(source)
}

function ta_slice(array: Uint32Array) {
    if (array.slice !== undefined) {
        return array.slice()
    }

    return clone_uint32Array(array)
}

function ta_reverse(array: Uint32Array) {
    if (array.reverse !== undefined) {
        array.reverse()
        return
    }

    const n = array.length
    const middle = Math.floor(n / 2)
    let i = 0
    let temp = null

    for (; i < middle; i += 1) {
        temp = array[i]
        array[i] = array[n - 1 - i]
        array[n - 1 - i] = temp
    }
}

// negates the (unsigned) input array
function bigint_not(arr: Uint32Array) {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = ~arr[i] >>> 0
    }
}

// rshift that works with up to 53
// JS's shift operators only work on 32 bit integers
// ours is up to 33 or 34 bits though, so
// we need to implement shifting manually
function rshift(num: number, shift: number) {
    return (num / Math.pow(2, shift)) >>> 0
}

// swaps endianness
function swap32(val: number) {
    return ((val & 0xff) << 24) | ((val & 0xff00) << 8) | ((val >> 8) & 0xff00) | ((val >> 24) & 0xff)
}

// add with carry
function full_add(lh: number, rh: number, carry: boolean): [number, boolean] {
    let v = lh + rh
    let l = rshift(v, 32) & 0xffffffff
    let r = (v & 0xffffffff) >>> 0
    const carry1 = l !== 0

    if (carry) {
        v = r + 1
    }

    l = rshift(v, 32) & 0xffffffff
    r = (v & 0xffffffff) >>> 0

    const carry2 = l !== 0

    return [r, carry1 || carry2]
}

// subtracts rh from base
function bigint_sub(base: Uint32Array, rh: Uint32Array) {
    let noborrow = true

    for (let i = 0; i < base.length; i++) {
        const vc = full_add(base[i], ~rh[i] >>> 0, noborrow)

        base[i] = vc[0]
        noborrow = vc[1]
    }

    if (!noborrow) {
        throw new Error('noborrow')
    }
}

// compares two (unsigned) big integers
function bigint_cmp(lh: Uint32Array, rh: Uint32Array) {
    for (let i = lh.length; i-- > 0; ) {
        const a = lh[i] >>> 0
        const b = rh[i] >>> 0

        if (a < b) {
            return -1
        } else if (a > b) {
            return 1
        }
    }
    return 0
}

// adds rh to base in place
function bigint_add(base: Uint32Array, rh: Uint32Array) {
    let carry = false

    for (let i = 0; i < base.length; i++) {
        const vc = full_add(base[i], rh[i], carry)
        base[i] = vc[0]
        carry = vc[1]
    }
}

function is_null(arr: Uint32Array) {
    // tslint:disable-next-line prefer-for-of
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== 0) {
            return false
        }
    }
    return true
}

// adds a small (i.e. <32bit) number to base
function bigint_add_small(base: Uint32Array, other: number) {
    const vc = full_add(base[0], other, false)
    let carry: boolean

    base[0] = vc[0]
    carry = vc[1]

    let i = 1
    while (carry && i < base.length) {
        const vc2 = full_add(base[i], 0, carry)
        base[i] = vc2[0]
        carry = vc2[1]
        i += 1
    }

    return i
}

/**
 * Converts the given byte array to trits
 *
 * @method wordsToTrits
 *
 * @ignore
 *
 * @param {Uint32Array} words
 *
 * @return {Int8Array} trits
 */
export function wordsToTrits(words: Uint32Array): Int8Array {
    if (words.length !== INT_LENGTH) {
        throw new Error(errors.ILLEGAL_WORDS_LENGTH)
    }

    const trits = new Int8Array(243)
    let base = new Uint32Array(words)

    ta_reverse(base)

    let flip_trits = false

    if (base[INT_LENGTH - 1] >> 31 === 0) {
        // positive two's complement number.
        // add HALF_3 to move it to the right place.
        bigint_add(base, HALF_3)
    } else {
        // negative number.
        bigint_not(base)
        if (bigint_cmp(base, HALF_3) > 0) {
            bigint_sub(base, HALF_3)
            flip_trits = true
        } else {
            /// bigint is between (unsigned) HALF_3 and (2**384 - 3**242/2).
            bigint_add_small(base, 1)
            const tmp = ta_slice(HALF_3)
            bigint_sub(tmp, base)
            base = tmp
        }
    }

    let rem = 0

    for (let i = 0; i < 242; i++) {
        rem = 0
        for (let j = INT_LENGTH - 1; j >= 0; j--) {
            const lhs = (rem !== 0 ? rem * 0xffffffff + rem : 0) + base[j]
            const rhs = RADIX

            const q = (lhs / rhs) >>> 0
            const r = (lhs % rhs) >>> 0

            base[j] = q
            rem = r
        }

        trits[i] = rem - 1
    }

    if (flip_trits) {
        for (let i = 0; i < trits.length; i++) {
            trits[i] = -trits[i]
        }
    }

    return trits
}

/**
 * Converts the given trits to byte array
 *
 * @method tritsToWords
 *
 * @ignore
 *
 * @param {Int8Array} trits
 *
 * @return {Uint32Array} words
 */
export function tritsToWords(trits: Int8Array): Uint32Array {
    if (trits.length !== 243) {
        throw new Error('Invalid trits length')
    }

    let base = new Uint32Array(INT_LENGTH)

    let allMinusOne = true
    const tritSlice = trits.slice(0, 242)

    for (let i = 0; i < tritSlice.length; i++) {
        if (tritSlice[i] !== -1) {
            allMinusOne = false
            break
        }
    }

    if (allMinusOne) {
        base = ta_slice(HALF_3)
        bigint_not(base)
        bigint_add_small(base, 1)
    } else {
        let size = 1

        for (let i = trits.length - 1; i-- > 0; ) {
            const trit = trits[i] + 1

            // multiply by radix
            {
                const sz = size
                let carry = 0

                for (let j = 0; j < sz; j++) {
                    const v = base[j] * RADIX + carry
                    carry = rshift(v, 32)
                    base[j] = (v & 0xffffffff) >>> 0
                }

                if (carry > 0) {
                    base[sz] = carry
                    size += 1
                }
            }

            // addition
            {
                const sz = bigint_add_small(base, trit)
                if (sz > size) {
                    size = sz
                }
            }
        }

        if (!is_null(base)) {
            if (bigint_cmp(HALF_3, base) <= 0) {
                // base >= HALF_3
                // just do base - HALF_3
                bigint_sub(base, HALF_3)
            } else {
                // base < HALF_3
                // so we need to transform it to a two's complement representation
                // of (base - HALF_3).
                // as we don't have a wrapping (-), we need to use some bit magic
                const tmp = ta_slice(HALF_3)

                bigint_sub(tmp, base)
                bigint_not(tmp)
                bigint_add_small(tmp, 1)
                base = tmp
            }
        }
    }

    ta_reverse(base)

    for (let i = 0; i < base.length; i++) {
        base[i] = swap32(base[i])
    }

    return base
}
