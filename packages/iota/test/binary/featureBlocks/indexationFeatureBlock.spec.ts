// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import {
    deserializeIndexationFeatureBlock,
    serializeIndexationFeatureBlock
} from "../../../src/binary/featureBlocks/indexationFeatureBlock";
import {
    IIndexationFeatureBlock,
    INDEXATION_FEATURE_BLOCK_TYPE
} from "../../../src/models/featureBlocks/IIndexationFeatureBlock";

describe("Binary Indexation Feature Block", () => {
    test("Can serialize and deserialize indexation feature block", () => {
        const object: IIndexationFeatureBlock = {
            type: INDEXATION_FEATURE_BLOCK_TYPE,
            tag: "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
        };

        const serialized = new WriteStream();
        serializeIndexationFeatureBlock(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual("08200000006920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
        const deserialized = deserializeIndexationFeatureBlock(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(8);
        expect(deserialized.tag).toEqual("6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
    });
});
