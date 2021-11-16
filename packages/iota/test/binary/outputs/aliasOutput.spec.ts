// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import { deserializeAliasOutput, serializeAliasOutput } from "../../../src/binary/outputs/aliasOutput";
import { ED25519_ADDRESS_TYPE } from "../../../src/models/addresses/IEd25519Address";
import { ALIAS_OUTPUT_TYPE, IAliasOutput } from "../../../src/models/outputs/IAliasOutput";

describe("Binary Alias Output", () => {
    test("Can serialize and deserialize alias output", () => {
        const object: IAliasOutput = {
            type: ALIAS_OUTPUT_TYPE,
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
            aliasId: "2".repeat(40),
            stateController: {
                type: ED25519_ADDRESS_TYPE,
                address: "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5faaa2"
            },
            governanceController: {
                type: ED25519_ADDRESS_TYPE,
                address: "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
            },
            stateIndex: 843534,
            stateMetadata: "1111111122222222",
            foundryCounter: 92123,
            blocks: []
        };

        const serialized = new WriteStream();
        serializeAliasOutput(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual(
            "0440e201000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000e338d6da574c194d0000000000000000000000000000000000000000000000001111111111111111111111111111111111111111111111111111111111111111111111111111aaaa9a0603c2845c0000000000000000000000000000000000000000000000002222222222222222222222222222222222222222006920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5faaa2006920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f920edf0c00080000001111111122222222db67010000"
        );
        const deserialized = deserializeAliasOutput(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.aliasId).toEqual("2".repeat(40));
        expect(deserialized.type).toEqual(4);
        expect(deserialized.amount).toEqual(123456);
        expect(deserialized.nativeTokens.length).toEqual(2);
        expect(deserialized.nativeTokens[0].id).toEqual("0".repeat(76));
        expect(deserialized.nativeTokens[0].amount).toEqual("5555555555555555555");
        expect(deserialized.nativeTokens[1].id).toEqual("1".repeat(76));
        expect(deserialized.nativeTokens[1].amount).toEqual("6666666666666666666");
        expect(deserialized.stateController.type).toEqual(0);
        expect(deserialized.stateController.address).toEqual(
            "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5faaa2"
        );
        expect(deserialized.governanceController.type).toEqual(0);
        expect(deserialized.governanceController.address).toEqual(
            "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
        );
        expect(deserialized.stateIndex).toEqual(843534);
        expect(deserialized.stateMetadata).toEqual("1111111122222222");
        expect(deserialized.foundryCounter).toEqual(92123);
    });
});
