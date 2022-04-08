// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import { deserializeFoundryOutput, serializeFoundryOutput } from "../../../src/binary/outputs/foundryOutput";
import { ED25519_ADDRESS_TYPE, IEd25519Address } from "../../../src/models/addresses/IEd25519Address";
import { FOUNDRY_OUTPUT_TYPE, IFoundryOutput } from "../../../src/models/outputs/IFoundryOutput";
import { SIMPLE_TOKEN_SCHEME_TYPE } from "../../../src/models/tokenSchemes/ISimpleTokenScheme";
import { ADDRESS_UNLOCK_CONDITION_TYPE, IAddressUnlockCondition } from "../../../src/models/unlockConditions/IAddressUnlockCondition";

describe("Binary Foundry Output", () => {
    test("Can serialize and deserialize foundry output", () => {
        const object: IFoundryOutput = {
            type: FOUNDRY_OUTPUT_TYPE,
            amount: "123456",
            nativeTokens: [
                {
                    id: "0x0000000000000000000000000000000000000000000000000000000000000000000000000000",
                    amount: "0x64"
                },
                {
                    id: "0x1111111111111111111111111111111111111111111111111111111111111111111111111111",
                    amount: "0xc8"
                }
            ],
            serialNumber: 387548,
            tokenTag: "0x111111111111111111111111",
            tokenScheme: {
                type: SIMPLE_TOKEN_SCHEME_TYPE,
                mintedTokens: "0x100000",
                meltedTokens: "0x1000",
                maximumSupply: "0x200000"
            },
            unlockConditions: [
                {
                    type: ADDRESS_UNLOCK_CONDITION_TYPE,
                    address: {
                        type: ED25519_ADDRESS_TYPE,
                        pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5faaa2"
                    }
                }
            ],
            featureBlocks: [],
            immutableFeatureBlocks: []
        };

        const serialized = new WriteStream();
        serializeFoundryOutput(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual(
            "0540e201000000000002000000000000000000000000000000000000000000000000000000000000000000000000000064000000000000000000000000000000000000000000000000000000000000001111111111111111111111111111111111111111111111111111111111111111111111111111c800000000000000000000000000000000000000000000000000000000000000dce90500111111111111111111111111000000100000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000100006920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5faaa20000"
        );
        const deserialized = deserializeFoundryOutput(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(5);
        expect(deserialized.unlockConditions.length).toEqual(1);
        const addressUnlockCondition = deserialized.unlockConditions[0] as IAddressUnlockCondition;
        expect(addressUnlockCondition.address.type).toEqual(0);
        expect((addressUnlockCondition.address as IEd25519Address).pubKeyHash).toEqual(
            "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5faaa2"
        );
        expect(deserialized.amount).toEqual("123456");
        expect(deserialized.nativeTokens.length).toEqual(2);
        expect(deserialized.nativeTokens[0].id).toEqual("0x0000000000000000000000000000000000000000000000000000000000000000000000000000");
        expect(deserialized.nativeTokens[0].amount).toEqual("0x64");
        expect(deserialized.nativeTokens[1].id).toEqual("0x1111111111111111111111111111111111111111111111111111111111111111111111111111");
        expect(deserialized.nativeTokens[1].amount).toEqual("0xc8");
        expect(deserialized.serialNumber).toEqual(387548);
        expect(deserialized.tokenTag).toEqual("0x111111111111111111111111");
        expect(deserialized.tokenScheme.type).toEqual(0);
        expect(deserialized.tokenScheme.mintedTokens).toEqual("0x100000");
        expect(deserialized.tokenScheme.meltedTokens).toEqual("0x1000");
        expect(deserialized.tokenScheme.maximumSupply).toEqual("0x200000");
    });
});
