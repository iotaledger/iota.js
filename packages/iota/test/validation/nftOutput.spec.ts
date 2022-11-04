// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { ED25519_ADDRESS_TYPE } from "../../src/models/addresses/IEd25519Address";
import { NFT_ADDRESS_TYPE } from "../../src/models/addresses/INftAddress";
import { ISSUER_FEATURE_TYPE } from "../../src/models/features/IIssuerFeature";
import { TAG_FEATURE_TYPE } from "../../src/models/features/ITagFeature";
import { ADDRESS_UNLOCK_CONDITION_TYPE } from "../../src/models/unlockConditions/IAddressUnlockCondition";
import { STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE } from "../../src/models/unlockConditions/IStateControllerAddressUnlockCondition";
import { STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE } from "../../src/models/unlockConditions/IStorageDepositReturnUnlockCondition";
import { validateNftOutput } from "../../src/validation/outputs/nftOutput";
import { cloneNftOutput } from "./testUtils";
import { mockNftOutput, protocolInfoMock } from "./testValidationMocks";

describe("NFT output validation", () => {
    it("should pass with valid NFT output", () => {
        const nftOutput = cloneNftOutput(mockNftOutput);

        const result = validateNftOutput(nftOutput, protocolInfoMock);

        expect(result.isValid).toEqual(true);
        expect(result.errors).toEqual(undefined);
    });

    it("should fail when the output amount is zero", () => {
        const nftOutput = cloneNftOutput(mockNftOutput);
        nftOutput.amount = "0";

        const result = validateNftOutput(nftOutput, protocolInfoMock);

        expect(result.isValid).toEqual(false);
        expect(result.errors).toBeDefined();
        expect(result.errors?.length).toEqual(2);
        expect(result.errors).toEqual(expect.arrayContaining(
            [
                "NFT output amount field must be larger than zero.",
                "Storage deposit return amount exceeds target output's deposit."
            ]
        ));
    });

    it("should fail when the amount is larger than max token supply", () => {
        const nftOutput = cloneNftOutput(mockNftOutput);
        // max is 1450896407249092
        nftOutput.amount = "1450896407249095";

        const result = validateNftOutput(nftOutput, protocolInfoMock);

        expect(result.isValid).toEqual(false);
        expect(result.errors).toBeDefined();
        expect(result.errors?.length).toEqual(1);
        expect(result.errors).toEqual(expect.arrayContaining(
            ["NFT output amount field must not be larger than max token supply."]
        ));
    });

    it("should fail when one of the unlocks is of unsupported type", () => {
        const nftOutput = cloneNftOutput(mockNftOutput);
        nftOutput.unlockConditions.push({
            type: STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE,
            address: {
                type: ED25519_ADDRESS_TYPE,
                pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
            }
        });

        const result = validateNftOutput(nftOutput, protocolInfoMock);

        expect(result.isValid).toEqual(false);
        expect(result.errors).toBeDefined();
        expect(result.errors?.length).toEqual(1);
        expect(result.errors).toEqual(expect.arrayContaining(
            ["NFT output unlock condition type of an unlock condition must define one of the following types: Address Unlock Condition, Storage Deposit Return Unlock Condition, Timelock Unlock Condition or Expiration Unlock Condition."]
        ));
    });

    it("should fail when the address unlock condition type is missing", () => {
        const nftOutput = cloneNftOutput(mockNftOutput);
        nftOutput.unlockConditions = [
            {
                type: STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE,
                amount: "43600",
                returnAddress: {
                    type: ED25519_ADDRESS_TYPE,
                    pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
                }
            }
        ];

        const result = validateNftOutput(nftOutput, protocolInfoMock);

        expect(result.isValid).toEqual(false);
        expect(result.errors).toBeDefined();
        expect(result.errors?.length).toEqual(1);
        expect(result.errors).toEqual(expect.arrayContaining(
            ["NFT output unlock conditions must define an Address Unlock Condition."]
        ));
    });

    it(
        "should fail when the address in the address unlock condition is the nft address itself (self-unlocking)",
        () => {
            const nftOutput = cloneNftOutput(mockNftOutput);
            nftOutput.unlockConditions = [
                {
                    type: ADDRESS_UNLOCK_CONDITION_TYPE,
                    address: {
                        type: NFT_ADDRESS_TYPE,
                        nftId: nftOutput.nftId
                    }
                }
            ];

            const result = validateNftOutput(nftOutput, protocolInfoMock);

            expect(result.isValid).toEqual(false);
            expect(result.errors).toBeDefined();
            expect(result.errors?.length).toEqual(1);
            expect(result.errors).toEqual(expect.arrayContaining(
                ["NFT output Address field of the Address Unlock Condition must not be the same as the NFT address derived from NFT ID."]
            ));
        }
    );

    it("should fail when the unlocks are not ordered in ascending order by type", () => {
        const nftOutput = cloneNftOutput(mockNftOutput);
        nftOutput.unlockConditions = [
            {
                type: 0,
                address: {
                    type: ED25519_ADDRESS_TYPE,
                    pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
                }
            },
            {
                type: 3,
                unixTime: 123123123123,
                returnAddress: {
                    type: ED25519_ADDRESS_TYPE,
                    pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
                }
            },
            {
                type: 2,
                unixTime: 123123123123
            }
        ];

        const result = validateNftOutput(nftOutput, protocolInfoMock);

        expect(result.isValid).toEqual(false);
        expect(result.errors).toBeDefined();
        expect(result.errors?.length).toEqual(1);
        expect(result.errors).toEqual(expect.arrayContaining(
            ["NFT output Unlock Conditions must be sorted in ascending order based on their Unlock Condition Type."]
        ));
    });

    it("should fail when one of the features is of unsupported type", () => {
        const nftOutput = cloneNftOutput(mockNftOutput);
        nftOutput.features = [
            {
                type: ISSUER_FEATURE_TYPE,
                address: {
                    type: NFT_ADDRESS_TYPE,
                    nftId: nftOutput.nftId
                }
            }
        ];

        const result = validateNftOutput(nftOutput, protocolInfoMock);

        expect(result.isValid).toEqual(false);
        expect(result.errors).toBeDefined();
        expect(result.errors?.length).toEqual(1);
        expect(result.errors).toEqual(expect.arrayContaining(
            ["NFT output feature type of a feature must define one of the following types: Sender Feature, Metadata Feature or Tag Feature."]
        ));
    });

    it("should fail when the features are not ordered in ascending order by type", () => {
        const nftOutput = cloneNftOutput(mockNftOutput);
        nftOutput.features = [
            {
                type: 3,
                tag: "0xblablasometag"
            },
            {
                type: 2,
                data: "0xblablasomedata"
            },
            {
                type: 0,
                address: {
                    type: ED25519_ADDRESS_TYPE,
                    pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
                }
            }
        ];

        const result = validateNftOutput(nftOutput, protocolInfoMock);

        expect(result.isValid).toEqual(false);
        expect(result.errors).toBeDefined();
        expect(result.errors?.length).toEqual(1);
        expect(result.errors).toEqual(expect.arrayContaining(
            ["NFT output Features must be sorted in ascending order based on their Feature Type."]
        ));
    });

    it("should fail when one of the immutable features is of unsupported type", () => {
        const nftOutput = cloneNftOutput(mockNftOutput);
        if (nftOutput.immutableFeatures) {
            nftOutput.immutableFeatures[1] = {
                type: TAG_FEATURE_TYPE,
                tag: "0xblablasometag"
            };
        }

        const result = validateNftOutput(nftOutput, protocolInfoMock);

        expect(result.isValid).toEqual(false);
        expect(result.errors).toBeDefined();
        expect(result.errors?.length).toEqual(1);
        expect(result.errors).toEqual(expect.arrayContaining(
            ["NFT output feature type of an Immutable Feature must define one of the following types: Issuer Feature or Metadata Feature."]
        ));
    });

    it("should fail when the immutable features are not ordered in ascending order by type", () => {
        const nftOutput = cloneNftOutput(mockNftOutput);
        nftOutput.immutableFeatures = [
            {
                type: 2,
                data: "0xblablasomedata"
            },
            {
                type: 1,
                address: {
                    type: ED25519_ADDRESS_TYPE,
                    pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
                }
            }
        ];

        const result = validateNftOutput(nftOutput, protocolInfoMock);

        expect(result.isValid).toEqual(false);
        expect(result.errors).toBeDefined();
        expect(result.errors?.length).toEqual(1);
        expect(result.errors).toEqual(expect.arrayContaining(
            ["NFT output Immutable Features must be sorted in ascending order based on their Immutable Feature Type."]
        ));
    });
});
