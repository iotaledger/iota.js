import { Bip32Path } from "../crypto/bip32Path";
import { IClient } from "../models/IClient";
import { ISeed } from "../models/ISeed";
/**
 * Get the first unspent address.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param basePath The base path to start looking for addresses.
 * @param startIndex Optional start index for the wallet count address, defaults to 0.
 * @returns The first unspent address.
 */
export declare function getUnspentAddress(client: IClient, seed: ISeed, basePath: Bip32Path, startIndex?: number): Promise<{
    address: string;
    index: number;
    balance: number;
} | undefined>;
