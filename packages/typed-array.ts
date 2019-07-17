if (!Int8Array.prototype.slice) {
    Object.defineProperty(Int8Array.prototype, 'slice', {
        value: Array.prototype.slice,
    })
}

if (!Int8Array.prototype.subarray) {
    Object.defineProperty(Uint8Array.prototype, 'subarray', {
        value: Array.prototype.slice,
    })
}

if (!Int8Array.prototype.map) {
    Object.defineProperty(Int8Array.prototype, 'map', {
        value: Array.prototype.map,
    })
}

if (!Int8Array.prototype.every) {
    Object.defineProperty(Int8Array.prototype, 'every', {
        value: Array.prototype.every,
    })
}

if (!Int8Array.prototype.some) {
    Object.defineProperty(Uint8Array.prototype, 'some', {
        value: Array.prototype.some,
    })
}

if (!Int8Array.prototype.indexOf) {
    Object.defineProperty(Int8Array.prototype, 'indexOf', {
        value: Array.prototype.indexOf,
    })
}

// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill#Polyfill
// Any copyright is dedicated to the Public Domain. http://creativecommons.org/publicdomain/zero/1.0/
if (!Int8Array.prototype.fill) {
    Object.defineProperty(Int8Array.prototype, 'fill', {
        value(input: any) {
            // Steps 1-2.
            if (this == null) {
                throw new TypeError('this is null or not defined')
            }

            const O = Object(this)

            // Steps 3-5.
            const len = O.length >>> 0

            // Steps 6-7.
            const start = arguments[1]
            const relativeStart = start >> 0

            // Step 8.
            let k = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len)

            // Steps 9-10.
            const end = arguments[2]
            const relativeEnd = end === undefined ? len : end >> 0

            // Step 11.
            const last = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len)

            // Step 12.
            while (k < last) {
                O[k] = input
                k++
            }

            // Step 13.
            return O
        },
    })
}

if (!Uint32Array.prototype.slice) {
    Object.defineProperty(Uint8Array.prototype, 'slice', {
        value: Array.prototype.slice,
    })
}

if (!Uint32Array.prototype.reverse) {
    Object.defineProperty(Uint8Array.prototype, 'reverse', {
        value: Array.prototype.reverse,
    })
}
