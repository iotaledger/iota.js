// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import { deserializeBlsAddress, serializeBlsAddress } from "../../../src/binary/addresses/blsAddress";
import { BLS_ADDRESS_TYPE, IBlsAddress } from "../../../src/models/addresses/IBlsAddress";

describe("Binary Bls Address", () => {
    test("Can serialize and deserialize bls address", () => {
        const object: IBlsAddress = {
            type: BLS_ADDRESS_TYPE,
            address: "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
        };

        const serialized = new WriteStream();
        serializeBlsAddress(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual("016920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
        const deserialized = deserializeBlsAddress(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(1);
        expect(deserialized.address).toEqual("6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
    });
});
