// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import { deserializeAliasAddress, serializeAliasAddress } from "../../../src/binary/addresses/aliasAddress";
import { ALIAS_ADDRESS_TYPE, IAliasAddress } from "../../../src/models/addresses/IAliasAddress";

describe("Binary Alias Address", () => {
    test("Can serialize and deserialize alias address", () => {
        const object: IAliasAddress = {
            type: ALIAS_ADDRESS_TYPE,
            aliasId: "6920b176f613ec7be59e68fc68f597eb3393af80"
        };

        const serialized = new WriteStream();
        serializeAliasAddress(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual("086920b176f613ec7be59e68fc68f597eb3393af80");
        const deserialized = deserializeAliasAddress(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(8);
        expect(deserialized.aliasId).toEqual("6920b176f613ec7be59e68fc68f597eb3393af80");
    });
});
