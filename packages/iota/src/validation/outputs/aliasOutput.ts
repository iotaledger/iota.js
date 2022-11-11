// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { HexHelper } from "@iota/util.js";
import { ALIAS_ADDRESS_TYPE } from "../../models/addresses/IAliasAddress";
import type { INodeInfoProtocol } from "../../models/info/INodeInfoProtocol";
import { ALIAS_OUTPUT_TYPE, IAliasOutput } from "../../models/outputs/IAliasOutput";
import { GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IGovernorAddressUnlockCondition";
import { STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IStateControllerAddressUnlockCondition";
import { validateFeatures, MAX_METADATA_LENGTH } from "../features/features";
import { IValidationResult, mergeValidationResults } from "../result";
import { validateUnlockConditions } from "../unlockConditions/unlockConditions";
import { validateCommonRules } from "./common";

/**
 * Zero alias id.
 */
const ZERO_ALIAS_ID = "0x0000000000000000000000000000000000000000000000000000000000000000";

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

    results.push(validateCommonRules(aliasOutput, protocolInfo));

    if (aliasOutput.aliasId === ZERO_ALIAS_ID && (aliasOutput.stateIndex !== 0 || aliasOutput.foundryCounter !== 0)) {
        results.push({
            isValid: false,
            errors: ["Alias output Alias ID is zeroed out, State Index and Foundry Counter must be 0."]
        });
    }

    if (
        aliasOutput.stateMetadata &&
        (HexHelper.stripPrefix(aliasOutput.stateMetadata).length / 2) > MAX_METADATA_LENGTH
    ) {
        results.push({
            isValid: false,
            errors: ["Alias output state metadata length must not be greater than max metadata length."]
        });
    }

    for (const uC of aliasOutput.unlockConditions) {
        if ((uC.type === STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE ||
            uC.type === GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE) &&
            uC.address.type === ALIAS_ADDRESS_TYPE &&
            uC.address.aliasId === aliasOutput.aliasId) {
            results.push({
                isValid: false,
                errors: ["Alias output Address field of the State Controller Address Unlock Condition and Governor Address Unlock Condition must not be the same as the Alias address derived from Alias ID."]
            });
        }
    }

    results.push(validateUnlockConditions(aliasOutput.unlockConditions));

    results.push(validateFeatures(aliasOutput.features));

    results.push(validateFeatures(aliasOutput.immutableFeatures));

    return mergeValidationResults(...results);
}
