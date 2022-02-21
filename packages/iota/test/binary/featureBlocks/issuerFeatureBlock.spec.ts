// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import {
    deserializeIssuerFeatureBlock,
    serializeIssuerFeatureBlock
} from "../../../src/binary/featureBlocks/issuerFeatureBlock";
import { ED25519_ADDRESS_TYPE, IEd25519Address } from "../../../src/models/addresses/IEd25519Address";
import { IIssuerFeatureBlock, ISSUER_FEATURE_BLOCK_TYPE } from "../../../src/models/featureBlocks/IIssuerFeatureBlock";

describe("Binary Issuer Feature Block", () => {
    test("Can serialize and deserialize issuer feature block", () => {
        const object: IIssuerFeatureBlock = {
            type: ISSUER_FEATURE_BLOCK_TYPE,
            address: {
                type: ED25519_ADDRESS_TYPE,
                pubKeyHash: "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
            }
        };

        const serialized = new WriteStream();
        serializeIssuerFeatureBlock(serialized, object);
        const hex = serialized.finalHex();
        expect(hex).toEqual("01006920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
        const deserialized = deserializeIssuerFeatureBlock(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.type).toEqual(1);
        expect(deserialized.address.type).toEqual(0);
        expect((deserialized.address as IEd25519Address).pubKeyHash).toEqual(
            "6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
        );
    });
});
