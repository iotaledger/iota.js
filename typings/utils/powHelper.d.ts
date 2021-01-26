/**
 * Helper methods for POW.
 */
export declare class PowHelper {
    /**
     * Perform the score calculation.
     * @param message The data to perform the score on
     * @returns The score for the data.
     */
    static score(message: Uint8Array): number;
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
     * @returns The number of trailing zeros.
     */
    static trinaryTrailingZeros(trits: Int8Array): number;
}
