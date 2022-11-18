// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { NFT_ADDRESS_TYPE } from "../../models/addresses/INftAddress";
import type { INodeInfoProtocol } from "../../models/info/INodeInfoProtocol";
import { INftOutput, NFT_OUTPUT_TYPE } from "../../models/outputs/INftOutput";
import { ADDRESS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IAddressUnlockCondition";
import { validateFeatures } from "../features/features";
import { validateUnlockConditions } from "../unlockConditions/unlockConditions";
import { failValidation } from "../validationUtils";
import { validateCommonRules } from "./common";

/**
 * Validate an nft output.
 * @param nftOutput The NFT output to validate.
 * @param protocolInfo The Protocol Info.
 * @throws Error if the validation fails.
 */
export function validateNftOutput(nftOutput: INftOutput, protocolInfo: INodeInfoProtocol) {
    if (nftOutput.type !== NFT_OUTPUT_TYPE) {
        failValidation(`Type mismatch in NFT output ${nftOutput.type}`);
    }

    validateCommonRules(nftOutput, protocolInfo);

    if (!nftOutput.unlockConditions.some(uC => uC.type === ADDRESS_UNLOCK_CONDITION_TYPE)) {
        failValidation("NFT output Unlock Conditions must define an Address Unlock Condition.");
    } else {
        nftOutput.unlockConditions.map(
            uC => {
                if (
                    uC.type === ADDRESS_UNLOCK_CONDITION_TYPE &&
                    uC.address.type === NFT_ADDRESS_TYPE &&
                    uC.address.nftId === nftOutput.nftId
                ) {
                    throw new Error("NFT output Address field of the Address Unlock Condition must not be the same as the NFT address derived from NFT ID.");
                }
            }
        );

        validateUnlockConditions(
            nftOutput.unlockConditions,
            nftOutput.amount,
            protocolInfo.rentStructure
        );
    }

    validateFeatures(nftOutput.features);
    validateFeatures(nftOutput.immutableFeatures);
}
