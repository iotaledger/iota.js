// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { ITypeBase } from "../../models/ITypeBase";
import { ALIAS_OUTPUT_TYPE } from "../../models/outputs/IAliasOutput";
import { BASIC_OUTPUT_TYPE, IBasicOutput } from "../../models/outputs/IBasicOutput";
import { FOUNDRY_OUTPUT_TYPE } from "../../models/outputs/IFoundryOutput";
import { NFT_OUTPUT_TYPE } from "../../models/outputs/INftOutput";
import { TREASURY_OUTPUT_TYPE } from "../../models/outputs/ITreasuryOutput";
import type { OutputTypes } from "../../models/outputs/outputTypes";
import { validateFeatures } from "../features/features";
import { validateNativeTokens } from "../nativeTokens";
import { IValidationResult, mergeValidationResults } from "../result";
import { validateUnlockConditions } from "../unlockConditions/unlockConditions";

/**
 * Validate outputs.
 * @param object The object to validate.
 * @returns The validation result.
 */
export function validateOutputs(object: OutputTypes[]): IValidationResult {
    const results: IValidationResult[] = [];

    for (const output of object) {
        results.push(
            validateOutput(output)
        );
    }

    return mergeValidationResults(...results);
}

/**
 * Validate an output entry point.
 * @param object The object to validate.
 * @returns The validation result.
 */
export function validateOutput(object: OutputTypes): IValidationResult {
    let result: IValidationResult = { isValid: true };

    switch (object.type) {
        case TREASURY_OUTPUT_TYPE:
            // Unimplemented
            break;
        case BASIC_OUTPUT_TYPE:
            result = validateBasicOutput(object);
            break;
        case FOUNDRY_OUTPUT_TYPE:
            // Unimplemented
            break;
        case NFT_OUTPUT_TYPE:
            // Unimplemented
            break;
        case ALIAS_OUTPUT_TYPE:
            // Unimplemented
            break;
        default:
            throw new Error(`Unrecognized output type ${(object as ITypeBase<number>).type}`);
    }

    return result;
}

/**
 * Validate a basic output.
 * @param object The object to validate.
 * @returns The validation result.
 */
export function validateBasicOutput(object: IBasicOutput): IValidationResult {
    const results: IValidationResult[] = [];

    // eslint-disable-next-line no-warning-comments
    // TODO More validation here

    results.push(validateNativeTokens(object.nativeTokens));
    results.push(validateUnlockConditions(object.unlockConditions));
    results.push(validateFeatures(object.features));

    return mergeValidationResults(...results);
}

