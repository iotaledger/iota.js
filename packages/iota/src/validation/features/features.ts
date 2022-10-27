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
import { ValidationHelper } from "../../utils/validationHelper";
import { validateAddress } from "../addresses/addresses";
import { IValidationResult, mergeValidationResults, failValidation } from "../result";

/**
 * The maximum length of a metadata binary representation.
 */
export const MAX_METADATA_LENGTH: number = 8192;

/**
 * Validate output features.
 * @param object The object to validate.
 * @returns The validation result.
 */
// Each output must not contain more than one feature of
// each type and not all feature types are supported for each output type.
export function validateFeatures(object: FeatureTypes[]): IValidationResult {
    const results: IValidationResult[] = [];

    if (object.length > 4) {
        results.push({
            isValid: false,
            errors: ["Max number of features exceeded."]
        });
    }

    results.push(ValidationHelper.validateDistinct(object.map(feature => feature.type), "Output", "feature"));

    for (const feature of object) {
        results.push(
            validateFeature(feature)
        );
    }

    return mergeValidationResults(...results);
}

/**
 * Validate output feature.
 * @param object The object to validate.
 * @returns The validation result.
 */
export function validateFeature(object: FeatureTypes): IValidationResult {
    let result: IValidationResult = { isValid: true };

    switch (object.type) {
        case SENDER_FEATURE_TYPE:
            result = validateAddress(object.address);
            break;
        case ISSUER_FEATURE_TYPE:
            result = validateAddress(object.address);
            break;
        case METADATA_FEATURE_TYPE:
            result = validateMetadataFeature(object);
            break;
        case TAG_FEATURE_TYPE:
            result = validateTagFeature(object);
            break;
        default:
            throw new Error(`Unrecognized Feature type ${(object as ITypeBase<number>).type}`);
    }

    return result;
}

/**
 * Validate metadata feature.
 * @param object The object to validate.
 * @returns The validation result.
 */
function validateMetadataFeature(object: IMetadataFeature): IValidationResult {
    let result: IValidationResult = { isValid: true };

    if (object.data.length === 0) {
        result = failValidation(result, "Metadata must have a value bigger than zero.");
    }

    const data = HexHelper.stripPrefix(object.data);
    if ((data.length / 2) > MAX_METADATA_LENGTH) {
        result = failValidation(result, "Max metadata length exceeded.");
    }

    return result;
}

/**
 * Validate tag feature.
 * @param object The object to validate.
 * @returns The validation result.
 */
function validateTagFeature(object: ITagFeature): IValidationResult {
    let result: IValidationResult = { isValid: true };

    if (object.tag.length === 0) {
        result = failValidation(result, "Tag must have a value bigger than zero.");
    }

    if ((object.tag.length / 2) > MAX_TAG_LENGTH) {
        result = failValidation(result, "Max tag length exceeded.");
    }

    return result;
}
