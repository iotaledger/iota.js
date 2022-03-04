// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import bigInt from "big-integer";
import { HexHelper } from "../../src/utils/hexHelper";

describe("HexHelper", () => {
    test("Can convert a 0 value 256 bit int to hex", () => {
        const val = bigInt(0);
        expect(HexHelper.fromBigInt256(val)).toEqual("0x0");
    });

    test("Can convert a 0 value hex to 256 bit big int", () => {
        expect(HexHelper.toBigInt256("0x0").eq(bigInt(0))).toEqual(true);
    });

    test("Can convert a 256 bit int to hex", () => {
        const val = bigInt(10000);
        expect(HexHelper.fromBigInt256(val)).toEqual("0x2710");
    });

    test("Can convert a hex to 256 bit big int", () => {
        expect(HexHelper.toBigInt256("0x2710").eq(bigInt(10000))).toEqual(true);
    });

    test("Can convert a max 256 bit int to hex", () => {
        const val = bigInt("115792089237316195423570985008687907853269984665640564039457584007913129639935");
        expect(HexHelper.fromBigInt256(val)).toEqual("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
    });

    test("Can convert a max hex to 256 bit big int", () => {
        expect(HexHelper.toBigInt256("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")
            .eq(bigInt("115792089237316195423570985008687907853269984665640564039457584007913129639935"))).toEqual(true);
    });

    test("Can convert a value exeeding max 256 bit int to hex", () => {
        const val = bigInt("115792089237316195423570985008687907853269984665640564039457584007913129639935000");
        expect(HexHelper.fromBigInt256(val)).toEqual("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
    });

    test("Can convert a value exceeding max hex to 256 bit big int", () => {
        expect(HexHelper.toBigInt256("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")
            .eq(bigInt("115792089237316195423570985008687907853269984665640564039457584007913129639935"))).toEqual(true);
    });
});
