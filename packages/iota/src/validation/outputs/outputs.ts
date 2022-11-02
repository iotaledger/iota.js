// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import bigInt from "big-integer";
import type { INodeInfoProtocol } from "../../index-browser";
import { ALIAS_ADDRESS_TYPE } from "../../models/addresses/IAliasAddress";
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

// zero alias id.
const ZERO_ALIAS_ID = "0x0000000000000000000000000000000000000000000000000000000000000000";

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
            result = validateAliasOutput(object, protocolInfo);
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
    const maxFeaturesCount = 3;

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
        results.push(validateFeatures(object.features, maxFeaturesCount));
    }

    return mergeValidationResults(...results);
}

/**
 * Validate an alias output.
 * @param object The object to validate.
 * @param protocolInfo The Protocol Info.
 * @returns The validation result.
 */
export function validateAliasOutput(object: IAliasOutput, protocolInfo: INodeInfoProtocol): IValidationResult {
    const results: IValidationResult[] = [];
    const maxFeaturesCount = 2;

    if (object.type !== ALIAS_OUTPUT_TYPE) {
        results.push({
            isValid: false,
            errors: [`Type mismatch in alias output ${object.type}`]
        });
    }

    if (bigInt(object.amount).compare(bigInt.zero) !== 1) {
        results.push({
            isValid: false,
            errors: ["Alias output amount field must be larger than zero."]
        });
    }

    if (bigInt(object.amount).compare(protocolInfo.tokenSupply) === 1) {
        results.push({
            isValid: false,
            errors: ["Alias output amount field must not be larger than max token supply."]
        });
    }

    if (object.unlockConditions.length !== 2) {
        results.push({
            isValid: false,
            errors: ["Unlock conditions count must be equal to 2."]
        });
    }

    if (object.unlockConditions) {
        if (!object.unlockConditions.some(uC =>
            uC.type === STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE ||
            uC.type === GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE
        )) {
            results.push({
                isValid: false,
                errors: ["State controller address unlock condition or Governor address unlock condition must be present."]
            });
        }

        object.unlockConditions.map(unlockCondiiton => {
            if ((unlockCondiiton.type === STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE ||
                unlockCondiiton.type === GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE) &&
                (unlockCondiiton.address.type === ALIAS_ADDRESS_TYPE &&
                    unlockCondiiton.address.aliasId === object.aliasId)) {
                results.push({
                    isValid: false,
                    errors: ["Address of State controller address unlock condition and address of Governor address unlock condition must be different from the Alias address derived from alias id."]
                });
            }
        });

        results.push(validateUnlockConditions(object.unlockConditions, object.amount, protocolInfo.rentStructure));
    }

    if (object.nativeTokens) {
        results.push(validateNativeTokens(object.nativeTokens));
    }

    if (object.features) {
        results.push(validateFeatures(object.features, maxFeaturesCount));
    }

    if (object.immutableFeatures) {
        results.push(validateFeatures(object.immutableFeatures, maxFeaturesCount));
    }

    if (object.aliasId === ZERO_ALIAS_ID && (object.stateIndex !== 0 || object.foundryCounter !== 0)) {
        results.push({
            isValid: false,
            errors: ["State index and foundry counter must be zero."]
        });
    }

    if (object.stateMetadata && (object.stateMetadata.length / 2) > MAX_METADATA_LENGTH) {
        results.push({
            isValid: false,
            errors: ["Length of state metadata must not be greater than max metadata length."]
        });
    }

    return mergeValidationResults(...results);
}
