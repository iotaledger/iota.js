// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import {
    deserializeOutput,
    deserializeOutputs,
    serializeOutput,
    serializeOutputs
} from "../../src/binary/outputs/outputs";
import {
    deserializeSimpleOutput,
    serializeSimpleOutput
} from "../../src/binary/outputs/simpleOutput";
import { ED25519_ADDRESS_TYPE } from "../../src/models/addresses/IEd25519Address";
import { ISimpleOutput, SIMPLE_OUTPUT_TYPE } from "../../src/models/outputs/ISimpleOutput";

describe("Binary Output", () => {
    test("Can serialize and deserialize outputs", () => {
        const outputs: ISimpleOutput[] = [
            {
                type: SIMPLE_OUTPUT_TYPE,
                address: {
                    type: ED25519_ADDRESS_TYPE,
                    address: "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
                },
                amount: 123456
            },
            {
                type: SIMPLE_OUTPUT_TYPE,
                address: {
                    type: ED25519_ADDRESS_TYPE,
                    address: "4566920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1"
                },
                amount: 987654
            }
        ];

        const serialized = new WriteStream();
        serializeOutputs(serialized, outputs);
        const hex = serialized.finalHex();
        expect(hex).toEqual(
            "020000006920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f9240e201000000000000004566920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f106120f0000000000"
        );
        const deserialized = deserializeOutputs(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.length).toEqual(2);
        expect(deserialized[0].type).toEqual(0);
        const out0 = deserialized[0] as ISimpleOutput;
        expect(out0.address.type).toEqual(0);
        expect(out0.address.address).toEqual("6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
        expect(out0.amount).toEqual(123456);

        expect(deserialized[1].type).toEqual(0);
        const out1 = deserialized[1] as ISimpleOutput;
        expect(out1.address.type).toEqual(0);
        expect(out1.address.address).toEqual("4566920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1");
        expect(out1.amount).toEqual(987654);
    });

    test("Can serialize and deserialize output", () => {
        const object: ISimpleOutput = {
            type: SIMPLE_OUTPUT_TYPE,
            address: {
                type: ED25519_ADDRESS_TYPE,
                address: "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
            },
            amount: 123456
        };

        const serialized = new WriteStream();
        serializeOutput(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual("00006920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f9240e2010000000000");
        const deserialized = deserializeOutput(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(0);
        const out0 = deserialized as ISimpleOutput;
        expect(out0.type).toEqual(0);
        expect(out0.address.address).toEqual("6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
        expect(deserialized.amount).toEqual(123456);
    });

    test("Can serialize and deserialize sig locked single output", () => {
        const object: ISimpleOutput = {
            type: SIMPLE_OUTPUT_TYPE,
            address: {
                type: ED25519_ADDRESS_TYPE,
                address: "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
            },
            amount: 123456
        };

        const serialized = new WriteStream();
        serializeSimpleOutput(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual("00006920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f9240e2010000000000");
        const deserialized = deserializeSimpleOutput(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(0);
        expect(deserialized.address.type).toEqual(0);
        expect(deserialized.address.address).toEqual(
            "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
        );
        expect(deserialized.amount).toEqual(123456);
    });
});
