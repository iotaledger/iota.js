// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import {
    deserializeTagFeatureBlock,
    serializeTagFeatureBlock
} from "../../../src/binary/featureBlocks/tagFeatureBlock";
import {
    ITagFeatureBlock,
    TAG_FEATURE_BLOCK_TYPE
} from "../../../src/models/featureBlocks/ITagFeatureBlock";

describe("Binary Tag Feature Block", () => {
    test("Can serialize and deserialize tag feature block", () => {
        const object: ITagFeatureBlock = {
            type: TAG_FEATURE_BLOCK_TYPE,
            tag: "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
        };

        const serialized = new WriteStream();
        serializeTagFeatureBlock(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual("03206920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
        const deserialized = deserializeTagFeatureBlock(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(3);
        expect(deserialized.tag).toEqual("6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
    });
});
