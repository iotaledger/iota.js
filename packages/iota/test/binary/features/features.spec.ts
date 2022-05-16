// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter, ReadStream, WriteStream } from "@iota/util.js";
import { deserializeFeatures, serializeFeatures } from "../../../src/binary/features/features";
import { ED25519_ADDRESS_TYPE, IEd25519Address } from "../../../src/models/addresses/IEd25519Address";
import type { FeatureTypes } from "../../../src/models/features/featureTypes";
import { IIssuerFeature, ISSUER_FEATURE_TYPE } from "../../../src/models/features/IIssuerFeature";
import { ISenderFeature, SENDER_FEATURE_TYPE } from "../../../src/models/features/ISenderFeature";

describe("Binary Features", () => {
    test("Can serialize and deserialize features", () => {
        const features: FeatureTypes[] = [
            {
                type: SENDER_FEATURE_TYPE,
                address: {
                    type: ED25519_ADDRESS_TYPE,
                    pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
                }
            },
            {
                type: ISSUER_FEATURE_TYPE,
                address: {
                    type: ED25519_ADDRESS_TYPE,
                    pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
                }
            }
        ];

        const serialized = new WriteStream();
        serializeFeatures(serialized, features);
        const hex = serialized.finalHex();
        expect(hex).toEqual(
            "0200006920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f9201006920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
        );
        const deserialized = deserializeFeatures(new ReadStream(Converter.hexToBytes(hex)));
        expect(deserialized.length).toEqual(2);
        expect(deserialized[0].type).toEqual(0);
        const fb0 = deserialized[0] as ISenderFeature;
        expect(fb0.address.type).toEqual(0);
        expect((fb0.address as IEd25519Address).pubKeyHash).toEqual("0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");

        expect(deserialized[1].type).toEqual(1);
        const fb1 = deserialized[1] as IIssuerFeature;
        expect(fb1.address.type).toEqual(0);
        expect((fb1.address as IEd25519Address).pubKeyHash).toEqual("0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92");
    });
});
