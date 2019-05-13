/* copyright Paul Handy, 2017 */

/* tslint:disable variable-name */
function sum(a: number, b: number) {
    const s = a + b

    switch (s) {
        case 2:
            return -1
        case -2:
            return 1
        default:
            return s
    }
}

function cons(a: number, b: number) {
    if (a === b) {
        return a
    }

    return 0
}

function any(a: number, b: number) {
    const s = a + b

    if (s > 0) {
        return 1
    } else if (s < 0) {
        return -1
    }

    return 0
}

function full_add(a: number, b: number, c: number) {
    const s_a = sum(a, b)
    const c_a = cons(a, b)
    const c_b = cons(s_a, c)
    const c_out = any(c_a, c_b)
    const s_out = sum(s_a, c)

    return [s_out, c_out]
}

export function add(a: Int8Array, b: Int8Array): Int8Array {
    const out = new Int8Array(Math.max(a.length, b.length))
    let carry = 0
    let a_i
    let b_i

    for (let i = 0; i < out.length; i++) {
        a_i = i < a.length ? a[i] : 0
        b_i = i < b.length ? b[i] : 0

        const f_a = full_add(a_i, b_i, carry)

        out[i] = f_a[0]
        carry = f_a[1]
    }

    return out
}

export const increment = (value: Int8Array) => add(value, new Int8Array(1).fill(1))
