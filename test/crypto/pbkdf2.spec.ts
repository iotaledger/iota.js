// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Pbkdf2 } from "../../src/crypto/pbkdf2";
import { Converter } from "../../src/utils/converter";
import testDataSha256 from "./testData/pbkdf2Sha256.json";
import testDataSha512 from "./testData/pbkdf2Sha512.json";

describe("Pbkdf2", () => {
    test("Can verify with test vectors sha256", () => {
        for (const test of testDataSha256) {
            const passBytes = Converter.hexToBytes(test.pass);
            const saltBytes = Converter.hexToBytes(test.salt);
            expect(Converter.bytesToHex(
                Pbkdf2.sha256(passBytes, saltBytes, test.iterations, test.keyLength))).toEqual(test.key);
        }
    });

    test("Can verify with test vectors sha512", () => {
        for (const test of testDataSha512) {
            const passBytes = Converter.hexToBytes(test.pass);
            const saltBytes = Converter.hexToBytes(test.salt);
            expect(Converter.bytesToHex(
                Pbkdf2.sha512(passBytes, saltBytes, test.iterations, test.keyLength))).toEqual(test.key);
        }
    });
});
