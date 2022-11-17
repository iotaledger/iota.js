// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { MAX_NATIVE_TOKEN_COUNT } from "../../src/binary/nativeTokens";
import type { INativeToken } from "../../src/models/INativeToken";
import { validateNativeTokens } from "../../src/validation/nativeTokens";
import { mockMaxDistintNativeTokens } from "./testValidationMocks";

describe("Native tokens validation", () => {
    test("should pass with valid native tokens", () => {
        const tokens: INativeToken[] = [
            {
                id: "0x08d8e532f6138fd753cc5f5fc2f3fb13e8d6df3c4041429232ad3b7f8b7e7d95740100000000",
                amount: "15"
            },
            {
                id: "0x08d8e532f6138fd753cc5f5fc2f3fb13e8d6df3c4041429232ad3b7f8b7e7d95740200000000",
                amount: "1687"
            }
        ];

        expect(() => validateNativeTokens(tokens)).not.toThrowError();
    });

    test("should fail on native token amount zero", () => {
        const tokens: INativeToken[] = [
            {
                id: "0x08d8e532f6138fd753cc5f5fc2f3fb13e8d6df3c4041429232ad3b7f8b7e7d95740100000000",
                amount: "15"
            },
            {
                id: "0x08d8e532f6138fd753cc5f5fc2f3fb13e8d6df3c4041429232ad3b7f8b7e7d95740200000000",
                amount: "0x0"
            }
        ];

        expect(() => validateNativeTokens(tokens)).toThrow("Native token 0x08d8e532f6138fd753cc5f5fc2f3fb13e8d6df3c4041429232ad3b7f8b7e7d95740200000000 must have a value greater than zero.");
    });

    test("should fail on duplicated native tokens", () => {
        const tokens: INativeToken[] = [
            {
                id: "0x08d8e532f6138fd753cc5f5fc2f3fb13e8d6df3c4041429232ad3b7f8b7e7d95740100000000",
                amount: "15"
            },
            {
                id: "0x08d8e532f6138fd753cc5f5fc2f3fb13e8d6df3c4041429232ad3b7f8b7e7d95740100000000",
                amount: "34"
            }
        ];

        expect(() => validateNativeTokens(tokens)).toThrow("Native tokens must not contain more than one token of each type.");
    });

    test("should fail on max native tokens count exceeded", () => {
        const tokens: INativeToken[] = mockMaxDistintNativeTokens;
        tokens.push({
            id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000065",
            amount: "0x64"
        });

        expect(() => validateNativeTokens(tokens)).toThrow(`Native tokens count must not be greater than max native token count (${MAX_NATIVE_TOKEN_COUNT})`);
    });

    test("should fail on incorrect lexicographic sort", () => {
        const tokens: INativeToken[] = [
            {
                id: "0x08d8e532f6138fd753cc5f5fc2f3fb13e8d6df3c4041429232ad3b7f8b7e7d95740200000000",
                amount: "1687"
            },
            {
                id: "0x08d8e532f6138fd753cc5f5fc2f3fb13e8d6df3c4041429232ad3b7f8b7e7d95740100000000",
                amount: "15"
            }
        ];

        expect(() => validateNativeTokens(tokens)).toThrow("Native Tokens must be lexicographically sorted based on Token id.");
    });
});
