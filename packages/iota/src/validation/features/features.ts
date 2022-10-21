// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { HexHelper } from "@iota/util.js";
import { MAX_TAG_LENGTH } from "../../binary/payloads/taggedDataPayload";
import type { FeatureTypes } from "../../models/features/featureTypes";
import { IIssuerFeature, ISSUER_FEATURE_TYPE } from "../../models/features/IIssuerFeature";
import { IMetadataFeature, METADATA_FEATURE_TYPE } from "../../models/features/IMetadataFeature";
import { ISenderFeature, SENDER_FEATURE_TYPE } from "../../models/features/ISenderFeature";
import { ITagFeature, TAG_FEATURE_TYPE } from "../../models/features/ITagFeature";
import type { ITypeBase } from "../../models/ITypeBase";
import { validateAddress } from "../addresses/addresses";
import { IValidationResult, mergeValidationResults } from "../result";

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

    const distinctFeatureTypes = new Set(object.map(feature => feature.type));
    if (distinctFeatureTypes.size !== object.length) {
        results.push({
            isValid: false,
            errors: ["Output must not contain more than one feature of each type."]
        });
    }

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
            result = validateSenderFeatures(object);
            break;
        case ISSUER_FEATURE_TYPE:
            result = validateIssuerFeatures(object);
            break;
        case METADATA_FEATURE_TYPE:
            result = validateMetadataFeatures(object);
            break;
        case TAG_FEATURE_TYPE:
            result = validateTagFeatures(object);
            break;
        default:
            throw new Error(`Unrecognized Feature type ${(object as ITypeBase<number>).type}`);
    }

    return result;
}

/**
 * Validate sender feature.
 * @param object The object to validate.
 * @returns The validation result.
 */
export function validateSenderFeatures(object: ISenderFeature): IValidationResult {
    const result: IValidationResult = { isValid: true };
    const errors: string[] = [];

    if (object.type !== SENDER_FEATURE_TYPE) {
        errors.push(`Type mismatch in sender feature ${object.type}`);
    }

    if (errors.length > 0) {
        result.isValid = false;
        result.errors = errors;
    }

    const validateAddresssResult = validateAddress(object.address);

    return mergeValidationResults(result, validateAddresssResult);
}

/**
 * Validate issuer feature.
 * @param object The object to validate.
 * @returns The validation result.
 */
export function validateIssuerFeatures(object: IIssuerFeature): IValidationResult {
    const result: IValidationResult = { isValid: true };
    const errors: string[] = [];

    if (object.type !== ISSUER_FEATURE_TYPE) {
        errors.push(`Type mismatch in issuer feature ${object.type}`);
    }

    if (errors.length > 0) {
        result.isValid = false;
        result.errors = errors;
    }

    const validateAddresssResult = validateAddress(object.address);

    return mergeValidationResults(result, validateAddresssResult);
}

/**
 * Validate metadata feature.
 * @param object The object to validate.
 * @returns The validation result.
 */
export function validateMetadataFeatures(object: IMetadataFeature): IValidationResult {
    const result: IValidationResult = { isValid: true };
    const errors: string[] = [];

    if (object.type !== METADATA_FEATURE_TYPE) {
        errors.push(`Type mismatch in metadata feature ${object.type}`);
    }

    if (object.data.length === 0) {
        errors.push("Metadata must have a value bigger than zero.");
    }

    const data = HexHelper.stripPrefix(object.data);
    if ((data.length / 2) > MAX_METADATA_LENGTH) {
        errors.push("Max metadata length exceeded.");
    }

    if (errors.length > 0) {
        result.isValid = false;
        result.errors = errors;
    }

    return result;
}

/**
 * Validate tag feature.
 * @param object The object to validate.
 * @returns The validation result.
 */
export function validateTagFeatures(object: ITagFeature): IValidationResult {
    const result: IValidationResult = { isValid: true };
    const errors: string[] = [];

    if (object.type !== TAG_FEATURE_TYPE) {
        errors.push(`Type mismatch in tag feature ${object.type}`);
    }

    if (object.tag.length === 0) {
        errors.push("Tag must have a value bigger than zero.");
    }

    if ((object.tag.length / 2) > MAX_TAG_LENGTH) {
        errors.push("Max tag length exceeded.");
    }

    if (errors.length > 0) {
        result.isValid = false;
        result.errors = errors;
    }

    return result;
}
