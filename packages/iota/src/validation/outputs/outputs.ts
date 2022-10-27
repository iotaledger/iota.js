// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import bigInt from "big-integer";
import type { INodeInfoProtocol } from "../../index-browser";
import type { ITypeBase } from "../../models/ITypeBase";
import { ALIAS_OUTPUT_TYPE } from "../../models/outputs/IAliasOutput";
import { BASIC_OUTPUT_TYPE, IBasicOutput } from "../../models/outputs/IBasicOutput";
import { FOUNDRY_OUTPUT_TYPE } from "../../models/outputs/IFoundryOutput";
import { NFT_OUTPUT_TYPE } from "../../models/outputs/INftOutput";
import { TREASURY_OUTPUT_TYPE } from "../../models/outputs/ITreasuryOutput";
import type { OutputTypes } from "../../models/outputs/outputTypes";
import { ADDRESS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IAddressUnlockCondition";
import { validateFeatures } from "../features/features";
import { validateNativeTokens } from "../nativeTokens";
import { IValidationResult, mergeValidationResults } from "../result";
import { validateUnlockConditions } from "../unlockConditions/unlockConditions";

/**
 * Validate outputs.
 * @param object The object to validate.
 * @param protocolInfo The Protocol Info.
 * @returns The validation result.
 */
export function validateOutputs(object: OutputTypes[], protocolInfo: INodeInfoProtocol): IValidationResult {
    const results: IValidationResult[] = [];

    for (const output of object) {
        results.push(
            validateOutput(output, protocolInfo)
        );
    }

    return mergeValidationResults(...results);
}

/**
 * Validate an output entry point.
 * @param object The object to validate.
 * @param protocolInfo The Protocol Info.
 * @returns The validation result.
 */
export function validateOutput(object: OutputTypes, protocolInfo: INodeInfoProtocol): IValidationResult {
    let result: IValidationResult = { isValid: true };

    switch (object.type) {
        case TREASURY_OUTPUT_TYPE:
            // Unimplemented
            break;
        case BASIC_OUTPUT_TYPE:
            result = validateBasicOutput(object, protocolInfo);
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
 * @param protocolInfo The Protocol Info.
 * @returns The validation result.
 */
export function validateBasicOutput(object: IBasicOutput, protocolInfo: INodeInfoProtocol): IValidationResult {
    const results: IValidationResult[] = [];

    if (object.type !== BASIC_OUTPUT_TYPE) {
        results.push({
            isValid: false,
            errors: [`Type mismatch in basic output ${object.type}`]
        });
    }

    if (bigInt(object.amount).compare(bigInt.zero) !== 1) {
        results.push({
            isValid: false,
            errors: ["Basic output amount field must be larger than zero."]
        });
    }

    if (bigInt(object.amount).compare(protocolInfo.tokenSupply) === 1) {
        results.push({
            isValid: false,
            errors: ["Basic output amount field must not be larger than max token supply."]
        });
    }

    if (object.unlockConditions) {
        if (!object.unlockConditions.some(uC => uC.type === ADDRESS_UNLOCK_CONDITION_TYPE)) {
            results.push({
                isValid: false,
                errors: ["Address Unlock Condition must be present."]
            });
        }
        results.push(validateUnlockConditions(object.unlockConditions, object.amount, protocolInfo.rentStructure));
    }

    if (object.nativeTokens) {
        results.push(validateNativeTokens(object.nativeTokens));
    }

    if (object.features) {
        results.push(validateFeatures(object.features));
    }

    return mergeValidationResults(...results);
}

