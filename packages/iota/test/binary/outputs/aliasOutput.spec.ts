// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import { deserializeAliasOutput, serializeAliasOutput } from "../../../src/binary/outputs/aliasOutput";
import { ED25519_ADDRESS_TYPE, IEd25519Address } from "../../../src/models/addresses/IEd25519Address";
import { ALIAS_OUTPUT_TYPE, IAliasOutput } from "../../../src/models/outputs/IAliasOutput";
import { GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE, IGovernorAddressUnlockCondition } from "../../../src/models/unlockConditions/IGovernorAddressUnlockCondition";
import { IStateControllerAddressUnlockCondition, STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE } from "../../../src/models/unlockConditions/IStateControllerAddressUnlockCondition";

describe("Binary Alias Output", () => {
    test("Can serialize and deserialize alias output", () => {
        const object: IAliasOutput = {
            type: ALIAS_OUTPUT_TYPE,
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
            aliasId: "0x2222222222222222222222222222222222222222334455667788990011223344",
            stateIndex: 843534,
            stateMetadata: "0x1111111122222222",
            foundryCounter: 92123,
            unlockConditions: [
                {
                    type: STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE,
                    address: {
                        type: ED25519_ADDRESS_TYPE,
                        pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5faaa2"
                    }
                },
                {
                    type: GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE,
                    address: {
                        type: ED25519_ADDRESS_TYPE,
                        pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
                    }
                }
            ],
            featureBlocks: [],
            immutableFeatureBlocks: []
        };

        const serialized = new WriteStream();
        serializeAliasOutput(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual(
            "0440e201000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000064000000000000000000000000000000000000000000000000000000000000001111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111c80000000000000000000000000000000000000000000000000000000000000022222222222222222222222222222222222222223344556677889900112233440edf0c0008001111111122222222db6701000204006920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5faaa205006920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f920000"
        );
        const deserialized = deserializeAliasOutput(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.aliasId).toEqual("0x2222222222222222222222222222222222222222334455667788990011223344");
        expect(deserialized.type).toEqual(4);
        expect(deserialized.amount).toEqual("123456");
        expect(deserialized.nativeTokens.length).toEqual(2);
        expect(deserialized.nativeTokens[0].id).toEqual("0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000");
        expect(deserialized.nativeTokens[0].amount).toEqual("0x64");
        expect(deserialized.nativeTokens[1].id).toEqual("0x1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111");
        expect(deserialized.nativeTokens[1].amount).toEqual("0xc8");
        expect(deserialized.stateIndex).toEqual(843534);
        expect(deserialized.stateMetadata).toEqual("0x1111111122222222");
        expect(deserialized.foundryCounter).toEqual(92123);
        expect(deserialized.unlockConditions.length).toEqual(2);
        expect(deserialized.unlockConditions[0].type).toEqual(4);
        const stateControllerUnlockCondition =
            deserialized.unlockConditions[0] as IStateControllerAddressUnlockCondition;
        expect(stateControllerUnlockCondition.address.type).toEqual(0);
        expect((stateControllerUnlockCondition.address as IEd25519Address).pubKeyHash).toEqual(
            "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5faaa2"
        );
        expect(deserialized.unlockConditions[1].type).toEqual(5);
        const governorUnlockCondition = deserialized.unlockConditions[1] as IGovernorAddressUnlockCondition;
        expect(governorUnlockCondition.address.type).toEqual(0);
        expect((governorUnlockCondition.address as IEd25519Address).pubKeyHash).toEqual(
            "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
        );
    });
});
