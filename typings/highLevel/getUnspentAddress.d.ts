import type { IClient } from "../models/IClient";
import type { ISeed } from "../models/ISeed";
/**
 * Get the first unspent address.
 * @param client The client or node endpoint to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param accountIndex The account index in the wallet.
 * @param addressOptions Optional address configuration for balance address lookups.
 * @param addressOptions.startIndex The start index for the wallet count address, defaults to 0.
 * @param addressOptions.zeroCount The number of addresses with 0 balance during lookup before aborting.
 * @returns The first unspent address.
 */
export declare function getUnspentAddress(client: IClient | string, seed: ISeed, accountIndex: number, addressOptions?: {
    startIndex?: number;
    zeroCount?: number;
}): Promise<{
    address: string;
    path: string;
    balance: number;
} | undefined>;
