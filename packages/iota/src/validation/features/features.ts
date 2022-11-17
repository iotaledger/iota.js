// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { HexHelper } from "@iota/util.js";
import { MAX_TAG_LENGTH } from "../../binary/payloads/taggedDataPayload";
import type { FeatureTypes } from "../../models/features/featureTypes";
import { ISSUER_FEATURE_TYPE } from "../../models/features/IIssuerFeature";
import { IMetadataFeature, METADATA_FEATURE_TYPE } from "../../models/features/IMetadataFeature";
import { SENDER_FEATURE_TYPE } from "../../models/features/ISenderFeature";
import { ITagFeature, TAG_FEATURE_TYPE } from "../../models/features/ITagFeature";
import type { ITypeBase } from "../../models/ITypeBase";
import { validateAddress } from "../addresses/addresses";
import { failValidation } from "../result";
import { validateAscendingOrder, validateDistinct } from "../validationUtils";

/**
 * The maximum length of a metadata binary representation.
 */
export const MAX_METADATA_LENGTH: number = 8192;

/**
 * Validate output features.
 * @param features The Features to validate.
 * @throws Error if the validation fails.
 */
export function validateFeatures(features?: FeatureTypes[]) {
    if (features) {
        validateDistinct(features.map(feature => feature.type), "Output", "feature");

        validateAscendingOrder(features, "Output", "Feature");

        for (const feature of features) {
            validateFeature(feature);
        }
    }
}

/**
 * Validate output feature.
 * @param feature The Feature to validate.
 * @throws Error if the validation fails.
 */
export function validateFeature(feature: FeatureTypes) {
    switch (feature.type) {
        case SENDER_FEATURE_TYPE:
            validateAddress(feature.address);
            break;
        case ISSUER_FEATURE_TYPE:
            validateAddress(feature.address);
            break;
        case METADATA_FEATURE_TYPE:
            validateMetadataFeature(feature);
            break;
        case TAG_FEATURE_TYPE:
            validateTagFeature(feature);
            break;
        default:
            failValidation(`Unrecognized Feature type ${(feature as ITypeBase<number>).type}`);
    }
}

/**
 * Validate metadata feature.
 * @param metadataFeature The Metadata Feature to validate.
 * @throws Error if the validation fails.
 */
function validateMetadataFeature(metadataFeature: IMetadataFeature) {
    if (metadataFeature.data.length === 0) {
        failValidation("Metadata feature data field must be larger than zero.");
    }

    const data = HexHelper.stripPrefix(metadataFeature.data);
    if ((data.length / 2) > MAX_METADATA_LENGTH) {
        failValidation("Metadata length must not be larger than max metadata length.");
    }
}

/**
 * Validate tag feature.
 * @param tagFeature The Tag Feature to validate.
 * @throws Error if the validation fails.
 */
function validateTagFeature(tagFeature: ITagFeature) {
    if (tagFeature.tag.length === 0) {
        failValidation("Tag feature tag field must be larger than zero.");
    }

    if ((tagFeature.tag.length / 2) > MAX_TAG_LENGTH) {
        failValidation("Tag length must not be larger than max tag length.");
    }
}
