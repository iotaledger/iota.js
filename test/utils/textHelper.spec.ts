// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { TextHelper } from "../../src/utils/textHelper";

describe("TextHelper", () => {
    test("textHelper should return true for empty string", () => {
        expect(TextHelper.isUTF8("")).toEqual(true);
    });

    test("textHelper should return true for undefined string", () => {
        expect(TextHelper.isUTF8()).toEqual(true);
    });

    test("textHelper should return true for single character utf8 string", () => {
        expect(TextHelper.isUTF8("a")).toEqual(true);
    });

    test("textHelper should return false for single character non utf8 string", () => {
        expect(TextHelper.isUTF8("\u0080")).toEqual(false);
    });

    test("textHelper should return true for multi character utf8 string", () => {
        expect(TextHelper.isUTF8("ta")).toEqual(true);
    });

    test("textHelper should return false for multi character non utf8 string", () => {
        expect(TextHelper.isUTF8("t\u0080")).toEqual(false);
    });
});
