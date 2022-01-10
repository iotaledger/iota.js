// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { generateBip44Path, generateBip44Address } from "../../src/highLevel/addresses";

describe("Addresses", () => {
    test("can generate an address with generateBip44Path with external index", () => {
        const path = generateBip44Path(0, 0, false);

        const parts = path.toString().split("/");

        expect(parts[0]).toEqual("m");
        expect(parts[1]).toEqual("44'");
        expect(parts[2]).toEqual("4218'");
        expect(parts[3]).toEqual("0'");
        expect(parts[4]).toEqual("0'");
        expect(parts[5]).toEqual("0'");
    });

    test("can generate an address with generateBip44Path with internal index", () => {
        const path = generateBip44Path(0, 0, true);

        const parts = path.toString().split("/");

        expect(parts[0]).toEqual("m");
        expect(parts[1]).toEqual("44'");
        expect(parts[2]).toEqual("4218'");
        expect(parts[3]).toEqual("0'");
        expect(parts[4]).toEqual("1'");
        expect(parts[5]).toEqual("0'");
    });

    test("can generate multiple addresses with generator starting with external", () => {
        const generatorState = {
            accountIndex: 0,
            isInternal: false,
            addressIndex: 0
        };

        const addresses = [];

        for (let i = 0; i < 6; i++) {
            addresses.push(generateBip44Address(generatorState));
        }

        expect(addresses[0]).toEqual("m/44'/4218'/0'/0'/0'");
        expect(addresses[1]).toEqual("m/44'/4218'/0'/1'/0'");
        expect(addresses[2]).toEqual("m/44'/4218'/0'/0'/1'");
        expect(addresses[3]).toEqual("m/44'/4218'/0'/1'/1'");
        expect(addresses[4]).toEqual("m/44'/4218'/0'/0'/2'");
        expect(addresses[5]).toEqual("m/44'/4218'/0'/1'/2'");
    });

    test("can generate multiple addresses with generator starting with internal", () => {
        const generatorState = {
            accountIndex: 0,
            isInternal: true,
            addressIndex: 0
        };

        const addresses = [];

        for (let i = 0; i < 6; i++) {
            addresses.push(generateBip44Address(generatorState));
        }

        expect(addresses[0]).toEqual("m/44'/4218'/0'/1'/0'");
        expect(addresses[1]).toEqual("m/44'/4218'/0'/0'/1'");
        expect(addresses[2]).toEqual("m/44'/4218'/0'/1'/1'");
        expect(addresses[3]).toEqual("m/44'/4218'/0'/0'/2'");
        expect(addresses[4]).toEqual("m/44'/4218'/0'/1'/2'");
        expect(addresses[5]).toEqual("m/44'/4218'/0'/0'/3'");
    });
});
