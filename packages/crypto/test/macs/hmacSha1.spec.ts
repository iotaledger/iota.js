// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter } from "@iota/util.js";
import { HmacSha1 } from "../../src/macs/hmacSha1";
import testData from "./hmacSha1.json";

describe("HmacSha1", () => {
    test("Can perform a hmac on short text", () => {
        const hmacSha1 = new HmacSha1(Converter.utf8ToBytes("mykey"));
        hmacSha1.update(Converter.utf8ToBytes("abc"));
        const digest2 = hmacSha1.digest();
        expect(Converter.bytesToHex(digest2)).toEqual("8af7406c03bdd72532a4c3cee98b991e39524485");
    });

    test("Can perform a hmac on empty text", () => {
        const hmacSha1 = new HmacSha1(Converter.utf8ToBytes("mykey"));
        hmacSha1.update(Converter.utf8ToBytes(""));
        const digest2 = hmacSha1.digest();
        expect(Converter.bytesToHex(digest2)).toEqual("5bb9c066a336f0e6f17d7ddac4e43de7a94a6c9a");
    });

    test("Can perform a hmac on sentence", () => {
        const hmacSha1 = new HmacSha1(Converter.utf8ToBytes("mykey"));
        hmacSha1.update(Converter.utf8ToBytes("The quick brown fox jumps over the lazy dog"));
        const digest2 = hmacSha1.digest();
        expect(Converter.bytesToHex(digest2)).toEqual("5844898d8dace07a98f16ba1619795553ac37c4b");
    });

    test("Can verify with test vectors", () => {
        for (const test of testData) {
            expect(
                Converter.bytesToHex(HmacSha1.sum(Converter.hexToBytes(test.key), Converter.hexToBytes(test.input)))
            ).toEqual(test.hash);
        }
    });
});
