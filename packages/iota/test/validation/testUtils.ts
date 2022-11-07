// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { IAliasOutput } from "../../src/models/outputs/IAliasOutput";
import type { IFoundryOutput } from "../../src/models/outputs/IFoundryOutput";
import type { INftOutput } from "../../src/models/outputs/INftOutput";

/**
 * Helper function to clone an NFT output.
 * @param nftOutput The output to clone.
 * @returns The cloned output.
 */
export function cloneNftOutput(nftOutput: INftOutput): INftOutput {
    return JSON.parse(JSON.stringify(nftOutput)) as INftOutput;
}

/**
 * Helper function to clone an alias output.
 * @param aliasOutput The output to clone.
 * @returns The cloned output.
 */
export function cloneAliasOutput(aliasOutput: IAliasOutput): IAliasOutput {
    return JSON.parse(JSON.stringify(aliasOutput)) as IAliasOutput;
}

/**
 * Helper function to clone an foundry output.
 * @param foundryOutput The output to clone.
 * @returns The cloned output.
 */
export function cloneFoundryOutput(foundryOutput: IFoundryOutput): IFoundryOutput {
    return JSON.parse(JSON.stringify(foundryOutput)) as IFoundryOutput;
}
