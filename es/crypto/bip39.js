// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter } from "../utils/converter";
import { RandomHelper } from "../utils/randomHelper";
import { Pbkdf2 } from "./pbkdf2";
import { Sha256 } from "./sha256";
import { english } from "./wordlists/english";
/**
 * Implementation of Bip39 for mnemonic generation.
 */
export class Bip39 {
    /**
     * Set the wordlist and joining character.
     * @param wordlistData Array of words.
     * @param joiningChar The character to join the words with.
     */
    static setWordList(wordlistData, joiningChar = " ") {
        Bip39._wordlist = wordlistData;
        Bip39._joiningChar = joiningChar;
    }
    /**
     * Generate a random mnemonic.
     * @param length The length of the mnemonic to generate, defaults to 256.
     * @returns The random mnemonic.
     */
    static randomMnemonic(length = 256) {
        if (length % 32 !== 0) {
            throw new Error("The length must be a multiple of 32");
        }
        const randomBytes = RandomHelper.generate(length / 8);
        return Bip39.entropyToMnemonic(randomBytes);
    }
    /**
     * Generate a mnemonic from the entropy.
     * @param entropy The entropy to generate.
     * @returns The mnemonic.
     */
    static entropyToMnemonic(entropy) {
        if (!Bip39._wordlist) {
            Bip39.setWordList(english, " ");
        }
        if (entropy.length % 4 !== 0 || entropy.length < 16 || entropy.length > 32) {
            throw new Error(`The length of the entropy is invalid, it should be a multiple of 4, >= 16 and <= 32, it is ${entropy.length}`);
        }
        const bin = `${Converter.bytesToBinary(entropy)}${Bip39.entropyChecksumBits(entropy)}`;
        const mnemonic = [];
        for (let i = 0; i < bin.length / 11; i++) {
            const wordIndexBits = bin.slice(i * 11, (i + 1) * 11);
            const wordIndex = Number.parseInt(wordIndexBits, 2);
            mnemonic.push(Bip39._wordlist[wordIndex]);
        }
        return mnemonic.join(Bip39._joiningChar);
    }
    /**
     * Convert a mnemonic to a seed.
     * @param mnemonic The mnemonic to convert.
     * @param password The password to apply to the seed generation.
     * @param iterations The number of iterations to perform on the password function, defaults to 2048.
     * @param keyLength The size of the key length to generate, defaults to 64.
     * @returns The seed.
     */
    static mnemonicToSeed(mnemonic, password, iterations = 2048, keyLength = 64) {
        const mnemonicBytes = Converter.utf8ToBytes(mnemonic.normalize("NFKD"));
        const salt = Converter.utf8ToBytes(`mnemonic${(password !== null && password !== void 0 ? password : "").normalize("NFKD")}`);
        return Pbkdf2.sha512(mnemonicBytes, salt, iterations, keyLength);
    }
    /**
     * Convert the mnemonic back to entropy.
     * @param mnemonic The mnemonic to convert.
     * @returns The entropy.
     */
    static mnemonicToEntropy(mnemonic) {
        if (!Bip39._wordlist) {
            Bip39.setWordList(english, " ");
        }
        const words = mnemonic.normalize("NFKD").split(Bip39._joiningChar);
        if (words.length % 3 !== 0) {
            throw new Error(`Invalid mnemonic the number of words should be a multiple of 3, it is ${words.length}`);
        }
        const bits = words
            .map(word => {
            const index = Bip39._wordlist.indexOf(word);
            if (index === -1) {
                throw new Error(`The mnemonic contains a word not in the wordlist ${word}`);
            }
            return index.toString(2).padStart(11, "0");
        })
            .join("");
        const dividerIndex = Math.floor(bits.length / 33) * 32;
        const entropyBits = bits.slice(0, dividerIndex);
        const checksumBits = bits.slice(dividerIndex);
        const entropy = Converter.binaryToBytes(entropyBits);
        if (entropy.length % 4 !== 0 || entropy.length < 16 || entropy.length > 32) {
            throw new Error("The length of the entropy is invalid");
        }
        const newChecksum = Bip39.entropyChecksumBits(entropy);
        if (newChecksum !== checksumBits) {
            throw new Error(`The checksum does not match ${newChecksum} != ${checksumBits}.`);
        }
        return entropy;
    }
    /**
     * Calculate the entropy checksum.
     * @param entropy The entropy to calculate the checksum for.
     * @returns The checksum.
     */
    static entropyChecksumBits(entropy) {
        const hash = Sha256.sum256(entropy);
        const bits = entropy.length * 8;
        const hashbits = Converter.bytesToBinary(hash);
        return hashbits.slice(0, bits / 32);
    }
}
/**
 * The character to join the mnemonics with.
 * @internal
 */
Bip39._joiningChar = " "; // \u3000 for japanese
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmlwMzkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY3J5cHRvL2JpcDM5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFFdEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDbEMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRTlDOztHQUVHO0FBQ0gsTUFBTSxPQUFPLEtBQUs7SUFhZDs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLFdBQVcsQ0FBQyxZQUFzQixFQUFFLGNBQXNCLEdBQUc7UUFDdkUsS0FBSyxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUM7UUFDL0IsS0FBSyxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7SUFDckMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsY0FBYyxDQUFDLFNBQWlCLEdBQUc7UUFDN0MsSUFBSSxNQUFNLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRTtZQUNuQixNQUFNLElBQUksS0FBSyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7U0FDMUQ7UUFDRCxNQUFNLFdBQVcsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN0RCxPQUFPLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxPQUFtQjtRQUMvQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTtZQUNsQixLQUFLLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFB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