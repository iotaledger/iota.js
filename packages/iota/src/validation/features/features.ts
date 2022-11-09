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
import { IValidationResult, mergeValidationResults, failValidation } from "../result";
import { validateAscendingOrder, validateDistinct } from "../validationUtils";

/**
 * The maximum length of a metadata binary representation.
 */
export const MAX_METADATA_LENGTH: number = 8192;

/**
 * Validate output features.
 * @param features The Features to validate.
 * @param maxFeaturesCount Maximum number of features.
 * @returns The validation result.
 */
export function validateFeatures(features?: FeatureTypes[]): IValidationResult {
    const results: IValidationResult[] = [];

    if (features) {
        results.push(
            validateDistinct(features.map(feature => feature.type), "Output", "feature")
        );
    
        results.push(validateAscendingOrder(features, "Output", "Feature"));
    
        for (const feature of features) {
            results.push(
                validateFeature(feature)
            );
        }
    }

    return mergeValidationResults(...results);
}

/**
 * Validate output feature.
 * @param feature The Feature to validate.
 * @returns The validation result.
 */
export function validateFeature(feature: FeatureTypes): IValidationResult {
    let result: IValidationResult = { isValid: true };

    switch (feature.type) {
        case SENDER_FEATURE_TYPE:
            result = validateAddress(feature.address);
            break;
        case ISSUER_FEATURE_TYPE:
            result = validateAddress(feature.address);
            break;
        case METADATA_FEATURE_TYPE:
            result = validateMetadataFeature(feature);
            break;
        case TAG_FEATURE_TYPE:
            result = validateTagFeature(feature);
            break;
        default:
            throw new Error(`Unrecognized Feature type ${(feature as ITypeBase<number>).type}`);
    }

    return result;
}

/**
 * Validate metadata feature.
 * @param metadataFeature The Metadata Feature to validate.
 * @returns The validation result.
 */
function validateMetadataFeature(metadataFeature: IMetadataFeature): IValidationResult {
    let result: IValidationResult = { isValid: true };

    if (metadataFeature.data.length === 0) {
        result = failValidation(result, "Metadata must have a value bigger than zero.");
    }

    const data = HexHelper.stripPrefix(metadataFeature.data);
    if ((data.length / 2) > MAX_METADATA_LENGTH) {
        result = failValidation(result, "Max metadata length exceeded.");
    }

    return result;
}

/**
 * Validate tag feature.
 * @param tagFeature The Tag Feature to validate.
 * @returns The validation result.
 */
function validateTagFeature(tagFeature: ITagFeature): IValidationResult {
    let result: IValidationResult = { isValid: true };

    if (tagFeature.tag.length === 0) {
        result = failValidation(result, "Tag must have a value bigger than zero.");
    }

    if ((tagFeature.tag.length / 2) > MAX_TAG_LENGTH) {
        result = failValidation(result, "Max tag length exceeded.");
    }

    return result;
}

