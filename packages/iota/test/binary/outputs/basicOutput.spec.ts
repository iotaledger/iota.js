// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import { deserializeBasicOutput, serializeBasicOutput } from "../../../src/binary/outputs/basicOutput";
import { ED25519_ADDRESS_TYPE, IEd25519Address } from "../../../src/models/addresses/IEd25519Address";
import { BASIC_OUTPUT_TYPE, IBasicOutput } from "../../../src/models/outputs/IBasicOutput";
import { ADDRESS_UNLOCK_CONDITION_TYPE, IAddressUnlockCondition } from "../../../src/models/unlockConditions/IAddressUnlockCondition";

describe("Binary Basic Output", () => {
    test("Can serialize and deserialize basic output", () => {
        const object: IBasicOutput = {
            type: BASIC_OUTPUT_TYPE,
            amount: "123456",
            nativeTokens: [
                {
                    id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
                    amount: "0x64"
                },
                {
                    id: "0x1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111",
                    amount: "0xc8"
                }
            ],
            unlockConditions: [
                {
                    type: ADDRESS_UNLOCK_CONDITION_TYPE,
                    address: {
                        type: ED25519_ADDRESS_TYPE,
                        pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
                    }
                }
            ],
            featureBlocks: []
        };

        const serialized = new WriteStream();
        serializeBasicOutput(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual(
            "0340e201000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000064000000000000000000000000000000000000000000000000000000000000001111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111c8000000000000000000000000000000000000000000000000000000000000000100006920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f9200"
        );
        const deserialized = deserializeBasicOutput(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(3);
        expect(deserialized.unlockConditions.length).toEqual(1);
        const unlockCondition = deserialized.unlockConditions[0] as IAddressUnlockCondition;
        expect(unlockCondition.address.type).toEqual(0);
        expect((unlockCondition.address as IEd25519Address).pubKeyHash).toEqual(
            "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
        );
        expect(deserialized.amount).toEqual("123456");
        expect(deserialized.nativeTokens.length).toEqual(2);
        expect(deserialized.nativeTokens[0].id).toEqual("0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000");
        expect(deserialized.nativeTokens[0].amount).toEqual("0x64");
        expect(deserialized.nativeTokens[1].id).toEqual("0x1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111");
        expect(deserialized.nativeTokens[1].amount).toEqual("0xc8");
    });
});
