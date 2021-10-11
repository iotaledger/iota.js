// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { ArrayHelper } from "../../src/utils/arrayHelper";

describe("ArrayHelper", () => {
    test("Not equal when left is undefined", () => {
        expect(ArrayHelper.equal(undefined, [1, 2, 3])).toEqual(false);
    });

    test("Not equal when right is undefined", () => {
        expect(ArrayHelper.equal([1, 2, 3], undefined)).toEqual(false);
    });

    test("Not equal when left is not array", () => {
        expect(ArrayHelper.equal("", [1, 2, 3])).toEqual(false);
    });

    test("Not equal when right is not array", () => {
        expect(ArrayHelper.equal([1, 2, 3], "")).toEqual(false);
    });

    test("Not equal when left and right are different lengths", () => {
        expect(ArrayHelper.equal([1, 2, 3], [1, 2, 3, 4])).toEqual(false);
    });

    test("Not equal when left and right are same lengths and different values", () => {
        expect(ArrayHelper.equal([1, 2, 2], [1, 2, 3])).toEqual(false);
    });

    test("Equal when left and right are same lengths and same values", () => {
        expect(ArrayHelper.equal([1, 2, 3], [1, 2, 3])).toEqual(true);
    });
});
