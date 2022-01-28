// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import {
    deserializeTaggedDataPayload,
    serializeTaggedDataPayload
} from "../../../src/binary/payloads/taggedDataPayload";
import { ITaggedDataPayload, TAGGED_DATA_PAYLOAD_TYPE } from "../../../src/models/payloads/ITaggedDataPayload";

describe("Binary Tagged Data Payload", () => {
    test("Can serialize and deserialize tagged data payload", () => {
        const payload: ITaggedDataPayload = {
            type: TAGGED_DATA_PAYLOAD_TYPE,
            tag: Converter.utf8ToHex("foo"),
            data: Converter.utf8ToHex("bar")
        };

        const serialized = new WriteStream();
        serializeTaggedDataPayload(serialized, payload);
        const hex = serialized.finalHex();
        expect(hex).toEqual("0500000003666f6f03000000626172");
        const deserialized = deserializeTaggedDataPayload(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(5);
        if (deserialized.tag) {
            expect(Converter.hexToUtf8(deserialized.tag)).toEqual("foo");
        }
        expect(deserialized.data).toBeDefined();
        if (deserialized.data) {
            expect(Converter.hexToUtf8(deserialized.data)).toEqual("bar");
        }
    });
});
