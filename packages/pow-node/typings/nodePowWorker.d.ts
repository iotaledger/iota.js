/**
 * Perform the hash on the data until we reach target number of zeros.
 * @param powDigest The pow digest.
 * @param target The target number of zeros.
 * @param startIndex The index to start looking from.
 * @returns The nonce.
 */
export declare function doPow(powDigest: Uint8Array, target: number, startIndex: bigint): bigint;
