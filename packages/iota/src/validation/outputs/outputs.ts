// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import bigInt from "big-integer";
import type { INodeInfoProtocol } from "../../models/info/INodeInfoProtocol";
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
import { validateAliasOutput } from "./aliasOutput";
import { validateNftOutput } from "./nftOutput";

/**
 * Maximum number of features that a basic output could have.
 */
const MAX_BASIC_FEATURES_COUNT = 3;

/**
 * Validate outputs.
 * @param outputs The outputs to validate.
 * @param protocolInfo The Protocol Info.
 * @returns The validation result.
 */
export function validateOutputs(outputs: OutputTypes[], protocolInfo: INodeInfoProtocol): IValidationResult {
    const results: IValidationResult[] = [];

    for (const output of outputs) {
        results.push(
            validateOutput(output, protocolInfo)
        );
    }

    return mergeValidationResults(...results);
}

/**
 * Validate an output entry point.
 * @param output The output to validate.
 * @param protocolInfo The Protocol Info.
 * @returns The validation result.
 */
export function validateOutput(output: OutputTypes, protocolInfo: INodeInfoProtocol): IValidationResult {
    let result: IValidationResult = { isValid: true };

    switch (output.type) {
        case TREASURY_OUTPUT_TYPE:
            // Unimplemented
            break;
        case BASIC_OUTPUT_TYPE:
            result = validateBasicOutput(output, protocolInfo);
            break;
        case FOUNDRY_OUTPUT_TYPE:
            // Unimplemented
            break;
        case NFT_OUTPUT_TYPE:
            result = validateNftOutput(output, protocolInfo);
            break;
        case ALIAS_OUTPUT_TYPE:
            result = validateAliasOutput(output, protocolInfo);
            break;
        default:
            throw new Error(`Unrecognized output type ${(output as ITypeBase<number>).type}`);
    }

    return result;
}

/**
 * Validate a basic output.
 * @param basicOutput The output to validate.
 * @param protocolInfo The Protocol Info.
 * @returns The validation result.
 */
export function validateBasicOutput(basicOutput: IBasicOutput, protocolInfo: INodeInfoProtocol): IValidationResult {
    const results: IValidationResult[] = [];

    if (basicOutput.type !== BASIC_OUTPUT_TYPE) {
        results.push({
            isValid: false,
            errors: [`Type mismatch in basic output ${basicOutput.type}`]
        });
    }

    if (bigInt(basicOutput.amount).compare(bigInt.zero) !== 1) {
        results.push({
            isValid: false,
            errors: ["Basic output amount field must be larger than zero."]
        });
    }

    if (bigInt(basicOutput.amount).compare(protocolInfo.tokenSupply) === 1) {
        results.push({
            isValid: false,
            errors: ["Basic output amount field must not be larger than max token supply."]
        });
    }

    if (basicOutput.unlockConditions) {
        if (!basicOutput.unlockConditions.some(uC => uC.type === ADDRESS_UNLOCK_CONDITION_TYPE)) {
            results.push({
                isValid: false,
                errors: ["Address Unlock Condition must be present."]
            });
        }

        results.push(validateUnlockConditions(
            basicOutput.unlockConditions,
            basicOutput.amount,
            protocolInfo.rentStructure
        ));
    }

    if (basicOutput.nativeTokens) {
        results.push(validateNativeTokens(basicOutput.nativeTokens));
    }

    if (basicOutput.features) {
        results.push(validateFeatures(basicOutput.features, MAX_BASIC_FEATURES_COUNT));
    }

    return mergeValidationResults(...results);
}
