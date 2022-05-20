// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import {
    deserializeAliasUnlock,
    serializeAliasUnlock
} from "../../../src/binary/unlocks/aliasUnlock";
import { IAliasUnlock, ALIAS_UNLOCK_TYPE } from "../../../src/models/unlocks/IAliasUnlock";

describe("Binary Alias Unlock", () => {
    test("Can serialize and deserialize alias unlock", () => {
        const object: IAliasUnlock = {
            type: ALIAS_UNLOCK_TYPE,
            reference: 23456
        };

        const serialized = new WriteStream();
        serializeAliasUnlock(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual("02a05b");
        const deserialized = deserializeAliasUnlock(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(2);
        expect(deserialized.reference).toEqual(23456);
    });
});
