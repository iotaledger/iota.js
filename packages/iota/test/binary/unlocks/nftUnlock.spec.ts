// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import { deserializeNftUnlock, serializeNftUnlock } from "../../../src/binary/unlocks/nftUnlock";
import { INftUnlock, NFT_UNLOCK_TYPE } from "../../../src/models/unlocks/INftUnlock";

describe("Binary Nft Unlock", () => {
    test("Can serialize and deserialize nft unlock", () => {
        const object: INftUnlock = {
            type: NFT_UNLOCK_TYPE,
            reference: 23456
        };

        const serialized = new WriteStream();
        serializeNftUnlock(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual("03a05b");
        const deserialized = deserializeNftUnlock(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(3);
        expect(deserialized.reference).toEqual(23456);
    });
});
