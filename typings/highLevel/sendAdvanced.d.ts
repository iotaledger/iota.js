import type { IClient } from "../models/IClient";
import type { IKeyPair } from "../models/IKeyPair";
import type { IMessage } from "../models/IMessage";
import { ITransactionPayload } from "../models/ITransactionPayload";
import type { IUTXOInput } from "../models/IUTXOInput";
/**
 * Send a transfer from the balance on the seed.
 * @param client The client or node endpoint to send the transfer with.
 * @param inputsAndSignatureKeyPairs The inputs with the signature key pairs needed to sign transfers.
 * @param outputs The outputs to send.
 * @param indexation Optional indexation data to associate with the transaction.
 * @param indexation.key Indexation key.
 * @param indexation.data Optional index data.
 * @returns The id of the message created and the remainder address if one was needed.
 */
export declare function sendAdvanced(client: IClient | string, inputsAndSignatureKeyPairs: {
    input: IUTXOInput;
    addressKeyPair: IKeyPair;
}[], outputs: {
    address: string;
    addressType: number;
    amount: number;
    isDustAllowance?: boolean;
}[], indexation?: {
    key: Uint8Array | string;
    data?: Uint8Array | string;
}): Promise<{
    messageId: string;
    message: IMessage;
}>;
/**
 * Build a transaction payload.
 * @param inputsAndSignatureKeyPairs The inputs with the signature key pairs needed to sign transfers.
 * @param outputs The outputs to send.
 * @param indexation Optional indexation data to associate with the transaction.
 * @param indexation.key Indexation key.
 * @param indexation.data Optional index data.
 * @returns The transaction payload.
 */
export declare function buildTransactionPayload(inputsAndSignatureKeyPairs: {
    input: IUTXOInput;
    addressKeyPair: IKeyPair;
}[], outputs: {
    address: string;
    addressType: number;
    amount: number;
    isDustAllowance?: boolean;
}[], indexation?: {
    key: Uint8Array | string;
    data?: Uint8Array | string;
}): ITransactionPayload;
