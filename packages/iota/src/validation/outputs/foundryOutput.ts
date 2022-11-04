// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import bigInt from "big-integer";
import { IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE } from "../../index-browser";
import type { INodeInfoProtocol } from "../../models/info/INodeInfoProtocol";
import { FOUNDRY_OUTPUT_TYPE, IFoundryOutput } from "../../models/outputs/IFoundryOutput";
import { validateFeatures } from "../features/features";
import { validateNativeTokens } from "../nativeTokens";
import { IValidationResult, mergeValidationResults } from "../result";
import { validateUnlockConditions } from "../unlockConditions/unlockConditions";

// Maximum number of unlock conditions that foundry output can have.
const MAX_FOUNDRY_UNLOCK_CONDITIONS_COUNT = 1;

/**
 * Validate a foundry output.
 * @param foundryOutput The object to validate.
 * @param protocolInfo The Protocol Info.
 * @returns The validation result.
 */
 export function validateFoundryOutput(foundryOutput: IFoundryOutput, protocolInfo: INodeInfoProtocol): IValidationResult {
    const results: IValidationResult[] = [];

    if (foundryOutput.type !== FOUNDRY_OUTPUT_TYPE) {
        results.push({
            isValid: false,
            errors: [`Type mismatch in foundry output ${foundryOutput.type}`]
        });
    }

    if (bigInt(foundryOutput.amount).compare(bigInt.zero) !== 1) {
        results.push({
            isValid: false,
            errors: ["Foundry output amount field must be larger than zero."]
        });
    }

    if (bigInt(foundryOutput.amount).compare(protocolInfo.tokenSupply) === 1) {
        results.push({
            isValid: false,
            errors: ["Foundry output amount field must not be larger than max token supply."]
        });
    }
    
    if (foundryOutput.nativeTokens) {
        results.push(validateNativeTokens(foundryOutput.nativeTokens));
    }

    if (!foundryOutput.unlockConditions || foundryOutput.unlockConditions.length !== MAX_FOUNDRY_UNLOCK_CONDITIONS_COUNT) {
        results.push({
            isValid: false,
            errors: [`Foundry output unlock conditions count must be equal to ${MAX_FOUNDRY_UNLOCK_CONDITIONS_COUNT}.`]
        });
    } else {
        if (foundryOutput.unlockConditions[0].type !== IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE) {
            results.push({
                isValid: false,
                errors: ["Foundry output Immutable Alias Address Unlock Condition must be present."]
            });
        } else {
            results.push(validateUnlockConditions(foundryOutput.unlockConditions));
        } 
    }

    if (foundryOutput.features) {
        results.push(validateFeatures(foundryOutput.features));
    }

    if (foundryOutput.immutableFeatures) {
        results.push(validateFeatures(foundryOutput.immutableFeatures));
    }

    // validateTokenScheme

    return mergeValidationResults(...results);
}