// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { NeonPowProvider } from "../src/neonPowProvider";

describe("neonPowProvider", () => {
    test("can run the pow and get a result", async () => {
        const provider = new NeonPowProvider(1);
        const nonce = await provider.pow(new Uint8Array(500).fill(1), 400);
        expect(nonce).toEqual(BigInt(589556));
    });
});
