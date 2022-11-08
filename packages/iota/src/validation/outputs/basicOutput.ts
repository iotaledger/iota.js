// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import bigInt from "big-integer";
import { METADATA_FEATURE_TYPE } from "../../models/features/IMetadataFeature";
import { SENDER_FEATURE_TYPE } from "../../models/features/ISenderFeature";
import { TAG_FEATURE_TYPE } from "../../models/features/ITagFeature";
import type { INodeInfoProtocol } from "../../models/info/INodeInfoProtocol";
import { BASIC_OUTPUT_TYPE, IBasicOutput } from "../../models/outputs/IBasicOutput";
import { ADDRESS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IAddressUnlockCondition";
import { EXPIRATION_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IExpirationUnlockCondition";
import { STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IStorageDepositReturnUnlockCondition";
import { TIMELOCK_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/ITimelockUnlockCondition";
import { validateFeatures } from "../features/features";
import { validateNativeTokens } from "../nativeTokens";
import { IValidationResult, mergeValidationResults } from "../result";
import { validateUnlockConditions } from "../unlockConditions/unlockConditions";
import { validateAscendingOrder } from "../validationUtils";

/**
 * Maximum number of features that a basic output can have.
 */
const MAX_BASIC_FEATURES_COUNT = 3;

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

    if (bigInt(basicOutput.amount).compare(bigInt.zero) !== 1) {
        results.push({
            isValid: false,
            errors: ["Basic output amount field must be larger than zero."]
        });
    }

    if (bigInt(basicOutput.amount).compare(protocolInfo.tokenSupply) === 1) {
        results.push({
            isValid: false,
            errors: ["Basic output amount field must not be larger than max token supply."]
        });
    }

    if (
        !basicOutput.unlockConditions.every(
            uC =>
                uC.type === ADDRESS_UNLOCK_CONDITION_TYPE ||
                uC.type === STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE ||
                uC.type === TIMELOCK_UNLOCK_CONDITION_TYPE ||
                uC.type === EXPIRATION_UNLOCK_CONDITION_TYPE
        )
    ) {
        results.push({
            isValid: false,
            errors: ["Basic output unlock condition type of an unlock condition must define one of the following types: Address Unlock Condition, Storage Deposit Return Unlock Condition, Timelock Unlock Condition or Expiration Unlock Condition."]
        });
    }

    if (!basicOutput.unlockConditions.some(uC => uC.type === ADDRESS_UNLOCK_CONDITION_TYPE)) {
        results.push({
            isValid: false,
            errors: ["Basic output unlock conditions must define an Address Unlock Condition."]
        });
    } else {
        results.push(validateAscendingOrder(basicOutput.unlockConditions, "Basic output", "Unlock Condition"));
        results.push(validateUnlockConditions(
            basicOutput.unlockConditions,
            basicOutput.amount,
            protocolInfo.rentStructure
        ));
    }

    if (basicOutput.nativeTokens) {
        results.push(validateNativeTokens(basicOutput.nativeTokens));
    }

    if (basicOutput.features) {
        results.push(validateFeatures(basicOutput.features, MAX_BASIC_FEATURES_COUNT));
    }
    if (basicOutput.features && basicOutput.features.length > 0) {
        if (
            !basicOutput.features.every(
                feature =>
                    feature.type === SENDER_FEATURE_TYPE ||
                    feature.type === METADATA_FEATURE_TYPE ||
                    feature.type === TAG_FEATURE_TYPE
            )
        ) {
            results.push({
                isValid: false,
                errors: ["Basic output feature type of a feature must define one of the following types: Sender Feature, Metadata Feature or Tag Feature."]
            });
        }

        results.push(validateAscendingOrder(basicOutput.features, "Basic output", "Feature"));
        results.push(validateFeatures(basicOutput.features, MAX_BASIC_FEATURES_COUNT));
    }

    return mergeValidationResults(...results);
}
