// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import {
    deserializeTagFeature,
    serializeTagFeature
} from "../../../src/binary/features/tagFeature";
import {
    ITagFeature,
    TAG_FEATURE_TYPE
} from "../../../src/models/features/ITagFeature";

describe("Binary Tag Feature", () => {
    test("Can serialize and deserialize tag feature", () => {
        const object: ITagFeature = {
            type: TAG_FEATURE_TYPE,
            tag: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
        };

        const serialized = new WriteStream();
        serializeTagFeature(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual("03206920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
        const deserialized = deserializeTagFeature(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(3);
        expect(deserialized.tag).toEqual("0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
    });
});
