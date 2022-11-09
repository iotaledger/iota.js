// Copyright 2022 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

import bigInt from "big-integer";
import type { UnlockConditionTypes } from "../../index-browser";
import type { ITypeBase } from "../../models/ITypeBase";
import { ADDRESS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IAddressUnlockCondition";
import { EXPIRATION_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IExpirationUnlockCondition";
import { STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IStorageDepositReturnUnlockCondition";
import { TIMELOCK_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/ITimelockUnlockCondition";
import { GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IGovernorAddressUnlockCondition";
import { STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IStateControllerAddressUnlockCondition";
import { IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IImmutableAliasUnlockCondition";
import { SENDER_FEATURE_TYPE } from "../../models/features/ISenderFeature";
import { METADATA_FEATURE_TYPE } from "../../models/features/IMetadataFeature";
import { TAG_FEATURE_TYPE } from "../../models/features/ITagFeature";
import { ISSUER_FEATURE_TYPE } from "../../models/features/IIssuerFeature";
import { failValidation, IValidationResult, mergeValidationResults } from "../result";
import type { INodeInfoProtocol } from "../../models/info/INodeInfoProtocol";
import type { OutputTypes } from "../../models/outputs/outputTypes";
import type { FeatureTypes } from "../../models/features/featureTypes";
import { TREASURY_OUTPUT_TYPE } from "../../models/outputs/ITreasuryOutput";
import { BASIC_OUTPUT_TYPE } from "../../models/outputs/IBasicOutput";
import { ALIAS_OUTPUT_TYPE } from "../../models/outputs/IAliasOutput";
import { NFT_OUTPUT_TYPE } from "../../models/outputs/INftOutput";
import { FOUNDRY_OUTPUT_TYPE } from "../../models/outputs/IFoundryOutput";
import { validateNativeTokens } from "../nativeTokens";


/**
 * Allowed Basic output unlock conditions.
 */
const BASIC_OUTPUT_UNLOCK_CONDITIONS = [
    ADDRESS_UNLOCK_CONDITION_TYPE,
    STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE,
    TIMELOCK_UNLOCK_CONDITION_TYPE,
    EXPIRATION_UNLOCK_CONDITION_TYPE
];

const BASIC_OUTPUT_MIN_UNLOCK_CONDITIONS = 1;

/**
 * Allowed Alias output unlock conditions.
 */
const ALIAS_OUTPUT_UNLOCK_CONDITIONS = [
    STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE,
    GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE
];

const ALIAS_OUTPUT_MIN_UNLOCK_CONDITIONS = 2;

/**
 * Allowed Foundry output unlock conditions.
 */
const FOUNDRY_OUTPUT_UNLOCK_CONDITIONS = [IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE];

const FOUNDRY_OUTPUT_MIN_UNLOCK_CONDITIONS = 1;

/**
 * Allowed Nft output unlock conditions.
 */
const NFT_OUTPUT_UNLOCK_CONDITIONS = BASIC_OUTPUT_UNLOCK_CONDITIONS;

const NFT_OUTPUT_MIN_UNLOCK_CONDITIONS = 1;

/**
 * Map Output type to allowed unlock conditions.
 */
const OUTPUT_TYPE_TO_UNLOCK_CONDITIONS = new Map()
    .set(3, BASIC_OUTPUT_UNLOCK_CONDITIONS)
    .set(4, ALIAS_OUTPUT_UNLOCK_CONDITIONS)
    .set(5, FOUNDRY_OUTPUT_UNLOCK_CONDITIONS)
    .set(6, NFT_OUTPUT_UNLOCK_CONDITIONS);

/**
 * Map Output type to min unlock conditions.
 */
const OUTPUT_TYPE_TO_MIN_UNLOCK_CONDITIONS = new Map()
    .set(3, BASIC_OUTPUT_MIN_UNLOCK_CONDITIONS)
    .set(4, ALIAS_OUTPUT_MIN_UNLOCK_CONDITIONS)
    .set(5, FOUNDRY_OUTPUT_MIN_UNLOCK_CONDITIONS)
    .set(6, NFT_OUTPUT_MIN_UNLOCK_CONDITIONS);

/**
 * Unlock Condition type names.
 */
const ULOCK_CONDITION_TYPE_NAMES = [
    "Address Unlock Condition", 
    "Storage Deposit Return Unlock Condition",
    "Timelock Unlock Condition",
    "Expiration Unlock Condition",
    "State Controller Address Unlock Condition",
    "Governor Address Unlock Condition",
    "Immutable Alias Address Unlock Condition"
];

/**
 * Allowed Basic output features.
 */
const BASIC_OUTPUT_FEATURES = [
    SENDER_FEATURE_TYPE,
    METADATA_FEATURE_TYPE,
    TAG_FEATURE_TYPE
];

/**
 * Allowed Alias output features.
 */
const ALIAS_OUTPUT_FEATURES = [
    SENDER_FEATURE_TYPE,
    METADATA_FEATURE_TYPE
];

/**
 * Allowed Alias output immutable features.
 */
const ALIAS_OUTPUT_IMMUTABLE_FEATURES = [
    ISSUER_FEATURE_TYPE,
    METADATA_FEATURE_TYPE
];

/**
 * Allowed Foundry output features.
 */
const FOUNDRY_OUTPUT_FEATURES = [METADATA_FEATURE_TYPE];

/**
 * Allowed Foundry output immutable features.
 */
const FOUNDRY_OUTPUT_IMMUTABLE_FEATURES = FOUNDRY_OUTPUT_FEATURES;

/**
 * Allowed Nft output features.
 */
 const NFT_OUTPUT_FEATURES = BASIC_OUTPUT_FEATURES;

 /**
 * Allowed Nft output immutable features.
 */
 const NFT_OUTPUT_IMMUTABLE_FEATURES = ALIAS_OUTPUT_IMMUTABLE_FEATURES;

/**
 * Map Output type to allowed features.
 */
const OUTPUT_TYPE_TO_FEATURES = new Map()
    .set(3, BASIC_OUTPUT_FEATURES)
    .set(4, ALIAS_OUTPUT_FEATURES)
    .set(5, FOUNDRY_OUTPUT_FEATURES)
    .set(6, NFT_OUTPUT_FEATURES);
/**
 * Map Output type to allowed immutable features.
 */
const OUTPUT_TYPE_TO_IMMUTABLE_FEATURES = new Map()
    .set(4, ALIAS_OUTPUT_IMMUTABLE_FEATURES)
    .set(5, FOUNDRY_OUTPUT_IMMUTABLE_FEATURES)
    .set(6, NFT_OUTPUT_IMMUTABLE_FEATURES);

/**
 * Unlock Condition type names.
 */
const FEATURE_TYPE_NAMES = [
    "Sender Feature", 
    "Issuer Feature",
    "Metadata Feature",
    "Tag Feature"
];

/**
 * Map Output type to name.
 */
const OUTPUT_TYPE_NAMES = new Map()
    .set(3, "Basic")
    .set(4, "Alias")
    .set(5, "Foundry")
    .set(6, "Nft");

/**
 * Validate the output common rules.
 * @param output The output to validate.
 * @param protocolInfo The Protocol Info.
 * @returns The validation result.
 */
export function validateCommonRules(output: OutputTypes, protocolInfo: INodeInfoProtocol): IValidationResult {
    const results: IValidationResult[] = [];
    const outputType = output.type;
    const outputName = OUTPUT_TYPE_NAMES.get(output.type);

    results.push(validateAmountIsGreaterThanZero(output.amount, outputName));

    results.push(validateAmountIsLesserThanMaxSupply(output.amount, protocolInfo.tokenSupply, outputName));
    
    if (outputType !== TREASURY_OUTPUT_TYPE) {
        results.push(validateNativeTokens(output.nativeTokens));

        if (output.unlockConditions) {
            const max = OUTPUT_TYPE_TO_UNLOCK_CONDITIONS.get(outputType).length;
            const min = OUTPUT_TYPE_TO_MIN_UNLOCK_CONDITIONS.get(outputType);
            results.push(validateCount(outputName, "Unlock Conditions", output.unlockConditions.length, max, min));

            results.push(validateUnlockConditionsDefineAllowedTypes(output.unlockConditions, outputType, outputName));
        }

        if (output.features) {
            const max = OUTPUT_TYPE_TO_FEATURES.get(outputType).length;
            results.push(validateCount(outputName, "Features", output.features.length, max));

            results.push(validateFeaturesDefineAllowedTypes(output.features, outputType, outputName));
        }

        if (outputType !== BASIC_OUTPUT_TYPE && output.immutableFeatures) {
            const max = OUTPUT_TYPE_TO_IMMUTABLE_FEATURES.get(outputType).length;
            results.push(validateCount(outputName, "Immutable Features", output.immutableFeatures.length, max));

            results.push(validateImmutableFeaturesDefineAllowedTypes(output.immutableFeatures, outputType, outputName));
        }
    }

    return mergeValidationResults(...results);
}

/**
 * Validate the amount is greater than zero.
 * @param amount The amount to validate.
 * @returns The validation result.
 */
function validateAmountIsGreaterThanZero(amount: string, outputName: string): IValidationResult {
    let result: IValidationResult = { isValid: true };

    if (bigInt(amount).leq(bigInt.zero)) {
        result = failValidation(result, `${outputName} output amount field must be larger than zero.`);
    }

    return result;
}

/**
 * Validate the amount is lesser than maximum token supply.
 * @param amount The amount to validate.
 * @returns The validation result.
 */
function validateAmountIsLesserThanMaxSupply(amount: string, tokenSupply: string, outputName: string): IValidationResult {
    let result: IValidationResult = { isValid: true };

    if (bigInt(amount).gt(tokenSupply)) {
        result = failValidation(result, `${outputName} output amount field must not be larger than max token supply.`);
    }

    return result;
}

/**
 * Validate the count is within allowed boundries.
 * @param outputName The name of the output to use in the error message.
 * @param elementName The name of the validation subject to use in the error message.
 * @param count The number to validate.
 * @param max The maximum allowed value.
 * @param min The maximum allowed value.
 * @returns The validation result.
 */
//Basic
// It must hold true that 1 ≤ Unlock Conditions Count ≤ 4.
// It must hold true that 0 ≤ Features Count ≤ 3.
//Alias
// It must hold true that Unlock Conditions Count = 2.
// It must hold true that 0 ≤ Features Count ≤ 2.
// It must hold true that 0 ≤ Immutable Features Count ≤ 2.
// Foundry
// It must hold true that Unlock Conditions Count = 1.
// It must hold true that 0 ≤ Features Count ≤ 1.
// It must hold true that 0 ≤ Immutable Features Count ≤ 1.
// Nft
// It must hold true that 1 ≤ Unlock Conditions Count ≤ 4.
// It must hold true that 0 ≤ Features Count ≤ 3.
// It must hold true that 0 ≤ Immutable Features Count ≤ 2.
function validateCount(outputName: string, elementName: string, count: number, max: number, min: number = 0): IValidationResult {
    let result: IValidationResult = { isValid: true };

    if (count < min || count > max ) {
        const message = min === max ?
            `${outputName} output ${elementName} count must be equal to ${max}.` :
            `${outputName} output ${elementName} count must be between ${min} and ${max}.`;

        result = failValidation(result, message);
    }

    return result;
}

/**
 * Validate that the unlock conditions define only allowed types.
 * @param unlockConditions The amount to validate.
 * @param outputType The type of the output.
 * @returns The validation result.
 */
function validateUnlockConditionsDefineAllowedTypes(unlockConditions: UnlockConditionTypes[], outputType: number, outputName: string): IValidationResult {
    let result: IValidationResult = { isValid: true };

    const allowedUnlockConditionTypes = OUTPUT_TYPE_TO_UNLOCK_CONDITIONS.get(outputType);

    if (!unlockConditions.every(uC => allowedUnlockConditionTypes.includes(uC.type))) {
        const unlockConditionNames = ULOCK_CONDITION_TYPE_NAMES.filter((uC, index) => allowedUnlockConditionTypes.includes(index));
        
        result = failValidation(result, `${outputName} output unlock condition type of an unlock condition must define one of the following types: ${unlockConditionNames.join(", ")}.`);
    }

    return result;
}

/**
 * Validate that the features define only allowed types.
 * @param features The features to validate.
 * @param outputType The type of the output.
 * @returns The validation result.
 */
function validateFeaturesDefineAllowedTypes(features: FeatureTypes[], outputType: number, outputName: string): IValidationResult {
    let result: IValidationResult = { isValid: true };

    const allowedFeatureTypes = OUTPUT_TYPE_TO_FEATURES.get(outputType);

    if (!features.every(feature => allowedFeatureTypes.includes(feature.type))) {
        const unlockConditionNames = FEATURE_TYPE_NAMES.filter((feature, index) => allowedFeatureTypes.includes(index));
        
        result = failValidation(result, `${outputName} output feature type of a feature must define one of the following types: ${unlockConditionNames.join(", ")}.`);
    }

    return result;
}

/**
 * Validate that the immutable features define only allowed types.
 * @param immutableFeatures The features to validate.
 * @param outputType The type of the output.
 * @returns The validation result.
 */
function validateImmutableFeaturesDefineAllowedTypes(immutableFeatures: FeatureTypes[], outputType: number, outputName: string): IValidationResult {
    let result: IValidationResult = { isValid: true };

    const allowedFeatureTypes = OUTPUT_TYPE_TO_IMMUTABLE_FEATURES.get(outputType);

    if (!immutableFeatures.every(feature => allowedFeatureTypes.includes(feature.type))) {
        const unlockConditionNames = FEATURE_TYPE_NAMES.filter((feature, index) => allowedFeatureTypes.includes(index));
        
        result = failValidation(result, `${outputName} output feature type of an Immutable Feature must define one of the following types: ${unlockConditionNames.join(", ")}.`);
    }

    return result;
}
