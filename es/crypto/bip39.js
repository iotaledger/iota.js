"use strict";
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bip39 = void 0;
var converter_1 = require("../utils/converter");
var randomHelper_1 = require("../utils/randomHelper");
var pbkdf2_1 = require("./pbkdf2");
var sha256_1 = require("./sha256");
var english_1 = require("./wordlists/english");
/**
 * Implementation of Bip39 for mnemonic generation.
 */
var Bip39 = /** @class */ (function () {
    function Bip39() {
    }
    /**
     * Set the wordlist and joining character.
     * @param wordlistData Array of words.
     * @param joiningChar The character to join the words with.
     */
    Bip39.setWordList = function (wordlistData, joiningChar) {
        if (joiningChar === void 0) { joiningChar = " "; }
        Bip39._wordlist = wordlistData;
        Bip39._joiningChar = joiningChar;
    };
    /**
     * Generate a random mnemonic.
     * @param length The length of the mnemonic to generate, defaults to 256.
     * @returns The random mnemonic.
     */
    Bip39.randomMnemonic = function (length) {
        if (length === void 0) { length = 256; }
        if (length % 32 !== 0) {
            throw new Error("The length must be a multiple of 32");
        }
        var randomBytes = randomHelper_1.RandomHelper.generate(length / 8);
        return Bip39.entropyToMnemonic(randomBytes);
    };
    /**
     * Generate a mnemonic from the entropy.
     * @param entropy The entropy to generate
     * @returns The mnemonic.
     */
    Bip39.entropyToMnemonic = function (entropy) {
        if (!Bip39._wordlist) {
            Bip39.setWordList(english_1.english, " ");
        }
        if (entropy.length % 4 !== 0 || entropy.length < 16 || entropy.length > 32) {
            throw new Error("The length of the entropy is invalid, it should be a multiple of 4, >= 16 and <= 32, it is " + entropy.length);
        }
        var bin = "" + converter_1.Converter.bytesToBinary(entropy) + Bip39.entropyChecksumBits(entropy);
        var mnemonic = [];
        for (var i = 0; i < bin.length / 11; i++) {
            var wordIndexBits = bin.slice(i * 11, (i + 1) * 11);
            var wordIndex = Number.parseInt(wordIndexBits, 2);
            mnemonic.push(Bip39._wordlist[wordIndex]);
        }
        return mnemonic.join(Bip39._joiningChar);
    };
    /**
     * Convert a mnemonic to a seed.
     * @param mnemonic The mnemonic to convert.
     * @param password The password to apply to the seed generation.
     * @param iterations The number of iterations to perform on the password function, defaults to 2048.
     * @param keyLength The size of the key length to generate, defaults to 64.
     * @returns The seed.
     */
    Bip39.mnemonicToSeed = function (mnemonic, password, iterations, keyLength) {
        if (iterations === void 0) { iterations = 2048; }
        if (keyLength === void 0) { keyLength = 64; }
        var mnemonicBytes = converter_1.Converter.utf8ToBytes(mnemonic.normalize("NFKD"));
        var salt = converter_1.Converter.utf8ToBytes("mnemonic" + (password !== null && password !== void 0 ? password : "").normalize("NFKD"));
        return pbkdf2_1.Pbkdf2.sha512(mnemonicBytes, salt, iterations, keyLength);
    };
    /**
     * Convert the mnemonic back to entropy.
     * @param mnemonic The mnemonic to convert.
     * @returns The entropy.
     */
    Bip39.mnemonicToEntropy = function (mnemonic) {
        if (!Bip39._wordlist) {
            Bip39.setWordList(english_1.english, " ");
        }
        var words = mnemonic.normalize("NFKD").split(Bip39._joiningChar);
        if (words.length % 3 !== 0) {
            throw new Error("Invalid mnemonic the number of words should be a multiple of 3, it is " + words.length);
        }
        var bits = words
            .map(function (word) {
            var index = Bip39._wordlist.indexOf(word);
            if (index === -1) {
                throw new Error("The mnemonic contains a word not in the wordlist " + word);
            }
            return index.toString(2).padStart(11, "0");
        })
            .join("");
        var dividerIndex = Math.floor(bits.length / 33) * 32;
        var entropyBits = bits.slice(0, dividerIndex);
        var checksumBits = bits.slice(dividerIndex);
        var entropy = converter_1.Converter.binaryToBytes(entropyBits);
        if (entropy.length % 4 !== 0 || entropy.length < 16 || entropy.length > 32) {
            throw new Error("The length of the entropy is invalid");
        }
        var newChecksum = Bip39.entropyChecksumBits(entropy);
        if (newChecksum !== checksumBits) {
            throw new Error("The checksum does not match " + newChecksum + " != " + checksumBits + ".");
        }
        return entropy;
    };
    /**
     * Calculate the entropy checksum.
     * @param entropy The entropy to calculate the checksum for.
     * @returns The checksum.
     */
    Bip39.entropyChecksumBits = function (entropy) {
        var hash = sha256_1.Sha256.sum256(entropy);
        var bits = entropy.length * 8;
        var hashbits = converter_1.Converter.bytesToBinary(hash);
        return hashbits.slice(0, bits / 32);
    };
    /**
     * The character to join the mnemonics with.
     * @internal
     */
    Bip39._joiningChar = " "; // \u3000 for japanese
    return Bip39;
}());
exports.Bip39 = Bip39;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmlwMzkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY3J5cHRvL2JpcDM5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDOzs7QUFFdEMsZ0RBQStDO0FBQy9DLHNEQUFxRDtBQUNyRCxtQ0FBa0M7QUFDbEMsbUNBQWtDO0FBQ2xDLCtDQUE4QztBQUU5Qzs7R0FFRztBQUNIO0lBQUE7SUE0SUEsQ0FBQztJQS9IRzs7OztPQUlHO0lBQ1csaUJBQVcsR0FBekIsVUFBMEIsWUFBc0IsRUFBRSxXQUF5QjtRQUF6Qiw0QkFBQSxFQUFBLGlCQUF5QjtRQUN2RSxLQUFLLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQztRQUMvQixLQUFLLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNXLG9CQUFjLEdBQTVCLFVBQTZCLE1BQW9CO1FBQXBCLHVCQUFBLEVBQUEsWUFBb0I7UUFDN0MsSUFBSSxNQUFNLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRTtZQUNuQixNQUFNLElBQUksS0FBSyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7U0FDMUQ7UUFDRCxJQUFNLFdBQVcsR0FBRywyQkFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdEQsT0FBTyxLQUFLLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVEOzs7O09BSUc7SUFDVyx1QkFBaUIsR0FBL0IsVUFBZ0MsT0FBbUI7UUFDL0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7WUFDbEIsS0FBSyxDQUFDLFdBQVcsQ0FBQyxpQkFBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ25DO1FBRUQsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxFQUFFLElBQUksT0FBTyxD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