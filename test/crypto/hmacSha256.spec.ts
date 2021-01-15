// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { HmacSha256 } from "../../src/crypto/hmacSha256";
import { Converter } from "../../src/utils/converter";
import testData from "./testData/hmacSha256.json";

describe("HmacSha256", () => {
    test("Can perform a hmac on short text", () => {
        const hmacSha256 = new HmacSha256(Converter.utf8ToBytes("mykey"));
        hmacSha256.update(Converter.utf8ToBytes("abc"));
        const digest2 = hmacSha256.digest();
        expect(Converter.bytesToHex(digest2))
            .toEqual("19e13ec923a3e5ae829d18cb596bd3fad0705ccc147f9d1d914e8880d7e2e24c");
    });

    test("Can perform a hmac on empty text", () => {
        const hmacSha256 = new HmacSha256(Converter.utf8ToBytes("mykey"));
        hmacSha256.update(Converter.utf8ToBytes(""));
        const digest2 = hmacSha256.digest();
        expect(Converter.bytesToHex(digest2))
            .toEqual("e1b24265bf2e0b20c81837993b4f1415f7b68c503114d100a40601eca6a2745f");
    });

    test("Can perform a hmac on sentence", () => {
        const hmacSha256 = new HmacSha256(Converter.utf8ToBytes("mykey"));
        hmacSha256.update(Converter.utf8ToBytes("The quick brown fox jumps over the lazy dog"));
        const digest2 = hmacSha256.digest();
        expect(Converter.bytesToHex(digest2))
            .toEqual("73d4633e9ade7b197d6704c3ac5279456a44136f400edb332349592b7e2e8b2f");
    });

    test("Can verify with test vectors", () => {
        for (const test of testData) {
            expect(Converter.bytesToHex(
                HmacSha256.sum256(
                    Converter.hexToBytes(test.key),
                    Converter.hexToBytes(test.input)
                ))).toEqual(test.hash);
        }
    });
});
