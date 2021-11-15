// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Base32 } from "../../src/encoding/base32";
import { Converter } from "../../src/utils/converter";
import testData from "./base32.json";

// Test vectors
// https://datatracker.ietf.org/doc/html/rfc4648#section-10
describe("Base32Helper", () => {
    test("Can encode bytes to base32", () => {
        expect(Base32.encode(new Uint8Array([1, 2, 3, 4]))).toEqual("AEBAGBA=");
    });

    test("Can decode base32 to bytes", () => {
        expect(Base32.decode("AEBAGBA=")).toEqual(new Uint8Array([1, 2, 3, 4]));
    });

    test("Can encode base32 strings to bytes", () => {
        for (const test of testData) {
            expect(Base32.encode(Converter.utf8ToBytes(test.decoded))).toEqual(test.encoded);
        }
    });

    test("Can decode base32 bytes to string", () => {
        for (const test of testData) {
            expect(Converter.bytesToUtf8(Base32.decode(test.encoded))).toEqual(test.decoded);
        }
    });
});
