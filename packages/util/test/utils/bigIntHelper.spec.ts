// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { BigIntHelper } from "../../src/utils/bigIntHelper";

describe("BigIntHelper", () => {
    test("Can store and retrieve from a buffer uint8", () => {
        for (let i = 0; i < 1000; i++) {
            const rand = BigIntHelper.random(8);

            const buf = new Uint8Array(8);
            BigIntHelper.write8(rand, buf, 0);

            const val = BigIntHelper.read8(buf, 0);
            expect(val.toString()).toEqual(rand.toString());
        }
    });

    test("Can store and retrieve from a buffer uint256", () => {
        for (let i = 0; i < 1000; i++) {
            const rand = BigIntHelper.random(32);

            const buf = new Uint8Array(32);
            BigIntHelper.write32(rand, buf, 0);

            const val = BigIntHelper.read32(buf, 0);
            expect(val.toString()).toEqual(rand.toString());
        }
    });
});
