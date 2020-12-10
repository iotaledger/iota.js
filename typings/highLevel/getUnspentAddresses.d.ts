import { Bip32Path } from "../crypto/bip32Path";
import { IClient } from "../models/IClient";
import { ISeed } from "../models/ISeed";
/**
 * Get all the unspent addresses.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param basePath The base path to start looking for addresses.
 * @param startIndex Optional start index for the wallet count address, defaults to 0.
 * @param countLimit Limit the number of items to find.
 * @returns All the unspent addresses.
 */
export declare function getUnspentAddresses(client: IClient, seed: ISeed, basePath: Bip32Path, startIndex?: number, countLimit?: number): Promise<{
    address: string;
    index: number;
    balance: number;
}[]>;
