// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { validateOutputs } from "../../src/validation/outputs/outputs";
import { cloneBasicOutput, cloneAliasOutput, cloneNftOutput } from "./testUtils";
import { mockBasicOutput, mockNftOutput, mockAliasOutput, protocolInfoMock } from "./testValidationMocks";

describe("Outputs validation", () => {
    it("should pass with valid Basic, Alias, Nft and Foundry outputs", () => {
        const basicOutput = cloneBasicOutput(mockBasicOutput);
        const aliasOutput = cloneAliasOutput(mockAliasOutput);
        const nftOutput = cloneNftOutput(mockNftOutput);

        const result = validateOutputs([basicOutput, aliasOutput, nftOutput], protocolInfoMock);

        expect(result.isValid).toEqual(true);
        expect(result.errors).toEqual(undefined);
    });
});
