// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import {
    deserializeOutput,
    deserializeOutputs,
    serializeOutput,
    serializeOutputs
} from "../../../src/binary/outputs/outputs";
import { ED25519_ADDRESS_TYPE } from "../../../src/models/addresses/IEd25519Address";
import { EXTENDED_OUTPUT_TYPE, IExtendedOutput } from "../../../src/models/outputs/IExtendedOutput";
import type { OutputTypes } from "../../../src/models/outputs/outputTypes";

describe("Binary Outputs", () => {
    test("Can serialize and deserialize outputs", () => {
        const outputs: OutputTypes[] = [
            {
                type: EXTENDED_OUTPUT_TYPE,
                address: {
                    type: ED25519_ADDRESS_TYPE,
                    address: "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
                },
                amount: 123456,
                nativeTokens: [],
                unlockConditions: [],
                blocks: []
            },
            {
                type: EXTENDED_OUTPUT_TYPE,
                address: {
                    type: ED25519_ADDRESS_TYPE,
                    address: "4566920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1"
                },
                amount: 987654,
                nativeTokens: [],
                unlockConditions: [],
                blocks: []
            }
        ];

        const serialized = new WriteStream();
        serializeOutputs(serialized, outputs);
        const hex = serialized.finalHex();
        expect(hex).toEqual(
            "020003006920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f9240e20100000000000000000003004566920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f106120f000000000000000000"
        );
        const deserialized = deserializeOutputs(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.length).toEqual(2);
        expect(deserialized[0].type).toEqual(3);
        const out0 = deserialized[0] as IExtendedOutput;
        expect(out0.address.type).toEqual(0);
        expect(out0.address.address).toEqual("6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
        expect(out0.amount).toEqual(123456);

        expect(deserialized[1].type).toEqual(3);
        const out1 = deserialized[1] as IExtendedOutput;
        expect(out1.address.type).toEqual(0);
        expect(out1.address.address).toEqual("4566920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1");
        expect(out1.amount).toEqual(987654);
    });

    test("Can serialize and deserialize output", () => {
        const object: IExtendedOutput = {
            type: EXTENDED_OUTPUT_TYPE,
            address: {
                type: ED25519_ADDRESS_TYPE,
                address: "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
            },
            amount: 123456,
            nativeTokens: [],
            unlockConditions: [],
            blocks: []
        };

        const serialized = new WriteStream();
        serializeOutput(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual("03006920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f9240e201000000000000000000");
        const deserialized = deserializeOutput(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(3);
        const out0 = deserialized as IExtendedOutput;
        expect(out0.type).toEqual(3);
        expect(out0.address.address).toEqual("6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
        expect(deserialized.amount).toEqual(123456);
    });
});
