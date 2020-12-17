import { IClient } from "../models/IClient";
import { IKeyPair } from "../models/IKeyPair";
import { IMessage } from "../models/IMessage";
import { ISeed } from "../models/ISeed";
import { IUTXOInput } from "../models/IUTXOInput";
/**
 * Send a transfer from the balance on the seed to a single output.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param accountIndex The account index in the wallet.
 * @param addressBech32 The address to send the funds to in bech32 format.
 * @param amount The amount to send.
 * @param startIndex The start index for the wallet count address, defaults to 0.
 * @returns The id of the message created and the contructed message.
 */
export declare function send(client: IClient, seed: ISeed, accountIndex: number, addressBech32: string, amount: number, startIndex?: number): Promise<{
    messageId: string;
    message: IMessage;
}>;
/**
 * Send a transfer from the balance on the seed to a single output.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param accountIndex The account index in the wallet.
 * @param addressEd25519 The address to send the funds to in ed25519 format.
 * @param amount The amount to send.
 * @param startIndex The start index for the wallet count address, defaults to 0.
 * @returns The id of the message created and the contructed message.
 */
export declare function sendEd25519(client: IClient, seed: ISeed, accountIndex: number, addressEd25519: string, amount: number, startIndex?: number): Promise<{
    messageId: string;
    message: IMessage;
}>;
/**
 * Send a transfer from the balance on the seed to multiple outputs.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param accountIndex The account index in the wallet.
 * @param outputs The address to send the funds to in bech32 format and amounts.
 * @param startIndex The start index for the wallet count address, defaults to 0.
 * @returns The id of the message created and the contructed message.
 */
export declare function sendMultiple(client: IClient, seed: ISeed, accountIndex: number, outputs: {
    addressBech32: string;
    amount: number;
}[], startIndex?: number): Promise<{
    messageId: string;
    message: IMessage;
}>;
/**
 * Send a transfer from the balance on the seed.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param accountIndex The account index in the wallet.
 * @param outputs The outputs including address to send the funds to in ed25519 format and amount.
 * @param startIndex The start index for the wallet count address, defaults to 0.
 * @returns The id of the message created and the contructed message.
 */
export declare function sendMultipleEd25519(client: IClient, seed: ISeed, accountIndex: number, outputs: {
    addressEd25519: string;
    amount: number;
}[], startIndex?: number): Promise<{
    messageId: string;
    message: IMessage;
}>;
/**
 * Send a transfer using account based indexing for the inputs.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param initialAddressState The initial address state for calculating the addresses.
 * @param nextAddressPath Calculate the next address for inputs.
 * @param outputs The address to send the funds to in bech32 format and amounts.
 * @returns The id of the message created and the contructed message.
 */
export declare function sendWithAddressGenerator<T>(client: IClient, seed: ISeed, initialAddressState: T, nextAddressPath: (addressState: T, isFirst: boolean) => string, outputs: {
    address: string;
    addressType: number;
    amount: number;
}[]): Promise<{
    messageId: string;
    message: IMessage;
}>;
/**
 * Calculate the inputs from the seed and basePath.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param initialAddressState The initial address state for calculating the addresses.
 * @param nextAddressPath Calculate the next address for inputs.
 * @param outputs The outputs to send.
 * @param zeroCount Abort when the number of zero balances is exceeded.
 * @returns The id of the message created and the contructed message.
 */
export declare function calculateInputs<T>(client: IClient, seed: ISeed, initialAddressState: T, nextAddressPath: (addressState: T, isFirst: boolean) => string, outputs: {
    address: string;
    addressType: number;
    amount: number;
}[], zeroCount: number): Promise<{
    input: IUTXOInput;
    addressKeyPair: IKeyPair;
}[]>;
