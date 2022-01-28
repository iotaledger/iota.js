// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import {
    deserializeMetadataFeatureBlock,
    serializeMetadataFeatureBlock
} from "../../../src/binary/featureBlocks/metadataFeatureBlock";
import {
    IMetadataFeatureBlock,
    METADATA_FEATURE_BLOCK_TYPE
} from "../../../src/models/featureBlocks/IMetadataFeatureBlock";

describe("Binary Metadata Feature Block", () => {
    test("Can serialize and deserialize metadata feature block", () => {
        const object: IMetadataFeatureBlock = {
            type: METADATA_FEATURE_BLOCK_TYPE,
            data: "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
        };

        const serialized = new WriteStream();
        serializeMetadataFeatureBlock(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual("02200000006920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
        const deserialized = deserializeMetadataFeatureBlock(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(2);
        expect(deserialized.data).toEqual("6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
    });
});
