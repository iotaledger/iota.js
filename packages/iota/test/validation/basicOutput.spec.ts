// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { ED25519_ADDRESS_TYPE } from "../../src/models/addresses/IEd25519Address";
import { ISSUER_FEATURE_TYPE } from "../../src/models/features/IIssuerFeature";
import { STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE } from "../../src/models/unlockConditions/IStateControllerAddressUnlockCondition";
import { STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE } from "../../src/models/unlockConditions/IStorageDepositReturnUnlockCondition";
import { validateBasicOutput } from "../../src/validation/outputs/basicOutput";
import { cloneBasicOutput } from "./testUtils";
import { mockBasicOutput, protocolInfoMock } from "./testValidationMocks";

describe("Basic output validation", () => {
    it("should pass with valid Basic output", () => {
        const basicOutput = cloneBasicOutput(mockBasicOutput);

        const result = validateBasicOutput(basicOutput, protocolInfoMock);

        expect(result.isValid).toEqual(true);
        expect(result.errors).toEqual(undefined);
    });

    it("should fail when the output amount is zero", () => {
        const basicOutput = cloneBasicOutput(mockBasicOutput);
        basicOutput.amount = "0";

        const result = validateBasicOutput(basicOutput, protocolInfoMock);

        expect(result.isValid).toEqual(false);
        expect(result.errors).toBeDefined();
        expect(result.errors?.length).toEqual(1);
        expect(result.errors).toEqual(expect.arrayContaining(
            ["Basic output amount field must be larger than zero."]
        ));
    });

    it("should fail when the amount is larger than max token supply", () => {
        const basicOutput = cloneBasicOutput(mockBasicOutput);
        // max is 1450896407249092
        basicOutput.amount = "1450896407249095";

        const result = validateBasicOutput(basicOutput, protocolInfoMock);

        expect(result.isValid).toEqual(false);
        expect(result.errors).toBeDefined();
        expect(result.errors?.length).toEqual(1);
        expect(result.errors).toEqual(expect.arrayContaining(
            ["Basic output amount field must not be larger than max token supply."]
        ));
    });

    it("should fail when one of the unlocks is of unsupported type", () => {
        const basicOutput = cloneBasicOutput(mockBasicOutput);
        basicOutput.unlockConditions.push({
            type: STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE,
            address: {
                type: ED25519_ADDRESS_TYPE,
                pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
            }
        });

        const result = validateBasicOutput(basicOutput, protocolInfoMock);

        expect(result.isValid).toEqual(false);
        expect(result.errors).toBeDefined();
        expect(result.errors?.length).toEqual(1);
        expect(result.errors).toEqual(expect.arrayContaining(
            ["Basic output unlock condition type of an unlock condition must define one of the following types: Address Unlock Condition, Storage Deposit Return Unlock Condition, Timelock Unlock Condition or Expiration Unlock Condition."]
        ));
    });

    it("should fail when the address unlock condition type is missing", () => {
        const basicOutput = cloneBasicOutput(mockBasicOutput);
        basicOutput.unlockConditions = [
            {
                type: STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE,
                amount: "43600",
                returnAddress: {
                    type: ED25519_ADDRESS_TYPE,
                    pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
                }
            }
        ];

        const result = validateBasicOutput(basicOutput, protocolInfoMock);

        expect(result.isValid).toEqual(false);
        expect(result.errors).toBeDefined();
        expect(result.errors?.length).toEqual(1);
        expect(result.errors).toEqual(expect.arrayContaining(
            ["Basic output unlock conditions must define an Address Unlock Condition."]
        ));
    });

    it("should fail when the unlocks are not ordered in ascending order by type", () => {
        const basicOutput = cloneBasicOutput(mockBasicOutput);
        basicOutput.unlockConditions = [
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

        const result = validateBasicOutput(basicOutput, protocolInfoMock);

        expect(result.isValid).toEqual(false);
        expect(result.errors).toBeDefined();
        expect(result.errors?.length).toEqual(1);
        expect(result.errors).toEqual(expect.arrayContaining(
            ["Basic output Unlock Conditions must be sorted in ascending order based on their Unlock Condition Type."]
        ));
    });

    it("should fail when one of the features is of unsupported type", () => {
        const basicOutput = cloneBasicOutput(mockBasicOutput);
        basicOutput.features = [
            {
                type: ISSUER_FEATURE_TYPE,
                address: {
                    type: ED25519_ADDRESS_TYPE,
                    pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
                }
            }
        ];

        const result = validateBasicOutput(basicOutput, protocolInfoMock);

        expect(result.isValid).toEqual(false);
        expect(result.errors).toBeDefined();
        expect(result.errors?.length).toEqual(1);
        expect(result.errors).toEqual(expect.arrayContaining(
            ["Basic output feature type of a feature must define one of the following types: Sender Feature, Metadata Feature or Tag Feature."]
        ));
    });

    it("should fail when the features are not ordered in ascending order by type", () => {
        const basicOutput = cloneBasicOutput(mockBasicOutput);
        basicOutput.features = [
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

        const result = validateBasicOutput(basicOutput, protocolInfoMock);

        expect(result.isValid).toEqual(false);
        expect(result.errors).toBeDefined();
        expect(result.errors?.length).toEqual(1);
        expect(result.errors).toEqual(expect.arrayContaining(
            ["Basic output Features must be sorted in ascending order based on their Feature Type."]
        ));
    });
});
