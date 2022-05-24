// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter } from "@iota/util.js";
import type { AddressTypes } from "../models/addresses/addressTypes";
import { ALIAS_ADDRESS_TYPE } from "../models/addresses/IAliasAddress";
import { ED25519_ADDRESS_TYPE } from "../models/addresses/IEd25519Address";
import { NFT_ADDRESS_TYPE } from "../models/addresses/INftAddress";
import type { ITipsResponse } from "../models/api/ITipsResponse";
import type { FeatureTypes } from "../models/features/featureTypes";
import { ISSUER_FEATURE_TYPE } from "../models/features/IIssuerFeature";
import { METADATA_FEATURE_TYPE } from "../models/features/IMetadataFeature";
import { SENDER_FEATURE_TYPE } from "../models/features/ISenderFeature";
import { TAG_FEATURE_TYPE } from "../models/features/ITagFeature";
import type { IBlock } from "../models/IBlock";
import type { IBlockMetadata } from "../models/IBlockMetadata";
import type { IMigratedFunds } from "../models/IMigratedFunds";
import type { INativeToken } from "../models/INativeToken";
import type { INodeInfo } from "../models/info/INodeInfo";
import type { InputTypes } from "../models/inputs/inputTypes";
import { TREASURY_INPUT_TYPE } from "../models/inputs/ITreasuryInput";
import { UTXO_INPUT_TYPE } from "../models/inputs/IUTXOInput";
import { TRANSACTION_ESSENCE_TYPE } from "../models/ITransactionEssence";
import { IPoWMilestoneOption, POW_MILESTONE_OPTION_TYPE } from "../models/milestoneOptions/IPoWMilestoneOption";
import { IReceiptMilestoneOption, RECEIPT_MILESTONE_OPTION_TYPE } from "../models/milestoneOptions/IReceiptMilestoneOption";
import type { MilestoneOptionTypes } from "../models/milestoneOptions/milestoneOptionTypes";
import { ALIAS_OUTPUT_TYPE } from "../models/outputs/IAliasOutput";
import { BASIC_OUTPUT_TYPE } from "../models/outputs/IBasicOutput";
import { FOUNDRY_OUTPUT_TYPE } from "../models/outputs/IFoundryOutput";
import { NFT_OUTPUT_TYPE } from "../models/outputs/INftOutput";
import { TREASURY_OUTPUT_TYPE } from "../models/outputs/ITreasuryOutput";
import type { OutputTypes } from "../models/outputs/outputTypes";
import { IMilestonePayload, MILESTONE_PAYLOAD_TYPE } from "../models/payloads/IMilestonePayload";
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
import { ADDRESS_UNLOCK_CONDITION_TYPE } from "../models/unlockConditions/IAddressUnlockCondition";
import { EXPIRATION_UNLOCK_CONDITION_TYPE } from "../models/unlockConditions/IExpirationUnlockCondition";
import { GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE } from "../models/unlockConditions/IGovernorAddressUnlockCondition";
import { IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE } from "../models/unlockConditions/IImmutableAliasUnlockCondition";
import { STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE } from "../models/unlockConditions/IStateControllerAddressUnlockCondition";
import { STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE } from "../models/unlockConditions/IStorageDepositReturnUnlockCondition";
import { TIMELOCK_UNLOCK_CONDITION_TYPE } from "../models/unlockConditions/ITimelockUnlockCondition";
import type { UnlockConditionTypes } from "../models/unlockConditions/unlockConditionTypes";
import { ALIAS_UNLOCK_TYPE } from "../models/unlocks/IAliasUnlock";
import { NFT_UNLOCK_TYPE } from "../models/unlocks/INftUnlock";
import { REFERENCE_UNLOCK_TYPE } from "../models/unlocks/IReferenceUnlock";
import { SIGNATURE_UNLOCK_TYPE } from "../models/unlocks/ISignatureUnlock";
import type { UnlockTypes } from "../models/unlocks/unlockTypes";


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

    logger(`${prefix}\tStatus`);
    logger(`${prefix}\t\tIs Healthy:`, info.status.isHealthy);
    logger(`${prefix}\t\tLatest Milestone Index:`, info.status.latestMilestone.index);
    logger(`${prefix}\t\tLatest Milestone Timestamp:`, info.status.latestMilestone.timestamp);
    logger(`${prefix}\t\tLatest Milestone Id:`, info.status.latestMilestone.milestoneId);
    logger(`${prefix}\t\tConfirmed Milestone Index:`, info.status.confirmedMilestone.index);
    logger(`${prefix}\t\tConfirmed Milestone Timestamp:`, info.status.confirmedMilestone.timestamp);
    logger(`${prefix}\t\tConfirmed Milestone Id:`, info.status.confirmedMilestone.milestoneId);
    logger(`${prefix}\t\tPruning Index:`, info.status.pruningIndex);

    logger(`${prefix}\tProtocol`);
    logger(`${prefix}\t\tNetwork Name:`, info.protocol.networkName);
    logger(`${prefix}\t\tBech32 HRP:`, info.protocol.bech32HRP);
    logger(`${prefix}\t\tToken supply:`, info.protocol.tokenSupply);
    logger(`${prefix}\t\tProtocol version:`, info.protocol.protocolVersion);
    logger(`${prefix}\t\tMin PoW Score:`, info.protocol.minPoWScore);
    logger(`${prefix}\t\tRent`);
    logger(`${prefix}\t\t\tVByte Cost:`, info.protocol.rentStructure.vByteCost);
    logger(`${prefix}\t\t\tVByte Factor Data:`, info.protocol.rentStructure.vByteFactorData);
    logger(`${prefix}\t\t\tVByte Factor Key:`, info.protocol.rentStructure.vByteFactorKey);

    logger(`${prefix}\tBase token`);
    logger(`${prefix}\t\tName:`, info.baseToken.name);
    logger(`${prefix}\t\tTicker Symbol:`, info.baseToken.tickerSymbol);
    logger(`${prefix}\t\tUnit:`, info.baseToken.unit);
    if (info.baseToken.subunit) {
        logger(`${prefix}\t\tSub unit:`, info.baseToken.subunit);
    }
    logger(`${prefix}\t\tDecimals:`, info.baseToken.decimals);
    logger(`${prefix}\t\tUse metric prefix:`, info.baseToken.useMetricPrefix);

    logger(`${prefix}\tMetrics`);
    logger(`${prefix}\t\tBlocks Per Second:`, info.metrics.blocksPerSecond);
    logger(`${prefix}\t\tReferenced Blocks Per Second:`, info.metrics.referencedBlocksPerSecond);
    logger(`${prefix}\t\tReferenced Rate:`, info.metrics.referencedRate);

    logger(`${prefix}\tFeatures:`, info.features);
    logger(`${prefix}\tPlugins:`, info.plugins);
}

