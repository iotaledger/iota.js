// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { MAX_NATIVE_TOKEN_COUNT } from "../../binary/nativeTokens";
import { MAX_OUTPUT_COUNT, MIN_OUTPUT_COUNT } from "../../binary/outputs/outputs";
import type { INodeInfoProtocol } from "../../models/info/INodeInfoProtocol";
import type { ITypeBase } from "../../models/ITypeBase";
import { ALIAS_OUTPUT_TYPE } from "../../models/outputs/IAliasOutput";
import { BASIC_OUTPUT_TYPE } from "../../models/outputs/IBasicOutput";
import { FOUNDRY_OUTPUT_TYPE } from "../../models/outputs/IFoundryOutput";
import { NFT_OUTPUT_TYPE } from "../../models/outputs/INftOutput";
import { TREASURY_OUTPUT_TYPE } from "../../models/outputs/ITreasuryOutput";
import type { OutputTypes } from "../../models/outputs/outputTypes";
import { failValidation } from "../result";
import { validateCount } from "../validationUtils";
import { validateAliasOutput } from "./aliasOutput";
import { validateBasicOutput } from "./basicOutput";
import { validateFoundryOutput } from "./foundryOutput";
import { validateNftOutput } from "./nftOutput";

/**
 * Validate outputs.
 * @param outputs The outputs to validate.
 * @param protocolInfo The Protocol Info.
 * @throws Error if the validation fails.
 */
export function validateOutputs(outputs: OutputTypes[], protocolInfo: INodeInfoProtocol) {
    validateCount(outputs.length, MIN_OUTPUT_COUNT, MAX_OUTPUT_COUNT, "Outputs");
    validateOutputsAmount(outputs, Number(protocolInfo.tokenSupply));
    validateNativeTokensCount(outputs);

    for (const output of outputs) {
        validateOutput(output, protocolInfo);
    }
}

/**
 * Validate an output entry point.
 * @param output The output to validate.
 * @param protocolInfo The Protocol Info.
 * @throws Error if the validation fails.
 */
export function validateOutput(output: OutputTypes, protocolInfo: INodeInfoProtocol) {
    switch (output.type) {
        case TREASURY_OUTPUT_TYPE:
            failValidation("Output Type must be one of the following: Basic, Alias, Foundry and NFT.");
            break;
        case BASIC_OUTPUT_TYPE:
            validateBasicOutput(output, protocolInfo);
            break;
        case ALIAS_OUTPUT_TYPE:
            validateAliasOutput(output, protocolInfo);
            break;
        case FOUNDRY_OUTPUT_TYPE:
            validateFoundryOutput(output, protocolInfo);
            break;
        case NFT_OUTPUT_TYPE:
            validateNftOutput(output, protocolInfo);
            break;
        default:
            failValidation(`Unrecognized output type ${(output as ITypeBase<number>).type}`);
    }
}

/**
 * Validate the outputs amount.
 * @param outputs The outputs to validate.
 * @param tokenSupply The tokken supply amount.
 * @throws Error if the validation fails.
 */
function validateOutputsAmount(outputs: OutputTypes[], tokenSupply: number) {
    let totalAmount: number = 0;

    for (const output of outputs) {
        totalAmount += Number(output.amount);
    }

    if (totalAmount > tokenSupply) {
        failValidation(`The sum of all outputs amount field must be less then ${tokenSupply}.`);
    }
}

/**
 * Validate the native tokens count.
 * @param outputs The outputs to validate.
 * @throws Error if the validation fails.
 */
function validateNativeTokensCount(outputs: OutputTypes[]) {
    let nativeTokenCount: number = 0;

    for (const output of outputs) {
        if (output.type !== TREASURY_OUTPUT_TYPE && output.nativeTokens) {
            const tokenIds = output.nativeTokens.map(token => token.id);
            const distinctIds = new Set<string>(tokenIds);
            nativeTokenCount += distinctIds.size;
        }
    }

    if (nativeTokenCount > MAX_NATIVE_TOKEN_COUNT) {
        failValidation(`The count of all distinct native tokens present in outputs must be less then ${MAX_NATIVE_TOKEN_COUNT}.`);
    }
}
