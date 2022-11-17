// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
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
import { failValidation } from "../result";
import { validateCount } from "../validationUtils";

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
    [BASIC_OUTPUT_TYPE, "Basic output"],
    [ALIAS_OUTPUT_TYPE, "Alias output"],
    [FOUNDRY_OUTPUT_TYPE, "Foundry output"],
    [NFT_OUTPUT_TYPE, "NFT output"]
]);

/**
 * Validate the output common rules.
 * @param output The output to validate.
 * @param protocolInfo The Protocol Info.
 * @throws Error if the validation fails.
 */
export function validateCommonRules(
    output: SupportedOutputTypes,
    protocolInfo: INodeInfoProtocol
) {
    const outputType = output.type;
    const outputTypeValidations = OUTPUT_TYPE_TO_SUPPORTED_PROP_VALUES.get(output.type);
    const outputName = OUTPUT_TYPE_NAMES.get(output.type);

    if (!(outputName && outputTypeValidations)) {
        throw new Error(`Unsupported output for common rules validation (type: ${output.type})`);
    }

    validateAmountIsGreaterThanZero(output.amount, outputName);
    validateAmountIsLesserThanMaxSupply(output.amount, protocolInfo.tokenSupply, outputName);
    validateNativeTokens(output.nativeTokens);

    if (output.unlockConditions) {
        const min = outputTypeValidations.minUnlockConditions;
        const max = outputTypeValidations.unlockConditions.length;

        validateCount(output.unlockConditions.length, min, max, `${outputName} Unlock Conditions`);
        validateUnlockConditionAllowedTypes(outputType, output.unlockConditions, outputName);
    }

    if (output.features) {
        const max = outputTypeValidations.features.length;
        validateCount(output.features.length, 0, max, `${outputName} Features`);
        validateFeatureAllowedTypes(outputType, output.features, outputName);
    }

    if (outputType !== BASIC_OUTPUT_TYPE && output.immutableFeatures && outputTypeValidations.immutableFeatures) {
        const max = outputTypeValidations.immutableFeatures.length;

        validateCount(output.immutableFeatures.length, 0, max, `${outputName} Immutable Features`);
        validateImmutableFeatureAllowedTypes(outputType, output.immutableFeatures, outputName);
    }
}

/**
 * Validate the amount is greater than zero.
 * @param amount The amount to validate.
 * @param outputName The name of the output to use in the error message.
 * @throws Error if the validation fails.
 */
function validateAmountIsGreaterThanZero(amount: string, outputName: string) {
    if (bigInt(amount).leq(bigInt.zero)) {
        failValidation(`${outputName} amount field must be greater than zero.`);
    }
}

/**
 * Validate the amount is lesser than maximum token supply.
 * @param amount The amount to validate.
 * @param tokenSupply The tokken supply amount.
 * @param outputName The name of the output to use in the error message.
 * @throws Error if the validation fails.
 */
function validateAmountIsLesserThanMaxSupply(
    amount: string,
    tokenSupply: string,
    outputName: string
) {
    if (bigInt(amount).gt(tokenSupply)) {
        failValidation(`${outputName} amount field must not be greater than max token supply.`);
    }
}

/**
 * Validate that the unlock conditions define only allowed types.
 * @param outputType The type of the output.
 * @param unlockConditions The amount to validate.
 * @param outputName The name of the output to use in the error message.
 * @throws Error if the validation fails.
 */
function validateUnlockConditionAllowedTypes(
    outputType: number,
    unlockConditions: UnlockConditionTypes[],
    outputName: string
) {
    const allowedUnlockConditionTypes = OUTPUT_TYPE_TO_SUPPORTED_PROP_VALUES.get(outputType)?.unlockConditions ?? [];

    if (!unlockConditions.every(uC => allowedUnlockConditionTypes.includes(uC.type))) {
        const unlockConditionNames = UNLOCK_CONDITION_TYPE_NAMES.filter(
            (uC, index) => allowedUnlockConditionTypes.includes(index)
        );

        failValidation(`${outputName} unlock condition type of an unlock condition must define one of the following types: ${unlockConditionNames.join(", ")}.`);
    }
}

/**
 * Validate that the features define only allowed types.
 * @param outputType The type of the output.
 * @param features The features to validate.
 * @param outputName The name of the output to use in the error message.
 * @throws Error if the validation fails.
 */
function validateFeatureAllowedTypes(
    outputType: number,
    features: FeatureTypes[],
    outputName: string
) {
    const allowedFeatureTypes = OUTPUT_TYPE_TO_SUPPORTED_PROP_VALUES.get(outputType)?.features ?? [];

    if (!features.every(feature => allowedFeatureTypes.includes(feature.type))) {
        const unlockConditionNames = FEATURE_TYPE_NAMES.filter((feature, index) => allowedFeatureTypes.includes(index));

        failValidation(`${outputName} feature type of a feature must define one of the following types: ${unlockConditionNames.join(", ")}.`);
    }
}

/**
 * Validate that the immutable features define only allowed types.
 * @param outputType The type of the output.
 * @param immutableFeatures The features to validate.
 * @param outputName The name of the output to use in the error message.
 * @throws Error if the validation fails.
 */
function validateImmutableFeatureAllowedTypes(
    outputType: number,
    immutableFeatures: FeatureTypes[],
    outputName: string
) {
    const allowedFeatureTypes = OUTPUT_TYPE_TO_SUPPORTED_PROP_VALUES.get(outputType)?.immutableFeatures ?? [];

    if (!immutableFeatures.every(feature => allowedFeatureTypes.includes(feature.type))) {
        const unlockConditionNames = FEATURE_TYPE_NAMES.filter((feature, index) => allowedFeatureTypes.includes(index));

        failValidation(`${outputName} feature type of an Immutable Feature must define one of the following types: ${unlockConditionNames.join(", ")}.`);
    }
}

