// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { HexHelper } from "@iota/util.js";
import bigInt from "big-integer";
import { ALIAS_ADDRESS_TYPE } from "../../models/addresses/IAliasAddress";
import { ISSUER_FEATURE_TYPE } from "../../models/features/IIssuerFeature";
import { METADATA_FEATURE_TYPE } from "../../models/features/IMetadataFeature";
import { SENDER_FEATURE_TYPE } from "../../models/features/ISenderFeature";
import type { INodeInfoProtocol } from "../../models/info/INodeInfoProtocol";
import { ALIAS_OUTPUT_TYPE, IAliasOutput } from "../../models/outputs/IAliasOutput";
import { GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IGovernorAddressUnlockCondition";
import { STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IStateControllerAddressUnlockCondition";
import { validateFeatures, MAX_METADATA_LENGTH } from "../features/features";
import { validateNativeTokens } from "../nativeTokens";
import { IValidationResult, mergeValidationResults } from "../result";
import { validateUnlockConditions } from "../unlockConditions/unlockConditions";
import { validateAscendingOrder } from "../validationUtils";

/**
 * Zero alias id.
 */
const ZERO_ALIAS_ID = "0x0000000000000000000000000000000000000000000000000000000000000000";
/**
 * Count of alias output unlock conditions.
 */
const ALIAS_UNLOCK_CONDITIONS_COUNT = 2;
/**
 * Maximum number of features that alias output can have.
 */
const MAX_ALIAS_FEATURES_COUNT = 2;
/**
 * Maximum number of immutable features that an nft output could have.
 */
const MAX_ALIAS_IMMUTABLE_FEATURES_COUNT = 2;

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

    if (aliasOutput.nativeTokens) {
        results.push(validateNativeTokens(aliasOutput.nativeTokens));
    }

    if (aliasOutput.unlockConditions.length !== ALIAS_UNLOCK_CONDITIONS_COUNT) {
        results.push({
            isValid: false,
            errors: [`Alias output unlock conditions count must be equal to ${ALIAS_UNLOCK_CONDITIONS_COUNT}.`]
        });
    }

    if (
        !aliasOutput.unlockConditions.every(
            uC =>
                uC.type === STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE ||
                uC.type === GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE
        )
    ) {
        results.push({
            isValid: false,
            errors: ["Alias output unlock condition type of an unlock condition must define one of the following types: State Controller Address Unlock Condition and Governor Address Unlock Condition."]
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

    results.push(validateAscendingOrder(aliasOutput.unlockConditions, "Alias output", "Unlock Condition"));
    results.push(validateUnlockConditions(aliasOutput.unlockConditions));

    if (aliasOutput.features && aliasOutput.features.length > 0) {
        if (
            !aliasOutput.features.every(
                feature =>
                    feature.type === SENDER_FEATURE_TYPE ||
                    feature.type === METADATA_FEATURE_TYPE
            )
        ) {
            results.push({
                isValid: false,
                errors: ["Alias output feature type of a feature must define one of the following types: Sender Feature or Metadata Feature."]
            });
        }

        results.push(validateAscendingOrder(aliasOutput.features, "Alias output", "Feature"));
        results.push(validateFeatures(aliasOutput.features, MAX_ALIAS_FEATURES_COUNT));
    }

    if (aliasOutput.immutableFeatures && aliasOutput.immutableFeatures.length > 0) {
        if (
            !aliasOutput.immutableFeatures.every(
                immutableFeature =>
                    immutableFeature.type === ISSUER_FEATURE_TYPE ||
                    immutableFeature.type === METADATA_FEATURE_TYPE
            )
        ) {
            results.push({
                isValid: false,
                errors: ["Alias output feature type of an Immutable Feature must define one of the following types: Issuer Feature or Metadata Feature."]
            });
        }

        results.push(validateAscendingOrder(aliasOutput.immutableFeatures, "Alias output", "Immutable Feature"));
        results.push(validateFeatures(aliasOutput.immutableFeatures, MAX_ALIAS_IMMUTABLE_FEATURES_COUNT));
    }

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

    return mergeValidationResults(...results);
}
