// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { MAX_NUMBER_PARENTS } from "../binary/block";
import { SingleNodeClient } from "../clients/singleNodeClient";
import type { IBlock } from "../models/IBlock";
import type { IClient } from "../models/IClient";

/**
 * Promote an existing block.
 * @param client The clientor node endpoint to perform the promote with.
 * @param blockId The block to promote.
 * @returns The id and block that were promoted.
 */
export async function promote(
    client: IClient | string,
    blockId: string
): Promise<{
    block: IBlock;
    blockId: string;
}> {
    const localClient = typeof client === "string" ? new SingleNodeClient(client) : client;

    const block = await localClient.block(blockId);
    if (!block) {
        throw new Error("The block does not exist.");
    }

    const tipsResponse = await localClient.tips();

    // Parents must be unique and lexicographically sorted
    // so don't add the blockId if it is already one of the tips
    if (!tipsResponse.tipBlockIds.includes(blockId)) {
        tipsResponse.tipBlockIds.unshift(blockId);
    }

    // If we now exceed the max parents remove as many as we need
    if (tipsResponse.tipBlockIds.length > MAX_NUMBER_PARENTS) {
        tipsResponse.tipBlockIds = tipsResponse.tipBlockIds.slice(0, MAX_NUMBER_PARENTS);
    }

    // Finally sort the list
    tipsResponse.tipBlockIds.sort();

    const promoteBlock: IBlock = {
        parentBlockIds: tipsResponse.tipBlockIds
    };

    const promoteBlockId = await localClient.blockSubmit(promoteBlock);

    return {
        block,
        blockId: promoteBlockId
    };
}
