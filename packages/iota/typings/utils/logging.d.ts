import type { AddressTypes } from "../models/addresses/addressTypes";
import type { ITipsResponse } from "../models/api/ITipsResponse";
import type { IMessage } from "../models/IMessage";
import type { IMessageMetadata } from "../models/IMessageMetadata";
import type { IMigratedFunds } from "../models/IMigratedFunds";
import type { INodeInfo } from "../models/INodeInfo";
import type { InputTypes } from "../models/inputs/inputTypes";
import type { OutputTypes } from "../models/outputs/outputTypes";
import type { IIndexationPayload } from "../models/payloads/IIndexationPayload";
import { IMilestonePayload } from "../models/payloads/IMilestonePayload";
import { IReceiptPayload } from "../models/payloads/IReceiptPayload";
import { ITransactionPayload } from "../models/payloads/ITransactionPayload";
import { ITreasuryTransactionPayload } from "../models/payloads/ITreasuryTransactionPayload";
import type { PayloadTypes } from "../models/payloads/payloadTypes";
import type { SignatureTypes } from "../models/signatures/signatureTypes";
import type { UnlockBlockTypes } from "../models/unlockBlocks/unlockBlockTypes";
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
 * @param payload The payload.
 */
export declare function logPayload(prefix: string, payload?: PayloadTypes): void;
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
 * @param address The address to log.
 */
export declare function logAddress(prefix: string, address?: AddressTypes): void;
/**
 * Log signature to the console.
 * @param prefix The prefix for the output.
 * @param signature The signature to log.
 */
export declare function logSignature(prefix: string, signature?: SignatureTypes): void;
/**
 * Log input to the console.
 * @param prefix The prefix for the output.
 * @param input The input to log.
 */
export declare function logInput(prefix: string, input?: InputTypes): void;
/**
 * Log output to the console.
 * @param prefix The prefix for the output.
 * @param output The output to log.
 */
export declare function logOutput(prefix: string, output?: OutputTypes): void;
/**
 * Log unlock block to the console.
 * @param prefix The prefix for the output.
 * @param unlockBlock The unlock block to log.
 */
export declare function logUnlockBlock(prefix: string, unlockBlock?: UnlockBlockTypes): void;
/**
 * Log fund to the console.
 * @param prefix The prefix for the output.
 * @param fund The fund to log.
 */
export declare function logFunds(prefix: string, fund?: IMigratedFunds): void;
