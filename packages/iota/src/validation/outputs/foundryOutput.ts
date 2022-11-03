// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import bigInt from "big-integer";
import type { INodeInfoProtocol } from "../../models/info/INodeInfoProtocol";
import { FOUNDRY_OUTPUT_TYPE, IFoundryOutput } from "../../models/outputs/IFoundryOutput";
import { validateFeatures } from "../features/features";
import { validateNativeTokens } from "../nativeTokens";
import { IValidationResult, mergeValidationResults } from "../result";
import { validateUnlockConditions } from "../unlockConditions/unlockConditions";

/**
 * Validate a basic output.
 * @param object The object to validate.
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

    if (foundryOutput.unlockConditions) {
        // if (!foundryOutput.unlockConditions.some(uC => uC.type === ADDRESS_UNLOCK_CONDITION_TYPE)) {
        //     results.push({
        //         isValid: false,
        //         errors: ["Address Unlock Condition must be present."]
        //     });
        // }
        results.push(validateUnlockConditions(foundryOutput.unlockConditions, foundryOutput.amount, protocolInfo.rentStructure));
    }

    if (foundryOutput.features) {
        results.push(validateFeatures(foundryOutput.features));
    }

    return mergeValidationResults(...results);
}