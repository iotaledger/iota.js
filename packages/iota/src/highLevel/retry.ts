// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { SingleNodeClient } from "../clients/singleNodeClient";
import type { IBlock } from "../models/IBlock";
import type { IClient } from "../models/IClient";
import { promote } from "./promote";
import { reattach } from "./reattach";

/**
 * Retry an existing block either by promoting or reattaching.
 * @param client The client or node endpoint to perform the retry with.
 * @param blockId The block to retry.
 * @returns The id and block that were retried.
 */
export async function retry(
    client: IClient | string,
    blockId: string
): Promise<{
    block: IBlock;
    blockId: string;
}> {
    const localClient = typeof client === "string" ? new SingleNodeClient(client) : client;

    const metadata = await localClient.blockMetadata(blockId);

    if (!metadata) {
        throw new Error("The block does not exist.");
    }

    if (metadata.shouldPromote) {
        return promote(client, blockId);
    } else if (metadata.shouldReattach) {
        return reattach(client, blockId);
    }

    throw new Error("The block should not be promoted or reattached.");
}
