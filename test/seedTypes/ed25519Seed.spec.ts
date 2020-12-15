// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Bip32Path } from "../../src/crypto/bip32Path";
import { Ed25519Seed } from "../../src/seedTypes/ed25519Seed";
import { Converter } from "../../src/utils/converter";

describe("Ed25519Seed", () => {
    test("Can get a key pair from a seed", () => {
        const seed = new Ed25519Seed(new Uint8Array(32).fill(170));
        const keyPair = seed.keyPair();
        expect(Converter.bytesToHex(keyPair.privateKey))
            // eslint-disable-next-line max-len
            .toEqual("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaae734ea6c2b6257de72355e472aa05a4c487e6b463c029ed306df2f01b5636b58");
        expect(Converter.bytesToHex(keyPair.publicKey))
            .toEqual("e734ea6c2b6257de72355e472aa05a4c487e6b463c029ed306df2f01b5636b58");
    });

    test("Can generate a new seed from the master path", () => {
        const seed = new Ed25519Seed(new Uint8Array(32).fill(170));
        const newSeed = seed.generateSeedFromPath(new Bip32Path("m/"));
        const keyPair = newSeed.keyPair();
        expect(Converter.bytesToHex(keyPair.privateKey))
            // eslint-disable-next-line max-len
            .toEqual("8d65383423e467e90d7a6595c7f3580b0ec57cab8b48b7e29c4049a5a2c43838fedd4422814c7ea0fc39c5221475dba6890dbfe7652f05c45114d1e6a7ffc3ce");
        expect(Converter.bytesToHex(keyPair.publicKey))
            .toEqual("fedd4422814c7ea0fc39c5221475dba6890dbfe7652f05c45114d1e6a7ffc3ce");
    });
});

