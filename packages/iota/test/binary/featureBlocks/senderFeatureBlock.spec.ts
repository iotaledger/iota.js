// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import {
    deserializeSenderFeatureBlock,
    serializeSenderFeatureBlock
} from "../../../src/binary/featureBlocks/senderFeatureBlock";
import { ED25519_ADDRESS_TYPE, IEd25519Address } from "../../../src/models/addresses/IEd25519Address";
import { ISenderFeatureBlock, SENDER_FEATURE_BLOCK_TYPE } from "../../../src/models/featureBlocks/ISenderFeatureBlock";

describe("Binary Sender Feature Block", () => {
    test("Can serialize and deserialize sender feature block", () => {
        const object: ISenderFeatureBlock = {
            type: SENDER_FEATURE_BLOCK_TYPE,
            address: {
                type: ED25519_ADDRESS_TYPE,
                pubKeyHash: "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
            }
        };

        const serialized = new WriteStream();
        serializeSenderFeatureBlock(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual("00006920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
        const deserialized = deserializeSenderFeatureBlock(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(0);
        expect(deserialized.address.type).toEqual(0);
        expect((deserialized.address as IEd25519Address).pubKeyHash).toEqual(
            "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
        );
    });
});
