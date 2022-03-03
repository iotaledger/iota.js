// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import { deserializeTreasuryOutput, serializeTreasuryOutput } from "../../../src/binary/outputs/treasuryOutput";
import { ITreasuryOutput, TREASURY_OUTPUT_TYPE } from "../../../src/models/outputs/ITreasuryOutput";

describe("Binary Treasury Output", () => {
    test("Can serialize and deserialize treasury output", () => {
        const object: ITreasuryOutput = {
            type: TREASURY_OUTPUT_TYPE,
            amount: "123456"
        };

        const serialized = new WriteStream();
        serializeTreasuryOutput(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual("0240e2010000000000");
        const deserialized = deserializeTreasuryOutput(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(2);
        expect(deserialized.amount).toEqual("123456");
    });
});
