// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import { deserializeAddress, serializeAddress } from "../../../src/binary/addresses/addresses";
import type { AddressTypes } from "../../../src/models/addresses/addressTypes";
import { ED25519_ADDRESS_TYPE } from "../../../src/models/addresses/IEd25519Address";

describe("Binary Address", () => {
    test("Can serialize and deserialize address", () => {
        const object: AddressTypes = {
            type: ED25519_ADDRESS_TYPE,
            address: "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
        };

        const serialized = new WriteStream();
        serializeAddress(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual("006920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
        const deserialized = deserializeAddress(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(0);
        expect(deserialized.address).toEqual("6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
    });
});
