// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { INodeInfoProtocol } from "../../models/info/INodeInfoProtocol";
import { MAX_OUTPUT_COUNT, MIN_OUTPUT_COUNT } from "../../binary/outputs/outputs";
import type { ITypeBase } from "../../models/ITypeBase";
import { ALIAS_OUTPUT_TYPE } from "../../models/outputs/IAliasOutput";
import { BASIC_OUTPUT_TYPE } from "../../models/outputs/IBasicOutput";
import { FOUNDRY_OUTPUT_TYPE } from "../../models/outputs/IFoundryOutput";
import { NFT_OUTPUT_TYPE } from "../../models/outputs/INftOutput";
import { TREASURY_OUTPUT_TYPE } from "../../models/outputs/ITreasuryOutput";
import type { OutputTypes } from "../../models/outputs/outputTypes";
import { IValidationResult, mergeValidationResults, failValidation } from "../result";
import { validateAliasOutput } from "./aliasOutput";
import { validateBasicOutput } from "./basicOutput";
import { validateFoundryOutput } from "./foundryOutput";
import { validateNftOutput } from "./nftOutput";
import { MAX_NATIVE_TOKEN_COUNT } from "../../binary/nativeTokens";

/**
 * Maximum number of iota supply.
 */
const MAX_IOTA_SUPPLY = 1450896407249092;

/**
 * Validate outputs.
 * @param outputs The outputs to validate.
 * @param protocolInfo The Protocol Info.
 * @returns The validation result.
 */
export function validateOutputs(outputs: OutputTypes[], protocolInfo: INodeInfoProtocol): IValidationResult {
    const results: IValidationResult[] = [];
    let totalAmount: number = 0;
    let nativeTokenCount: number = 0;

    if (outputs.length < MIN_OUTPUT_COUNT || outputs.length > MAX_OUTPUT_COUNT) {
        results.push({
            isValid: false,
            errors: [`Outputs count must be between ${MIN_OUTPUT_COUNT} and ${MAX_OUTPUT_COUNT}.`]
        });
    }

    for (const output of outputs) {
        totalAmount = totalAmount + Number(output.amount);
        if (output.type !== TREASURY_OUTPUT_TYPE && output.nativeTokens) {
            const tokenIds = output.nativeTokens.map(token => token.id);
            const distinctIds = new Set<string>(tokenIds as string[]);
            nativeTokenCount = nativeTokenCount + distinctIds.size;
        }

        results.push(
            validateOutput(output, protocolInfo)
        );
    }

    if (totalAmount > MAX_IOTA_SUPPLY) {
        results.push({
            isValid: false,
            errors: [`The sum of all outputs amount field must be less then ${MAX_IOTA_SUPPLY}.`]
        });
    }

    if (nativeTokenCount > MAX_NATIVE_TOKEN_COUNT) {
        results.push({
            isValid: false,
            errors: [`The count of all distinct native tokens present in outputs must be less then ${MAX_NATIVE_TOKEN_COUNT}.`]
        });
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
            result = failValidation(result, "Output Type must be one of the following: Basic, Alias, Foundry and NFT.");
            break;
        case BASIC_OUTPUT_TYPE:
            result = validateBasicOutput(output, protocolInfo);
            break;
        case FOUNDRY_OUTPUT_TYPE:
            result = validateFoundryOutput(output, protocolInfo);
            break;
        case NFT_OUTPUT_TYPE:
            result = validateNftOutput(output, protocolInfo);
            break;
        case ALIAS_OUTPUT_TYPE:
            result = validateAliasOutput(output, protocolInfo);
            break;
        default:
            result = failValidation(result, "Output Type must be one of the following: Basic, Alias, Foundry and NFT.");
            throw new Error(`Unrecognized output type ${(output as ITypeBase<number>).type}`);
    }

    return result;
}
