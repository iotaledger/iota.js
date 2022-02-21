// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import {
    deserializeOutput,
    deserializeOutputs,
    serializeOutput,
    serializeOutputs
} from "../../../src/binary/outputs/outputs";
import { ED25519_ADDRESS_TYPE, IEd25519Address } from "../../../src/models/addresses/IEd25519Address";
import { BASIC_OUTPUT_TYPE, IBasicOutput } from "../../../src/models/outputs/IBasicOutput";
import type { OutputTypes } from "../../../src/models/outputs/outputTypes";
import { ADDRESS_UNLOCK_CONDITION_TYPE, IAddressUnlockCondition } from "../../../src/models/unlockConditions/IAddressUnlockCondition";

describe("Binary Outputs", () => {
    test("Can serialize and deserialize outputs", () => {
        const outputs: OutputTypes[] = [
            {
                type: BASIC_OUTPUT_TYPE,
                amount: 123456,
                nativeTokens: [],
                unlockConditions: [
                    {
                        type: ADDRESS_UNLOCK_CONDITION_TYPE,
                        address: {
                            type: ED25519_ADDRESS_TYPE,
                            pubKeyHash: "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
                        }
                    }
                ],
                featureBlocks: []
            },
            {
                type: BASIC_OUTPUT_TYPE,
                amount: 987654,
                nativeTokens: [],
                unlockConditions: [
                    {
                        type: ADDRESS_UNLOCK_CONDITION_TYPE,
                        address: {
                            type: ED25519_ADDRESS_TYPE,
                            pubKeyHash: "4566920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1"
                        }
                    }
                ],
                featureBlocks: []
            }
        ];

        const serialized = new WriteStream();
        serializeOutputs(serialized, outputs);
        const hex = serialized.finalHex();
        expect(hex).toEqual(
            "02000340e2010000000000000100006920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92000306120f0000000000000100004566920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f100"
        );
        const deserialized = deserializeOutputs(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.length).toEqual(2);
        expect(deserialized[0].type).toEqual(3);
        const out0 = deserialized[0] as IBasicOutput;

        expect(out0.unlockConditions.length).toEqual(1);
        const unlockCondition0 = out0.unlockConditions[0] as IAddressUnlockCondition;
        expect(unlockCondition0.address.type).toEqual(0);
        expect((unlockCondition0.address as IEd25519Address).pubKeyHash).toEqual("6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
        expect(out0.amount).toEqual(123456);

        expect(deserialized[1].type).toEqual(3);
        const out1 = deserialized[1] as IBasicOutput;

        expect(out1.unlockConditions.length).toEqual(1);
        const unlockCondition1 = out1.unlockConditions[0] as IAddressUnlockCondition;
        expect(unlockCondition1.address.type).toEqual(0);
        expect((unlockCondition1.address as IEd25519Address).pubKeyHash).toEqual("4566920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1");
        expect(out1.amount).toEqual(987654);
    });

    test("Can serialize and deserialize output", () => {
        const object: IBasicOutput = {
            type: BASIC_OUTPUT_TYPE,
            amount: 123456,
            nativeTokens: [],
            unlockConditions: [
                {
                    type: ADDRESS_UNLOCK_CONDITION_TYPE,
                    address: {
                        type: ED25519_ADDRESS_TYPE,
                        pubKeyHash: "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
                    }
                }
            ],
            featureBlocks: []
        };

        const serialized = new WriteStream();
        serializeOutput(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual("0340e2010000000000000100006920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f9200");
        const deserialized = deserializeOutput(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(3);
        const out0 = deserialized as IBasicOutput;
        expect(out0.type).toEqual(3);

        expect(out0.unlockConditions.length).toEqual(1);
        const unlockCondition0 = out0.unlockConditions[0] as IAddressUnlockCondition;
        expect((unlockCondition0.address as IEd25519Address).pubKeyHash).toEqual("6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
        expect(deserialized.amount).toEqual(123456);
    });
});
