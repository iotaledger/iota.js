// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { INodeInfoProtocol } from "../../models/info/INodeInfoProtocol";
import type { ITypeBase } from "../../models/ITypeBase";
import { ALIAS_OUTPUT_TYPE } from "../../models/outputs/IAliasOutput";
import { BASIC_OUTPUT_TYPE } from "../../models/outputs/IBasicOutput";
import { FOUNDRY_OUTPUT_TYPE } from "../../models/outputs/IFoundryOutput";
import { NFT_OUTPUT_TYPE } from "../../models/outputs/INftOutput";
import { TREASURY_OUTPUT_TYPE } from "../../models/outputs/ITreasuryOutput";
import type { OutputTypes } from "../../models/outputs/outputTypes";
import { IValidationResult, mergeValidationResults } from "../result";
import { validateAliasOutput } from "./aliasOutput";
import { validateBasicOutput } from "./basicOutput";
import { validateFoundryOutput } from "./foundryOutput";
import { validateNftOutput } from "./nftOutput";

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
            result = validateFoundryOutput(output, protocolInfo);
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
