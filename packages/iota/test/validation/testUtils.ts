// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { INftOutput } from "../../src/models/outputs/INftOutput";

/**
 * Helper function to clone an NFT output.
 * @param nftOutput The output to clone.
 * @returns The cloned output.
 */
export function cloneNftOutput(nftOutput: INftOutput): INftOutput {
    return JSON.parse(JSON.stringify(nftOutput)) as INftOutput;
}

