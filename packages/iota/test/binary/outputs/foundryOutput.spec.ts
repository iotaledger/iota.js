// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import { deserializeFoundryOutput, serializeFoundryOutput } from "../../../src/binary/outputs/foundryOutput";
import { ED25519_ADDRESS_TYPE } from "../../../src/models/addresses/IEd25519Address";
import { FOUNDRY_OUTPUT_TYPE, IFoundryOutput } from "../../../src/models/outputs/IFoundryOutput";
import { SIMPLE_TOKEN_SCHEME_TYPE } from "../../../src/models/tokenSchemes/ISimpleTokenScheme";
import { ADDRESS_UNLOCK_CONDITION_TYPE, IAddressUnlockCondition } from "../../../src/models/unlockConditions/IAddressUnlockCondition";

describe("Binary Foundry Output", () => {
    test("Can serialize and deserialize foundry output", () => {
        const object: IFoundryOutput = {
            type: FOUNDRY_OUTPUT_TYPE,
            amount: 123456,
            nativeTokens: [
                {
                    id: "0".repeat(76),
                    amount: "5555555555555555555"
                },
                {
                    id: "1".repeat(76),
                    amount: "6666666666666666666"
                }
            ],
            serialNumber: 387548,
            tokenTag: "1".repeat(24),
            circulatingSupply: "1111111122222222",
            maximumSupply: "2222222233333333",
            tokenScheme: {
                type: SIMPLE_TOKEN_SCHEME_TYPE
            },
            unlockConditions: [
                {
                    type: ADDRESS_UNLOCK_CONDITION_TYPE,
                    address: {
                        type: ED25519_ADDRESS_TYPE,
                        address: "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5faaa2"
                    }
                }
            ],
            blocks: []
        };

        const serialized = new WriteStream();
        serializeFoundryOutput(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual(
            "0540e201000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000e338d6da574c194d0000000000000000000000000000000000000000000000001111111111111111111111111111111111111111111111111111111111111111111111111111aaaa9a0603c2845c000000000000000000000000000000000000000000000000dce905001111111111111111111111118efcbeb78cf20300000000000000000000000000000000000000000000000000556ed46e19e50700000000000000000000000000000000000000000000000000000100006920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5faaa200"
        );
        const deserialized = deserializeFoundryOutput(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(5);
        expect(deserialized.unlockConditions.length).toEqual(1);
        const addressUnlockCondition = deserialized.unlockConditions[0] as IAddressUnlockCondition;
        expect(addressUnlockCondition.address.type).toEqual(0);
        expect(addressUnlockCondition.address.address).toEqual(
            "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5faaa2"
        );
        expect(deserialized.amount).toEqual(123456);
        expect(deserialized.nativeTokens.length).toEqual(2);
        expect(deserialized.nativeTokens[0].id).toEqual("0".repeat(76));
        expect(deserialized.nativeTokens[0].amount).toEqual("5555555555555555555");
        expect(deserialized.nativeTokens[1].id).toEqual("1".repeat(76));
        expect(deserialized.nativeTokens[1].amount).toEqual("6666666666666666666");
        expect(deserialized.serialNumber).toEqual(387548);
        expect(deserialized.tokenTag).toEqual("1".repeat(24));
        expect(deserialized.circulatingSupply).toEqual("1111111122222222");
        expect(deserialized.maximumSupply).toEqual("2222222233333333");
        expect(deserialized.tokenScheme.type).toEqual(0);
    });
});
