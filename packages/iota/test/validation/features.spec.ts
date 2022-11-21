// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { ED25519_ADDRESS_TYPE } from "../../src/models/addresses/IEd25519Address";
import type { FeatureTypes } from "../../src/models/features/featureTypes";
import { IIssuerFeature, ISSUER_FEATURE_TYPE } from "../../src/models/features/IIssuerFeature";
import { IMetadataFeature, METADATA_FEATURE_TYPE } from "../../src/models/features/IMetadataFeature";
import { ISenderFeature, SENDER_FEATURE_TYPE } from "../../src/models/features/ISenderFeature";
import { ITagFeature, TAG_FEATURE_TYPE } from "../../src/models/features/ITagFeature";
import { validateFeature, validateFeatures } from "../../src/validation/features/features";

describe("Feature validation", () => {
    test("should pass with valid features", () => {
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

        expect(() => validateFeatures(features)).not.toThrowError();
    });

    test("should fail with invalid sender feature", () => {
        const feature: ISenderFeature =
            {
                type: SENDER_FEATURE_TYPE,
                address: {
                    type: ED25519_ADDRESS_TYPE,
                    pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7cb78198147d5f1f92"
                }
            };

        expect(() => validateFeature(feature)).toThrow("Ed25519 Address must have 66 characters.");
    });

    test("should fail with invalid issuer feature", () => {
        const feature: IIssuerFeature =
            {
                type: ISSUER_FEATURE_TYPE,
                address: {
                    type: ED25519_ADDRESS_TYPE,
                    pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb93af80f74c7c3db78198147d5f1f92"
                }
            };

        expect(() => validateFeature(feature)).toThrow("Ed25519 Address must have 66 characters.");
    });

    test("should fail when metadata feature data field equal to zero", () => {
        const feature: IMetadataFeature =
            {
                type: METADATA_FEATURE_TYPE,
                data: ""
            };

        expect(() => validateFeature(feature)).toThrow("Metadata feature data field must be greater than zero.");
    });

    test("should fail when  metadata feature data field length is greater than Max Metadata Length", () => {
        const data = "0".repeat(2 * 8194);
        const feature: IMetadataFeature =
            {
                type: METADATA_FEATURE_TYPE,
                data: "0x".concat(data)
            };

        expect(() => validateFeature(feature)).toThrow("Metadata length must not be greater than Max Metadata Length.");
    });

    test("should fail when tag feature tag field equal to zero", () => {
        const feature: ITagFeature =
        {
            type: TAG_FEATURE_TYPE,
            tag: ""
        };

        expect(() => validateFeature(feature)).toThrow("Tag feature tag field must be greater than zero.");
    });

    test("should fail when tag feature tag field length greater than Max Tag Length", () => {
        const tag = "0".repeat(2 * 66);
        const feature: ITagFeature =
            {
                type: TAG_FEATURE_TYPE,
                tag: "0x".concat(tag)
            };

        expect(() => validateFeature(feature)).toThrow("Tag length must not be greater than Max Tag Length.");
    });
});

