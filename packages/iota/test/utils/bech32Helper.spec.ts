// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter } from "@iota/util.js";
import { Bech32Helper } from "../../src/utils/bech32Helper";

describe("Bech32Helper", () => {
    test("Can convert to bech32 format", () => {
        const address = Converter.hexToBytes("52fdfc072182654f163f5f0f9a621d729566c74d10037c4d7bbb0407d1e2c649");
        expect(Bech32Helper.toBech32(1, address, "iota")).toEqual(
            "iota1q9f0mlq8yxpx2nck8a0slxnzr4ef2ek8f5gqxlzd0wasgp73utryj0w6qwt"
        );
    });

    test("Can convert from bech32 format", () => {
        const address = Converter.hexToBytes("52fdfc072182654f163f5f0f9a621d729566c74d10037c4d7bbb0407d1e2c649");
        const result = Bech32Helper.fromBech32(
            "iota1q9f0mlq8yxpx2nck8a0slxnzr4ef2ek8f5gqxlzd0wasgp73utryj0w6qwt",
            "iota"
        );

        expect(result).toBeDefined();
        if (result) {
            expect(result.addressType).toEqual(1);
            expect(result.addressBytes).toEqual(address);
        }
    });

    test("Can fail to match address undefined", () => {
        expect(Bech32Helper.matches(undefined as unknown as string, "iota")).toEqual(false);
    });

    test("Can fail to match address invalid chars", () => {
        expect(
            Bech32Helper.matches("iotp1q9f0mlq8yxpx2nck8a0slxnzr4ef2ek8f5gqxlzd0wasgp73utryj0w6qwt", "iota")
        ).toEqual(false);
    });

    test("Can match address", () => {
        expect(
            Bech32Helper.matches("iota1q9f0mlq8yxpx2nck8a0slxnzr4ef2ek8f5gqxlzd0wasgp73utryj0w6qwt", "iota")
        ).toEqual(true);
    });
});
