// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import {
    deserializeInput,
    deserializeInputs,
    serializeInput,
    serializeInputs
} from "../../../src/binary/inputs/inputs";
import type { InputTypes } from "../../../src/models/inputs/inputTypes";
import { IUTXOInput, UTXO_INPUT_TYPE } from "../../../src/models/inputs/IUTXOInput";

describe("Binary Input", () => {
    test("Can serialize and deserialize inputs", () => {
        const inputs: InputTypes[] = [
            {
                type: UTXO_INPUT_TYPE,
                transactionId: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92",
                transactionOutputIndex: 12345
            },
            {
                type: UTXO_INPUT_TYPE,
                transactionId: "0x4566920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1",
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
        expect(in0.transactionId).toEqual("0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
        expect(in0.transactionOutputIndex).toEqual(12345);

        expect(deserialized[1].type).toEqual(0);
        const in1 = deserialized[1] as IUTXOInput;
        expect(in1.transactionId).toEqual("0x4566920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1");
        expect(in1.transactionOutputIndex).toEqual(23456);
    });

    test("Can serialize and deserialize input", () => {
        const object: IUTXOInput = {
            type: UTXO_INPUT_TYPE,
            transactionId: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92",
            transactionOutputIndex: 12345
        };

        const serialized = new WriteStream();
        serializeInput(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual("006920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f923930");
        const deserialized = deserializeInput(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(0);
        const in0 = deserialized as IUTXOInput;
        expect(in0.transactionId).toEqual("0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
        expect(in0.transactionOutputIndex).toEqual(12345);
    });
});
