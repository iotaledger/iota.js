/**
 * Helper methods for POW.
 */
export declare class PowHelper {
    /**
     * LN3 Const see https://oeis.org/A002391.
     */
    static readonly LN3: number;
    /**
     * Perform the score calculation.
     * @param message The data to perform the score on.
     * @returns The score for the data.
     */
    static score(message: Uint8Array): number;
    /**
     * Calculate the number of zeros required to get target score.
     * @param message The message to process.
     * @param targetScore The target score.
     * @returns The number of zeros to find.
     */
    static calculateTargetZeros(message: Uint8Array, targetScore: number): number;
    /**
     * Calculate the trailing zeros.
     * @param powDigest The pow digest.
     * @param nonce The nonce.
     * @returns The trailing zeros.
     */
    static trailingZeros(powDigest: Uint8Array, nonce: bigint): number;
    /**
     * Find the number of trailing zeros.
     * @param trits The trits to look for zeros.
     * @param endPos The end position to start looking for zeros.
     * @returns The number of trailing zeros.
     */
    static trinaryTrailingZeros(trits: Int8Array, endPos?: number): number;
    /**
     * Perform the hash on the data until we reach target number of zeros.
     * @param powDigest The pow digest.
     * @param targetZeros The target number of zeros.
     * @param startIndex The index to start looking from.
     * @returns The nonce.
     */
    static performPow(powDigest: Uint8Array, targetZeros: number, startIndex: bigint): bigint;
}
