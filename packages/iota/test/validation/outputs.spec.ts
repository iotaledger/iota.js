// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { validateOutputs } from "../../src/validation/outputs/outputs";
import { cloneBasicOutput, cloneAliasOutput, cloneNftOutput, cloneFoundryOutput } from "./testUtils";
import { mockBasicOutput, mockNftOutput, mockAliasOutput, protocolInfoMock, mockFoundryOutput } from "./testValidationMocks";

describe("Outputs validation", () => {
    it("should pass with valid Basic, Alias, Nft and Foundry outputs", () => {
        const basicOutput = cloneBasicOutput(mockBasicOutput);
        const aliasOutput = cloneAliasOutput(mockAliasOutput);
        const nftOutput = cloneNftOutput(mockNftOutput);
        const foundryOutput = cloneFoundryOutput(mockFoundryOutput);

        expect(() => validateOutputs(
            [
                basicOutput,
                aliasOutput,
                nftOutput,
                foundryOutput
            ],
            protocolInfoMock)).not.toThrowError();
    });
});
