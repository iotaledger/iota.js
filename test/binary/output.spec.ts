// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { deserializeOutput, deserializeOutputs, deserializeSigLockedSingleOutput, serializeOutput, serializeOutputs, serializeSigLockedSingleOutput } from "../../src/binary/output";
import { ISigLockedSingleOutput } from "../../src/models/ISigLockedSingleOutput";
import { Converter } from "../../src/utils/converter";
import { ReadStream } from "../../src/utils/readStream";
import { WriteStream } from "../../src/utils/writeStream";

describe("Binary Output", () => {
    test("Can serialize and deserialize outputs", () => {
        const outputs: ISigLockedSingleOutput[] = [
            {
                type: 0,
                address: {
                    type: 1,
                    address: "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
                },
                amount: 123456
            },
            {
                type: 0,
                address: {
                    type: 1,
                    address: "4566920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1"
                },
                amount: 987654
            }
        ];

        const serialized = new WriteStream();
        serializeOutputs(serialized, outputs);
        const hex = serialized.finalHex();
        // eslint-disable-next-line max-len
        expect(hex).toEqual("020000016920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f9240e201000000000000014566920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f106120f0000000000");
        const deserialized = deserializeOutputs(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.length).toEqual(2);
        expect(deserialized[0].type).toEqual(0);
        expect(deserialized[0].address.type).toEqual(1);
        expect(deserialized[0].address.address)
            .toEqual("6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
        expect(deserialized[0].amount).toEqual(123456);
        expect(deserialized[1].type).toEqual(0);
        expect(deserialized[1].address.type).toEqual(1);
        expect(deserialized[1].address.address)
            .toEqual("4566920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1");
        expect(deserialized[1].amount).toEqual(987654);
    });

    test("Can serialize and deserialize output", () => {
        const object: ISigLockedSingleOutput = {
            type: 0,
            address: {
                type: 1,
                address: "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
            },
            amount: 123456
        };

        const serialized = new WriteStream();
        serializeOutput(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual("00016920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f9240e2010000000000");
        const deserialized = deserializeOutput(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(0);
        expect(deserialized.address.type).toEqual(1);
        expect(deserialized.address.address)
            .toEqual("6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
        expect(deserialized.amount).toEqual(123456);
    });

    test("Can serialize and deserialize sig locked single output", () => {
        const object: ISigLockedSingleOutput = {
            type: 0,
            address: {
                type: 1,
                address: "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
            },
            amount: 123456
        };

        const serialized = new WriteStream();
        serializeSigLockedSingleOutput(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual("00016920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f9240e2010000000000");
        const deserialized = deserializeSigLockedSingleOutput(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(0);
        expect(deserialized.address.type).toEqual(1);
        expect(deserialized.address.address)
            .toEqual("6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
        expect(deserialized.amount).toEqual(123456);
    });
});
