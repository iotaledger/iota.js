// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import { deserializeNftUnlockBlock, serializeNftUnlockBlock } from "../../../src/binary/unlockBlocks/nftUnlockBlock";
import { INftUnlockBlock, NFT_UNLOCK_BLOCK_TYPE } from "../../../src/models/unlockBlocks/INftUnlockBlock";

describe("Binary Nft Unlock Block", () => {
    test("Can serialize and deserialize nft unlock block", () => {
        const object: INftUnlockBlock = {
            type: NFT_UNLOCK_BLOCK_TYPE,
            reference: 23456
        };

        const serialized = new WriteStream();
        serializeNftUnlockBlock(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual("03a05b");
        const deserialized = deserializeNftUnlockBlock(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(3);
        expect(deserialized.reference).toEqual(23456);
    });
});
