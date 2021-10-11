/**
 * Implementation of the password based key derivation function 2.
 */
export declare class Pbkdf2 {
    /**
     * Derive a key from the parameters using Sha256.
     * @param password The password to derive the key from.
     * @param salt The salt for the derivation.
     * @param iterations Numer of iterations to perform.
     * @param keyLength The length of the key to derive.
     * @returns The derived key.
     */
    static sha256(password: Uint8Array, salt: Uint8Array, iterations: number, keyLength: number): Uint8Array;
    /**
     * Derive a key from the parameters using Sha512.
     * @param password The password to derive the key from.
     * @param salt The salt for the derivation.
     * @param iterations Numer of iterations to perform.
     * @param keyLength The length of the key to derive.
     * @returns The derived key.
     */
    static sha512(password: Uint8Array, salt: Uint8Array, iterations: number, keyLength: number): Uint8Array;
}
