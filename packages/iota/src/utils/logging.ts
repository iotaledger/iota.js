// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter } from "@iota/util.js";
import type { AddressTypes } from "../models/addresses/addressTypes";
import { ALIAS_ADDRESS_TYPE } from "../models/addresses/IAliasAddress";
import { BLS_ADDRESS_TYPE } from "../models/addresses/IBlsAddress";
import { ED25519_ADDRESS_TYPE } from "../models/addresses/IEd25519Address";
import { NFT_ADDRESS_TYPE } from "../models/addresses/INftAddress";
import type { ITipsResponse } from "../models/api/ITipsResponse";
import type { FeatureBlockTypes } from "../models/featureBlocks/featureBlockTypes";
import { ISSUER_FEATURE_BLOCK_TYPE } from "../models/featureBlocks/IIssuerFeatureBlock";
import { METADATA_FEATURE_BLOCK_TYPE } from "../models/featureBlocks/IMetadataFeatureBlock";
import { SENDER_FEATURE_BLOCK_TYPE } from "../models/featureBlocks/ISenderFeatureBlock";
import { TAG_FEATURE_BLOCK_TYPE } from "../models/featureBlocks/ITagFeatureBlock";
import type { IMessage } from "../models/IMessage";
import type { IMessageMetadata } from "../models/IMessageMetadata";
import type { IMigratedFunds } from "../models/IMigratedFunds";
import type { INativeToken } from "../models/INativeToken";
import type { INodeInfo } from "../models/INodeInfo";
import type { InputTypes } from "../models/inputs/inputTypes";
import { TREASURY_INPUT_TYPE } from "../models/inputs/ITreasuryInput";
import { UTXO_INPUT_TYPE } from "../models/inputs/IUTXOInput";
import { TRANSACTION_ESSENCE_TYPE } from "../models/ITransactionEssence";
import { ALIAS_OUTPUT_TYPE } from "../models/outputs/IAliasOutput";
import { EXTENDED_OUTPUT_TYPE } from "../models/outputs/IExtendedOutput";
import { FOUNDRY_OUTPUT_TYPE } from "../models/outputs/IFoundryOutput";
import { NFT_OUTPUT_TYPE } from "../models/outputs/INftOutput";
import { TREASURY_OUTPUT_TYPE } from "../models/outputs/ITreasuryOutput";
import type { OutputTypes } from "../models/outputs/outputTypes";
import { IMilestonePayload, MILESTONE_PAYLOAD_TYPE } from "../models/payloads/IMilestonePayload";
import { IReceiptPayload, RECEIPT_PAYLOAD_TYPE } from "../models/payloads/IReceiptPayload";
import type { ITaggedDataPayload } from "../models/payloads/ITaggedDataPayload";
import { TAGGED_DATA_PAYLOAD_TYPE } from "../models/payloads/ITaggedDataPayload";
import { ITransactionPayload, TRANSACTION_PAYLOAD_TYPE } from "../models/payloads/ITransactionPayload";
import {
    ITreasuryTransactionPayload,
    TREASURY_TRANSACTION_PAYLOAD_TYPE
} from "../models/payloads/ITreasuryTransactionPayload";
import type { PayloadTypes } from "../models/payloads/payloadTypes";
import { ED25519_SIGNATURE_TYPE } from "../models/signatures/IEd25519Signature";
import type { SignatureTypes } from "../models/signatures/signatureTypes";
import { SIMPLE_TOKEN_SCHEME_TYPE } from "../models/tokenSchemes/ISimpleTokenScheme";
import type { TokenSchemeTypes } from "../models/tokenSchemes/tokenSchemeTypes";
import { ALIAS_UNLOCK_BLOCK_TYPE } from "../models/unlockBlocks/IAliasUnlockBlock";
import { NFT_UNLOCK_BLOCK_TYPE } from "../models/unlockBlocks/INftUnlockBlock";
import { REFERENCE_UNLOCK_BLOCK_TYPE } from "../models/unlockBlocks/IReferenceUnlockBlock";
import { SIGNATURE_UNLOCK_BLOCK_TYPE } from "../models/unlockBlocks/ISignatureUnlockBlock";
import type { UnlockBlockTypes } from "../models/unlockBlocks/unlockBlockTypes";
import { ADDRESS_UNLOCK_CONDITION_TYPE } from "../models/unlockConditions/IAddressUnlockCondition";
import { DUST_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE } from "../models/unlockConditions/IDustDepositReturnUnlockCondition";
import { EXPIRATION_UNLOCK_CONDITION_TYPE } from "../models/unlockConditions/IExpirationUnlockCondition";
import { GOVERNOR_UNLOCK_CONDITION_TYPE } from "../models/unlockConditions/IGovernorUnlockCondition";
import { STATE_CONTROLLER_UNLOCK_CONDITION_TYPE } from "../models/unlockConditions/IStateControllerUnlockCondition";
import { TIMELOCK_UNLOCK_CONDITION_TYPE } from "../models/unlockConditions/ITimelockUnlockCondition";
import type { UnlockConditionTypes } from "../models/unlockConditions/unlockConditionTypes";


