import { ITipsResponse } from "../models/api/ITipsResponse";
import { IIndexationPayload } from "../models/IIndexationPayload";
import { IMessage } from "../models/IMessage";
import { IMessageMetadata } from "../models/IMessageMetadata";
import { IMigratedFunds } from "../models/IMigratedFunds";
import { IMilestonePayload } from "../models/IMilestonePayload";
import { INodeInfo } from "../models/INodeInfo";
import { IReceiptPayload } from "../models/IReceiptPayload";
import { ITransactionPayload } from "../models/ITransactionPayload";
import { ITreasuryTransactionPayload } from "../models/ITreasuryTransactionPayload";
import { ITypeBase } from "../models/ITypeBase";
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
export declare function logPayload(prefix: string, unknownPayload?: ITypeBase<number>): void;
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
export declare function logAddress(prefix: string, unknownAddress?: ITypeBase<number>): void;
/**
 * Log signature to the console.
 * @param prefix The prefix for the output.
 * @param unknownSignature The signature to log.
 */
export declare function logSignature(prefix: string, unknownSignature?: ITypeBase<number>): void;
/**
 * Log input to the console.
 * @param prefix The prefix for the output.
 * @param unknownInput The input to log.
 */
export declare function logInput(prefix: string, unknownInput?: ITypeBase<number>): void;
/**
 * Log output to the console.
 * @param prefix The prefix for the output.
 * @param unknownOutput The output to log.
 */
export declare function logOutput(prefix: string, unknownOutput?: ITypeBase<number>): void;
/**
 * Log unlock block to the console.
 * @param prefix The prefix for the output.
 * @param unknownUnlockBlock The unlock block to log.
 */
export declare function logUnlockBlock(prefix: string, unknownUnlockBlock?: ITypeBase<number>): void;
/**
 * Log fund to the console.
 * @param prefix The prefix for the output.
 * @param fund The fund to log.
 */
export declare function logFunds(prefix: string, fund?: IMigratedFunds): void;
