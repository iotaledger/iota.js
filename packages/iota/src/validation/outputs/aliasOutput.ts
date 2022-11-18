// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { HexHelper } from "@iota/util.js";
import { ALIAS_ADDRESS_TYPE } from "../../models/addresses/IAliasAddress";
import type { INodeInfoProtocol } from "../../models/info/INodeInfoProtocol";
import { ALIAS_OUTPUT_TYPE, IAliasOutput } from "../../models/outputs/IAliasOutput";
import { GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IGovernorAddressUnlockCondition";
import { STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IStateControllerAddressUnlockCondition";
import { validateFeatures, MAX_METADATA_LENGTH } from "../features/features";
import { validateUnlockConditions } from "../unlockConditions/unlockConditions";
import { failValidation } from "../validationUtils";
import { validateCommonRules } from "./common";

/**
 * Zero alias id.
 */
const ZERO_ALIAS_ID = "0x0000000000000000000000000000000000000000000000000000000000000000";

/**
 * Validate an alias output.
 * @param aliasOutput The object to validate.
 * @param protocolInfo The Protocol Info.
 * @throws Error if the validation fails.
 */
export function validateAliasOutput(aliasOutput: IAliasOutput, protocolInfo: INodeInfoProtocol) {
    if (aliasOutput.type !== ALIAS_OUTPUT_TYPE) {
        failValidation(`Type mismatch in alias output ${aliasOutput.type}`);
    }

    validateCommonRules(aliasOutput, protocolInfo);

    if (aliasOutput.aliasId === ZERO_ALIAS_ID && (aliasOutput.stateIndex !== 0 || aliasOutput.foundryCounter !== 0)) {
        failValidation("Alias output Alias ID is zeroed out, State Index and Foundry Counter must be 0.");
    }

    if (
        aliasOutput.stateMetadata &&
        (HexHelper.stripPrefix(aliasOutput.stateMetadata).length / 2) > MAX_METADATA_LENGTH
    ) {
        failValidation("Alias output state metadata length must not be greater than max metadata length.");
    }

    for (const uC of aliasOutput.unlockConditions) {
        if (
            (
                uC.type === STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE ||
                    uC.type === GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE
            ) && uC.address.type === ALIAS_ADDRESS_TYPE && uC.address.aliasId === aliasOutput.aliasId
        ) {
                failValidation("Alias output Address field of the State Controller Address Unlock Condition and Governor Address Unlock Condition must not be the same as the Alias address derived from Alias ID.");
        }
    }

    validateUnlockConditions(aliasOutput.unlockConditions);
    validateFeatures(aliasOutput.features);
    validateFeatures(aliasOutput.immutableFeatures);
}