/**
 * The logger used by the log methods.
 * @param message The message to output.
 * @param data The data to output.
 * @returns Nothing.
 */
// eslint-disable-next-line no-confusing-arrow
let logger: (message: string, data?: unknown) => void = (message: string, data: unknown) =>
    data !== undefined ? console.log(message, data) : console.log(message);

/**
 * Set the logger for output.
 * @param log The logger.
 */
export function setLogger(log: (message: string, data?: unknown) => void): void {
    logger = log;
}

/**
 * Log the node information.
 * @param prefix The prefix for the output.
 * @param info The info to log.
 */
export function logInfo(prefix: string, info: INodeInfo): void {
    logger(`${prefix}\tName:`, info.name);
    logger(`${prefix}\tVersion:`, info.version);
    logger(`${prefix}\tNetwork Id:`, info.networkId);
    logger(`${prefix}\tIs Healthy:`, info.isHealthy);
    logger(`${prefix}\tMin PoW Score:`, info.minPoWScore);
    logger(`${prefix}\tBech32 HRP:`, info.bech32HRP);
    logger(`${prefix}\tLatest Milestone Index:`, info.latestMilestoneIndex);
    logger(`${prefix}\tLatest Milestone Timestamp:`, info.latestMilestoneTimestamp);
    logger(`${prefix}\tConfirmed Milestone Index:`, info.confirmedMilestoneIndex);
    logger(`${prefix}\tMessages Per Second:`, info.messagesPerSecond);
    logger(`${prefix}\tReferenced Messages Per Second:`, info.referencedMessagesPerSecond);
    logger(`${prefix}\tReferenced Rate:`, info.referencedRate);
    logger(`${prefix}\tPruning Index:`, info.pruningIndex);
    logger(`${prefix}\tFeatures:`, info.features);
}

/**
 * Log the tips information.
 * @param prefix The prefix for the output.
 * @param tipsResponse The tips to log.
 */
export function logTips(prefix: string, tipsResponse: ITipsResponse): void {
    if (tipsResponse.tipMessageIds) {
        for (let i = 0; i < tipsResponse.tipMessageIds.length; i++) {
            logger(`${prefix}\tTip ${i + 1} Message Id:`, tipsResponse.tipMessageIds[i]);
        }
    }
}

/**
 * Log a message to the console.
 * @param prefix The prefix for the output.
 * @param message The message to log.
 */
export function logMessage(prefix: string, message: IMessage): void {
    logger(`${prefix}\tNetwork Id:`, message.networkId);
    if (message.parentMessageIds) {
        for (let i = 0; i < message.parentMessageIds.length; i++) {
            logger(`${prefix}\tParent ${i + 1} Message Id:`, message.parentMessageIds[i]);
        }
    }
    logPayload(`${prefix}\t`, message.payload);
    if (message.nonce !== undefined) {
        logger(`${prefix}\tNonce:`, message.nonce);
    }
}

/**
 * Log the message metadata to the console.
 * @param prefix The prefix for the output.
 * @param messageMetadata The messageMetadata to log.
 */
