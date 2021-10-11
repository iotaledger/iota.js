// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Base64 } from "../../src/encoding/base64";
import { Converter } from "../../src/utils/converter";

describe("Base64Helper", () => {
    test("Can encode bytes to base64", () => {
        expect(Base64.encode(new Uint8Array([1, 2, 3, 4]))).toEqual("AQIDBA==");
    });

    test("Can decode base64 to bytes", () => {
        expect(Base64.decode("AQIDBA==")).toEqual(new Uint8Array([1, 2, 3, 4]));
    });

    test("Can decode base64 strings to bytes", () => {
        // https://datatracker.ietf.org/doc/html/rfc4648#section-10
        expect(Converter.bytesToUtf8(Base64.decode(""))).toEqual("");
        expect(Converter.bytesToUtf8(Base64.decode("Zg=="))).toEqual("f");
        expect(Converter.bytesToUtf8(Base64.decode("Zm8="))).toEqual("fo");
        expect(Converter.bytesToUtf8(Base64.decode("Zm9v"))).toEqual("foo");
        expect(Converter.bytesToUtf8(Base64.decode("Zm9vYg=="))).toEqual("foob");
        expect(Converter.bytesToUtf8(Base64.decode("Zm9vYmE="))).toEqual("fooba");
        expect(Converter.bytesToUtf8(Base64.decode("Zm9vYmFy"))).toEqual("foobar");
    });

    test("Can encode bytes to base 64 strings", () => {
        expect(Base64.encode(Converter.utf8ToBytes(""))).toEqual("");
        expect(Base64.encode(Converter.utf8ToBytes("f"))).toEqual("Zg==");
        expect(Base64.encode(Converter.utf8ToBytes("fo"))).toEqual("Zm8=");
        expect(Base64.encode(Converter.utf8ToBytes("foo"))).toEqual("Zm9v");
        expect(Base64.encode(Converter.utf8ToBytes("foob"))).toEqual("Zm9vYg==");
        expect(Base64.encode(Converter.utf8ToBytes("fooba"))).toEqual("Zm9vYmE=");
        expect(Base64.encode(Converter.utf8ToBytes("foobar"))).toEqual("Zm9vYmFy");
    });
});
