import { ITipsResponse } from "../models/api/ITipsResponse";
import { IMessage } from "../models/IMessage";
import { IMessageMetadata } from "../models/IMessageMetadata";
import { INodeInfo } from "../models/INodeInfo";
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
export declare function logPayload(prefix: string, unknownPayload?: ITypeBase<unknown>): void;
/**
 * Log an address to the console.
 * @param prefix The prefix for the output.
 * @param unknownAddress The address to log.
 */
export declare function logAddress(prefix: string, unknownAddress?: ITypeBase<unknown>): void;
/**
 * Log signature to the console.
 * @param prefix The prefix for the output.
 * @param unknownSignature The signature to log.
 */
export declare function logSignature(prefix: string, unknownSignature?: ITypeBase<unknown>): void;
/**
 * Log input to the console.
 * @param prefix The prefix for the output.
 * @param unknownInput The input to log.
 */
export declare function logInput(prefix: string, unknownInput?: ITypeBase<unknown>): void;
/**
 * Log output to the console.
 * @param prefix The prefix for the output.
 * @param unknownOutput The output to log.
 */
export declare function logOutput(prefix: string, unknownOutput?: ITypeBase<unknown>): void;
/**
 * Log unlock block to the console.
 * @param prefix The prefix for the output.
 * @param unknownUnlockBlock The unlock block to log.
 */
export declare function logUnlockBlock(prefix: string, unknownUnlockBlock?: ITypeBase<unknown>): void;