/**
 * Log the tips information.
 * @param prefix The prefix for the output.
 * @param tipsResponse The tips to log.
 */
export function logTips(prefix: string, tipsResponse: ITipsResponse): void {
    if (tipsResponse.tips) {
        for (let i = 0; i < tipsResponse.tips.length; i++) {
            logger(`${prefix}\tTip ${i + 1} Block Id:`, tipsResponse.tips[i]);
        }
    }
}

/**
 * Log a block to the console.
 * @param prefix The prefix for the output.
 * @param block The block to log.
 */
export function logBlock(prefix: string, block: IBlock): void {
    logger(`${prefix}\tProtocol Version:`, block.protocolVersion);
    if (block.parents) {
        for (let i = 0; i < block.parents.length; i++) {
            logger(`${prefix}\tParent ${i + 1} Block Id:`, block.parents[i]);
        }
    }
    logPayload(`${prefix}\t`, block.payload);
    if (block.nonce !== undefined) {
        logger(`${prefix}\tNonce:`, block.nonce);
    }
}

/**
 * Log the block metadata to the console.
 * @param prefix The prefix for the output.
 * @param blockMetadata The blockMetadata to log.
 */
export function logBlockMetadata(prefix: string, blockMetadata: IBlockMetadata): void {
    logger(`${prefix}\tBlock Id:`, blockMetadata.blockId);
    if (blockMetadata.parents) {
        for (let i = 0; i < blockMetadata.parents.length; i++) {
            logger(`${prefix}\tParent ${i + 1} Block Id:`, blockMetadata.parents[i]);
        }
    }
    if (blockMetadata.isSolid !== undefined) {
        logger(`${prefix}\tIs Solid:`, blockMetadata.isSolid);
    }
    if (blockMetadata.milestoneIndex !== undefined) {
        logger(`${prefix}\tMilestone Index:`, blockMetadata.milestoneIndex);
    }
    if (blockMetadata.referencedByMilestoneIndex !== undefined) {
        logger(`${prefix}\tReferenced By Milestone Index:`, blockMetadata.referencedByMilestoneIndex);
    }
    logger(`${prefix}\tLedger Inclusion State:`, blockMetadata.ledgerInclusionState);
    if (blockMetadata.conflictReason !== undefined) {
        logger(`${prefix}\tConflict Reason:`, blockMetadata.conflictReason);
    }
    if (blockMetadata.shouldPromote !== undefined) {
        logger(`${prefix}\tShould Promote:`, blockMetadata.shouldPromote);
    }
    if (blockMetadata.shouldReattach !== undefined) {
        logger(`${prefix}\tShould Reattach:`, blockMetadata.shouldReattach);
    }
}