export function logMessageMetadata(prefix: string, messageMetadata: IMessageMetadata): void {
    logger(`${prefix}\tMessage Id:`, messageMetadata.messageId);
    if (messageMetadata.parentMessageIds) {
        for (let i = 0; i < messageMetadata.parentMessageIds.length; i++) {
            logger(`${prefix}\tParent ${i + 1} Message Id:`, messageMetadata.parentMessageIds[i]);
        }
    }
    if (messageMetadata.isSolid !== undefined) {
        logger(`${prefix}\tIs Solid:`, messageMetadata.isSolid);
    }
    if (messageMetadata.milestoneIndex !== undefined) {
        logger(`${prefix}\tMilestone Index:`, messageMetadata.milestoneIndex);
    }
    if (messageMetadata.referencedByMilestoneIndex !== undefined) {
        logger(`${prefix}\tReferenced By Milestone Index:`, messageMetadata.referencedByMilestoneIndex);
    }
    logger(`${prefix}\tLedger Inclusion State:`, messageMetadata.ledgerInclusionState);
    if (messageMetadata.conflictReason !== undefined) {
        logger(`${prefix}\tConflict Reason:`, messageMetadata.conflictReason);
    }
    if (messageMetadata.shouldPromote !== undefined) {
        logger(`${prefix}\tShould Promote:`, messageMetadata.shouldPromote);
    }
    if (messageMetadata.shouldReattach !== undefined) {
        logger(`${prefix}\tShould Reattach:`, messageMetadata.shouldReattach);
    }
}

/**
 * Log a message to the console.
 * @param prefix The prefix for the output.
 * @param payload The payload.
 */
export function logPayload(prefix: string, payload?: PayloadTypes): void {
    if (payload) {
        if (payload.type === TRANSACTION_PAYLOAD_TYPE) {
            logTransactionPayload(prefix, payload);
        } else if (payload.type === MILESTONE_PAYLOAD_TYPE) {
            logMilestonePayload(prefix, payload);
        } else if (payload.type === RECEIPT_PAYLOAD_TYPE) {
            logReceiptPayload(prefix, payload);
        } else if (payload.type === TREASURY_TRANSACTION_PAYLOAD_TYPE) {
            logTreasuryTransactionPayload(prefix, payload);
        } else if (payload.type === TAGGED_DATA_PAYLOAD_TYPE) {
            logTaggedDataPayload(prefix, payload);
        }
    }
}

/**
 * Log a transaction payload to the console.
 * @param prefix The prefix for the output.
 * @param payload The payload.
 */
export function logTransactionPayload(prefix: string, payload?: ITransactionPayload): void {
    if (payload) {
        logger(`${prefix}Transaction Payload`);
        if (payload.essence.type === TRANSACTION_ESSENCE_TYPE) {
            if (payload.essence.inputs) {
                logger(`${prefix}\tInputs:`, payload.essence.inputs.length);
                for (const input of payload.essence.inputs) {
                    logInput(`${prefix}\t\t`, input);
                }
            }
            if (payload.essence.outputs) {
                logger(`${prefix}\tOutputs:`, payload.essence.outputs.length);
                for (const output of payload.essence.outputs) {
                    logOutput(`${prefix}\t\t`, output);
                }
            }
        }
        if (payload.unlockBlocks) {
            logger(`${prefix}\tUnlock Blocks:`, payload.unlockBlocks.length);
            for (const unlockBlock of payload.unlockBlocks) {
                logUnlockBlock(`${prefix}\t\t`, unlockBlock);
            }
        }
    }
}

/**
 * Log a tagged data payload to the console.
 * @param prefix The prefix for the output.
 * @param payload The payload.
 */
export function logTaggedDataPayload(prefix: string, payload?: ITaggedDataPayload): void {
    if (payload) {
        logger(`${prefix}Tagged Data Payload`);
        logger(`${prefix}\tTag:`, payload.tag ? Converter.hexToUtf8(payload.tag) : "None");
        logger(`${prefix}\tData:`, payload.data ? Converter.hexToUtf8(payload.data) : "None");
    }
}

/**
 * Log a milestone payload to the console.
 * @param prefix The prefix for the output.
 * @param payload The payload.
 */
export function logMilestonePayload(prefix: string, payload?: IMilestonePayload): void {
    if (payload) {
        logger(`${prefix}Milestone Payload`);
        logger(`${prefix}\tIndex:`, payload.index);
        logger(`${prefix}\tTimestamp:`, payload.timestamp);
        for (let i = 0; i < payload.parentMessageIds.length; i++) {
            logger(`${prefix}\tParent ${i + 1}:`, payload.parentMessageIds[i]);
        }
        logger(`${prefix}\tInclusion Merkle Proof:`, payload.inclusionMerkleProof);
        if (payload.nextPoWScore) {
            logger(`${prefix}\tNext PoW Score:`, payload.nextPoWScore);
        }
        if (payload.nextPoWScoreMilestoneIndex) {
            logger(`${prefix}\tNext PoW Score Milestone Index:`, payload.nextPoWScoreMilestoneIndex);
        }
        logger(`${prefix}\tPublic Keys:`, payload.publicKeys);
        logger(`${prefix}\tSignatures:`, payload.signatures);
        logReceiptPayload(`${prefix}\t`, payload.receipt);
    }
}

