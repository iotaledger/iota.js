// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import { deserializeTransactionEssence, serializeTransactionEssence } from "../../src/binary/transactionEssence";
import { ED25519_ADDRESS_TYPE } from "../../src/models/addresses/IEd25519Address";
import { UTXO_INPUT_TYPE } from "../../src/models/inputs/IUTXOInput";
import { ITransactionEssence, TRANSACTION_ESSENCE_TYPE } from "../../src/models/ITransactionEssence";
import { EXTENDED_OUTPUT_TYPE, IExtendedOutput } from "../../src/models/outputs/IExtendedOutput";
import { TAGGED_DATA_PAYLOAD_TYPE } from "../../src/models/payloads/ITaggedDataPayload";

describe("Binary Transaction", () => {
    test("Can serialize and deserialize transaction essence with no payload", () => {
        const object: ITransactionEssence = {
            type: TRANSACTION_ESSENCE_TYPE,
            inputs: [
                {
                    type: UTXO_INPUT_TYPE,
                    transactionId: "a".repeat(64),
                    transactionOutputIndex: 2
                }
            ],
            outputs: [
                {
                    type: EXTENDED_OUTPUT_TYPE,
                    address: {
                        type: ED25519_ADDRESS_TYPE,
                        address: "b".repeat(64)
                    },
                    amount: 100,
                    nativeTokens: [],
                    unlockConditions: [],
                    blocks: []
                }
            ]
        };

        const serialized = new WriteStream();
        serializeTransactionEssence(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual(
            "00010000aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa020001000300bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb64000000000000000000000000000000"
        );
        const deserialized = deserializeTransactionEssence(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(0);
        expect(deserialized.inputs.length).toEqual(1);

        const utxoInput = deserialized.inputs[0];
        expect(utxoInput.type).toEqual(0);
        expect(utxoInput.transactionId).toEqual("a".repeat(64));
        expect(utxoInput.transactionOutputIndex).toEqual(2);
        expect(deserialized.outputs.length).toEqual(1);

        const extendedOutput = deserialized.outputs[0] as IExtendedOutput;
        expect(extendedOutput.type).toEqual(3);
        expect(extendedOutput.address.type).toEqual(0);
        expect(extendedOutput.address.address).toEqual("b".repeat(64));
        expect(extendedOutput.amount).toEqual(100);
        expect(deserialized.payload).toBeUndefined();
    });

    test("Can serialize and deserialize transaction essence with tagged data payload", () => {
        const object: ITransactionEssence = {
            type: TRANSACTION_ESSENCE_TYPE,
            inputs: [
                {
                    type: UTXO_INPUT_TYPE,
                    transactionId: "a".repeat(64),
                    transactionOutputIndex: 2
                }
            ],
            outputs: [
                {
                    type: EXTENDED_OUTPUT_TYPE,
                    address: {
                        type: ED25519_ADDRESS_TYPE,
                        address: "b".repeat(64)
                    },
                    amount: 100,
                    nativeTokens: [],
                    unlockConditions: [],
                    blocks: []
                }
            ],
            payload: {
                type: TAGGED_DATA_PAYLOAD_TYPE,
                tag: Converter.utf8ToHex("foo"),
                data: Converter.utf8ToHex("bar")
            }
        };

        const serialized = new WriteStream();
        serializeTransactionEssence(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual(
            "00010000aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa020001000300bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb6400000000000000000000000f0000000500000003666f6f03000000626172"
        );
        const deserialized = deserializeTransactionEssence(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(0);
        expect(deserialized.inputs.length).toEqual(1);

        const utxoInput = deserialized.inputs[0];
        expect(utxoInput.type).toEqual(0);
        expect(utxoInput.transactionId).toEqual("a".repeat(64));
        expect(utxoInput.transactionOutputIndex).toEqual(2);
        expect(deserialized.outputs.length).toEqual(1);

        const extendedOutput = deserialized.outputs[0] as IExtendedOutput;
        expect(extendedOutput.type).toEqual(3);
        expect(extendedOutput.address.type).toEqual(0);
        expect(extendedOutput.address.address).toEqual("b".repeat(64));
        expect(extendedOutput.amount).toEqual(100);
        expect(deserialized.payload).toBeDefined();
        if (deserialized.payload) {
            expect(deserialized.payload.type).toEqual(5);
            expect(deserialized.payload.tag).toBeDefined();
            if (deserialized.payload.tag) {
                expect(Converter.hexToUtf8(deserialized.payload.tag)).toEqual("foo");
            }
            expect(deserialized.payload.data).toBeDefined();
            if (deserialized.payload.data) {
                expect(Converter.hexToUtf8(deserialized.payload.data)).toEqual("bar");
            }
        }
    });
});
