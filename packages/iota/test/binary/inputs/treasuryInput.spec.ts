// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import { deserializeTreasuryInput, serializeTreasuryInput } from "../../../src/binary/inputs/treasuryInput";
import { ITreasuryInput, TREASURY_INPUT_TYPE } from "../../../src/models/inputs/ITreasuryInput";

describe("Binary Treasury Input", () => {
    test("Can serialize and deserialize treasury input", () => {
        const object: ITreasuryInput = {
            type: TREASURY_INPUT_TYPE,
            milestoneId: "2".repeat(64)
        };

        const serialized = new WriteStream();
        serializeTreasuryInput(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual("012222222222222222222222222222222222222222222222222222222222222222");
        const deserialized = deserializeTreasuryInput(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(1);
        expect(deserialized.milestoneId).toEqual("2".repeat(64));
    });
});
