// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Bip39 } from "../../src/crypto/bip39";
import { Converter } from "../../src/utils/converter";
import testData from "./testData/bip39.json";

describe("Bip39", () => {
    test("Can verify with test vectors", () => {
        for (const test of testData) {
            const entropyBytes = Converter.hexToBytes(test.entropy);

            expect(
                Bip39.entropyToMnemonic(entropyBytes)).toEqual(test.mnemonic);

            expect(
                Converter.bytesToHex(Bip39.mnemonicToEntropy(test.mnemonic))).toEqual(test.entropy);

            expect(
                Converter.bytesToHex(Bip39.mnemonicToSeed(test.mnemonic, test.password))).toEqual(test.seed);
        }
    });
});
