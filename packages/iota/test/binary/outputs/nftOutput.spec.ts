// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import { deserializeNftOutput, serializeNftOutput } from "../../../src/binary/outputs/nftOutput";
import { INftOutput, NFT_OUTPUT_TYPE } from "../../../src/models/outputs/INftOutput";

describe("Binary Nft Output", () => {
    test("Can serialize and deserialize nft output", () => {
        const object: INftOutput = {
            type: NFT_OUTPUT_TYPE,
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
            nftId: "1".repeat(40),
            immutableData: "1111111122222222",
            unlockConditions: [],
            blocks: []
        };

        const serialized = new WriteStream();
        serializeNftOutput(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual(
            "0640e2010000000000020000000000000000000000000000000000000000000000000000000000000000000000000000e338d6da574c194d0000000000000000000000000000000000000000000000001111111111111111111111111111111111111111111111111111111111111111111111111111aaaa9a0603c2845c00000000000000000000000000000000000000000000000011111111111111111111111111111111111111110800000011111111222222220000"
        );
        const deserialized = deserializeNftOutput(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(6);
        expect(deserialized.amount).toEqual(123456);
        expect(deserialized.nativeTokens.length).toEqual(2);
        expect(deserialized.nativeTokens[0].id).toEqual("0".repeat(76));
        expect(deserialized.nativeTokens[0].amount).toEqual("5555555555555555555");
        expect(deserialized.nativeTokens[1].id).toEqual("1".repeat(76));
        expect(deserialized.nativeTokens[1].amount).toEqual("6666666666666666666");
        expect(deserialized.nftId).toEqual("1".repeat(40));
        expect(deserialized.immutableData).toEqual("1111111122222222");
    });
});
