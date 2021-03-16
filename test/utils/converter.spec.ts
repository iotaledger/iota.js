// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter } from "../../src/utils/converter";

describe("Converter", () => {
    test("Can convert from bytes to hex", () => {
        const bytes = Uint8Array.from([97, 98, 99, 100]);
        expect(Converter.bytesToHex(bytes)).toEqual("61626364");
    });

    test("Can convert from bytes to hex reverse", () => {
        const bytes = Uint8Array.from([97, 98, 99, 100]);
        expect(Converter.bytesToHex(bytes, undefined, undefined, true)).toEqual("64636261");
    });

    test("Can convert from hex to bytes", () => {
        const bytes = Uint8Array.from([97, 98, 99, 100]);
        expect(Converter.hexToBytes("61626364")).toEqual(bytes);
    });

    test("Can convert from hex to bytes reverse", () => {
        const bytes = Uint8Array.from([97, 98, 99, 100]);
        expect(Converter.hexToBytes("64636261", true)).toEqual(bytes);
    });

    test("Can convert from bytes to text", () => {
        const bytes = Uint8Array.from([97, 98, 99, 100]);
        expect(Converter.bytesToUtf8(bytes)).toEqual("abcd");
    });

    test("Can convert from text to bytes", () => {
        const bytes = Uint8Array.from([97, 98, 99, 100]);
        expect(Converter.utf8ToBytes("abcd")).toEqual(bytes);
    });

    test("Can convert from bytes to text", () => {
        const bytes = Uint8Array.from([97, 98, 99, 100]);
        expect(Converter.bytesToUtf8(bytes)).toEqual("abcd");
    });

    test("Can convert from text to hex", () => {
        expect(Converter.utf8ToHex("abcd")).toEqual("61626364");
    });

    test("Can convert from hex to text", () => {
        expect(Converter.hexToUtf8("61626364")).toEqual("abcd");
    });

    test("Invalid hex length", () => {
        expect(Converter.isHex("aaa")).toEqual(false);
    });

    test("Invalid hex bytes capitals", () => {
        expect(Converter.isHex("aaaB")).toEqual(false);
    });

    test("Invalid hex space", () => {
        expect(Converter.isHex("aa bb")).toEqual(false);
    });

    test("Invalid hex alphabet", () => {
        expect(Converter.isHex("aaaz")).toEqual(false);
    });

    test("Invalid non hex character", () => {
        expect(Converter.isHex("0011223344556677889900aabbccddeeffgg")).toEqual(false);
    });

    test("Valid hex characters", () => {
        expect(Converter.isHex("0011223344556677889900aabbccddeeff")).toEqual(true);
    });
});
