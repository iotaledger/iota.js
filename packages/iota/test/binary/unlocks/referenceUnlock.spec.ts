// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import {
    deserializeReferenceUnlock,
    serializeReferenceUnlock
} from "../../../src/binary/unlocks/referenceUnlock";
import {
    IReferenceUnlock,
    REFERENCE_UNLOCK_TYPE
} from "../../../src/models/unlocks/IReferenceUnlock";

describe("Binary Reference Unlock", () => {
    test("Can serialize and deserialize reference unlock", () => {
        const object: IReferenceUnlock = {
            type: REFERENCE_UNLOCK_TYPE,
            reference: 23456
        };

        const serialized = new WriteStream();
        serializeReferenceUnlock(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual("01a05b");
        const deserialized = deserializeReferenceUnlock(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(1);
        expect(deserialized.reference).toEqual(23456);
    });
});
