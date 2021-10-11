/**
 * Implementation of Bip39 for mnemonic generation.
 */
export declare class Bip39 {
    /**
     * Set the wordlist and joining character.
     * @param wordlistData Array of words.
     * @param joiningChar The character to join the words with.
     */
    static setWordList(wordlistData: string[], joiningChar?: string): void;
    /**
     * Generate a random mnemonic.
     * @param length The length of the mnemonic to generate, defaults to 256.
     * @returns The random mnemonic.
     */
    static randomMnemonic(length?: number): string;
    /**
     * Generate a mnemonic from the entropy.
     * @param entropy The entropy to generate.
     * @returns The mnemonic.
     */
    static entropyToMnemonic(entropy: Uint8Array): string;
    /**
     * Convert a mnemonic to a seed.
     * @param mnemonic The mnemonic to convert.
     * @param password The password to apply to the seed generation.
     * @param iterations The number of iterations to perform on the password function, defaults to 2048.
     * @param keyLength The size of the key length to generate, defaults to 64.
     * @returns The seed.
     */
    static mnemonicToSeed(mnemonic: string, password?: string, iterations?: number, keyLength?: number): Uint8Array;
    /**
     * Convert the mnemonic back to entropy.
     * @param mnemonic The mnemonic to convert.
     * @returns The entropy.
     */
    static mnemonicToEntropy(mnemonic: string): Uint8Array;
    /**
     * Calculate the entropy checksum.
     * @param entropy The entropy to calculate the checksum for.
     * @returns The checksum.
     */
    static entropyChecksumBits(entropy: Uint8Array): string;
}
