import { Bip32Path } from "../crypto/bip32Path";
import { IClient } from "../models/IClient";
import { IKeyPair } from "../models/IKeyPair";
import { IMessage } from "../models/IMessage";
import { ISeed } from "../models/ISeed";
import { IUTXOInput } from "../models/IUTXOInput";
/**
 * Send a transfer from the balance on the seed to a single output.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param basePath The base path to start looking for addresses.
 * @param addressBech32 The address to send the funds to in bech32 format.
 * @param amount The amount to send.
 * @param startIndex The start index for the wallet count address, defaults to 0.
 * @returns The id of the message created and the contructed message.
 */
export declare function send(client: IClient, seed: ISeed, basePath: Bip32Path, addressBech32: string, amount: number, startIndex?: number): Promise<{
    messageId: string;
    message: IMessage;
}>;
/**
 * Send a transfer from the balance on the seed to a single output.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param basePath The base path to start looking for addresses.
 * @param addressEd25519 The address to send the funds to in ed25519 format.
 * @param amount The amount to send.
 * @param startIndex The start index for the wallet count address, defaults to 0.
 * @returns The id of the message created and the contructed message.
 */
export declare function sendEd25519(client: IClient, seed: ISeed, basePath: Bip32Path, addressEd25519: string, amount: number, startIndex?: number): Promise<{
    messageId: string;
    message: IMessage;
}>;
/**
 * Send a transfer from the balance on the seed to multiple outputs.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param basePath The base path to start looking for addresses.
 * @param outputs The address to send the funds to in bech32 format and amounts.
 * @param startIndex The start index for the wallet count address, defaults to 0.
 * @returns The id of the message created and the contructed message.
 */
export declare function sendMultiple(client: IClient, seed: ISeed, basePath: Bip32Path, outputs: {
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
 * @param basePath The base path to start looking for addresses.
 * @param outputs The outputs including address to send the funds to in ed25519 format and amount.
 * @param startIndex The start index for the wallet count address, defaults to 0.
 * @returns The id of the message created and the contructed message.
 */
export declare function sendMultipleEd25519(client: IClient, seed: ISeed, basePath: Bip32Path, outputs: {
    addressEd25519: string;
    amount: number;
}[], startIndex?: number): Promise<{
    messageId: string;
    message: IMessage;
}>;
/**
 * Calculate the inputs from the seed and basePath.
 * @param client The client to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param basePath The base path to start looking for addresses.
 * @param outputs The outputs to send.
 * @param startIndex The start index for the wallet count address, defaults to 0.
 * @returns The id of the message created and the contructed message.
 */
export declare function calculateInputs(client: IClient, seed: ISeed, basePath: Bip32Path, outputs: {
    address: string;
    addressType: number;
    amount: number;
}[], startIndex?: number): Promise<{
    input: IUTXOInput;
    addressKeyPair: IKeyPair;
}[]>;
