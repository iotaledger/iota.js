// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Ed25519Address } from "../../src/addressTypes/ed25519Address";
import { Ed25519Seed } from "../../src/seedTypes/ed25519Seed";
import { Converter } from "../../src/utils/converter";

describe("Ed25519Address", () => {
    test("Can sign an address", () => {
        const seed = new Ed25519Seed(new Uint8Array(32).fill(170));
        const addr = new Ed25519Address();
        const keyPair = seed.keyPair();
        const signature = addr.publicKeyToAddress(keyPair.publicKey);
        expect(Converter.bytesToHex(signature))
            .toEqual("fb2d6244c46d9b483dadef0a0fde4caab6f3a871aad91743ac66f41a6dfd4f48");
    });

    test("Can verify an address", () => {
        const seed = new Ed25519Seed(new Uint8Array(32).fill(170));
        const addr = new Ed25519Address();
        const keyPair = seed.keyPair();
        const signature = addr.publicKeyToAddress(keyPair.publicKey);
        const verified = addr.verifyAddress(keyPair.publicKey, signature);
        expect(verified).toEqual(true);
    });
});

