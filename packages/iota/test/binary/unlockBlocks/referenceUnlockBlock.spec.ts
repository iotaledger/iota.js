// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import {
    deserializeReferenceUnlockBlock,
    serializeReferenceUnlockBlock
} from "../../../src/binary/unlockBlocks/referenceUnlockBlock";
import {
    IReferenceUnlockBlock,
    REFERENCE_UNLOCK_BLOCK_TYPE
} from "../../../src/models/unlockBlocks/IReferenceUnlockBlock";

describe("Binary Reference Unlock Block", () => {
    test("Can serialize and deserialize reference unlock block", () => {
        const object: IReferenceUnlockBlock = {
            type: REFERENCE_UNLOCK_BLOCK_TYPE,
            reference: 23456
        };

        const serialized = new WriteStream();
        serializeReferenceUnlockBlock(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual("01a05b");
        const deserialized = deserializeReferenceUnlockBlock(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(1);
        expect(deserialized.reference).toEqual(23456);
    });
});
