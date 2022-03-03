// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import { deserializeNftOutput, serializeNftOutput } from "../../../src/binary/outputs/nftOutput";
import { INftOutput, NFT_OUTPUT_TYPE } from "../../../src/models/outputs/INftOutput";

describe("Binary Nft Output", () => {
    test("Can serialize and deserialize nft output", () => {
        const object: INftOutput = {
            type: NFT_OUTPUT_TYPE,
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
            nftId: "0x1111111111111111111111111111111111111111",
            unlockConditions: [],
            featureBlocks: [],
            immutableBlocks: []
        };

        const serialized = new WriteStream();
        serializeNftOutput(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual(
            "0640e201000000000002000000000000000000000000000000000000000000000000000000000000000000000000000064000000000000000000000000000000000000000000000000000000000000001111111111111111111111111111111111111111111111111111111111111111111111111111c8000000000000000000000000000000000000000000000000000000000000001111111111111111111111111111111111111111000000"
        );
        const deserialized = deserializeNftOutput(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(6);
        expect(deserialized.amount).toEqual("123456");
        expect(deserialized.nativeTokens.length).toEqual(2);
        expect(deserialized.nativeTokens[0].id).toEqual("0x0000000000000000000000000000000000000000000000000000000000000000000000000000");
        expect(deserialized.nativeTokens[0].amount).toEqual("0x64");
        expect(deserialized.nativeTokens[1].id).toEqual("0x1111111111111111111111111111111111111111111111111111111111111111111111111111");
        expect(deserialized.nativeTokens[1].amount).toEqual("0xc8");
        expect(deserialized.nftId).toEqual("0x1111111111111111111111111111111111111111");
    });
});
