// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import bigInt from "big-integer";
import type { FeatureTypes } from "../../models/features/featureTypes";
import { ISSUER_FEATURE_TYPE } from "../../models/features/IIssuerFeature";
import { METADATA_FEATURE_TYPE } from "../../models/features/IMetadataFeature";
import { SENDER_FEATURE_TYPE } from "../../models/features/ISenderFeature";
import { TAG_FEATURE_TYPE } from "../../models/features/ITagFeature";
import type { INodeInfoProtocol } from "../../models/info/INodeInfoProtocol";
import { ALIAS_OUTPUT_TYPE, IAliasOutput } from "../../models/outputs/IAliasOutput";
import { BASIC_OUTPUT_TYPE, IBasicOutput } from "../../models/outputs/IBasicOutput";
import { FOUNDRY_OUTPUT_TYPE, IFoundryOutput } from "../../models/outputs/IFoundryOutput";
import { NFT_OUTPUT_TYPE, INftOutput } from "../../models/outputs/INftOutput";
import { ADDRESS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IAddressUnlockCondition";
import { EXPIRATION_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IExpirationUnlockCondition";
import { GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IGovernorAddressUnlockCondition";
import { IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IImmutableAliasUnlockCondition";
import { STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IStateControllerAddressUnlockCondition";
import { STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IStorageDepositReturnUnlockCondition";
import { TIMELOCK_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/ITimelockUnlockCondition";
import type { UnlockConditionTypes } from "../../models/unlockConditions/unlockConditionTypes";
import { validateNativeTokens } from "../nativeTokens";
import { failValidation, IValidationResult, mergeValidationResults } from "../result";

type SupportedOutputTypes = IBasicOutput | IAliasOutput | IFoundryOutput | INftOutput;

/**
 * Map Output type to supported values.
 */
const OUTPUT_TYPE_TO_SUPPORTED_PROP_VALUES = new Map([
    [
        BASIC_OUTPUT_TYPE,
        {
            minUnlockConditions: 1,
            unlockConditions:
                [
                    ADDRESS_UNLOCK_CONDITION_TYPE,
                    STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE,
                    TIMELOCK_UNLOCK_CONDITION_TYPE,
                    EXPIRATION_UNLOCK_CONDITION_TYPE
                ],
            features:
                [
                    SENDER_FEATURE_TYPE,
                    METADATA_FEATURE_TYPE,
                    TAG_FEATURE_TYPE
                ]
        }
    ],
    [
        ALIAS_OUTPUT_TYPE,
        {
            minUnlockConditions: 2,
            unlockConditions:
                [
                    STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE,
                    GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE
                ],
            features:
                [
                    SENDER_FEATURE_TYPE,
                    METADATA_FEATURE_TYPE
                ],
            immutableFeatures:
                [
                    ISSUER_FEATURE_TYPE,
                    METADATA_FEATURE_TYPE
                ]
        }
    ],
    [
        FOUNDRY_OUTPUT_TYPE,
        {
            minUnlockConditions: 1,
            unlockConditions: [IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE],
            features: [METADATA_FEATURE_TYPE],
            immutableFeatures: [METADATA_FEATURE_TYPE]
        }
    ],
    [
        NFT_OUTPUT_TYPE,
        {
            minUnlockConditions: 1,
            unlockConditions:
                [
                    ADDRESS_UNLOCK_CONDITION_TYPE,
                    STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE,
                    TIMELOCK_UNLOCK_CONDITION_TYPE,
                    EXPIRATION_UNLOCK_CONDITION_TYPE
                ],
            features:
                [
                    SENDER_FEATURE_TYPE,
                    METADATA_FEATURE_TYPE,
                    TAG_FEATURE_TYPE
                ],
            immutableFeatures:
                [
                    ISSUER_FEATURE_TYPE,
                    METADATA_FEATURE_TYPE
                ]
        }
    ]
]);

/**
 * Unlock Condition type names.
 */
const UNLOCK_CONDITION_TYPE_NAMES = [
    "Address Unlock Condition",
    "Storage Deposit Return Unlock Condition",
    "Timelock Unlock Condition",
    "Expiration Unlock Condition",
    "State Controller Address Unlock Condition",
    "Governor Address Unlock Condition",
    "Immutable Alias Address Unlock Condition"
];

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
const OUTPUT_TYPE_NAMES = new Map([
    [BASIC_OUTPUT_TYPE, "Basic"],
    [ALIAS_OUTPUT_TYPE, "Alias"],
    [FOUNDRY_OUTPUT_TYPE, "Foundry"],
    [NFT_OUTPUT_TYPE, "NFT"]
]);

/**
 * Validate the output common rules.
 * @param output The output to validate.
 * @param protocolInfo The Protocol Info.
 * @returns The validation result.
 */
export function validateCommonRules(
    output: SupportedOutputTypes,
    protocolInfo: INodeInfoProtocol
): IValidationResult {
    const results: IValidationResult[] = [];
    const outputType = output.type;
    const outputName = OUTPUT_TYPE_NAMES.get(output.type)!;

    results.push(validateAmountIsGreaterThanZero(output.amount, outputName));

    results.push(validateAmountIsLesserThanMaxSupply(output.amount, protocolInfo.tokenSupply, outputName));

    results.push(validateNativeTokens(output.nativeTokens));

    if (output.unlockConditions) {
        const min = OUTPUT_TYPE_TO_SUPPORTED_PROP_VALUES.get(outputType)!.minUnlockConditions;
        const max = OUTPUT_TYPE_TO_SUPPORTED_PROP_VALUES.get(outputType)!.unlockConditions.length;
        results.push(validateCount(output.unlockConditions.length, min, max, outputName, "Unlock Conditions"));

        results.push(validateUnlockConditionAllowedTypes(outputType, output.unlockConditions, outputName));
    }

    if (output.features) {
        const max = OUTPUT_TYPE_TO_SUPPORTED_PROP_VALUES.get(outputType)!.features.length;
        results.push(validateCount(output.features.length, 0, max, outputName, "Features"));

        results.push(validateFeatureAllowedTypes(outputType, output.features, outputName));
    }

    if (outputType !== BASIC_OUTPUT_TYPE && output.immutableFeatures) {
        const max = OUTPUT_TYPE_TO_SUPPORTED_PROP_VALUES.get(outputType)!.immutableFeatures!.length;
        results.push(validateCount(output.immutableFeatures.length, 0, max, outputName, "Immutable Features"));

        results.push(validateImmutableFeatureAllowedTypes(outputType, output.immutableFeatures, outputName));
    }

    return mergeValidationResults(...results);
}

/**
 * Validate the amount is greater than zero.
 * @param amount The amount to validate.
 * @param outputName The name of the output to use in the error message.
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
 * @param tokenSupply The tokken supply amount.
 * @param outputName The name of the output to use in the error message.
 * @returns The validation result.
 */
function validateAmountIsLesserThanMaxSupply(
    amount: string,
    tokenSupply: string,
    outputName: string
): IValidationResult {
    let result: IValidationResult = { isValid: true };

    if (bigInt(amount).gt(tokenSupply)) {
        result = failValidation(result, `${outputName} output amount field must not be larger than max token supply.`);
    }

    return result;
}

/**
 * Validate the count is within allowed boundries.
 * @param count The number to validate.
 * @param min The maximum allowed value.
 * @param max The maximum allowed value.
 * @param outputName The name of the output to use in the error message.
 * @param elementName The name of the validation subject to use in the error message.
 * @returns The validation result.
 */
function validateCount(
    count: number,
    min: number,
    max: number,
    outputName: string,
    elementName: string
): IValidationResult {
    let result: IValidationResult = { isValid: true };

    if (count < min || count > max) {
        const message = min === max ?
            `${outputName} output ${elementName} count must be equal to ${max}.` :
            `${outputName} output ${elementName} count must be between ${min} and ${max}.`;

        result = failValidation(result, message);
    }

    return result;
}

/**
 * Validate that the unlock conditions define only allowed types.
 * @param outputType The type of the output.
 * @param unlockConditions The amount to validate.
 * @param outputName The name of the output to use in the error message.
 * @returns The validation result.
 */
function validateUnlockConditionAllowedTypes(
    outputType: number,
    unlockConditions: UnlockConditionTypes[],
    outputName: string
): IValidationResult {
    let result: IValidationResult = { isValid: true };

    const allowedUnlockConditionTypes = OUTPUT_TYPE_TO_SUPPORTED_PROP_VALUES.get(outputType)!.unlockConditions;

    if (!unlockConditions.every(uC => allowedUnlockConditionTypes.includes(uC.type))) {
        const unlockConditionNames = UNLOCK_CONDITION_TYPE_NAMES
                                        .filter((uC, index) => allowedUnlockConditionTypes.includes(index));

        result = failValidation(result, `${outputName} output unlock condition type of an unlock condition must define one of the following types: ${unlockConditionNames.join(", ")}.`);
    }

    return result;
}

/**
 * Validate that the features define only allowed types.
 * @param outputType The type of the output.
 * @param features The features to validate.
 * @param outputName The name of the output to use in the error message.
 * @returns The validation result.
 */
function validateFeatureAllowedTypes(
    outputType: number,
    features: FeatureTypes[],
    outputName: string
): IValidationResult {
    let result: IValidationResult = { isValid: true };

    const allowedFeatureTypes = OUTPUT_TYPE_TO_SUPPORTED_PROP_VALUES.get(outputType)!.features;

    if (!features.every(feature => allowedFeatureTypes.includes(feature.type))) {
        const unlockConditionNames = FEATURE_TYPE_NAMES.filter((feature, index) => allowedFeatureTypes.includes(index));

        result = failValidation(result, `${outputName} output feature type of a feature must define one of the following types: ${unlockConditionNames.join(", ")}.`);
    }

    return result;
}

/**
 * Validate that the immutable features define only allowed types.
 * @param outputType The type of the output.
 * @param immutableFeatures The features to validate.
 * @param outputName The name of the output to use in the error message.
 * @returns The validation result.
 */
function validateImmutableFeatureAllowedTypes(
    outputType: number,
    immutableFeatures: FeatureTypes[],
    outputName: string
): IValidationResult {
    let result: IValidationResult = { isValid: true };

    const allowedFeatureTypes = OUTPUT_TYPE_TO_SUPPORTED_PROP_VALUES.get(outputType)!.immutableFeatures!;

    if (!immutableFeatures.every(feature => allowedFeatureTypes.includes(feature.type))) {
        const unlockConditionNames = FEATURE_TYPE_NAMES.filter((feature, index) => allowedFeatureTypes.includes(index));

        result = failValidation(result, `${outputName} output feature type of an Immutable Feature must define one of the following types: ${unlockConditionNames.join(", ")}.`);
    }

    return result;
}
