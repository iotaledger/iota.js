// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Base58 } from "../../src/encoding/base58";
import { Converter } from "../../src/utils/converter";
import testData from "./base58.json";

// Test vectors
// https://datatracker.ietf.org/doc/html/rfc4648#section-10
describe("Base58Helper", () => {
    test("Can encode base58 strings to bytes", () => {
        for (const test of testData) {
            expect(Base58.encode(Converter.hexToBytes(test.decoded))).toEqual(test.encoded);
        }
    });

    test("Can decode base58 bytes to string", () => {
        for (const test of testData) {
            expect(Converter.bytesToHex(Base58.decode(test.encoded))).toEqual(test.decoded);
        }
    });
});
