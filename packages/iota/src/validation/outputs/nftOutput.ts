// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import bigInt from "big-integer";
import { NFT_ADDRESS_TYPE } from "../../models/addresses/INftAddress";
import { ISSUER_FEATURE_TYPE } from "../../models/features/IIssuerFeature";
import { METADATA_FEATURE_TYPE } from "../../models/features/IMetadataFeature";
import { SENDER_FEATURE_TYPE } from "../../models/features/ISenderFeature";
import { TAG_FEATURE_TYPE } from "../../models/features/ITagFeature";
import type { INodeInfoProtocol } from "../../models/info/INodeInfoProtocol";
import { INftOutput, NFT_OUTPUT_TYPE } from "../../models/outputs/INftOutput";
import { ADDRESS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IAddressUnlockCondition";
import { EXPIRATION_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IExpirationUnlockCondition";
import { STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IStorageDepositReturnUnlockCondition";
import { TIMELOCK_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/ITimelockUnlockCondition";
import { validateFeatures } from "../features/features";
import { validateNativeTokens } from "../nativeTokens";
import { IValidationResult, mergeValidationResults } from "../result";
import { validateUnlockConditions } from "../unlockConditions/unlockConditions";

/**
 * Maximum number of features that an nft output could have.
 */
const MAX_NFT_FEATURES_COUNT = 3;
/**
 * Maximum number of immutable features that an nft output could have.
 */
const MAX_NFT_IMMUTABLE_FEATURES_COUNT = 2;

/**
 * Validate an nft output.
 * @param nftOutput The NFT output to validate.
 * @param protocolInfo The Protocol Info.
 * @returns The validation result.
 */
export function validateNftOutput(nftOutput: INftOutput, protocolInfo: INodeInfoProtocol): IValidationResult {
    const results: IValidationResult[] = [];

    if (nftOutput.type !== NFT_OUTPUT_TYPE) {
        results.push({
            isValid: false,
            errors: [`Type mismatch in NFT output ${nftOutput.type}`]
        });
    }

    if (bigInt(nftOutput.amount).leq(bigInt.zero)) {
        results.push({
            isValid: false,
            errors: ["NFT output amount field must be larger than zero."]
        });
    }

    if (bigInt(nftOutput.amount).gt(protocolInfo.tokenSupply)) {
        results.push({
            isValid: false,
            errors: ["NFT output amount field must not be larger than max token supply."]
        });
    }

    if (nftOutput.nativeTokens) {
        results.push(validateNativeTokens(nftOutput.nativeTokens));
    }

    if (
        !nftOutput.unlockConditions.every(
            uC =>
                uC.type === ADDRESS_UNLOCK_CONDITION_TYPE ||
                uC.type === STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE ||
                uC.type === TIMELOCK_UNLOCK_CONDITION_TYPE ||
                uC.type === EXPIRATION_UNLOCK_CONDITION_TYPE
        )
    ) {
        results.push({
            isValid: false,
            errors: ["NFT output unlock condition type of an unlock condition must define one of the following types: Address Unlock Condition, Storage Deposit Return Unlock Condition, Timelock Unlock Condition or Expiration Unlock Condition."]
        });
    }

    results.push(validateUnlockConditions(nftOutput.unlockConditions, nftOutput.amount, protocolInfo.rentStructure));

    if (!nftOutput.unlockConditions.some(uC => uC.type === ADDRESS_UNLOCK_CONDITION_TYPE)) {
        results.push({
            isValid: false,
            errors: ["NFT output unlock conditions must define an Address Unlock Condition."]
        });
    } else {
        nftOutput.unlockConditions.map(
            uC => {
                if (
                    uC.type === ADDRESS_UNLOCK_CONDITION_TYPE &&
                    uC.address.type === NFT_ADDRESS_TYPE &&
                    uC.address.nftId === nftOutput.nftId
                ) {
                    results.push({
                        isValid: false,
                        errors: ["NFT output Address field of the Address Unlock Condition must not be the same as the NFT address derived from NFT ID."]
                    });
                }
            }
        );
    }

    if (nftOutput.features && nftOutput.features.length > 0) {
        if (
            !nftOutput.features.every(
                feature =>
                    feature.type === SENDER_FEATURE_TYPE ||
                    feature.type === METADATA_FEATURE_TYPE ||
                    feature.type === TAG_FEATURE_TYPE
            )
        ) {
            results.push({
                isValid: false,
                errors: ["NFT output feature type of a feature must define one of the following types: Sender Feature, Metadata Feature or Tag Feature."]
            });
        }

        results.push(validateFeatures(nftOutput.features, MAX_NFT_FEATURES_COUNT));
    }

    if (nftOutput.immutableFeatures && nftOutput.immutableFeatures.length > 0) {
        if (
            !nftOutput.immutableFeatures.every(
                immutableFeature =>
                    immutableFeature.type === ISSUER_FEATURE_TYPE ||
                    immutableFeature.type === METADATA_FEATURE_TYPE
            )
        ) {
            results.push({
                isValid: false,
                errors: ["NFT output feature type of an immutable feature must define one of the following types: Issuer Feature or Metadata Feature."]
            });
        }

        results.push(validateFeatures(nftOutput.immutableFeatures, MAX_NFT_IMMUTABLE_FEATURES_COUNT));
    }

    return mergeValidationResults(...results);
}

