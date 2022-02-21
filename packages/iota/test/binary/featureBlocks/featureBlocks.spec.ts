// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import { deserializeFeatureBlocks, serializeFeatureBlocks } from "../../../src/binary/featureBlocks/featureBlocks";
import { ED25519_ADDRESS_TYPE, IEd25519Address } from "../../../src/models/addresses/IEd25519Address";
import type { FeatureBlockTypes } from "../../../src/models/featureBlocks/featureBlockTypes";
import { IIssuerFeatureBlock, ISSUER_FEATURE_BLOCK_TYPE } from "../../../src/models/featureBlocks/IIssuerFeatureBlock";
import { ISenderFeatureBlock, SENDER_FEATURE_BLOCK_TYPE } from "../../../src/models/featureBlocks/ISenderFeatureBlock";

describe("Binary Feature Blocks", () => {
    test("Can serialize and deserialize feature blocks", () => {
        const featureBlocks: FeatureBlockTypes[] = [
            {
                type: SENDER_FEATURE_BLOCK_TYPE,
                address: {
                    type: ED25519_ADDRESS_TYPE,
                    pubKeyHash: "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
                }
            },
            {
                type: ISSUER_FEATURE_BLOCK_TYPE,
                address: {
                    type: ED25519_ADDRESS_TYPE,
                    pubKeyHash: "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
                }
            }
        ];

        const serialized = new WriteStream();
        serializeFeatureBlocks(serialized, featureBlocks);
        const hex = serialized.finalHex();
        expect(hex).toEqual(
            "0200006920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f9201006920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
        );
        const deserialized = deserializeFeatureBlocks(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.length).toEqual(2);
        expect(deserialized[0].type).toEqual(0);
        const fb0 = deserialized[0] as ISenderFeatureBlock;
        expect(fb0.address.type).toEqual(0);
        expect((fb0.address as IEd25519Address).pubKeyHash).toEqual("6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");

        expect(deserialized[1].type).toEqual(1);
        const fb1 = deserialized[1] as IIssuerFeatureBlock;
        expect(fb1.address.type).toEqual(0);
        expect((fb1.address as IEd25519Address).pubKeyHash).toEqual("6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
    });
});
