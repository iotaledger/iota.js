// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { NFT_ADDRESS_TYPE } from "../../models/addresses/INftAddress";
import type { INodeInfoProtocol } from "../../models/info/INodeInfoProtocol";
import { INftOutput, NFT_OUTPUT_TYPE } from "../../models/outputs/INftOutput";
import { ADDRESS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IAddressUnlockCondition";
import { validateFeatures } from "../features/features";
import { IValidationResult, mergeValidationResults } from "../result";
import { validateUnlockConditions } from "../unlockConditions/unlockConditions";
import { validateCommonRules } from "./common";

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

    results.push(validateCommonRules(nftOutput, protocolInfo));

    if (!nftOutput.unlockConditions.some(uC => uC.type === ADDRESS_UNLOCK_CONDITION_TYPE)) {
        results.push({
            isValid: false,
            errors: ["NFT output Unlock Conditions must define an Address Unlock Condition."]
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

        results.push(validateUnlockConditions(
            nftOutput.unlockConditions,
            nftOutput.amount,
            protocolInfo.rentStructure
        ));
    }

    results.push(validateFeatures(nftOutput.features));

    results.push(validateFeatures(nftOutput.immutableFeatures));

    return mergeValidationResults(...results);
}
