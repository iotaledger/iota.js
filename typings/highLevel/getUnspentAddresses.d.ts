import { Bip32Path } from "../crypto/bip32Path";
import { IAccountAddressGeneratorState } from "../models/IAccountAddressGeneratorState";
import { IBip32PathAddressGeneratorState } from "../models/IBip32PathAddressGeneratorState";
import { IClient } from "../models/IClient";
import { IKeyPair } from "../models/IKeyPair";
import { ISeed } from "../models/ISeed";
/**
 * Get all the unspent addresses.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param accountIndex The account index in the wallet.
 * @param startIndex Optional start index for the wallet count address, defaults to 0.
 * @param countLimit Limit the number of items to find.
 * @param zeroCount Abort when the number of zero balances is exceeded.
 * @returns All the unspent addresses.
 */
export declare function getUnspentAddresses(client: IClient, seed: ISeed, accountIndex: number, startIndex?: number, countLimit?: number, zeroCount?: number): Promise<{
    addressBech32: string;
    keyPair: IKeyPair;
    state: IAccountAddressGeneratorState;
    balance: number;
}[]>;
/**
 * Get all the unspent addresses with a bip32 base path.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param basePath The base path.
 * @param startIndex Optional start index for the wallet count address, defaults to 0.
 * @param countLimit Limit the number of items to find.
 * @param zeroCount Abort when the number of zero balances is exceeded.
 * @returns All the unspent addresses.
 */
export declare function getUnspentAddressesBip32(client: IClient, seed: ISeed, basePath: Bip32Path, startIndex?: number, countLimit?: number, zeroCount?: number): Promise<{
    addressBech32: string;
    keyPair: IKeyPair;
    state: IBip32PathAddressGeneratorState;
    balance: number;
}[]>;
/**
 * Get all the unspent addresses using an address generator.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param initialAddressState The initial address state for calculating the addresses.
 * @param nextAddress Calculate the next address for inputs.
 * @param countLimit Limit the number of items to find.
 * @param zeroCount Abort when the number of zero balances is exceeded.
 * @returns All the unspent addresses.
 */
export declare function getUnspentAddressesWithAddressGenerator<T>(client: IClient, seed: ISeed, initialAddressState: T, nextAddress: (s: ISeed, addressState: T, isFirst: boolean) => {
    keyPair: IKeyPair;
    path?: Bip32Path;
}, countLimit?: number, zeroCount?: number): Promise<{
    addressBech32: string;
    keyPair: IKeyPair;
    state: T;
    balance: number;
}[]>;
