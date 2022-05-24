// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { SingleNodeClient } from "../clients/singleNodeClient";
import type { IBlock } from "../models/IBlock";
import type { IClient } from "../models/IClient";

/**
 * Reattach an existing block.
 * @param client The client or node endpoint to perform the reattach with.
 * @param blockId The block to reattach.
 * @returns The id and block that were reattached.
 */
export async function reattach(
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

    const reattachBlockPartial = {
        payload: block.payload
    };

    const reattachedBlockId = await localClient.blockSubmit(reattachBlockPartial);

    return {
        block,
        blockId: reattachedBlockId
    };
}
