// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { ALIAS_ADDRESS_TYPE } from "../../src/models/addresses/IAliasAddress";
import { GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE } from "../../src/models/unlockConditions/IGovernorAddressUnlockCondition";
import { STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE } from "../../src/models/unlockConditions/IStateControllerAddressUnlockCondition";
import { TIMELOCK_UNLOCK_CONDITION_TYPE } from "../../src/models/unlockConditions/ITimelockUnlockCondition";
import { validateAliasOutput } from "../../src/validation/outputs/aliasOutput";
import { cloneAliasOutput } from "./testUtils";
import { mockAliasOutput, protocolInfoMock } from "./testValidationMocks";

describe("Alias output validation", () => {
    it("should pass with valid alias output", () => {
        const aliasOutput = cloneAliasOutput(mockAliasOutput);

        const result = validateAliasOutput(aliasOutput, protocolInfoMock);
        expect(result.isValid).toEqual(true);
    });

    it("should fail with invalid alias output", () => {
        const aliasOutput = cloneAliasOutput(mockAliasOutput);
        aliasOutput.amount = "0";

        const result = validateAliasOutput(aliasOutput, protocolInfoMock);
        expect(result.isValid).toEqual(false);
        expect(result.errors).toEqual(expect.arrayContaining(
            ["Alias output amount field must be larger than zero."]
        ));
    });

    it("should fail when the amount is larger than max token supply", () => {
        const aliasOutput = cloneAliasOutput(mockAliasOutput);
        // max is 1450896407249092
        aliasOutput.amount = "1450896407249095";

        const result = validateAliasOutput(aliasOutput, protocolInfoMock);

        expect(result.isValid).toEqual(false);
        expect(result.errors).toBeDefined();
        expect(result.errors?.length).toEqual(1);
        expect(result.errors).toEqual(expect.arrayContaining(
            ["Alias output amount field must not be larger than max token supply."]
        ));
    });

    it("should fail when unlocks count is not equal to 2", () => {
        const aliasOutput = cloneAliasOutput(mockAliasOutput);
        aliasOutput.unlockConditions.push({
            type: TIMELOCK_UNLOCK_CONDITION_TYPE,
            unixTime: 123123123123
        });

        const result = validateAliasOutput(aliasOutput, protocolInfoMock);

        expect(result.isValid).toEqual(false);
        expect(result.errors).toBeDefined();
        expect(result.errors?.length).toEqual(1);
        expect(result.errors).toEqual(expect.arrayContaining(
            ["Unlock conditions count must be equal to 2."]
        ));
    });

    it("should fail when one of the unlocks is of unsupported type", () => {
        const aliasOutput = cloneAliasOutput(mockAliasOutput);
        aliasOutput.unlockConditions[1] = {
            type: TIMELOCK_UNLOCK_CONDITION_TYPE,
            unixTime: 123123123123
        };

        const result = validateAliasOutput(aliasOutput, protocolInfoMock);

        expect(result.isValid).toEqual(false);
        expect(result.errors).toBeDefined();
        expect(result.errors?.length).toEqual(1);
        expect(result.errors).toEqual(expect.arrayContaining(
            ["Alias output unlock condition type of an unlock condition must define one of the following types: State Controller Address Unlock Condition and Governor Address Unlock Condition."]
        ));
    });

    it(
        "should fail when the address in the state controller address unlock condition or Governor address unlock condition is the alias address itself (self-unlocking)",
        () => {
            const aliasOutput = cloneAliasOutput(mockAliasOutput);
            aliasOutput.unlockConditions[0] = {
                type: STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE,
                address: {
                    type: ALIAS_ADDRESS_TYPE,
                    aliasId: aliasOutput.aliasId
                }
            };

            const result = validateAliasOutput(aliasOutput, protocolInfoMock);

            expect(result.isValid).toEqual(false);
            expect(result.errors).toBeDefined();
            expect(result.errors?.length).toEqual(1);
            expect(result.errors).toEqual(expect.arrayContaining(
                ["Alias output Address field of the State Controller Address Unlock Condition and Governor Address Unlock Condition must not be the same as the Alias address derived from Alias ID."]
            ));
        }
    );

    it("should fail on when alias id is zeroed out and state index and foundry counter are not equal to zero", () => {
        const aliasOutput = cloneAliasOutput(mockAliasOutput);
        aliasOutput.aliasId = "0x0000000000000000000000000000000000000000000000000000000000000000";
        aliasOutput.stateIndex = 1;
        aliasOutput.foundryCounter = 1;
        aliasOutput.unlockConditions = [
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
        ];

        const result = validateAliasOutput(aliasOutput, protocolInfoMock);
        expect(result.isValid).toEqual(false);
        expect(result.errors).toEqual(expect.arrayContaining(["When Alias ID is zeroed out, State Index and Foundry Counter must be 0."]));
    });
});