/**
 * Log a receipt payload to the console.
 * @param prefix The prefix for the output.
 * @param payload The payload.
 */
export function logReceiptPayload(prefix: string, payload?: IReceiptPayload): void {
    if (payload) {
        logger(`${prefix}Receipt Payload`);
        logger(`${prefix}\tMigrated At:`, payload.migratedAt);
        logger(`${prefix}\tFinal:`, payload.final);
        logger(`${prefix}\tFunds:`, payload.funds.length);
        for (const funds of payload.funds) {
            logFunds(`${prefix}\t\t`, funds);
        }
        logTreasuryTransactionPayload(`${prefix}\t\t`, payload.transaction);
    }
}

/**
 * Log a treasury transaction payload to the console.
 * @param prefix The prefix for the output.
 * @param payload The payload.
 */
export function logTreasuryTransactionPayload(prefix: string, payload?: ITreasuryTransactionPayload): void {
    if (payload) {
        logger(`${prefix}Treasury Transaction Payload`);
        logInput(prefix, payload.input);
        logOutput(prefix, payload.output);
    }
}

/**
 * Log an address to the console.
 * @param prefix The prefix for the output.
 * @param address The address to log.
 */
export function logAddress(prefix: string, address?: AddressTypes): void {
    if (address?.type === ED25519_ADDRESS_TYPE) {
        logger(`${prefix}Ed25519 Address`);
        logger(`${prefix}\tAddress:`, address.address);
    } else if (address?.type === BLS_ADDRESS_TYPE) {
        logger(`${prefix}BLS Address`);
        logger(`${prefix}\tAddress:`, address.address);
    } else if (address?.type === ALIAS_ADDRESS_TYPE) {
        logger(`${prefix}Alias Address`);
        logger(`${prefix}\tAddress:`, address.address);
    } else if (address?.type === NFT_ADDRESS_TYPE) {
        logger(`${prefix}NFT Address`);
        logger(`${prefix}\tAddress:`, address.address);
    }
}

/**
 * Log signature to the console.
 * @param prefix The prefix for the output.
 * @param signature The signature to log.
 */
export function logSignature(prefix: string, signature?: SignatureTypes): void {
    if (signature?.type === ED25519_SIGNATURE_TYPE) {
        logger(`${prefix}Ed25519 Signature`);
        logger(`${prefix}\tPublic Key:`, signature.publicKey);
        logger(`${prefix}\tSignature:`, signature.signature);
    }
}

/**
 * Log input to the console.
 * @param prefix The prefix for the output.
 * @param input The input to log.
 */
export function logInput(prefix: string, input?: InputTypes): void {
    if (input) {
        if (input.type === UTXO_INPUT_TYPE) {
            logger(`${prefix}UTXO Input`);
            logger(`${prefix}\tTransaction Id:`, input.transactionId);
            logger(`${prefix}\tTransaction Output Index:`, input.transactionOutputIndex);
        } else if (input.type === TREASURY_INPUT_TYPE) {
            logger(`${prefix}Treasury Input`);
            logger(`${prefix}\tMilestone Hash:`, input.milestoneId);
        }
    }
}

/**
 * Log output to the console.
 * @param prefix The prefix for the output.
 * @param output The output to log.
 */
