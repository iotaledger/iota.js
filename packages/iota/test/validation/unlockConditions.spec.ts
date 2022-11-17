// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { ADDRESS_UNLOCK_CONDITION_TYPE, IAddressUnlockCondition } from "../../src/models/unlockConditions/IAddressUnlockCondition";
import { EXPIRATION_UNLOCK_CONDITION_TYPE, IExpirationUnlockCondition } from "../../src/models/unlockConditions/IExpirationUnlockCondition";
import { GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE, IGovernorAddressUnlockCondition } from "../../src/models/unlockConditions/IGovernorAddressUnlockCondition";
import { IImmutableAliasUnlockCondition, IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE } from "../../src/models/unlockConditions/IImmutableAliasUnlockCondition";
import { IStateControllerAddressUnlockCondition, STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE } from "../../src/models/unlockConditions/IStateControllerAddressUnlockCondition";
import { STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE } from "../../src/models/unlockConditions/IStorageDepositReturnUnlockCondition";
import type { IStorageDepositReturnUnlockCondition } from "../../src/models/unlockConditions/IStorageDepositReturnUnlockCondition";
import { ITimelockUnlockCondition, TIMELOCK_UNLOCK_CONDITION_TYPE } from "../../src/models/unlockConditions/ITimelockUnlockCondition";
import type { UnlockConditionTypes } from "../../src/models/unlockConditions/unlockConditionTypes";
import { validateUnlockCondition, validateUnlockConditions } from "../../src/validation/unlockConditions/unlockConditions";
import { cloneBasicOutput } from "./testUtils";
import { mockBasicOutput, protocolInfoMock } from "./testValidationMocks";

