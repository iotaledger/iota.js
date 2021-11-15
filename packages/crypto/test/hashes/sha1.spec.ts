// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter } from "@iota/util.js";
import { Sha1 } from "../../src/hashes/sha1";
import testData from "./sha1.json";

describe("Sha1", () => {
    test("Can perform a sha1 on short text", () => {
        const sha = new Sha1();
        sha.update(Converter.utf8ToBytes("abc"));
        const digest = sha.digest();
        expect(Converter.bytesToHex(digest)).toEqual("a9993e364706816aba3e25717850c26c9cd0d89d");
    });

    test("Can perform a sha1 on empty text", () => {
        const sha = new Sha1();
        sha.update(Converter.utf8ToBytes(""));
        const digest = sha.digest();
        expect(Converter.bytesToHex(digest)).toEqual("da39a3ee5e6b4b0d3255bfef95601890afd80709");
    });

    test("Can perform a sha1 on sentence", () => {
        const sha = new Sha1();
        sha.update(Converter.utf8ToBytes("The quick brown fox jumps over the lazy dog"));
        const digest = sha.digest();
        expect(Converter.bytesToHex(digest)).toEqual("2fd4e1c67a2d28fced849ee1bb76e7391b93eb12");
    });

    test("Can verify with test vectors", () => {
        for (const test of testData) {
            expect(Converter.bytesToHex(Sha1.sum(Converter.hexToBytes(test.input)))).toEqual(test.hash);
        }
    });
});
