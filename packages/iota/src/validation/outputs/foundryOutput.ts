// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { INodeInfoProtocol } from "../../models/info/INodeInfoProtocol";
import { FOUNDRY_OUTPUT_TYPE, IFoundryOutput } from "../../models/outputs/IFoundryOutput";
import { SIMPLE_TOKEN_SCHEME_TYPE } from "../../models/tokenSchemes/ISimpleTokenScheme";
import { validateFeatures } from "../features/features";
import { failValidation } from "../result";
import { validateSimpleTokenScheme } from "../tokenSchemes/simpleTokenScheme";
import { validateUnlockConditions } from "../unlockConditions/unlockConditions";
import { validateCommonRules } from "./common";

/**
 * Validate a foundry output.
 * @param foundryOutput The output to validate.
 * @param protocolInfo The Protocol Info.
 * @throws Error if the validation fails.
 */
 export function validateFoundryOutput(
    foundryOutput: IFoundryOutput,
    protocolInfo: INodeInfoProtocol
) {
    if (foundryOutput.type !== FOUNDRY_OUTPUT_TYPE) {
        failValidation(`Type mismatch in foundry output ${foundryOutput.type}.`);
    }

    validateCommonRules(foundryOutput, protocolInfo);

    if (!foundryOutput.tokenScheme || foundryOutput.tokenScheme.type !== SIMPLE_TOKEN_SCHEME_TYPE) {
        failValidation("Foundry output Token Scheme must define Simple Token Scheme.");
    } else {
        validateSimpleTokenScheme(foundryOutput.tokenScheme);
    }

    validateUnlockConditions(foundryOutput.unlockConditions);

    validateFeatures(foundryOutput.features);

    validateFeatures(foundryOutput.immutableFeatures);
}
