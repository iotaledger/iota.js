// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import {
    deserializeAliasUnlockBlock,
    serializeAliasUnlockBlock
} from "../../../src/binary/unlockBlocks/aliasUnlockBlock";
import { IAliasUnlockBlock, ALIAS_UNLOCK_BLOCK_TYPE } from "../../../src/models/unlockBlocks/IAliasUnlockBlock";

describe("Binary Alias Unlock Block", () => {
    test("Can serialize and deserialize alias unlock block", () => {
        const object: IAliasUnlockBlock = {
            type: ALIAS_UNLOCK_BLOCK_TYPE,
            reference: 23456
        };

        const serialized = new WriteStream();
        serializeAliasUnlockBlock(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual("02a05b");
        const deserialized = deserializeAliasUnlockBlock(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(2);
        expect(deserialized.reference).toEqual(23456);
    });
});
