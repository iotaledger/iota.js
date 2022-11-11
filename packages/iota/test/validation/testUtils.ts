// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import type { IBlock } from "../../src/models/IBlock";
import type { ITransactionEssence } from "../../src/models/ITransactionEssence";
import type { IAliasOutput } from "../../src/models/outputs/IAliasOutput";
import type { IBasicOutput } from "../../src/models/outputs/IBasicOutput";
import type { IFoundryOutput } from "../../src/models/outputs/IFoundryOutput";
import type { INftOutput } from "../../src/models/outputs/INftOutput";
import type { ITaggedDataPayload } from "../../src/models/payloads/ITaggedDataPayload";
import type { ITransactionPayload } from "../../src/models/payloads/ITransactionPayload";

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

/**
 * Helper function to clone an foundry output.
 * @param foundryOutput The output to clone.
 * @returns The cloned output.
 */
export function cloneFoundryOutput(foundryOutput: IFoundryOutput): IFoundryOutput {
    return JSON.parse(JSON.stringify(foundryOutput)) as IFoundryOutput;
}

/**
 * Helper function to clone a block.
 * @param block The block to clone.
 * @returns The cloned block.
 */
export function cloneBlock(block: IBlock): IBlock {
    return JSON.parse(JSON.stringify(block)) as IBlock;
}

/**
 * Helper function to clone a tagged data payload.
 * @param payload The payload to clone.
 * @returns The cloned block.
 */
export function cloneTaggedDataPayload(payload: ITaggedDataPayload): ITaggedDataPayload {
    return JSON.parse(JSON.stringify(payload)) as ITaggedDataPayload;
}

/**
 * Helper function to clone a transaction essence.
 * @param txEssence The transaction essence to clone.
 * @returns The cloned transaction essence.
 */
export function cloneTransactionEssence(txEssence: ITransactionEssence): ITransactionEssence {
    return JSON.parse(JSON.stringify(txEssence)) as ITransactionEssence;
}

/**
 * Helper function to clone a transaction payload.
 * @param payload The transaction payload to clone.
 * @returns The cloned transaction essence.
 */
export function cloneTransactionPayload(payload: ITransactionPayload): ITransactionPayload {
    return JSON.parse(JSON.stringify(payload)) as ITransactionPayload;
}
