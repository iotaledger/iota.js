// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { validateNativeTokens } from "../../../src/validation/nativeTokens";
import type { INativeToken } from "../../../src/models/INativeToken";

describe("Native tokens", () => {
    test("Can validate native tokens", () => {
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

        const result = validateNativeTokens(tokens);
        expect(result.isValid).toEqual(true);
    });
    
    test("Fails with native token amount zero", () => {
        const tokens: INativeToken[] = [
            {
                id: "0x08d8e532f6138fd753cc5f5fc2f3fb13e8d6df3c4041429232ad3b7f8b7e7d95740100000000",
                amount: "15"
            },
            {
                id: "0x08d8e532f6138fd753cc5f5fc2f3fb13e8d6df3c4041429232ad3b7f8b7e7d95740200000000",
                amount: "0"
            }
        ];

        const result = validateNativeTokens(tokens);
        expect(result.isValid).toEqual(false);
        expect(result.errors).toEqual(expect.arrayContaining(["Native token 0x08d8e532f6138fd753cc5f5fc2f3fb13e8d6df3c4041429232ad3b7f8b7e7d95740200000000 must have a value bigger than zero."]));
    });
    
    test("Fails with duplicated native tokens", () => {
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

        const result = validateNativeTokens(tokens);
        expect(result.isValid).toEqual(false);
        expect(result.errors).toEqual(expect.arrayContaining(["No duplicate tokens are allowed."]));
    });
    
    test("Fails with max native tokens count exceeded", () => {
        const tokens: INativeToken[] = [];
        for (let index = 1; index < 66; index++) {
            tokens.push({
                id: `0x08d8e532f6138fd753cc5f5fc2f3fb13e8d6df3c4041429232ad3b7f8b7e7d9574010000000${index}`,
                amount: index.toString()
            });
        }
        
        const result = validateNativeTokens(tokens);
        expect(result.isValid).toEqual(false);
        expect(result.errors).toEqual(expect.arrayContaining(["Max native tokens count exceeded."]));
    });
    
    test("Fails with lexicographic sort", () => {
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
        
        const result = validateNativeTokens(tokens);
        expect(result.isValid).toEqual(false);
        expect(result.errors).toEqual(expect.arrayContaining(["Native Tokens must be lexicographically sorted based on Token id."]));
    });
    
    test("Fails with all errors", () => {
        const tokens: INativeToken[] = [
            {
                id: "0x08d8e532f6138fd753cc5f5fc2f3fb13e8d6df3c4041429232ad3b7f8b7e7d95740100000000",
                amount: "15"
            },
            {
                id: "0x08d8e532f6138fd753cc5f5fc2f3fb13e8d6df3c4041429232ad3b7f8b7e7d95740100000000",
                amount: "0"
            }
        ];
        for (let index = 1; index < 66; index++) {
            tokens.push({
                id: `0x08d8e532f6138fd753cc5f5fc2f3fb13e8d6df3c4041429232ad3b7f8b7e7d9574010000000${index}`,
                amount: index.toString()
            });
        }
        
        const result = validateNativeTokens(tokens);
        expect(result.isValid).toEqual(false);
        expect(result.errors).toEqual(expect.arrayContaining(["Native token 0x08d8e532f6138fd753cc5f5fc2f3fb13e8d6df3c4041429232ad3b7f8b7e7d95740100000000 must have a value bigger than zero."]));
        expect(result.errors).toEqual(expect.arrayContaining(["No duplicate tokens are allowed."]));
        expect(result.errors).toEqual(expect.arrayContaining(["Max native tokens count exceeded."]));
        expect(result.errors).toEqual(expect.arrayContaining(["Native Tokens must be lexicographically sorted based on Token id."]));
    });
});
