// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, RandomHelper } from "@iota/util.js";
import { Sha256 } from "../hashes/sha256";
import { Pbkdf2 } from "./pbkdf2";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmlwMzkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMva2V5cy9iaXAzOS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBRXRDLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3hELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUMxQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUU5Qzs7R0FFRztBQUNILE1BQU0sT0FBTyxLQUFLO0lBYWQ7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxXQUFXLENBQUMsWUFBc0IsRUFBRSxjQUFzQixHQUFHO1FBQ3ZFLEtBQUssQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDO1FBQy9CLEtBQUssQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO0lBQ3JDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLGNBQWMsQ0FBQyxTQUFpQixHQUFHO1FBQzdDLElBQUksTUFBTSxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUU7WUFDbkIsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO1NBQzFEO1FBQ0QsTUFBTSxXQUFXLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdEQsT0FBTyxLQUFLLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsaUJBQWlCLENBQUMsT0FBbUI7UUFDL0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7WUFDbEIsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDbkM7UUFFRCxJQUFJLE9B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