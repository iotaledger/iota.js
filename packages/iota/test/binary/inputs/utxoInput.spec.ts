// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import { deserializeUTXOInput, serializeUTXOInput } from "../../../src/binary/inputs/utxoInput";
import { IUTXOInput, UTXO_INPUT_TYPE } from "../../../src/models/inputs/IUTXOInput";

describe("Binary UTXO Input", () => {
    test("Can serialize and deserialize utxo input", () => {
        const object: IUTXOInput = {
            type: UTXO_INPUT_TYPE,
            transactionId: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92",
            transactionOutputIndex: 12345
        };

        const serialized = new WriteStream();
        serializeUTXOInput(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual("006920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f923930");
        const deserialized = deserializeUTXOInput(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(0);
        expect(deserialized.transactionId).toEqual("0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
        expect(deserialized.transactionOutputIndex).toEqual(12345);
    });
});