export function logOutput(prefix: string, output?: OutputTypes): void {
    if (output) {
        if (output.type === TREASURY_OUTPUT_TYPE) {
            logger(`${prefix}Treasury Output`);
            logger(`${prefix}\t\tAmount:`, output.amount);
        } else if (output.type === EXTENDED_OUTPUT_TYPE) {
            logger(`${prefix}Extended Output`);
            logAddress(`${prefix}\t\tS`, output.address);
            logger(`${prefix}\t\tAmount:`, output.amount);
            logNativeTokens(`${prefix}\t\t`, output.nativeTokens);
            logUnlockConditions(`${prefix}\t\t`, output.unlockConditions);
            logFeatureBlocks(`${prefix}\t\t`, output.blocks);
        } else if (output.type === ALIAS_OUTPUT_TYPE) {
            logger(`${prefix}Alias Output`);
            logger(`${prefix}\t\tAmount:`, output.amount);
            logNativeTokens(`${prefix}\t\t`, output.nativeTokens);
            logger(`${prefix}\t\tAlias Id:`, output.aliasId);
            logger(`${prefix}\t\tState Index:`, output.stateIndex);
            logger(`${prefix}\t\tState Metadata:`, output.stateMetadata);
            logger(`${prefix}\t\tFoundry Counter:`, output.foundryCounter);
            logUnlockConditions(`${prefix}\t\t`, output.unlockConditions);
            logFeatureBlocks(`${prefix}\t\t`, output.blocks);
        } else if (output.type === FOUNDRY_OUTPUT_TYPE) {
            logger(`${prefix}Foundry Output`);
            logger(`${prefix}\t\tAmount:`, output.amount);
            logNativeTokens(`${prefix}\t\t`, output.nativeTokens);
            logAddress(`${prefix}\t\tS`, output.address);
            logger(`${prefix}\t\tSerial Number:`, output.serialNumber);
            logger(`${prefix}\t\tToken Tag:`, output.tokenTag);
            logger(`${prefix}\t\tCirculating Supply:`, output.circulatingSupply);
            logger(`${prefix}\t\tMaximum Supply:`, output.maximumSupply);
            logTokenScheme(`${prefix}\t\t`, output.tokenScheme);
            logUnlockConditions(`${prefix}\t\t`, output.unlockConditions);
            logFeatureBlocks(`${prefix}\t\t`, output.blocks);
        } else if (output.type === NFT_OUTPUT_TYPE) {
            logger(`${prefix}NFT Output`);
            logger(`${prefix}\t\tAmount:`, output.amount);
            logNativeTokens(`${prefix}\t\t`, output.nativeTokens);
            logger(`${prefix}\t\tNFT Id:`, output.nftId);
            logger(`${prefix}\t\tImmutable Data:`, output.immutableData);
            logUnlockConditions(`${prefix}\t\t`, output.unlockConditions);
            logFeatureBlocks(`${prefix}\t\t`, output.blocks);
        }
    }
}

/**
 * Log unlock block to the console.
 * @param prefix The prefix for the output.
 * @param unlockBlock The unlock block to log.
 */
export function logUnlockBlock(prefix: string, unlockBlock?: UnlockBlockTypes): void {
    if (unlockBlock) {
        if (unlockBlock.type === SIGNATURE_UNLOCK_BLOCK_TYPE) {
            logger(`${prefix}\tSignature Unlock Block`);
            logSignature(`${prefix}\t\t`, unlockBlock.signature);
        } else if (unlockBlock.type === REFERENCE_UNLOCK_BLOCK_TYPE) {
            logger(`${prefix}\tReference Unlock Block`);
            logger(`${prefix}\t\tReference:`, unlockBlock.reference);
        } else if (unlockBlock.type === ALIAS_UNLOCK_BLOCK_TYPE) {
            logger(`${prefix}\tAlias Unlock Block`);
            logger(`${prefix}\t\tReference:`, unlockBlock.reference);
        } else if (unlockBlock.type === NFT_UNLOCK_BLOCK_TYPE) {
            logger(`${prefix}\tNFT Unlock Block`);
            logger(`${prefix}\t\tReference:`, unlockBlock.reference);
        }
    }
}

/**
 * Log fund to the console.
 * @param prefix The prefix for the output.
 * @param fund The fund to log.
 */
export function logFunds(prefix: string, fund?: IMigratedFunds): void {
    if (fund) {
        logger(`${prefix}\tFund`);
        logger(`${prefix}\t\tTail Transaction Hash:`, fund.tailTransactionHash);
        logAddress(`${prefix}\t\t`, fund.address);
        logger(`${prefix}\t\tDeposit:`, fund.deposit);
    }
}

/**
 * Log native tokens to the console.
 * @param prefix The prefix for the output.
 * @param nativeTokens The native tokens.
 */
export function logNativeTokens(prefix: string, nativeTokens: INativeToken[]): void {
    logger(`${prefix}Native Tokens`);
    for (const nativeToken of nativeTokens) {
        logger(`${prefix}\t\tId:`, nativeToken.id);
        logger(`${prefix}\t\tAmount:`, nativeToken.amount);
    }
}

