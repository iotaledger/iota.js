// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { ED25519_ADDRESS_TYPE } from "../../src/models/addresses/IEd25519Address";
import type { FeatureTypes } from "../../src/models/features/featureTypes";
import { ISSUER_FEATURE_TYPE } from "../../src/models/features/IIssuerFeature";
import { METADATA_FEATURE_TYPE } from "../../src/models/features/IMetadataFeature";
import { SENDER_FEATURE_TYPE } from "../../src/models/features/ISenderFeature";
import { TAG_FEATURE_TYPE } from "../../src/models/features/ITagFeature";
import { validateFeatures } from "../../src/validation/features/features";

describe("Feature validation", () => {
    test("should pass with valid features", () => {
        const features: FeatureTypes [] = [
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
            },
            {
                type: METADATA_FEATURE_TYPE,
                data: "0x6920b176f613ec7be59e6847d5f1f92"
            },
            {
                type: TAG_FEATURE_TYPE,
                tag: "0x6920b176f613ec7be59e6847d5f1f92"
            }
        ];

        const result = validateFeatures(features);
        expect(result.isValid).toEqual(true);
    });

    test("should fail with invalidate features", () => {
        const features: FeatureTypes [] = [
            {
                type: SENDER_FEATURE_TYPE,
                address: {
                    type: ED25519_ADDRESS_TYPE,
                    pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7cb78198147d5f1f92"
                }
            },
            {
                type: ISSUER_FEATURE_TYPE,
                address: {
                    type: ED25519_ADDRESS_TYPE,
                    pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb93af80f74c7c3db78198147d5f1f92"
                }
            },
            {
                type: METADATA_FEATURE_TYPE,
                data: "0x6920b176f613ec7be59e6847d5f1f92"
            },
            {
                type: METADATA_FEATURE_TYPE,
                data: ""
            },
            {
                type: TAG_FEATURE_TYPE,
                tag: ""
            }
        ];

        const result = validateFeatures(features);
        expect(result.isValid).toEqual(false);
        expect(result.errors).toEqual(expect.arrayContaining([
            "Ed25519 Address must have 66 characters.",
            "Metadata must have a value bigger than zero.",
            "Tag must have a value bigger than zero.",
            "Output must not contain more than one feature of each type."
        ]));
    });
});
