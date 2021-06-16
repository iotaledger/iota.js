import type { IClient } from "../models/IClient";
import type { IKeyPair } from "../models/IKeyPair";
import type { IMessage } from "../models/IMessage";
import type { ISeed } from "../models/ISeed";
import { IUTXOInput } from "../models/IUTXOInput";
/**
 * Send a transfer from the balance on the seed to a single output.
 * @param client The client or node endpoint to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param accountIndex The account index in the wallet.
 * @param addressBech32 The address to send the funds to in bech32 format.
 * @param amount The amount to send.
 * @param indexation Optional indexation data to associate with the transaction.
 * @param indexation.key Indexation key.
 * @param indexation.data Optional index data.
 * @param addressOptions Optional address configuration for balance address lookups.
 * @param addressOptions.startIndex The start index for the wallet count address, defaults to 0.
 * @param addressOptions.zeroCount The number of addresses with 0 balance during lookup before aborting.
 * @returns The id of the message created and the contructed message.
 */
export declare function send(client: IClient | string, seed: ISeed, accountIndex: number, addressBech32: string, amount: number, indexation?: {
    key: Uint8Array | string;
    data?: Uint8Array | string;
}, addressOptions?: {
    startIndex?: number;
    zeroCount?: number;
}): Promise<{
    messageId: string;
    message: IMessage;
}>;
/**
 * Send a transfer from the balance on the seed to a single output.
 * @param client The client or node endpoint to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param accountIndex The account index in the wallet.
 * @param addressEd25519 The address to send the funds to in ed25519 format.
 * @param amount The amount to send.
 * @param indexation Optional indexation data to associate with the transaction.
 * @param indexation.key Indexation key.
 * @param indexation.data Optional index data.
 * @param addressOptions Optional address configuration for balance address lookups.
 * @param addressOptions.startIndex The start index for the wallet count address, defaults to 0.
 * @param addressOptions.zeroCount The number of addresses with 0 balance during lookup before aborting.
 * @returns The id of the message created and the contructed message.
 */
export declare function sendEd25519(client: IClient | string, seed: ISeed, accountIndex: number, addressEd25519: string, amount: number, indexation?: {
    key: Uint8Array;
    data?: Uint8Array;
}, addressOptions?: {
    startIndex?: number;
    zeroCount?: number;
}): Promise<{
    messageId: string;
    message: IMessage;
}>;
/**
 * Send a transfer from the balance on the seed to multiple outputs.
 * @param client The client or node endpoint to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param accountIndex The account index in the wallet.
 * @param outputs The address to send the funds to in bech32 format and amounts.
 * @param indexation Optional indexation data to associate with the transaction.
 * @param indexation.key Indexation key.
 * @param indexation.data Optional index data.
 * @param addressOptions Optional address configuration for balance address lookups.
 * @param addressOptions.startIndex The start index for the wallet count address, defaults to 0.
 * @param addressOptions.zeroCount The number of addresses with 0 balance during lookup before aborting.
 * @returns The id of the message created and the contructed message.
 */
export declare function sendMultiple(client: IClient | string, seed: ISeed, accountIndex: number, outputs: {
    addressBech32: string;
    amount: number;
    isDustAllowance?: boolean;
}[], indexation?: {
    key: Uint8Array | string;
    data?: Uint8Array | string;
}, addressOptions?: {
    startIndex?: number;
    zeroCount?: number;
}): Promise<{
    messageId: string;
    message: IMessage;
}>;
/**
 * Send a transfer from the balance on the seed.
 * @param client The client or node endpoint to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param accountIndex The account index in the wallet.
 * @param outputs The outputs including address to send the funds to in ed25519 format and amount.
 * @param indexation Optional indexation data to associate with the transaction.
 * @param indexation.key Indexation key.
 * @param indexation.data Optional index data.
 * @param addressOptions Optional address configuration for balance address lookups.
 * @param addressOptions.startIndex The start index for the wallet count address, defaults to 0.
 * @param addressOptions.zeroCount The number of addresses with 0 balance during lookup before aborting.
 * @returns The id of the message created and the contructed message.
 */
export declare function sendMultipleEd25519(client: IClient | string, seed: ISeed, accountIndex: number, outputs: {
    addressEd25519: string;
    amount: number;
    isDustAllowance?: boolean;
}[], indexation?: {
    key: Uint8Array;
    data?: Uint8Array;
}, addressOptions?: {
    startIndex?: number;
    zeroCount?: number;
}): Promise<{
    messageId: string;
    message: IMessage;
}>;
/**
 * Send a transfer using account based indexing for the inputs.
 * @param client The client or node endpoint to send the transfer with.
 * @param seed The seed to use for address generation.
 * @param initialAddressState The initial address state for calculating the addresses.
 * @param nextAddressPath Calculate the next address for inputs.
 * @param outputs The address to send the funds to in bech32 format and amounts.
 * @param indexation Optional indexation data to associate with the transaction.
 * @param indexation.key Indexation key.
 * @param indexation.data Optional index data.
 * @param zeroCount The number of addresses with 0 balance during lookup before aborting.
 * @returns The id of the message created and the contructed message.
 */
export declare function sendWithAddressGenerator<T>(client: IClient | string, seed: ISeed, initialAddressState: T, nextAddressPath: (addressState: T, isFirst: boolean) => string, outputs: {
    address: string;
    addressType: number;
    amount: number;
    isDustAllowance?: boolean;
}[], indexation?: {
    key: Uint8Array | string;
    data?: Uint8Array | string;
}, zeroCount?: number): Promise<{
    messageId: string;
    message: IMessage;
}>;
/**
 * Calculate the inputs from the seed and basePath.
 * @param client The client or node endpoint to calculate the inputs with.
 * @param seed The seed to use for address generation.
 * @param initialAddressState The initial address state for calculating the addresses.
 * @param nextAddressPath Calculate the next address for inputs.
 * @param outputs The outputs to send.
 * @param zeroCount Abort when the number of zero balances is exceeded.
 * @returns The id of the message created and the contructed message.
 */
export declare function calculateInputs<T>(client: IClient | string, seed: ISeed, initialAddressState: T, nextAddressPath: (addressState: T, isFirst: boolean) => string, outputs: {
    address: string;
    addressType: number;
    amount: number;
}[], zeroCount?: number): Promise<{
    input: IUTXOInput;
    addressKeyPair: IKeyPair;
}[]>;
