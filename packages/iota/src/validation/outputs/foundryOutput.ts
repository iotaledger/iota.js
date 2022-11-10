// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import bigInt from "big-integer";
import { METADATA_FEATURE_TYPE } from "../../models/features/IMetadataFeature";
import type { INodeInfoProtocol } from "../../models/info/INodeInfoProtocol";
import { FOUNDRY_OUTPUT_TYPE, IFoundryOutput } from "../../models/outputs/IFoundryOutput";
import { SIMPLE_TOKEN_SCHEME_TYPE } from "../../models/tokenSchemes/ISimpleTokenScheme";
import { IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IImmutableAliasUnlockCondition";
import { validateFeatures } from "../features/features";
import { validateNativeTokens } from "../nativeTokens";
import { IValidationResult, mergeValidationResults } from "../result";
import { validateSimpleTokenScheme } from "../tokenSchemes/simpleTokenScheme";
import { validateUnlockConditions } from "../unlockConditions/unlockConditions";
import { validateCommonRules } from "./common";

/**
 * Validate a foundry output.
 * @param foundryOutput The output to validate.
 * @param protocolInfo The Protocol Info.
 * @returns The validation result.
 */
 export function validateFoundryOutput(
    foundryOutput: IFoundryOutput,
    protocolInfo: INodeInfoProtocol
): IValidationResult {
    const results: IValidationResult[] = [];

    if (foundryOutput.type !== FOUNDRY_OUTPUT_TYPE) {
        results.push({
            isValid: false,
            errors: [`Type mismatch in foundry output ${foundryOutput.type}.`]
        });
    }

    results.push(validateCommonRules(foundryOutput, protocolInfo));

    if (!foundryOutput.tokenScheme || foundryOutput.tokenScheme.type !== SIMPLE_TOKEN_SCHEME_TYPE) {
        results.push({
            isValid: false,
            errors: ["Foundry output Token Scheme must define Simple Token Scheme."]
        });
    } else {
        results.push(validateSimpleTokenScheme(foundryOutput.tokenScheme));
    }
  
    results.push(validateUnlockConditions(foundryOutput.unlockConditions));

    results.push(validateFeatures(foundryOutput.features));

    results.push(validateFeatures(foundryOutput.immutableFeatures));

    return mergeValidationResults(...results);
}
