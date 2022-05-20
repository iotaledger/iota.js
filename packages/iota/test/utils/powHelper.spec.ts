// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { PowHelper } from "../../src/utils/powHelper";

describe("PowHelper", () => {
    // test("Calculate from an empty block", () => {
    //     const score = PowHelper.score(Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 0]));
    //     expect(score).toEqual(Math.pow(3, 1) / 8);
    // });

    // test("Calculate from a half nonce", () => {
    //     const score = PowHelper.score(Uint8Array.from([203, 124, 2, 0, 0, 0, 0, 0]));
    //     expect(score).toEqual(Math.pow(3, 10) / 8);
    // });

    // test("Calculate from a full nonce", () => {
    //     const score = PowHelper.score(Uint8Array.from([65, 235, 119, 85, 85, 85, 85, 85]));
    //     expect(score).toEqual(Math.pow(3, 14) / 8);
    // });

    // test("Calculate from a full nonce", () => {
    //     const score = PowHelper.score(new Uint8Array(10000));
    //     expect(score).toEqual(Math.pow(3, 0) / 10000);
    // });

    // test("Calculate target zeros", () => {
    //     const score = PowHelper.calculateTargetZeros(new Uint8Array(100), 100);
    //     expect(score).toEqual(9);
    // });

    test("Perform pow from startIndex 0", () => {
        const nonce = PowHelper.performPow(new Uint8Array(32).fill(1), 3, "0");
        expect(Number(nonce)).toEqual(86);
    });

    test("Perform pow from startIndex 4900", () => {
        const nonce = PowHelper.performPow(new Uint8Array(32).fill(1), 8, "4900");
        expect(Number(nonce)).toEqual(4936);
    });
});
