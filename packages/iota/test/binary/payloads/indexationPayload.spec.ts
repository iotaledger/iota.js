// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import {
    deserializeIndexationPayload,
    serializeIndexationPayload
} from "../../../src/binary/payloads/indexationPayload";
import { IIndexationPayload, INDEXATION_PAYLOAD_TYPE } from "../../../src/models/payloads/IIndexationPayload";

describe("Binary Indexation Payload", () => {
    test("Can serialize and deserialize indexation payload", () => {
        const payload: IIndexationPayload = {
            type: INDEXATION_PAYLOAD_TYPE,
            index: Converter.utf8ToHex("foo"),
            data: Converter.utf8ToHex("bar")
        };

        const serialized = new WriteStream();
        serializeIndexationPayload(serialized, payload);
        const hex = serialized.finalHex();
        expect(hex).toEqual("020000000300666f6f03000000626172");
        const deserialized = deserializeIndexationPayload(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(2);
        expect(Converter.hexToUtf8(deserialized.index)).toEqual("foo");
        expect(deserialized.data).toBeDefined();
        if (deserialized.data) {
            expect(Converter.hexToUtf8(deserialized.data)).toEqual("bar");
        }
    });
});
