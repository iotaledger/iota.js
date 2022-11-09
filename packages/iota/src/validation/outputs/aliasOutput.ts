// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import bigInt from "big-integer";
import { ALIAS_ADDRESS_TYPE } from "../../models/addresses/IAliasAddress";
import type { INodeInfoProtocol } from "../../models/info/INodeInfoProtocol";
import { ALIAS_OUTPUT_TYPE, IAliasOutput } from "../../models/outputs/IAliasOutput";
import { GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IGovernorAddressUnlockCondition";
import { STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IStateControllerAddressUnlockCondition";
import { validateFeatures, MAX_METADATA_LENGTH } from "../features/features";
import { validateNativeTokens } from "../nativeTokens";
import { IValidationResult, mergeValidationResults } from "../result";
import { validateUnlockConditions } from "../unlockConditions/unlockConditions";

/**
 * Zero alias id.
 */
const ZERO_ALIAS_ID = "0x0000000000000000000000000000000000000000000000000000000000000000";
/**
 * Maximum number of features that alias output can have.
 */
const MAX_ALIAS_FEATURES_COUNT = 2;
/**
 * Maximum number of unlock conditions that alias output can have.
 */
const MAX_ALIAS_UNLOCK_CONDITIONS_COUNT = 2;

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
                errors: ["Alias output unlock condition type of an unlock condition must define one of the following types: State Controller Address Unlock Condition and Governor Address Unlock Condition."]
            });
        }

        aliasOutput.unlockConditions.map(unlockCondition => {
            if ((unlockCondition.type === STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE ||
                unlockCondition.type === GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE) &&
                (unlockCondition.address.type === ALIAS_ADDRESS_TYPE &&
                    unlockCondition.address.aliasId === aliasOutput.aliasId)) {
                results.push({
                    isValid: false,
                    errors: ["Alias output Address field of the State Controller Address Unlock Condition and Governor Address Unlock Condition must not be the same as the Alias address derived from Alias ID."]
                });
            }
        });

        results.push(validateUnlockConditions(aliasOutput.unlockConditions));
    }

    if (aliasOutput.nativeTokens) {
        results.push(validateNativeTokens(aliasOutput.nativeTokens));
    }

    results.push(validateFeatures(aliasOutput.features));

    
    results.push(validateFeatures(aliasOutput.immutableFeatures));
    

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
