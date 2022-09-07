// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { HexHelper } from "@iota/util.js";
import bigInt, { BigInteger } from "big-integer";
import { IndexerPluginClient } from "../clients/plugins/indexerPluginClient";
import { SingleNodeClient } from "../clients/singleNodeClient";
import type { IClient } from "../models/IClient";
import type { ICommonOutput } from "../models/outputs/ICommonOutput";

/**
 * Get the balance for an address.
 * @param client The client or node endpoint to get the information from.
 * @param addressBech32 The address to get the balances for.
 * @returns The balance.
 */
export async function addressBalance(
    client: IClient | string,
    addressBech32: string
): Promise<{
    balance: BigInteger;
    nativeTokens: { [id: string]: BigInteger };
    ledgerIndex: number;
}> {
    const localClient = typeof client === "string" ? new SingleNodeClient(client) : client;

    const indexerPluginClient = new IndexerPluginClient(localClient);

    let total: BigInteger = bigInt(0);
    let ledgerIndex = 0;
    const nativeTokens: { [id: string]: BigInteger } = {};

    let response;
    let expirationResponse;
    let cursor;
    let expirationCursor;
    do {
        response = await indexerPluginClient.basicOutputs({ addressBech32, cursor });

        for (const outputId of response.items) {
            const output = await localClient.output(outputId);

            if (!output.metadata.isSpent) {
                total = total.plus(output.output.amount);

                const nativeTokenOutput = output.output as ICommonOutput;
                if (Array.isArray(nativeTokenOutput.nativeTokens)) {
                    for (const token of nativeTokenOutput.nativeTokens) {
                        nativeTokens[token.id] = nativeTokens[token.id] ?? bigInt(0);
                        nativeTokens[token.id] = nativeTokens[token.id].add(HexHelper.toBigInt256(token.amount));
                    }
                }
            }
            ledgerIndex = output.metadata.ledgerIndex;
        }
        cursor = response.cursor;
    } while (cursor && response.items.length > 0);

    do {
        expirationResponse = await indexerPluginClient.outputs({
            expirationReturnAddressBech32: addressBech32,
            expiresBefore: Math.floor(Date.now() / 1000),
            cursor: expirationCursor
        });

        for (const outputId of expirationResponse.items) {
            const output = await localClient.output(outputId);

            if (!output.metadata.isSpent) {
                total = total.plus(output.output.amount);
            }
        }
        expirationCursor = expirationResponse.cursor;
    } while (expirationCursor && expirationResponse.items.length > 0);

    return {
        balance: total,
        nativeTokens,
        ledgerIndex
    };
}