describe("Unlock Conditions validation", () => {
    test("should pass with valid unlock conditions", () => {
        const unlockConditions: UnlockConditionTypes[] = [
            {
                type: ADDRESS_UNLOCK_CONDITION_TYPE,
                address: {
                    type: ADDRESS_UNLOCK_CONDITION_TYPE,
                    pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
                }
            },
            {
                type: STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE,
                amount: "46000",
                returnAddress: {
                    type: ADDRESS_UNLOCK_CONDITION_TYPE,
                    pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
                }
            },
            {
                type: TIMELOCK_UNLOCK_CONDITION_TYPE,
                unixTime: 1561616
            },
            {
                type: EXPIRATION_UNLOCK_CONDITION_TYPE,
                returnAddress: {
                    type: ADDRESS_UNLOCK_CONDITION_TYPE,
                    pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
                },
                unixTime: 1561616
            },
            {
                type: STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE,
                address: {
                    type: ADDRESS_UNLOCK_CONDITION_TYPE,
                    pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
                }
            },
            {
                type: GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE,
                address: {
                    type: ADDRESS_UNLOCK_CONDITION_TYPE,
                    pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
                }
            },
            {
                type: IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE,
                address: {
                    type: ADDRESS_UNLOCK_CONDITION_TYPE,
                    pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
                }
            }
        ];

        expect(() => validateUnlockConditions(unlockConditions, "455655655", protocolInfoMock.rentStructure)).not.toThrowError();
    });

    test("should fail with invalid address unlock condition", () => {
        const uc: IAddressUnlockCondition =
        {
            type: ADDRESS_UNLOCK_CONDITION_TYPE,
            address: {
                type: ADDRESS_UNLOCK_CONDITION_TYPE,
                pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f92"
            }
        };

        expect(() => validateUnlockCondition(uc)).toThrow("Ed25519 Address must have 66 characters.");
    });

    test("should fail with invalid timelock unlock condition", () => {
        const uc: ITimelockUnlockCondition =
        {
            type: TIMELOCK_UNLOCK_CONDITION_TYPE,
            unixTime: 0
        };

        expect(() => validateUnlockCondition(uc)).toThrow("Time unlock condition must be greater than zero.");
    });

    test("should fail with invalid expiration unlock condition", () => {
        const uc: IExpirationUnlockCondition =
        {
            type: EXPIRATION_UNLOCK_CONDITION_TYPE,
            returnAddress: {
                type: ADDRESS_UNLOCK_CONDITION_TYPE,
                pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb33f80f74css7c3db78198147d5f1f92"
            },
            unixTime: 0
        };

        expect(() => validateUnlockCondition(uc)).toThrow("Expiration unlock condition must be greater than zero.");
    });

    test("should fail with invalid state controller address unlock condition", () => {
        const uc: IStateControllerAddressUnlockCondition =
        {
            type: STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE,
            address: {
                type: ADDRESS_UNLOCK_CONDITION_TYPE,
                pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af87c3db78198147d5f1f92"
            }
        };

        expect(() => validateUnlockCondition(uc)).toThrow("Ed25519 Address must have 66 characters.");
    });

    test("should fail with invalid state governor address unlock condition", () => {
        const uc: IGovernorAddressUnlockCondition =
        {
            type: GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE,
            address: {
                type: ADDRESS_UNLOCK_CONDITION_TYPE,
                pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393afssssaawedwwdwd4c7c3db78198147d5f1f92"
            }
        };

        expect(() => validateUnlockCondition(uc)).toThrow("Ed25519 Address must have 66 characters.");
    });

    test("should fail with invalid state immutable alias address unlock condition", () => {
        const uc: IImmutableAliasUnlockCondition =
        {
            type: IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE,
            address: {
                type: ADDRESS_UNLOCK_CONDITION_TYPE,
                pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393adwdwdwdf80f74c7c3db78198147d5f1f92"
            }
        };

        expect(() => validateUnlockCondition(uc)).toThrow("Ed25519 Address must have 66 characters.");
    });

    test("should fail validation when output amount or rent structure are not provided with a SDRUC", () => {
         const sdruc: IStorageDepositReturnUnlockCondition = {
            type: STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE,
            amount: "4600",
            returnAddress: {
                type: ADDRESS_UNLOCK_CONDITION_TYPE,
                pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
            }
        };

        expect(() => validateUnlockCondition(sdruc)).toThrow("Must provide Output amount and Rent structure to validate storage deposit return unlock condition.");
    });

    test("should fail validation of SDRUC if storage deposit amount is zero", () => {
        const basicOutput = cloneBasicOutput(mockBasicOutput);

        (basicOutput.unlockConditions[1] as IStorageDepositReturnUnlockCondition).amount = "0";

        expect(() => validateUnlockConditions(basicOutput.unlockConditions, basicOutput.amount, protocolInfoMock.rentStructure)).toThrow("Storage deposit amount must be larger than zero.");
    });

    test("should fail validation of SDRUC if storage deposit return amount is less than the min storage deposit", () => {
        const basicOutput = cloneBasicOutput(mockBasicOutput);

        (basicOutput.unlockConditions[1] as IStorageDepositReturnUnlockCondition).amount = "100";

        expect(() => validateUnlockConditions(basicOutput.unlockConditions, basicOutput.amount, protocolInfoMock.rentStructure)).toThrow("Storage deposit return amount is less than the min storage deposit.");
    });

    test("should fail validation of SDRUC if storage deposit return amount exceeds target output's deposit", () => {
        const basicOutput = cloneBasicOutput(mockBasicOutput);

        (basicOutput.unlockConditions[1] as IStorageDepositReturnUnlockCondition).amount = "455655657";

        expect(() => validateUnlockConditions(basicOutput.unlockConditions, basicOutput.amount, protocolInfoMock.rentStructure)).toThrow("Storage deposit return amount exceeds target output's deposit.");
    });

    test("should fail validation of SDRUC if the return address is invalid", () => {
        const basicOutput = cloneBasicOutput(mockBasicOutput);

        (basicOutput.unlockConditions[1] as IStorageDepositReturnUnlockCondition).returnAddress = {
            type: ADDRESS_UNLOCK_CONDITION_TYPE,
            pubKeyHash: "0x6920b176f613ec7be59e68fc68f597e393af80f74c7c3db78198147d5f1f92"
        };

        expect(() => validateUnlockConditions(basicOutput.unlockConditions, basicOutput.amount, protocolInfoMock.rentStructure)).toThrow("Ed25519 Address must have 66 characters.");
    });
});

