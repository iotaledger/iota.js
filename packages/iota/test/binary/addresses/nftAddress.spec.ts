// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import { deserializeNftAddress, serializeNftAddress } from "../../../src/binary/addresses/nftAddress";
import { NFT_ADDRESS_TYPE, INftAddress } from "../../../src/models/addresses/INftAddress";

describe("Binary Nft Address", () => {
    test("Can serialize and deserialize nft address", () => {
        const object: INftAddress = {
            type: NFT_ADDRESS_TYPE,
            nftId: "6920b176f613ec7be59e68fc68f597eb3393af80"
        };

        const serialized = new WriteStream();
        serializeNftAddress(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual("106920b176f613ec7be59e68fc68f597eb3393af80");
        const deserialized = deserializeNftAddress(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(16);
        expect(deserialized.nftId).toEqual("6920b176f613ec7be59e68fc68f597eb3393af80");
    });
});