/**
 * Log a block to the console.
 * @param prefix The prefix for the output.
 * @param payload The payload.
 */
export function logPayload(prefix: string, payload?: PayloadTypes): void {
    if (payload) {
        if (payload.type === TRANSACTION_PAYLOAD_TYPE) {
            logTransactionPayload(prefix, payload);
        } else if (payload.type === MILESTONE_PAYLOAD_TYPE) {
            logMilestonePayload(prefix, payload);
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
            logger(`${prefix}\tNetwork Id:`, payload.essence.networkId);

            if (payload.essence.inputs) {
                logger(`${prefix}\tInputs:`, payload.essence.inputs.length);
                for (const input of payload.essence.inputs) {
                    logInput(`${prefix}\t\t`, input);
                }
            }
            logger(`${prefix}\tInputs Commitment:`, payload.essence.inputsCommitment);
            if (payload.essence.outputs) {
                logger(`${prefix}\tOutputs:`, payload.essence.outputs.length);
                for (const output of payload.essence.outputs) {
                    logOutput(`${prefix}\t\t`, output);
                }
            }
        }
        if (payload.unlocks) {
            logger(`${prefix}\tUnlocks:`, payload.unlocks.length);
            for (const unlock of payload.unlocks) {
                logUnlock(`${prefix}\t\t`, unlock);
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
        logger(`${prefix}\tProtocol version:`, payload.protocolVersion);
        logger(`${prefix}\tPreviousMilestoneId:`, payload.previousMilestoneId);
        for (let i = 0; i < payload.parents.length; i++) {
            logger(`${prefix}\tParent ${i + 1}:`, payload.parents[i]);
        }
        logger(`${prefix}\tConfirmed Merkle Proof:`, payload.inclusionMerkleRoot);
        logger(`${prefix}\tApplied Merkle Proof:`, payload.appliedMerkleRoot);
        logger(`${prefix}\tMetadata:`, payload.metadata);
        logMilestoneOptions(`${prefix}\t`, payload.options);
        logger(`${prefix}\tSignatures:`, payload.signatures.length);
        for (const signature of payload.signatures) {
            logSignature(`${prefix}\t\t`, signature);
        }
    }
}

/**
 * Log milestone options to the console.
 * @param prefix The prefix for the output.
 * @param milestoneOptions The milestone options.
 */
 export function logMilestoneOptions(prefix: string, milestoneOptions?: MilestoneOptionTypes[]): void {
    if (milestoneOptions) {
        logger(`${prefix}Milestone Options`);
        for (const milestoneOption of milestoneOptions) {
            logMilestoneOption(`${prefix}\t\t`, milestoneOption);
        }
    }
}

/**
 * Log milestone option to the console.
 * @param prefix The prefix for the output.
 * @param milestoneOption The milestone option.
 */
 export function logMilestoneOption(prefix: string, milestoneOption: MilestoneOptionTypes): void {
    if (milestoneOption.type === RECEIPT_MILESTONE_OPTION_TYPE) {
        logger(`${prefix}\tReceipt Milestone Option`);
        logReceiptMilestoneOption(`${prefix}\t\t`, milestoneOption);
    } else if (milestoneOption.type === POW_MILESTONE_OPTION_TYPE) {
        logger(`${prefix}\tPoW Milestone Option`);
        logPoWMilestoneOption(`${prefix}\t\t`, milestoneOption);
    }
}

/**
 * Log a receipt milestone option to the console.
 * @param prefix The prefix for the output.
 * @param option The option.
 */
export function logReceiptMilestoneOption(prefix: string, option?: IReceiptMilestoneOption): void {
    if (option) {
        logger(`${prefix}Receipt Milestone Option`);
        logger(`${prefix}\tMigrated At:`, option.migratedAt);
        logger(`${prefix}\tFinal:`, option.final);
        logger(`${prefix}\tFunds:`, option.funds.length);
        for (const funds of option.funds) {
            logFunds(`${prefix}\t\t`, funds);
        }
        logTreasuryTransactionPayload(`${prefix}\t\t`, option.transaction);
    }
}

/**
 * Log a receipt milestone option to the console.
 * @param prefix The prefix for the output.
 * @param option The option.
 */
export function logPoWMilestoneOption(prefix: string, option?: IPoWMilestoneOption): void {
    if (option) {
        logger(`${prefix}PoW Milestone Option`);
        logger(`${prefix}\tNext PoW Score:`, option.nextPoWScore);
        logger(`${prefix}\tNext PoW Score Milestone Index:`, option.nextPoWScoreMilestoneIndex);
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
        logger(`${prefix}\tPublic Key Hash:`, address.pubKeyHash);
    } else if (address?.type === ALIAS_ADDRESS_TYPE) {
        logger(`${prefix}Alias Address`);
        logger(`${prefix}\tAlias Id:`, address.aliasId);
    } else if (address?.type === NFT_ADDRESS_TYPE) {
        logger(`${prefix}NFT Address`);
        logger(`${prefix}\tNFT Id:`, address.nftId);
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
        } else if (output.type === BASIC_OUTPUT_TYPE) {
            logger(`${prefix}Basic Output`);
            logger(`${prefix}\t\tAmount:`, output.amount);
            logNativeTokens(`${prefix}\t\t`, output.nativeTokens);
            logUnlockConditions(`${prefix}\t\t`, output.unlockConditions);
            logFeatures(`${prefix}\t\t`, output.features);
        } else if (output.type === ALIAS_OUTPUT_TYPE) {
            logger(`${prefix}Alias Output`);
            logger(`${prefix}\t\tAmount:`, output.amount);
            logNativeTokens(`${prefix}\t\t`, output.nativeTokens);
            logger(`${prefix}\t\tAlias Id:`, output.aliasId);
            logger(`${prefix}\t\tState Index:`, output.stateIndex);
            logger(`${prefix}\t\tState Metadata:`, output.stateMetadata);
            logger(`${prefix}\t\tFoundry Counter:`, output.foundryCounter);
            logUnlockConditions(`${prefix}\t\t`, output.unlockConditions);
            logFeatures(`${prefix}\t\t`, output.features);
            logImmutableFeatures(`${prefix}\t\t`, output.immutableFeatures);
        } else if (output.type === FOUNDRY_OUTPUT_TYPE) {
            logger(`${prefix}Foundry Output`);
            logger(`${prefix}\t\tAmount:`, output.amount);
            logNativeTokens(`${prefix}\t\t`, output.nativeTokens);
            logger(`${prefix}\t\tSerial Number:`, output.serialNumber);
            logTokenScheme(`${prefix}\t\t`, output.tokenScheme);
            logUnlockConditions(`${prefix}\t\t`, output.unlockConditions);
            logFeatures(`${prefix}\t\t`, output.features);
            logImmutableFeatures(`${prefix}\t\t`, output.immutableFeatures);
        } else if (output.type === NFT_OUTPUT_TYPE) {
            logger(`${prefix}NFT Output`);
            logger(`${prefix}\t\tAmount:`, output.amount);
            logNativeTokens(`${prefix}\t\t`, output.nativeTokens);
            logger(`${prefix}\t\tNFT Id:`, output.nftId);
            logUnlockConditions(`${prefix}\t\t`, output.unlockConditions);
            logFeatures(`${prefix}\t\t`, output.features);
            logImmutableFeatures(`${prefix}\t\t`, output.immutableFeatures);
        }
    }
}

/**
 * Log unlock to the console.
 * @param prefix The prefix for the output.
 * @param unlock The unlock to log.
 */
export function logUnlock(prefix: string, unlock?: UnlockTypes): void {
    if (unlock) {
        if (unlock.type === SIGNATURE_UNLOCK_TYPE) {
            logger(`${prefix}\tSignature Unlock`);
            logSignature(`${prefix}\t\t`, unlock.signature);
        } else if (unlock.type === REFERENCE_UNLOCK_TYPE) {
            logger(`${prefix}\tReference Unlock`);
            logger(`${prefix}\t\tReference:`, unlock.reference);
        } else if (unlock.type === ALIAS_UNLOCK_TYPE) {
            logger(`${prefix}\tAlias Unlock`);
            logger(`${prefix}\t\tReference:`, unlock.reference);
        } else if (unlock.type === NFT_UNLOCK_TYPE) {
            logger(`${prefix}\tNFT Unlock`);
            logger(`${prefix}\t\tReference:`, unlock.reference);
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
export function logNativeTokens(prefix: string, nativeTokens: INativeToken[] | undefined): void {
    logger(`${prefix}Native Tokens`);
    for (const nativeToken of nativeTokens ?? []) {
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
        logger(`${prefix}\t\tMinted Tokens:`, tokenScheme.mintedTokens);
        logger(`${prefix}\t\tMelted Tokens:`, tokenScheme.meltedTokens);
        logger(`${prefix}\t\tMaximum Supply:`, tokenScheme.maximumSupply);
    }
}

/**
 * Log featurew to the console.
 * @param prefix The prefix for the output.
 * @param features The features.
 */
export function logFeatures(prefix: string, features: FeatureTypes[] | undefined): void {
    logger(`${prefix}Features`);
    for (const feature of features ?? []) {
        logFeature(`${prefix}\t\t`, feature);
    }
}

/**
 * Log immutable featuress to the console.
 * @param prefix The prefix for the output.
 * @param immutableFeatures The features.
 */
 export function logImmutableFeatures(prefix: string, immutableFeatures: FeatureTypes[] | undefined): void {
    logger(`${prefix}Immutable Features`);
    for (const feature of immutableFeatures ?? []) {
        logFeature(`${prefix}\t\t`, feature);
    }
}

/**
 * Log feature to the console.
 * @param prefix The prefix for the output.
 * @param feature The feature.
 */
export function logFeature(prefix: string, feature: FeatureTypes): void {
    if (feature.type === SENDER_FEATURE_TYPE) {
        logger(`${prefix}\tSender Feature`);
        logAddress(`${prefix}\t\t`, feature.address);
    } else if (feature.type === ISSUER_FEATURE_TYPE) {
        logger(`${prefix}\tIssuer Feature`);
        logAddress(`${prefix}\t\t`, feature.address);
    } else if (feature.type === METADATA_FEATURE_TYPE) {
        logger(`${prefix}\tMetadata Feature`);
        logger(`${prefix}\t\tData:`, feature.data);
    } else if (feature.type === TAG_FEATURE_TYPE) {
        logger(`${prefix}\tTag Feature`);
        logger(`${prefix}\t\tTag:`, feature.tag);
    }
}

/**
 * Log unlock conditions to the console.
 * @param prefix The prefix for the output.
 * @param unlockConditions The unlock conditions.
 */
export function logUnlockConditions(prefix: string, unlockConditions: UnlockConditionTypes[]): void {
    logger(`${prefix}Unlock Conditions`);
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
    } else if (unlockCondition.type === STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE) {
        logger(`${prefix}\tStorage Deposit Return Unlock Condition`);
        logAddress(`${prefix}\t\t`, unlockCondition.returnAddress);
        logger(`${prefix}\t\tAmount:`, unlockCondition.returnAmount);
    } else if (unlockCondition.type === TIMELOCK_UNLOCK_CONDITION_TYPE) {
        logger(`${prefix}\tTimelock Unlock Condition`);
        logger(`${prefix}\t\tMilestone Index:`, unlockCondition.milestoneIndex);
        logger(`${prefix}\t\tUnixTime:`, unlockCondition.unixTime);
    } else if (unlockCondition.type === EXPIRATION_UNLOCK_CONDITION_TYPE) {
        logger(`${prefix}\tExpiration Unlock Condition`);
        logAddress(`${prefix}\t\t`, unlockCondition.returnAddress);
        logger(`${prefix}\t\tMilestone Index:`, unlockCondition.milestoneIndex);
        logger(`${prefix}\t\tUnixTime:`, unlockCondition.unixTime);
    } else if (unlockCondition.type === STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE) {
        logger(`${prefix}\tState Controller Address Unlock Condition`);
        logAddress(`${prefix}\t\t`, unlockCondition.address);
    } else if (unlockCondition.type === GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE) {
        logger(`${prefix}\tGovernor Address Unlock Condition`);
        logAddress(`${prefix}\t\t`, unlockCondition.address);
    } else if (unlockCondition.type === IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE) {
        logger(`${prefix}\tImmutable Alias Unlock Condition`);
        logAddress(`${prefix}\t\t`, unlockCondition.address);
    }
}
