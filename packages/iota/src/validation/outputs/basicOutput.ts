// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { INodeInfoProtocol } from "../../models/info/INodeInfoProtocol";
import { BASIC_OUTPUT_TYPE, IBasicOutput } from "../../models/outputs/IBasicOutput";
import { ADDRESS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IAddressUnlockCondition";
import { validateFeatures } from "../features/features";
import { failValidation } from "../result";
import { validateUnlockConditions } from "../unlockConditions/unlockConditions";
import { validateCommonRules } from "./common";

/**
 * Validate a basic output.
 * @param basicOutput The basic output to validate.
 * @param protocolInfo The Protocol Info.
 * @throws Error if the validation fails.
 */
 export function validateBasicOutput(basicOutput: IBasicOutput, protocolInfo: INodeInfoProtocol) {
    if (basicOutput.type !== BASIC_OUTPUT_TYPE) {
        failValidation(`Type mismatch in basic output ${basicOutput.type}`);
    }

    validateCommonRules(basicOutput, protocolInfo);

    if (!basicOutput.unlockConditions.some(uC => uC.type === ADDRESS_UNLOCK_CONDITION_TYPE)) {
        failValidation("Basic output Unlock Conditions must define an Address Unlock Condition.");
    } else {
        validateUnlockConditions(
            basicOutput.unlockConditions,
            basicOutput.amount,
            protocolInfo.rentStructure
        );
    }

    validateFeatures(basicOutput.features);
}
