// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { ALIAS_ADDRESS_TYPE } from "../../src/models/addresses/IAliasAddress";
import { ALIAS_OUTPUT_TYPE, IAliasOutput } from "../../src/models/outputs/IAliasOutput";
import { BASIC_OUTPUT_TYPE, IBasicOutput } from "../../src/models/outputs/IBasicOutput";
import { ADDRESS_UNLOCK_CONDITION_TYPE } from "../../src/models/unlockConditions/IAddressUnlockCondition";
import { GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE } from "../../src/models/unlockConditions/IGovernorAddressUnlockCondition";
import { STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE } from "../../src/models/unlockConditions/IStateControllerAddressUnlockCondition";
import { validateOutputs } from "../../src/validation/outputs/outputs";
import { protocolInfoMock } from "./testValidationMocks";

describe("Basic output validation", () => {
    test("should pass with valid basic output", () => {
        const output: IBasicOutput = {
            type: BASIC_OUTPUT_TYPE,
            amount: "455655655",
            unlockConditions: [
                {
                    type: 0,
                    address: {
                        type: ADDRESS_UNLOCK_CONDITION_TYPE,
                        pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
                    }
                }
            ]
        };

        const result = validateOutputs([output], protocolInfoMock);
        expect(result.isValid).toEqual(true);
    });

    test("should fail wth invalid basic output", () => {
        const output: IBasicOutput = {
            type: BASIC_OUTPUT_TYPE,
            amount: "0",
            unlockConditions: []
        };

        const result = validateOutputs([output], protocolInfoMock);
        expect(result.isValid).toEqual(false);
        expect(result.errors).toEqual(expect.arrayContaining([
            "Address Unlock Condition must be present.",
            "Basic output amount field must be larger than zero."
        ]));
    });

    test("should pass with valid alias output", () => {
        const output: IAliasOutput = {
            type: ALIAS_OUTPUT_TYPE,
            amount: "455655655",
            aliasId: "0xb6b82443901a2ab6beefdcb88acff1ca359f211a474cb50cf63aa6a24721f9aa",
            stateIndex: 1,
            foundryCounter: 0,
            unlockConditions: [
                {
                    type: STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE,
                    address: {
                        type: ALIAS_ADDRESS_TYPE,
                        aliasId: "0x7ffec9e1233204d9c6dce6812b1539ee96af691ca2e4d9065daa85907d33e5d3"
                    }
                },
                {
                    type: GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE,
                    address: {
                        type: ALIAS_ADDRESS_TYPE,
                        aliasId: "0x7ffec9e1233204d9c6dce6812b1539ee96af691ca2e4d9065daa85907d33e5d3"
                    }
                }
            ]
        };

        const result = validateOutputs([output], protocolInfoMock);
        expect(result.isValid).toEqual(true);
    });

    test("should fail with invalid alias output", () => {
        const output: IAliasOutput = {
            type: ALIAS_OUTPUT_TYPE,
            amount: "0",
            aliasId: "0xb6b82443901a2ab6beefdcb88acff1ca359f211a474cb50cf63aa6a24721f9aa",
            stateIndex: 0,
            foundryCounter: 0,
            unlockConditions: []
        };

        const result = validateOutputs([output], protocolInfoMock);
        expect(result.isValid).toEqual(false);
        expect(result.errors).toEqual(expect.arrayContaining([
            "Alias output amount field must be larger than zero.",
            "Unlock conditions count must be equal to 2.",
            "Both state controller address unlock condition and Governor address unlock condition must be present."
        ]));
    });

    test("should fail on both state controller address unlock condition and Governor address unlock condition must be present", () => {
        const output: IAliasOutput = {
            type: ALIAS_OUTPUT_TYPE,
            amount: "455655655",
            aliasId: "0xb6b82443901a2ab6beefdcb88acff1ca359f211a474cb50cf63aa6a24721f9aa",
            stateIndex: 1,
            foundryCounter: 0,
            unlockConditions: [
                {
                    type: STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE,
                    address: {
                        type: ALIAS_ADDRESS_TYPE,
                        aliasId: "0x7ffec9e1233204d9c6dce6812b1539ee96af691ca2e4d9065daa85907d33e5d3"
                    }
                }
            ]
        };

        const result = validateOutputs([output], protocolInfoMock);
        expect(result.isValid).toEqual(false);
        expect(result.errors).toEqual(expect.arrayContaining(["Both state controller address unlock condition and Governor address unlock condition must be present."]));
    });

    test("should fail on unlock condition address same as alias id", () => {
        const output: IAliasOutput = {
            type: ALIAS_OUTPUT_TYPE,
            amount: "455655655",
            aliasId: "0xb6b82443901a2ab6beefdcb88acff1ca359f211a474cb50cf63aa6a24721f9aa",
            stateIndex: 1,
            foundryCounter: 0,
            unlockConditions: [
                {
                    type: STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE,
                    address: {
                        type: ALIAS_ADDRESS_TYPE,
                        aliasId: "0xb6b82443901a2ab6beefdcb88acff1ca359f211a474cb50cf63aa6a24721f9aa"
                    }
                },
                {
                    type: GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE,
                    address: {
                        type: ALIAS_ADDRESS_TYPE,
                        aliasId: "0xb6b82443901a2ab6beefdcb88acff1ca359f211a474cb50cf63aa6a24721f9aa"
                    }
                }
            ]
        };

        const result = validateOutputs([output], protocolInfoMock);
        expect(result.isValid).toEqual(false);
        expect(result.errors).toEqual(expect.arrayContaining(["Address of State controller address unlock condition and address of Governor address unlock condition must be different from the Alias address derived from alias id."]));
    });

    test("should fail on state index and foundry counter not equal to zero", () => {
        const output: IAliasOutput = {
            type: ALIAS_OUTPUT_TYPE,
            amount: "455655655",
            aliasId: "0x0000000000000000000000000000000000000000000000000000000000000000",
            stateIndex: 1,
            foundryCounter: 1,
            unlockConditions: [
                {
                    type: STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE,
                    address: {
                        type: ALIAS_ADDRESS_TYPE,
                        aliasId: "0x7ffec9e1233204d9c6dce6812b1539ee96af691ca2e4d9065daa85907d33e5d3"
                    }
                },
                {
                    type: GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE,
                    address: {
                        type: ALIAS_ADDRESS_TYPE,
                        aliasId: "0x7ffec9e1233204d9c6dce6812b1539ee96af691ca2e4d9065daa85907d33e5d3"
                    }
                }
            ]
        };

        const result = validateOutputs([output], protocolInfoMock);
        expect(result.isValid).toEqual(false);
        expect(result.errors).toEqual(expect.arrayContaining(["When Alias ID is zeroed out, State Index and Foundry Counter must be 0."]));
    });
});