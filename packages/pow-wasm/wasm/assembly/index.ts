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
 * Convert a big int to bytes.
 * @param value The bigint.
 * @param data The buffer to write into.
 * @param byteOffset The start index to write from.
 */
function write8(value: u64, data: Uint8Array, byteOffset: u32): void {
    const v0 = <u32>(value & 0xFFFFFFFF);
    const v1 = <u32>((value >> 32) & 0xFFFFFFFF);

    data[byteOffset] = v0 & 0xFF;
    data[byteOffset + 1] = (v0 >> 8) & 0xFF;
    data[byteOffset + 2] = (v0 >> 16) & 0xFF;
    data[byteOffset + 3] = (v0 >> 24) & 0xFF;
    data[byteOffset + 4] = v1 & 0xFF;
    data[byteOffset + 5] = (v1 >> 8) & 0xFF;
    data[byteOffset + 6] = (v1 >> 16) & 0xFF;
    data[byteOffset + 7] = (v1 >> 24) & 0xFF;
}

/**
* Find the number of trailing zeros.
* @param trits The trits to look for zeros.
* @returns The number of trailing zeros.
*/
function trinaryTrailingZeros(trits: Int8Array): number {
    let z: number = 0;
    for (let i = trits.length - 1; i >= 0 && trits[i] === 0; i--) {
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
const TRITS_PER_TRYTE: u8 = 3;
const MIN_TRYTE_VALUE: i8 = -13;

/**
* Encode a byte array into trits.
* @param dst The destination array.
* @param startIndex The start index to write in the array.
* @param src The source data.
* @returns The length of the encode.
*/
function b1t6Encode(dst: Int8Array, startIndex: u32, src: Uint8Array): u32 {
    let j: u32 = 0;
    for (let i = 0; i < src.length; i++) {
        const t = b1t6EncodeGroup(src[i]);
        b1t6StoreTrits(dst, startIndex + j, t[0]);
        b1t6StoreTrits(dst, startIndex + j + TRITS_PER_TRYTE, t[1]);
        j += 6;
    }
    return j;
}

/**
* Encode a group to trits.
* @param b The value to encode.
* @returns The trit groups.
* @internal
*/
function b1t6EncodeGroup(b: u8): i8[] {
    const v = <i8><u8>b + 364;
    const quo: i8 = Math.trunc(v / 27) as i8;
    const rem: i8 = Math.trunc(v % 27) as i8;
    return [
        rem + MIN_TRYTE_VALUE,
        quo + MIN_TRYTE_VALUE
    ];
}

/**
* Store the trits in the dest array.
* @param trits The trits array.
* @param startIndex The start index in the array to write.
* @param value The value to write.
* @internal
*/
function b1t6StoreTrits(trits: Int8Array, startIndex: u32, value: i8): void {
    const idx = value - MIN_TRYTE_VALUE;

    trits[startIndex] = TRYTE_VALUE_TO_TRITS[idx][0];
    trits[startIndex + 1] = TRYTE_VALUE_TO_TRITS[idx][1];
    trits[startIndex + 2] = TRYTE_VALUE_TO_TRITS[idx][2];
}

const HASH_LENGTH: u8 = 243;
const STATE_LENGTH: u16 = 3 * HASH_LENGTH;
const TRUTH_TABLE: i8[] = [1, 0, -1, 2, 1, -1, 0, 2, -1, 1, 0];

/**
* Absorbs trits given an offset and length
* @param curlState The current state of curl.
* @param trits The trits to absorb.
* @param offset The offset to start abororbing from the array.
* @param length The length of trits to absorb.
*/
function curlAbsorb(curlState: Int8Array, trits: Int8Array, offset: u32, length: u32): void {
    do {
        const limit: u32 = length < HASH_LENGTH ? length : HASH_LENGTH;

        curlState.set(trits.subarray(offset, offset + limit));

        curlTransform(curlState);
        length -= HASH_LENGTH;
        offset += limit;
    } while (length > 0);
}

/**
* Squeezes trits given an offset and length
* @param curlState The current state of curl.
* @param trits The trits to squeeze.
* @param offset The offset to start squeezing from the array.
* @param length The length of trits to squeeze.
*/
function curlSqueeze(curlState: Int8Array, trits: Int8Array, offset: u32, length: u32): void {
    do {
        const limit: u32 = length < HASH_LENGTH ? length : HASH_LENGTH;

        trits.set(curlState.subarray(0, limit), offset);

        curlTransform(curlState);
        length -= HASH_LENGTH;
        offset += limit;
    } while (length > 0);
}

/**
* Sponge transform function
* @param curlState The current state of curl.
* @internal
*/
function curlTransform(curlState: Int8Array): void {
    let stateCopy: Int8Array;
    let index: i32 = 0;

    for (let round = 0; round < 81; round++) {
        stateCopy = curlState.slice();

        for (let i: u32 = 0; i < STATE_LENGTH; i++) {
            curlState[i] =
                TRUTH_TABLE[stateCopy[index] + (stateCopy[(index += index < 365 ? 364 : -365)] << 2) + 5];
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

    const buf: Int8Array = new Int8Array(HASH_LENGTH);
    const digestTritsLen = b1t6Encode(buf, 0, powDigest);
    const hash: Int8Array = new Int8Array(HASH_LENGTH);
    const biArr = new Uint8Array(8);

    do {
        write8(nonce, biArr, 0);
        b1t6Encode(buf, digestTritsLen, biArr);

        const curlState = new Int8Array(STATE_LENGTH);
        curlAbsorb(curlState, buf, 0, HASH_LENGTH);
        curlSqueeze(curlState, hash, 0, HASH_LENGTH);

        if (trinaryTrailingZeros(hash) >= targetZeros) {
            returnNonce = nonce;
        } else {
            nonce++;
        }
    } while (returnNonce === 0);

    nonceLo = <number>returnNonce;
    nonceHigh = <number>(returnNonce >> 32);
}
