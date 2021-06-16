import type { ITipsResponse } from "../models/api/ITipsResponse";
import { IEd25519Address } from "../models/IEd25519Address";
import { IEd25519Signature } from "../models/IEd25519Signature";
import type { IIndexationPayload } from "../models/IIndexationPayload";
import type { IMessage } from "../models/IMessage";
import type { IMessageMetadata } from "../models/IMessageMetadata";
import type { IMigratedFunds } from "../models/IMigratedFunds";
import { IMilestonePayload } from "../models/IMilestonePayload";
import type { INodeInfo } from "../models/INodeInfo";
import { IReceiptPayload } from "../models/IReceiptPayload";
import { IReferenceUnlockBlock } from "../models/IReferenceUnlockBlock";
import { ISigLockedDustAllowanceOutput } from "../models/ISigLockedDustAllowanceOutput";
import { ISigLockedSingleOutput } from "../models/ISigLockedSingleOutput";
import { ISignatureUnlockBlock } from "../models/ISignatureUnlockBlock";
import { ITransactionPayload } from "../models/ITransactionPayload";
import { ITreasuryInput } from "../models/ITreasuryInput";
import { ITreasuryOutput } from "../models/ITreasuryOutput";
import { ITreasuryTransactionPayload } from "../models/ITreasuryTransactionPayload";
import { IUTXOInput } from "../models/IUTXOInput";
/**
 * Set the logger for output.
 * @param log The logger.
 */
export declare function setLogger(log: (message: string, data?: unknown) => void): void;
/**
 * Log the node information.
 * @param prefix The prefix for the output.
 * @param info The info to log.
 */
export declare function logInfo(prefix: string, info: INodeInfo): void;
/**
 * Log the tips information.
 * @param prefix The prefix for the output.
 * @param tipsResponse The tips to log.
 */
export declare function logTips(prefix: string, tipsResponse: ITipsResponse): void;
/**
 * Log a message to the console.
 * @param prefix The prefix for the output.
 * @param message The message to log.
 */
export declare function logMessage(prefix: string, message: IMessage): void;
/**
 * Log the message metadata to the console.
 * @param prefix The prefix for the output.
 * @param messageMetadata The messageMetadata to log.
 */
export declare function logMessageMetadata(prefix: string, messageMetadata: IMessageMetadata): void;
/**
 * Log a message to the console.
 * @param prefix The prefix for the output.
 * @param unknownPayload The payload.
 */
export declare function logPayload(prefix: string, unknownPayload?: ITransactionPayload | IMilestonePayload | IIndexationPayload | ITreasuryTransactionPayload | IReceiptPayload): void;
/**
 * Log a transaction payload to the console.
 * @param prefix The prefix for the output.
 * @param payload The payload.
 */
export declare function logTransactionPayload(prefix: string, payload?: ITransactionPayload): void;
/**
 * Log a indexation payload to the console.
 * @param prefix The prefix for the output.
 * @param payload The payload.
 */
export declare function logIndexationPayload(prefix: string, payload?: IIndexationPayload): void;
/**
 * Log a milestone payload to the console.
 * @param prefix The prefix for the output.
 * @param payload The payload.
 */
export declare function logMilestonePayload(prefix: string, payload?: IMilestonePayload): void;
/**
 * Log a receipt payload to the console.
 * @param prefix The prefix for the output.
 * @param payload The payload.
 */
export declare function logReceiptPayload(prefix: string, payload?: IReceiptPayload): void;
/**
 * Log a treasury transaction payload to the console.
 * @param prefix The prefix for the output.
 * @param payload The payload.
 */
export declare function logTreasuryTransactionPayload(prefix: string, payload?: ITreasuryTransactionPayload): void;
/**
 * Log an address to the console.
 * @param prefix The prefix for the output.
 * @param unknownAddress The address to log.
 */
export declare function logAddress(prefix: string, unknownAddress?: IEd25519Address): void;
/**
 * Log signature to the console.
 * @param prefix The prefix for the output.
 * @param unknownSignature The signature to log.
 */
export declare function logSignature(prefix: string, unknownSignature?: IEd25519Signature): void;
/**
 * Log input to the console.
 * @param prefix The prefix for the output.
 * @param unknownInput The input to log.
 */
export declare function logInput(prefix: string, unknownInput?: IUTXOInput | ITreasuryInput): void;
/**
 * Log output to the console.
 * @param prefix The prefix for the output.
 * @param unknownOutput The output to log.
 */
export declare function logOutput(prefix: string, unknownOutput?: ISigLockedSingleOutput | ISigLockedDustAllowanceOutput | ITreasuryOutput): void;
/**
 * Log unlock block to the console.
 * @param prefix The prefix for the output.
 * @param unknownUnlockBlock The unlock block to log.
 */
export declare function logUnlockBlock(prefix: string, unknownUnlockBlock?: ISignatureUnlockBlock | IReferenceUnlockBlock): void;
/**
 * Log fund to the console.
 * @param prefix The prefix for the output.
 * @param fund The fund to log.
 */
export declare function logFunds(prefix: string, fund?: IMigratedFunds): void;
