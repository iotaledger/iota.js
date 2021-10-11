// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter } from "@iota/util.js";
import { Sha256 } from "../../src/hashes/sha256";
import testData from "./sha256.json";

describe("Sha256", () => {
    test("Can perform a sha256 on short text", () => {
        const sha = new Sha256();
        sha.update(Converter.utf8ToBytes("abc"));
        const digest = sha.digest();
        expect(Converter.bytesToHex(digest)).toEqual(
            "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"
        );
    });

    test("Can perform a sha256 on empty text", () => {
        const sha = new Sha256();
        sha.update(Converter.utf8ToBytes(""));
        const digest = sha.digest();
        expect(Converter.bytesToHex(digest)).toEqual(
            "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
        );
    });

    test("Can perform a sha256 on sentence", () => {
        const sha = new Sha256();
        sha.update(Converter.utf8ToBytes("The quick brown fox jumps over the lazy dog"));
        const digest = sha.digest();
        expect(Converter.bytesToHex(digest)).toEqual(
            "d7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592"
        );
    });

    test("Can verify with test vectors", () => {
        for (const test of testData) {
            expect(Converter.bytesToHex(Sha256.sum256(Converter.hexToBytes(test.input)))).toEqual(test.hash);
        }
    });
});
