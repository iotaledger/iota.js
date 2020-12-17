import { IClient } from "../models/IClient";
import { ISeed } from "../models/ISeed";
/**
 * Get the first unspent address.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param accountIndex The account index in the wallet.
 * @param startIndex Optional start index for the wallet count address, defaults to 0.
 * @returns The first unspent address.
 */
export declare function getUnspentAddress(client: IClient, seed: ISeed, accountIndex: number, startIndex?: number): Promise<{
    address: string;
    path: string;
    balance: number;
} | undefined>;
