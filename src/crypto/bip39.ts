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
     * The wordlist for mnemonic generation.
     * @internal
     */
    private static _wordlist: string[];

    /**
     * The character to join the mnemonics with.
     * @internal
     */
    private static _joiningChar = " "; // \u3000 for japanese

    /**
     * Set the wordlist and joining character.
     * @param wordlistData Array of words.
     * @param joiningChar The character to join the words with.
     */
    public static setWordList(wordlistData: string[], joiningChar: string = " ") {
        Bip39._wordlist = wordlistData;
        Bip39._joiningChar = joiningChar;
    }

    /**
     * Generate a random mnemonic.
     * @param length The length of the mnemonic to generate, defaults to 256.
     * @returns The random mnemonic.
     */
    public static randomMnemonic(length: number = 256): string {
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
    public static entropyToMnemonic(entropy: Uint8Array): string {
        if (!Bip39._wordlist) {
            Bip39.setWordList(english, " ");
        }

        if (entropy.length % 4 !== 0 || entropy.length < 16 || entropy.length > 32) {
            throw new Error(
                `The length of the entropy is invalid, it should be a multiple of 4, >= 16 and <= 32, it is ${
                    entropy.length}`);
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
    public static mnemonicToSeed(
        mnemonic: string, password?: string, iterations: number = 2048, keyLength: number = 64): Uint8Array {
        const mnemonicBytes = Converter.utf8ToBytes(mnemonic.normalize("NFKD"));
        const salt = Converter.utf8ToBytes(`mnemonic${(password ?? "").normalize("NFKD")}`);

        return Pbkdf2.sha512(mnemonicBytes, salt, iterations, keyLength);
    }

    /**
     * Convert the mnemonic back to entropy.
     * @param mnemonic The mnemonic to convert.
     * @returns The entropy.
     */
    public static mnemonicToEntropy(mnemonic: string): Uint8Array {
        if (!Bip39._wordlist) {
            Bip39.setWordList(english, " ");
        }

        const words = mnemonic.normalize("NFKD").split(Bip39._joiningChar);

        if (words.length % 3 !== 0) {
            throw new Error(`Invalid mnemonic the number of words should be a multiple of 3, it is ${words.length}`);
        }

        const bits = words
            .map(
                word => {
                    const index = Bip39._wordlist.indexOf(word);
                    if (index === -1) {
                        throw new Error(`The mnemonic contains a word not in the wordlist ${word}`);
                    }

                    return index.toString(2).padStart(11, "0");
                }
            )
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
    public static entropyChecksumBits(entropy: Uint8Array): string {
        const hash = Sha256.sum256(entropy);
        const bits = entropy.length * 8;

        const hashbits = Converter.bytesToBinary(hash);

        return hashbits.slice(0, bits / 32);
    }
}
