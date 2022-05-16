// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import {
    deserializeMetadataFeature,
    serializeMetadataFeature
} from "../../../src/binary/features/metadataFeature";
import {
    IMetadataFeature,
    METADATA_FEATURE_TYPE
} from "../../../src/models/features/IMetadataFeature";

describe("Binary Metadata Feature", () => {
    test("Can serialize and deserialize metadata feature", () => {
        const object: IMetadataFeature = {
            type: METADATA_FEATURE_TYPE,
            data: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
        };

        const serialized = new WriteStream();
        serializeMetadataFeature(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual("0220006920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
        const deserialized = deserializeMetadataFeature(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(2);
        expect(deserialized.data).toEqual("0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
    });
});
