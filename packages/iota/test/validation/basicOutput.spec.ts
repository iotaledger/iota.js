// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { ED25519_ADDRESS_TYPE } from "../../src/models/addresses/IEd25519Address";
import { ISSUER_FEATURE_TYPE } from "../../src/models/features/IIssuerFeature";
import { TAG_FEATURE_TYPE } from "../../src/models/features/ITagFeature";
import { STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE } from "../../src/models/unlockConditions/IStateControllerAddressUnlockCondition";
import { STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE } from "../../src/models/unlockConditions/IStorageDepositReturnUnlockCondition";
import { validateBasicOutput } from "../../src/validation/outputs/basicOutput";
import { cloneBasicOutput } from "./testUtils";
import { mockBasicOutput, protocolInfoMock } from "./testValidationMocks";

describe("Basic output validation", () => {
    it("should pass with valid Basic output", () => {
        const basicOutput = cloneBasicOutput(mockBasicOutput);

        expect(() => validateBasicOutput(basicOutput, protocolInfoMock)).not.toThrowError();
    });

    it("should fail when the output amount is zero", () => {
        const basicOutput = cloneBasicOutput(mockBasicOutput);
        basicOutput.amount = "0";

        expect(() => validateBasicOutput(basicOutput, protocolInfoMock)).toThrow("Basic output amount field must be greater than zero.");
    });

    it("should fail when the amount is larger than max token supply", () => {
        const basicOutput = cloneBasicOutput(mockBasicOutput);
        // max is 1450896407249092
        basicOutput.amount = "1450896407249095";

        expect(() => validateBasicOutput(basicOutput, protocolInfoMock)).toThrow("Basic output amount field must not be greater than max token supply.");
    });

    it("should fail when one of the unlock condition is of unsupported type", () => {
        const basicOutput = cloneBasicOutput(mockBasicOutput);
        basicOutput.unlockConditions[3] = {
            type: STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE,
            address: {
                type: ED25519_ADDRESS_TYPE,
                pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
            }
        };

        expect(() => validateBasicOutput(basicOutput, protocolInfoMock)).toThrow("Basic output unlock condition type of an unlock condition must define one of the following types: Address Unlock Condition, Storage Deposit Return Unlock Condition, Timelock Unlock Condition, Expiration Unlock Condition.");
    });

    it("should fail when the unlock conditions count is larger than allowed", () => {
        const basicOutput = cloneBasicOutput(mockBasicOutput);
        basicOutput.unlockConditions.push({
            type: STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE,
            address: {
                type: ED25519_ADDRESS_TYPE,
                pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
            }
        });

        expect(() => validateBasicOutput(basicOutput, protocolInfoMock)).toThrow("Basic output Unlock Conditions count must be between 1 and 4.");
    });

    it("should fail when the unlock conditions count is lesser than allowed", () => {
        const basicOutput = cloneBasicOutput(mockBasicOutput);
        basicOutput.unlockConditions = [];

        expect(() => validateBasicOutput(basicOutput, protocolInfoMock)).toThrow("Basic output Unlock Conditions count must be between 1 and 4.");
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

        expect(() => validateBasicOutput(basicOutput, protocolInfoMock)).toThrow("Basic output Unlock Conditions must define an Address Unlock Condition.");
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

        expect(() => validateBasicOutput(basicOutput, protocolInfoMock)).toThrow("Output Unlock Conditions must be sorted in ascending order based on their Unlock Condition Type.");
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

        expect(() => validateBasicOutput(basicOutput, protocolInfoMock)).toThrow("Basic output feature type of a feature must define one of the following types: Sender Feature, Metadata Feature, Tag Feature.");
    });

    it("should fail when the featuress count is larger than allowed", () => {
        const basicOutput = cloneBasicOutput(mockBasicOutput);
        basicOutput.features?.push(
            {
                type: TAG_FEATURE_TYPE,
                tag: "0xthisissomefakedataandnotahex"
            }
        );

        expect(() => validateBasicOutput(basicOutput, protocolInfoMock)).toThrow("Basic output Features count must be between 0 and 3.");
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

        expect(() => validateBasicOutput(basicOutput, protocolInfoMock)).toThrow("Output Features must be sorted in ascending order based on their Feature Type.");
    });
});
