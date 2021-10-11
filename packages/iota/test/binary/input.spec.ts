// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import {
    deserializeInput,
    deserializeInputs,
    deserializeUTXOInput,
    serializeInput,
    serializeInputs,
    serializeUTXOInput
} from "../../src/binary/input";
import { IUTXOInput, UTXO_INPUT_TYPE } from "../../src/models/IUTXOInput";

describe("Binary Input", () => {
    test("Can serialize and deserialize inputs", () => {
        const inputs: IUTXOInput[] = [
            {
                type: UTXO_INPUT_TYPE,
                transactionId: "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92",
                transactionOutputIndex: 12345
            },
            {
                type: UTXO_INPUT_TYPE,
                transactionId: "4566920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1",
                transactionOutputIndex: 23456
            }
        ];

        const serialized = new WriteStream();
        serializeInputs(serialized, inputs);
        const hex = serialized.finalHex();
        expect(hex).toEqual(
            "0200006920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f923930004566920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1a05b"
        );
        const deserialized = deserializeInputs(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.length).toEqual(2);
        expect(deserialized[0].type).toEqual(0);
        const in0 = deserialized[0] as IUTXOInput;
        expect(in0.transactionId).toEqual("6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
        expect(in0.transactionOutputIndex).toEqual(12345);

        expect(deserialized[1].type).toEqual(0);
        const in1 = deserialized[1] as IUTXOInput;
        expect(in1.transactionId).toEqual("4566920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1");
        expect(in1.transactionOutputIndex).toEqual(23456);
    });

    test("Can serialize and deserialize input", () => {
        const object: IUTXOInput = {
            type: UTXO_INPUT_TYPE,
            transactionId: "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92",
            transactionOutputIndex: 12345
        };

        const serialized = new WriteStream();
        serializeInput(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual("006920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f923930");
        const deserialized = deserializeInput(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(0);
        const in0 = deserialized as IUTXOInput;
        expect(in0.transactionId).toEqual("6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
        expect(in0.transactionOutputIndex).toEqual(12345);
    });

    test("Can serialize and deserialize utxo input", () => {
        const object: IUTXOInput = {
            type: UTXO_INPUT_TYPE,
            transactionId: "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92",
            transactionOutputIndex: 12345
        };

        const serialized = new WriteStream();
        serializeUTXOInput(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual("006920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f923930");
        const deserialized = deserializeUTXOInput(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(0);
        expect(deserialized.transactionId).toEqual("6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
        expect(deserialized.transactionOutputIndex).toEqual(12345);
    });
});
