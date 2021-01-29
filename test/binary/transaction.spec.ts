// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { deserializeTransactionEssence, serializeTransactionEssence } from "../../src/binary/transaction";
import { INDEXATION_PAYLOAD_TYPE } from "../../src/models/IIndexationPayload";
import { ISigLockedSingleOutput } from "../../src/models/ISigLockedSingleOutput";
import { ITransactionEssence, TRANSACTION_ESSENCE_TYPE } from "../../src/models/ITransactionEssence";
import { IUTXOInput, UTXO_INPUT_TYPE } from "../../src/models/IUTXOInput";
import { Converter } from "../../src/utils/converter";
import { ReadStream } from "../../src/utils/readStream";
import { WriteStream } from "../../src/utils/writeStream";

describe("Binary Transaction", () => {
    test("Can serialize and deserialize transaction essence with no payload", () => {
        const object: ITransactionEssence = {
            type: TRANSACTION_ESSENCE_TYPE,
            inputs: [
                {
                    type: UTXO_INPUT_TYPE,
                    transactionId: "a".repeat(64),
                    transactionOutputIndex: 2
                } as IUTXOInput
            ],
            outputs: [
                {
                    type: 0,
                    address: {
                        type: 1,
                        address: "b".repeat(64)
                    },
                    amount: 100
                } as ISigLockedSingleOutput
            ]
        };

        const serialized = new WriteStream();
        serializeTransactionEssence(serialized, object);
        const hex = serialized.finalHex();
        // eslint-disable-next-line max-len
        expect(hex).toEqual("00010000aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa020001000001bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb640000000000000000000000");
        const deserialized = deserializeTransactionEssence(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(0);
        expect(deserialized.inputs.length).toEqual(1);

        const utxoInput = deserialized.inputs[0] as IUTXOInput;
        expect(utxoInput.type).toEqual(0);
        expect(utxoInput.transactionId).toEqual("a".repeat(64));
        expect(utxoInput.transactionOutputIndex).toEqual(2);
        expect(deserialized.outputs.length).toEqual(1);

        const sigLockedOutput = deserialized.outputs[0] as ISigLockedSingleOutput;
        expect(sigLockedOutput.type).toEqual(0);
        expect(sigLockedOutput.address.type).toEqual(1);
        expect(sigLockedOutput.address.address).toEqual("b".repeat(64));
        expect(sigLockedOutput.amount).toEqual(100);
        expect(deserialized.payload).toBeUndefined();
    });

    test("Can serialize and deserialize transaction essence with indexation payload", () => {
        const object: ITransactionEssence = {
            type: TRANSACTION_ESSENCE_TYPE,
            inputs: [
                {
                    type: UTXO_INPUT_TYPE,
                    transactionId: "a".repeat(64),
                    transactionOutputIndex: 2
                } as IUTXOInput
            ],
            outputs: [
                {
                    type: 0,
                    address: {
                        type: 1,
                        address: "b".repeat(64)
                    },
                    amount: 100
                } as ISigLockedSingleOutput
            ],
            payload: {
                type: INDEXATION_PAYLOAD_TYPE,
                index: "foo",
                data: Converter.utf8ToHex("bar")
            }
        };

        const serialized = new WriteStream();
        serializeTransactionEssence(serialized, object);
        const hex = serialized.finalHex();
        // eslint-disable-next-line max-len
        expect(hex).toEqual("00010000aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa020001000001bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb640000000000000010000000020000000300666f6f03000000626172");
        const deserialized = deserializeTransactionEssence(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(0);
        expect(deserialized.inputs.length).toEqual(1);

        const utxoInput = deserialized.inputs[0] as IUTXOInput;
        expect(utxoInput.type).toEqual(0);
        expect(utxoInput.transactionId).toEqual("a".repeat(64));
        expect(utxoInput.transactionOutputIndex).toEqual(2);
        expect(deserialized.outputs.length).toEqual(1);

        const sigLockedOutput = deserialized.outputs[0] as ISigLockedSingleOutput;
        expect(sigLockedOutput.type).toEqual(0);
        expect(sigLockedOutput.address.type).toEqual(1);
        expect(sigLockedOutput.address.address).toEqual("b".repeat(64));
        expect(sigLockedOutput.amount).toEqual(100);
        expect(deserialized.payload).toBeDefined();
        if (deserialized.payload) {
            expect(deserialized.payload.type).toEqual(2);
            expect(deserialized.payload.index).toEqual("foo");
            expect(deserialized.payload.data).toBeDefined();
            if (deserialized.payload.data) {
                expect(Converter.hexToUtf8(deserialized.payload.data)).toEqual("bar");
            }
        }
    });
});