/**
 * Log token scheme to the console.
 * @param prefix The prefix for the output.
 * @param tokenScheme The token scheme.
 */
export function logTokenScheme(prefix: string, tokenScheme: TokenSchemeTypes): void {
    if (tokenScheme.type === SIMPLE_TOKEN_SCHEME_TYPE) {
        logger(`${prefix}\tSimple Token Scheme`);
    }
}

/**
 * Log feature blocks to the console.
 * @param prefix The prefix for the output.
 * @param featureBlocks The deature blocks.
 */
export function logFeatureBlocks(prefix: string, featureBlocks: FeatureBlockTypes[]): void {
    logger(`${prefix}Native Tokens`);
    for (const featureBlock of featureBlocks) {
        logFeatureBlock(`${prefix}\t\t`, featureBlock);
    }
}

/**
 * Log feature block to the console.
 * @param prefix The prefix for the output.
 * @param featureBlock The feature block.
 */
export function logFeatureBlock(prefix: string, featureBlock: FeatureBlockTypes): void {
    if (featureBlock.type === SENDER_FEATURE_BLOCK_TYPE) {
        logger(`${prefix}\tSender Feature Block`);
        logAddress(`${prefix}\t\t`, featureBlock.address);
    } else if (featureBlock.type === ISSUER_FEATURE_BLOCK_TYPE) {
        logger(`${prefix}\tIssuer Feature Block`);
        logAddress(`${prefix}\t\t`, featureBlock.address);
    } else if (featureBlock.type === METADATA_FEATURE_BLOCK_TYPE) {
        logger(`${prefix}\tMetadata Feature Block`);
        logger(`${prefix}\t\tData:`, featureBlock.data);
    } else if (featureBlock.type === TAG_FEATURE_BLOCK_TYPE) {
        logger(`${prefix}\tTag Feature Block`);
        logger(`${prefix}\t\tTag:`, featureBlock.tag);
    }
}

/**
 * Log unlock conditions to the console.
 * @param prefix The prefix for the output.
 * @param unlockConditions The unlock conditions.
 */
export function logUnlockConditions(prefix: string, unlockConditions: UnlockConditionTypes[]): void {
    logger(`${prefix}Native Tokens`);
    for (const unlockCondition of unlockConditions) {
        logUnlockCondition(`${prefix}\t\t`, unlockCondition);
    }
}

/**
 * Log feature block to the console.
 * @param prefix The prefix for the output.
 * @param unlockCondition The unlock condition.
 */
export function logUnlockCondition(prefix: string, unlockCondition: UnlockConditionTypes): void {
    if (unlockCondition.type === ADDRESS_UNLOCK_CONDITION_TYPE) {
        logger(`${prefix}\tAddress Unlock Condition`);
        logAddress(`${prefix}\t\t`, unlockCondition.address);
    } else if (unlockCondition.type === DUST_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE) {
        logger(`${prefix}\tDust Deposity Return Unlock Condition`);
        logAddress(`${prefix}\t\t`, unlockCondition.returnAddress);
        logger(`${prefix}\t\tAmount:`, unlockCondition.amount);
    } else if (unlockCondition.type === TIMELOCK_UNLOCK_CONDITION_TYPE) {
        logger(`${prefix}\tTimelock Unlock Condition`);
        logger(`${prefix}\t\tMilestone Index:`, unlockCondition.milestoneIndex);
        logger(`${prefix}\t\tUnixTime:`, unlockCondition.unixTime);
    } else if (unlockCondition.type === EXPIRATION_UNLOCK_CONDITION_TYPE) {
        logger(`${prefix}\tExpiration Unlock Condition`);
        logAddress(`${prefix}\t\t`, unlockCondition.returnAddress);
        logger(`${prefix}\t\tMilestone Index:`, unlockCondition.milestoneIndex);
        logger(`${prefix}\t\tUnixTime:`, unlockCondition.unixTime);
    } else if (unlockCondition.type === STATE_CONTROLLER_UNLOCK_CONDITION_TYPE) {
        logger(`${prefix}\tState Controller Unlock Condition`);
        logAddress(`${prefix}\t\t`, unlockCondition.address);
    } else if (unlockCondition.type === GOVERNOR_UNLOCK_CONDITION_TYPE) {
        logger(`${prefix}\tGovernor Unlock Condition`);
        logAddress(`${prefix}\t\t`, unlockCondition.address);
    }
}
