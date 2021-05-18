let nonceLo: number;
let nonceHigh: number;
let powDigest: Uint8Array = new Uint8Array(32);

export function setDigest(index: number, value: number): void {
    powDigest[<u32>index] = <u8>value;
}

export function getNonceLo(): number {
    return nonceLo;
}

export function getNonceHi(): number {
    return nonceHigh;
}

/**
* Find the number of trailing zeros.
* @param trits The trits to look for zeros.
* @returns The number of trailing zeros.
*/
function trinaryTrailingZeros(trits: Uint8Array): number {
    let z: number = 0;
    for (let i = HASH_LENGTH - 1; i >= 0 && unchecked(trits[i]) === 0; i--) {
        z++;
    }
    return z;
}

const TRYTE_VALUE_TO_TRITS: i8[][] = [
    [-1, -1, -1], [0, -1, -1], [1, -1, -1], [-1, 0, -1], [0, 0, -1], [1, 0, -1],
    [-1, 1, -1], [0, 1, -1], [1, 1, -1], [-1, -1, 0], [0, -1, 0], [1, -1, 0],
    [-1, 0, 0], [0, 0, 0], [1, 0, 0], [-1, 1, 0], [0, 1, 0], [1, 1, 0],
    [-1, -1, 1], [0, -1, 1], [1, -1, 1], [-1, 0, 1], [0, 0, 1], [1, 0, 1],
    [-1, 1, 1], [0, 1, 1], [1, 1, 1]
];

/**
* Encode a byte array into trits.
* @param src The source data.
* @param dst The destination array.
* @param startIndex The start index to write in the array.
* @returns The length of the encode.
*/
function b1t6Encode(src: Uint8Array, dst: Uint8Array, startIndex: u32): u32 {
    let j: u32 = 0;
    for (let i = 0; i < src.length; i++) {
        const v = <i8><u8>unchecked(src[i]) + 364;

        const quo: i8 = <i8>(v / 27);
        const rem: i8 = <i8>(v % 27);

        unchecked(dst[startIndex + j] = TRYTE_VALUE_TO_TRITS[rem][0]);
        unchecked(dst[startIndex + j + 1] = TRYTE_VALUE_TO_TRITS[rem][1]);
        unchecked(dst[startIndex + j + 2] = TRYTE_VALUE_TO_TRITS[rem][2]);
        unchecked(dst[startIndex + j + 3] = TRYTE_VALUE_TO_TRITS[quo][0]);
        unchecked(dst[startIndex + j + 4] = TRYTE_VALUE_TO_TRITS[quo][1]);
        unchecked(dst[startIndex + j + 5] = TRYTE_VALUE_TO_TRITS[quo][2]);
   
        j += 6;
    }
    return j;
}

const HASH_LENGTH: u8 = 243;
const STATE_LENGTH: u16 = 3 * HASH_LENGTH;
const TRUTH_TABLE: i8[] = [1, 0, -1, 2, 1, -1, 0, 2, -1, 1, 0];

/**
* Sponge transform function
* @param curlState The current state of curl.
* @internal
*/
function curlTransform(curlState: Uint8Array): void {
    let stateCopy: Uint8Array;
    let index: i32 = 0;

    for (let round = 0; round < 81; round++) {
        stateCopy = curlState.slice(0);

        for (let i: u32 = 0; i < STATE_LENGTH; i++) {
            const lastVal = unchecked(stateCopy[index]);
            if (index < 365) {
                index += 364;
            } else {
                index -= 365;
            }
            const nextVal = unchecked(stateCopy[index] << 2);
            unchecked(curlState[i] = TRUTH_TABLE[lastVal + nextVal + 5]);
        }
    }
}

/**
* Perform the proof of work.
* @param powDigest The digest.
* @param targetZeros The number of zeros we are looking for.
* @param startIndex The index to start looking from.
* @returns The nonce if found.
*/
export function powWorker(targetZeros: number, startIndexLo: u32, startIndexHi: u32): void {
    let nonce: u64 = (<u64>startIndexHi << 32) | <u64>startIndexLo;
    let returnNonce: u64 = 0;

    const buf: Uint8Array = new Uint8Array(HASH_LENGTH);
    const digestTritsLen = b1t6Encode(powDigest, buf, 0);
    const biArr = new Uint8Array(8);

    do {
        (new DataView(biArr.buffer)).setUint64(0, nonce, true);
        b1t6Encode(biArr, buf, digestTritsLen);

        const curlState = new Uint8Array(STATE_LENGTH);
        curlState.set(buf, 0);
        curlTransform(curlState);

        if (trinaryTrailingZeros(curlState) >= targetZeros) {
            returnNonce = nonce;
        } else {
            nonce++;
        }
    } while (returnNonce === 0);

    nonceLo = <number>(returnNonce & 0xFFFFFFFF);
    nonceHigh = <number>((returnNonce >> 32) & 0xFFFFFFFF);
}
