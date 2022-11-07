// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { IAliasOutput } from "../../src/models/outputs/IAliasOutput";
import type { IBasicOutput } from "../../src/models/outputs/IBasicOutput";
import type { INftOutput } from "../../src/models/outputs/INftOutput";

/**
 * Helper function to clone an Basic output.
 * @param basicOutput The output to clone.
 * @returns The cloned output.
 */
export function cloneBasicOutput(basicOutput: IBasicOutput): IBasicOutput {
    return JSON.parse(JSON.stringify(basicOutput)) as IBasicOutput;
}

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
