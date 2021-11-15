// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Base64 } from "../../src/encoding/base64";
import { Converter } from "../../src/utils/converter";
import testData from "./base64.json";

// Test vectors
// https://datatracker.ietf.org/doc/html/rfc4648#section-10
describe("Base64Helper", () => {
    test("Can encode bytes to base64", () => {
        expect(Base64.encode(new Uint8Array([1, 2, 3, 4]))).toEqual("AQIDBA==");
    });

    test("Can decode base64 to bytes", () => {
        expect(Base64.decode("AQIDBA==")).toEqual(new Uint8Array([1, 2, 3, 4]));
    });

    test("Can encode base64 strings to bytes", () => {
        for (const test of testData) {
            expect(Base64.encode(Converter.utf8ToBytes(test.decoded))).toEqual(test.encoded);
        }
    });

    test("Can decode base64 bytes to string", () => {
        for (const test of testData) {
            expect(Converter.bytesToUtf8(Base64.decode(test.encoded))).toEqual(test.decoded);
        }
    });
});
