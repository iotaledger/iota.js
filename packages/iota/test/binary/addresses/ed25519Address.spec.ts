// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import { deserializeEd25519Address, serializeEd25519Address } from "../../../src/binary/addresses/ed25519Address";
import { ED25519_ADDRESS_TYPE, IEd25519Address } from "../../../src/models/addresses/IEd25519Address";

describe("Binary Ed25519 Address", () => {
    test("Can serialize and deserialize ed25519 address", () => {
        const object: IEd25519Address = {
            type: ED25519_ADDRESS_TYPE,
            pubKeyHash: "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
        };

        const serialized = new WriteStream();
        serializeEd25519Address(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual("006920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
        const deserialized = deserializeEd25519Address(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(0);
        expect(deserialized.pubKeyHash).toEqual("6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
    });
});
