/* eslint-disable max-len */
import { PowHelper } from "../../src/utils/powHelper";

describe("PowHelper", () => {
    test("Calculate from an empty message", () => {
        const score = PowHelper.score(Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 0]));
        expect(score).toEqual(Math.pow(3, 1) / 8);
    });

    test("Calculate from a half nonce", () => {
        const score = PowHelper.score(Uint8Array.from([203, 124, 2, 0, 0, 0, 0, 0]));
        expect(score).toEqual(Math.pow(3, 10) / 8);
    });

    test("Calculate from a full nonce", () => {
        const score = PowHelper.score(Uint8Array.from([65, 235, 119, 85, 85, 85, 85, 85]));
        expect(score).toEqual(Math.pow(3, 14) / 8);
    });

    test("Calculate from a full nonce", () => {
        const score = PowHelper.score(new Uint8Array(10000));
        expect(score).toEqual(Math.pow(3, 0) / 10000);
    });
});
