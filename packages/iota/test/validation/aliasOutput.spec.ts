// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { ALIAS_ADDRESS_TYPE } from "../../src/models/addresses/IAliasAddress";
import { ED25519_ADDRESS_TYPE } from "../../src/models/addresses/IEd25519Address";
import { ISSUER_FEATURE_TYPE } from "../../src/models/features/IIssuerFeature";
import { METADATA_FEATURE_TYPE } from "../../src/models/features/IMetadataFeature";
import { SENDER_FEATURE_TYPE } from "../../src/models/features/ISenderFeature";
import { TAG_FEATURE_TYPE } from "../../src/models/features/ITagFeature";
import { GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE } from "../../src/models/unlockConditions/IGovernorAddressUnlockCondition";
import { IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE } from "../../src/models/unlockConditions/IImmutableAliasUnlockCondition";
import { STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE } from "../../src/models/unlockConditions/IStateControllerAddressUnlockCondition";
import { validateAliasOutput } from "../../src/validation/outputs/aliasOutput";
import { cloneAliasOutput } from "./testUtils";
import { mockAliasOutput, protocolInfoMock } from "./testValidationMocks";

describe("Alias output validation", () => {
    it("should pass with valid alias output", () => {
        const aliasOutput = cloneAliasOutput(mockAliasOutput);

        expect(() => validateAliasOutput(aliasOutput, protocolInfoMock)).not.toThrowError();
    });

    it("should fail when the output amount is zero", () => {
        const aliasOutput = cloneAliasOutput(mockAliasOutput);
        aliasOutput.amount = "0";

        expect(() => validateAliasOutput(aliasOutput, protocolInfoMock)).toThrow("Alias output amount field must be greater than zero.");
    });

    it("should fail when the amount is larger than max token supply", () => {
        const aliasOutput = cloneAliasOutput(mockAliasOutput);
        // max is 1450896407249092
        aliasOutput.amount = "1450896407249095";

        expect(() => validateAliasOutput(aliasOutput, protocolInfoMock)).toThrow("Alias output amount field must not be greater than max token supply.");
    });

    it("should fail when unlock conditions count is not equal to 2", () => {
        const aliasOutput = cloneAliasOutput(mockAliasOutput);
        aliasOutput.unlockConditions = [];

        expect(() => validateAliasOutput(aliasOutput, protocolInfoMock)).toThrow("Alias output Unlock Conditions count must be equal to 2.");
    });

    it("should fail when one of the unlock conditions is of unsupported type", () => {
        const aliasOutput = cloneAliasOutput(mockAliasOutput);
        aliasOutput.unlockConditions[1] = {
            type: IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE,
            address: {
                type: ALIAS_ADDRESS_TYPE,
                aliasId: "0x7ffec9e1233204d9c6dce6812b1539ee96af691ca2e4d9065daa85907d33e5d3"
            }
        };

        expect(() => validateAliasOutput(aliasOutput, protocolInfoMock)).toThrow("Alias output unlock condition type of an unlock condition must define one of the following types: State Controller Address Unlock Condition, Governor Address Unlock Condition.");
    });

    it("should fail when the unlocks are not ordered in ascending order by type", () => {
        const aliasOutput = cloneAliasOutput(mockAliasOutput);
        aliasOutput.unlockConditions = [
            {
                type: GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE,
                address: {
                    type: ALIAS_ADDRESS_TYPE,
                    aliasId: "0x7ffec9e1233204d9c6dce6812b1539ee96af691ca2e4d9065daa85907d33e5d3"
                }
            },
            {
                type: STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE,
                address: {
                    type: ALIAS_ADDRESS_TYPE,
                    aliasId: "0x7ffec9e1233204d9c6dce6812b1539ee96af691ca2e4d9065daa85907d33e5d3"
                }
            }
        ];

        expect(() => validateAliasOutput(aliasOutput, protocolInfoMock)).toThrow("Output Unlock Conditions must be sorted in ascending order based on their Unlock Condition Type.");
    });

    it("should fail when one of the features is of unsupported type", () => {
        const aliasOutput = cloneAliasOutput(mockAliasOutput);
        aliasOutput.features = [
            {
                type: ISSUER_FEATURE_TYPE,
                address: {
                    type: ALIAS_ADDRESS_TYPE,
                    aliasId: aliasOutput.aliasId
                }
            }
        ];

        expect(() => validateAliasOutput(aliasOutput, protocolInfoMock)).toThrow("Alias output feature type of a feature must define one of the following types: Sender Feature, Metadata Feature.");
    });

    it("should fail when the features are not ordered in ascending order by type", () => {
        const aliasOutput = cloneAliasOutput(mockAliasOutput);
        aliasOutput.features = [
            {
                type: METADATA_FEATURE_TYPE,
                data: "0xthisissomefakedataandnotahex"
            },
            {
                type: SENDER_FEATURE_TYPE,
                address: {
                    type: 0,
                    pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
                }
            }
        ];

        expect(() => validateAliasOutput(aliasOutput, protocolInfoMock)).toThrow("Output Features must be sorted in ascending order based on their Feature Type.");
    });

    it("should fail when one of the immutable features is of unsupported type", () => {
        const aliasOutput = cloneAliasOutput(mockAliasOutput);
        if (aliasOutput.immutableFeatures) {
            aliasOutput.immutableFeatures[1] = {
                type: TAG_FEATURE_TYPE,
                tag: "0xblablasometag"
            };
        }

        expect(() => validateAliasOutput(aliasOutput, protocolInfoMock)).toThrow("Alias output feature type of an Immutable Feature must define one of the following types: Issuer Feature, Metadata Feature.");
    });

    it("should fail when the immutable features are not ordered in ascending order by type", () => {
        const aliasOutput = cloneAliasOutput(mockAliasOutput);
        aliasOutput.immutableFeatures = [
            {
                type: METADATA_FEATURE_TYPE,
                data: "0xblablasomedata"
            },
            {
                type: ISSUER_FEATURE_TYPE,
                address: {
                    type: ED25519_ADDRESS_TYPE,
                    pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
                }
            }
        ];

        expect(() => validateAliasOutput(aliasOutput, protocolInfoMock)).toThrow("Output Features must be sorted in ascending order based on their Feature Type.");
    });

    it("should fail when the address in the state controller address unlock condition or Governor address unlock condition is the alias address itself (self-unlocking)", () => {
            const aliasOutput = cloneAliasOutput(mockAliasOutput);
            aliasOutput.unlockConditions[0] = {
                type: STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE,
                address: {
                    type: ALIAS_ADDRESS_TYPE,
                    aliasId: aliasOutput.aliasId
                }
            };

            expect(() => validateAliasOutput(aliasOutput, protocolInfoMock)).toThrow("Alias output Address field of the State Controller Address Unlock Condition and Governor Address Unlock Condition must not be the same as the Alias address derived from Alias ID.");
        }
    );

    it("should fail when alias id is zeroed out but state index and foundry counter are not equal to zero", () => {
        const aliasOutput = cloneAliasOutput(mockAliasOutput);
        aliasOutput.aliasId = "0x0000000000000000000000000000000000000000000000000000000000000000";
        aliasOutput.stateIndex = 1;
        aliasOutput.foundryCounter = 1;

        expect(() => validateAliasOutput(aliasOutput, protocolInfoMock)).toThrow("Alias output Alias ID is zeroed out, State Index and Foundry Counter must be 0.");
    });

    it("should fail when state metadata length is greater than max metadata length", () => {
        const aliasOutput = cloneAliasOutput(mockAliasOutput);
        aliasOutput.stateMetadata = "1".repeat(2 * 8193);

        expect(() => validateAliasOutput(aliasOutput, protocolInfoMock)).toThrow("Alias output state metadata length must not be greater than max metadata length.");
    });
});

