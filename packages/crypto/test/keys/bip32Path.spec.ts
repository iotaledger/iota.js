// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Bip32Path } from "../../src/keys/bip32Path";

describe("Bip32Path", () => {
    test("Can be an empty path", () => {
        const path = new Bip32Path();
        expect(path.toString()).toEqual("m");
    });

    test("Can be constructed with valid values path", () => {
        const path = new Bip32Path("m/100'/200'");
        expect(path.toString()).toEqual("m/100'/200'");
    });

    test("Can be a path with 1 regular element", () => {
        const path = new Bip32Path();
        path.push(100);
        expect(path.toString()).toEqual("m/100");
    });

    test("Can be a path with 1 hardened element", () => {
        const path = new Bip32Path();
        path.pushHardened(100);
        expect(path.toString()).toEqual("m/100'");
    });

    test("Can be a path with multiple elements", () => {
        const path = new Bip32Path();
        path.push(100);
        path.push(200);
        path.push(300);
        path.push(400);
        expect(path.toString()).toEqual("m/100/200/300/400");
    });

    test("Can return an undefined popped element", () => {
        const path = new Bip32Path();
        expect(path.pop()).toEqual(undefined);
    });
});
