// Copyright 2022 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { INodeInfoProtocol } from "../../models/info/INodeInfoProtocol";
import { BASIC_OUTPUT_TYPE, IBasicOutput } from "../../models/outputs/IBasicOutput";
import { ADDRESS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IAddressUnlockCondition";
import { validateFeatures } from "../features/features";
import { IValidationResult, mergeValidationResults } from "../result";
import { validateUnlockConditions } from "../unlockConditions/unlockConditions";
import { validateCommonRules } from "./common";

/**
 * Validate a basic output.
 * @param basicOutput The basic output to validate.
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

    results.push(validateCommonRules(basicOutput, protocolInfo));
 
    if (!basicOutput.unlockConditions.some(uC => uC.type === ADDRESS_UNLOCK_CONDITION_TYPE)) {
        results.push({
            isValid: false,
            errors: ["Basic output Unlock Conditions must define an Address Unlock Condition."]
        });
    } else {
        results.push(validateUnlockConditions(
            basicOutput.unlockConditions,
            basicOutput.amount,
            protocolInfo.rentStructure
        ));
    }

    results.push(validateFeatures(basicOutput.features));

   
    return mergeValidationResults(...results);
}
