// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { ED25519_ADDRESS_TYPE } from "../../src/models/addresses/IEd25519Address";
import { TAG_FEATURE_TYPE } from "../../src/models/features/ITagFeature";
import { SIMPLE_TOKEN_SCHEME_TYPE } from "../../src/models/tokenSchemes/ISimpleTokenScheme";
import { STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE } from "../../src/models/unlockConditions/IStateControllerAddressUnlockCondition";
import { validateFoundryOutput } from "../../src/validation/outputs/foundryOutput";
import { cloneFoundryOutput } from "./testUtils";
import { mockFoundryOutput, protocolInfoMock } from "./testValidationMocks";

describe("Foundry output validation", () => {
    it("should pass with valid foundry output", () => {
        const foundryOutput = cloneFoundryOutput(mockFoundryOutput);

        const result = validateFoundryOutput(foundryOutput, protocolInfoMock);
        expect(result.isValid).toEqual(true);
    });

    it("should fail when foundry output amount is zero", () => {
        const foundryOutput = cloneFoundryOutput(mockFoundryOutput);
        foundryOutput.amount = "0";

        const result = validateFoundryOutput(foundryOutput, protocolInfoMock);
        expect(result.isValid).toEqual(false);
        expect(result.errors).toBeDefined();
        expect(result.errors?.length).toEqual(1);
        expect(result.errors).toEqual(expect.arrayContaining(
            ["Foundry output amount field must be larger than zero."]
        ));
    });

    it("should fail when the amount is larger than max token supply", () => {
        const foundryOutput = cloneFoundryOutput(mockFoundryOutput);
        // max is 1450896407249092
        foundryOutput.amount = "1450896407249095";

        const result = validateFoundryOutput(foundryOutput, protocolInfoMock);

        expect(result.isValid).toEqual(false);
        expect(result.errors).toBeDefined();
        expect(result.errors?.length).toEqual(1);
        expect(result.errors).toEqual(expect.arrayContaining(
            ["Foundry output amount field must not be larger than max token supply."]
        ));
    });

    it("should fail when unlock conditions count is exceeded", () => {
        const foundryOutput = cloneFoundryOutput(mockFoundryOutput);
        foundryOutput.unlockConditions.push({
            type: STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE,
            address: {
                type: ED25519_ADDRESS_TYPE,
                pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
            }
        });

        const result = validateFoundryOutput(foundryOutput, protocolInfoMock);

        expect(result.isValid).toEqual(false);
        expect(result.errors).toBeDefined();
        expect(result.errors?.length).toEqual(3);
        expect(result.errors).toEqual(expect.arrayContaining(
            [
                "Foundry output Unlock Conditions count must be equal to 1.",
                "Foundry output unlock condition type of an unlock condition must define one of the following types: Immutable Alias Address Unlock Condition.",
                "Output Unlock Conditions must be sorted in ascending order based on their Unlock Condition Type."
            ]
        ));
    });

    it("should fail when the unlock condition is of unsupported type", () => {
        const foundryOutput = cloneFoundryOutput(mockFoundryOutput);
        foundryOutput.unlockConditions = [
            {
                type: STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE,
                address: {
                    type: ED25519_ADDRESS_TYPE,
                    pubKeyHash: "0x6920b176f613ec7be59e68fc68f597eb3393af80f74c7c3db78198147d5f1f92"
                }
            }
        ];

        const result = validateFoundryOutput(foundryOutput, protocolInfoMock);

        expect(result.isValid).toEqual(false);
        expect(result.errors).toBeDefined();
        expect(result.errors?.length).toEqual(1);
        expect(result.errors).toEqual(expect.arrayContaining(
            ["Foundry output unlock condition type of an unlock condition must define one of the following types: Immutable Alias Address Unlock Condition."]
        ));
    });

    it("should fail when the feature is of unsupported type", () => {
        const foundryOutput = cloneFoundryOutput(mockFoundryOutput);
        foundryOutput.features = [
            {
                type: TAG_FEATURE_TYPE,
                tag: "0x6920b176f613ec7be59e68fc68f597eb"
            }
        ];

        const result = validateFoundryOutput(foundryOutput, protocolInfoMock);

        expect(result.isValid).toEqual(false);
        expect(result.errors).toBeDefined();
        expect(result.errors?.length).toEqual(1);
        expect(result.errors).toEqual(expect.arrayContaining(
            ["Foundry output feature type of a feature must define one of the following types: Metadata Feature."]
        ));
    });

    it("should fail when the features count is exceeded", () => {
        const foundryOutput = cloneFoundryOutput(mockFoundryOutput);
        foundryOutput.features?.push({
            type: TAG_FEATURE_TYPE,
            tag: "0x6920b176f613ec7be59e68fc68f597eb"
        });

        const result = validateFoundryOutput(foundryOutput, protocolInfoMock);

        expect(result.isValid).toEqual(false);
        expect(result.errors).toBeDefined();
        expect(result.errors?.length).toEqual(2);
        expect(result.errors).toEqual(expect.arrayContaining(
            [
                "Foundry output Features count must be between 0 and 1.",
                "Foundry output feature type of a feature must define one of the following types: Metadata Feature."
            ]
        ));
    });

    it("should fail when the immutable feature is of unsupported type", () => {
        const foundryOutput = cloneFoundryOutput(mockFoundryOutput);
        foundryOutput.immutableFeatures = [
            {
                type: TAG_FEATURE_TYPE,
                tag: "0x6920b176f613ec7be59e68fc68f597eb"
            }
        ];

        const result = validateFoundryOutput(foundryOutput, protocolInfoMock);

        expect(result.isValid).toEqual(false);
        expect(result.errors).toBeDefined();
        expect(result.errors?.length).toEqual(1);
        expect(result.errors).toEqual(expect.arrayContaining(
            ["Foundry output feature type of an Immutable Feature must define one of the following types: Metadata Feature."]
        ));
    });

    it("should fail when the immutable features count is exceeded", () => {
        const foundryOutput = cloneFoundryOutput(mockFoundryOutput);
        foundryOutput.immutableFeatures?.push({
            type: TAG_FEATURE_TYPE,
            tag: "0x6920b176f613ec7be59e68fc68f597eb"
        });

        const result = validateFoundryOutput(foundryOutput, protocolInfoMock);

        expect(result.isValid).toEqual(false);
        expect(result.errors).toBeDefined();
        expect(result.errors?.length).toEqual(2);
        expect(result.errors).toEqual(expect.arrayContaining(
            [
                "Foundry output Immutable Features count must be between 0 and 1.",
                "Foundry output feature type of an Immutable Feature must define one of the following types: Metadata Feature."
            ]
        ));
    });

    it("should fail when difference of Minted Tokens and Melted Tokens is greater than Maximum Supply.", () => {
        const foundryOutput = cloneFoundryOutput(mockFoundryOutput);
        foundryOutput.tokenScheme = {
            type: SIMPLE_TOKEN_SCHEME_TYPE,
            mintedTokens: "0x3e8",
            meltedTokens: "0x0",
            maximumSupply: "0x2"
        };

        const result = validateFoundryOutput(foundryOutput, protocolInfoMock);

        expect(result.isValid).toEqual(false);
        expect(result.errors).toBeDefined();
        expect(result.errors?.length).toEqual(1);
        expect(result.errors).toEqual(expect.arrayContaining(
            ["The difference of Minted Tokens and Melted Tokens must not be greater than Maximum Supply."]
        ));
    });

    it("should fail when Melted Tokens are greater than Minted Tokens.", () => {
        const foundryOutput = cloneFoundryOutput(mockFoundryOutput);
        foundryOutput.tokenScheme = {
            type: SIMPLE_TOKEN_SCHEME_TYPE,
            mintedTokens: "0x3e8",
            meltedTokens: "0x3e9",
            maximumSupply: "0x2710"
        };

        const result = validateFoundryOutput(foundryOutput, protocolInfoMock);

        expect(result.isValid).toEqual(false);
        expect(result.errors).toBeDefined();
        expect(result.errors?.length).toEqual(1);
        expect(result.errors).toEqual(expect.arrayContaining(
            ["Melted Tokens must not be greater than Minted Tokens."]
        ));
    });

    it("should fail when Token Maximum Supply is equal to zero.", () => {
        const foundryOutput = cloneFoundryOutput(mockFoundryOutput);
        foundryOutput.tokenScheme = {
            type: SIMPLE_TOKEN_SCHEME_TYPE,
            mintedTokens: "0x0",
            meltedTokens: "0x0",
            maximumSupply: "0x0"
        };
        const result = validateFoundryOutput(foundryOutput, protocolInfoMock);

        expect(result.isValid).toEqual(false);
        expect(result.errors).toBeDefined();
        expect(result.errors?.length).toEqual(1);
        expect(result.errors).toEqual(expect.arrayContaining(
            ["Token Maximum Supply must be larger than zero."]
        ));
    });
});
