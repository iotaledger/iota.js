// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import bigInt from "big-integer";
import { ALIAS_ADDRESS_TYPE } from "../../models/addresses/IAliasAddress";
import type { INodeInfoProtocol } from "../../models/info/INodeInfoProtocol";
import type { ITypeBase } from "../../models/ITypeBase";
import { ALIAS_OUTPUT_TYPE, IAliasOutput } from "../../models/outputs/IAliasOutput";
import { BASIC_OUTPUT_TYPE, IBasicOutput } from "../../models/outputs/IBasicOutput";
import { FOUNDRY_OUTPUT_TYPE } from "../../models/outputs/IFoundryOutput";
import { NFT_OUTPUT_TYPE } from "../../models/outputs/INftOutput";
import { TREASURY_OUTPUT_TYPE } from "../../models/outputs/ITreasuryOutput";
import type { OutputTypes } from "../../models/outputs/outputTypes";
import { ADDRESS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IAddressUnlockCondition";
import { GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IGovernorAddressUnlockCondition";
import { STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IStateControllerAddressUnlockCondition";
import { validateFeatures, MAX_METADATA_LENGTH } from "../features/features";
import { validateNativeTokens } from "../nativeTokens";
import { IValidationResult, mergeValidationResults } from "../result";
import { validateUnlockConditions } from "../unlockConditions/unlockConditions";
import { validateFoundryOutput } from "./foundryOutput";
import { validateNftOutput } from "./nftOutput";

/**
 * Zero alias id.
 */
const ZERO_ALIAS_ID = "0x0000000000000000000000000000000000000000000000000000000000000000";
/**
 * Maximum number of features that a basic output could have.
 */
const MAX_BASIC_FEATURES_COUNT = 3;
/**
 * Maximum number of features that alias output can have.
 */
const MAX_ALIAS_FEATURES_COUNT = 2;
/**
 * Maximum number of unlock conditions that alias output can have.
 */
const MAX_ALIAS_UNLOCK_CONDITIONS_COUNT = 2;

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

/**
 * Validate an alias output.
 * @param aliasOutput The object to validate.
 * @param protocolInfo The Protocol Info.
 * @returns The validation result.
 */
export function validateAliasOutput(aliasOutput: IAliasOutput, protocolInfo: INodeInfoProtocol): IValidationResult {
    const results: IValidationResult[] = [];

    if (aliasOutput.type !== ALIAS_OUTPUT_TYPE) {
        results.push({
            isValid: false,
            errors: [`Type mismatch in alias output ${aliasOutput.type}`]
        });
    }

    if (bigInt(aliasOutput.amount).compare(bigInt.zero) !== 1) {
        results.push({
            isValid: false,
            errors: ["Alias output amount field must be larger than zero."]
        });
    }

    if (bigInt(aliasOutput.amount).compare(protocolInfo.tokenSupply) === 1) {
        results.push({
            isValid: false,
            errors: ["Alias output amount field must not be larger than max token supply."]
        });
    }

    if (aliasOutput.unlockConditions.length !== MAX_ALIAS_UNLOCK_CONDITIONS_COUNT) {
        results.push({
            isValid: false,
            errors: [`Unlock conditions count must be equal to ${MAX_ALIAS_UNLOCK_CONDITIONS_COUNT}.`]
        });
    }

    if (aliasOutput.unlockConditions) {
        if (!aliasOutput.unlockConditions.some(uC => uC.type === STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE) ||
            !aliasOutput.unlockConditions.some(uC => uC.type === GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE)) {
            results.push({
                isValid: false,
                errors: ["Both state controller address unlock condition and Governor address unlock condition must be present."]
            });
        }

        aliasOutput.unlockConditions.map(unlockCondition => {
            if ((unlockCondition.type === STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE ||
                unlockCondition.type === GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE) &&
                (unlockCondition.address.type === ALIAS_ADDRESS_TYPE &&
                    unlockCondition.address.aliasId === aliasOutput.aliasId)) {
                results.push({
                    isValid: false,
                    errors: ["Address of State controller address unlock condition and address of Governor address unlock condition must be different from the Alias address derived from alias id."]
                });
            }
        });

        results.push(validateUnlockConditions(aliasOutput.unlockConditions));
    }

    if (aliasOutput.nativeTokens) {
        results.push(validateNativeTokens(aliasOutput.nativeTokens));
    }

    if (aliasOutput.features) {
        results.push(validateFeatures(aliasOutput.features, MAX_ALIAS_FEATURES_COUNT));
    }

    if (aliasOutput.immutableFeatures) {
        results.push(validateFeatures(aliasOutput.immutableFeatures, MAX_ALIAS_FEATURES_COUNT));
    }

    if (aliasOutput.aliasId === ZERO_ALIAS_ID && (aliasOutput.stateIndex !== 0 || aliasOutput.foundryCounter !== 0)) {
        results.push({
            isValid: false,
            errors: ["When Alias ID is zeroed out, State Index and Foundry Counter must be 0."]
        });
    }

    if (aliasOutput.stateMetadata && (aliasOutput.stateMetadata.length / 2) > MAX_METADATA_LENGTH) {
        results.push({
            isValid: false,
            errors: ["Length of state metadata must not be greater than max metadata length."]
        });
    }

    return mergeValidationResults(...results);
}

