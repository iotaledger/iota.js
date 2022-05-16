// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable unicorn/no-nested-ternary */
import { Converter, HexHelper } from "@iota/util.js";
import { MAX_TAG_LENGTH } from "../binary/payloads/taggedDataPayload";
import { SingleNodeClient } from "../clients/singleNodeClient";
import type { IBlock } from "../models/IBlock";
import type { IClient } from "../models/IClient";
import { ITaggedDataPayload, TAGGED_DATA_PAYLOAD_TYPE } from "../models/payloads/ITaggedDataPayload";

/**
 * Send a data block.
 * @param client The client or node endpoint to send the data with.
 * @param tag The tag for the data.
 * @param data The data as either UTF8 text or Uint8Array bytes.
 * @returns The id of the block created and the block.
 */
export async function sendData(
    client: IClient | string,
    tag?: Uint8Array | string,
    data?: Uint8Array | string
): Promise<{
    block: IBlock;
    blockId: string;
}> {
    const localClient = typeof client === "string" ? new SingleNodeClient(client) : client;

    let localTagHex;
    let localDataHex;

    if (tag) {
        localTagHex = typeof tag === "string"
            ? Converter.utf8ToHex(tag, true)
            : Converter.bytesToHex(tag, true);

        // Length is -2 becuase we have added the 0x prefix
        if ((localTagHex.length - 2) / 2 > MAX_TAG_LENGTH) {
            throw new Error(
                `The tag length is ${localTagHex.length / 2
                }, which exceeds the maximum size of ${MAX_TAG_LENGTH}`
            );
        }
    }

    if (data) {
        localDataHex = HexHelper.addPrefix(typeof data === "string"
            ? Converter.utf8ToHex(data, true)
            : Converter.bytesToHex(data, true));
    }

    const taggedDataPayload: ITaggedDataPayload = {
        type: TAGGED_DATA_PAYLOAD_TYPE,
        tag: localTagHex,
        data: localDataHex
    };

    const block: IBlock = {
        payload: taggedDataPayload
    };

    const blockId = await localClient.blockSubmit(block);
    return {
        block,
        blockId
    };
}
