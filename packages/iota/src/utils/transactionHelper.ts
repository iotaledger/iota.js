// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Blake2b } from "@iota/crypto.js";
import { BigIntHelper, Converter, ReadStream, WriteStream } from "@iota/util.js";
import { serializeAliasAddress } from "../binary/addresses/aliasAddress";
import { serializeBlock } from "../binary/block";
import { BLOCK_ID_LENGTH, TRANSACTION_ID_LENGTH } from "../binary/commonDataTypes";
import { serializeOutput } from "../binary/outputs/outputs";
import { serializeTransactionPayload } from "../binary/payloads/transactionPayload";
import { serializeTransactionEssence } from "../binary/transactionEssence";
import { ALIAS_ADDRESS_TYPE } from "../models/addresses/IAliasAddress";
import type { IBlock } from "../models/IBlock";
import { IUTXOInput, UTXO_INPUT_TYPE } from "../models/inputs/IUTXOInput";
import type { IRent } from "../models/IRent";
import type { ITransactionEssence } from "../models/ITransactionEssence";
import type { OutputTypes } from "../models/outputs/outputTypes";
import type { ITransactionPayload } from "../models/payloads/ITransactionPayload";


/**
 * Helper methods for Transactions.
 */
 export class TransactionHelper {
    /**
     * The confirmed milestone index length.
     */
    public static CONFIRMED_MILESTONE_INDEX_LENGTH: number = 4;

    /**
     * The confirmed unix timestamp length.
     */
    public static CONFIRMED_UINIX_TIMESTAMP_LENGTH: number = 4;

    /**
     * The output Id length.
     */
    public static OUTPUT_ID_LENGTH: number = 34;

    /**
     * Calculate blockId from a block.
     * @param block The block.
     * @returns The blockId.
     */
    public static calculateBlockId(block: IBlock): string {
        const writeStream = new WriteStream();
        serializeBlock(writeStream, block);
        const blockBytes = writeStream.finalBytes();

        return Converter.bytesToHex(Blake2b.sum256(blockBytes), true);
    }

    /**
     * Returns the outputId from transation id and output index.
     * @param transactionId The id of the transaction.
     * @param outputIndex The index of the output.
     * @returns The output id.
     */
    public static outputIdFromTransactionData(transactionId: string, outputIndex: number): string {
        const writeStream = new WriteStream();
        writeStream.writeFixedHex("transactionId", TRANSACTION_ID_LENGTH, transactionId);
        writeStream.writeUInt16("outputIndex", outputIndex);
        const outputIdBytes = writeStream.finalBytes();

        return Converter.bytesToHex(outputIdBytes, true);
    }

    /**
     * Calculate the Transaction Essence hash.
     * @param essence The transaction essence.
     * @returns The transaction essence hash.
     */
    public static getTransactionEssenceHash(essence: ITransactionEssence): Uint8Array {
        const writeStream = new WriteStream();
        serializeTransactionEssence(writeStream, essence);
        const essenceFinal = writeStream.finalBytes();

        return Blake2b.sum256(essenceFinal);
    }

    /**
     * Calculate the Transaction hash.
     * @param transactionPayload The payload of the transaction.
     * @returns The transaction hash.
     */
    public static getTransactionPayloadHash(transactionPayload: ITransactionPayload): Uint8Array {
        const writeStream = new WriteStream();
        serializeTransactionPayload(writeStream, transactionPayload);
        const txBytes = writeStream.finalBytes();
        return Blake2b.sum256(txBytes);
    }

    /**
     * Calculate the UTXO input from an output Id.
     * @param outputId The id of the output.
     * @returns The UTXO Input.
     */
    public static inputFromOutputId(outputId: string): IUTXOInput {
        const readStream = new ReadStream(Converter.hexToBytes(outputId));
        const input: IUTXOInput = {
            type: UTXO_INPUT_TYPE,
            transactionId: readStream.readFixedHex("transactionId", TRANSACTION_ID_LENGTH),
            transactionOutputIndex: readStream.readUInt16("outputIndex")
        };
        return input;
    }

    /**
     * Calculate the inputCommitment from the output objects that are used as inputs to fund the transaction.
     * @param inputs The output objects used as inputs for the transaction.
     * @returns The inputs commitment.
     */
    public static getInputsCommitment(inputs: OutputTypes[]): string {
        const inputsCommitmentHasher = new Blake2b(Blake2b.SIZE_256); // blake2b hasher
        for (let i = 0; i < inputs.length; i++) {
            const writeStream = new WriteStream();
            serializeOutput(writeStream, inputs[i]);
            inputsCommitmentHasher.update(Blake2b.sum256(writeStream.finalBytes()));
        }

        return Converter.bytesToHex(inputsCommitmentHasher.final(), true);
    }

    /**
     * Calculates the required storage deposit of an output.
     * @param output The output.
     * @param rentStructure Rent cost of objects which take node resources.
     * @returns The required storage deposit.
     */
    public static getStorageDeposit(output: OutputTypes, rentStructure: IRent): number {
        const writeStream = new WriteStream();
        serializeOutput(writeStream, output);
        const outputBytes = writeStream.finalBytes();

        const offset = (rentStructure.vByteFactorKey * TransactionHelper.OUTPUT_ID_LENGTH) +
                    (rentStructure.vByteFactorData *
                    (BLOCK_ID_LENGTH +
                    TransactionHelper.CONFIRMED_MILESTONE_INDEX_LENGTH +
                    TransactionHelper.CONFIRMED_UINIX_TIMESTAMP_LENGTH));
        const vByteSize = (rentStructure.vByteFactorData * outputBytes.length) + offset;

        return rentStructure.vByteCost * vByteSize;
    }

    /**
     * Returns the nftId/aliasId from an outputId.
     * NftId/aliasId is Blake2b-256 hash of the outputId that created it.
     * @param outputId The id of the output.
     * @returns The resolved Nft id or Alias id.
     */
    public static resolveIdFromOutputId(outputId: string): string {
        return Converter.bytesToHex(Blake2b.sum256(Converter.hexToBytes(outputId)), true);
    }

    /**
     * Constructs a tokenId from the aliasId, serial number and token scheme type.
     * @param aliasId The alias Id of the alias that controls the foundry.
     * @param serialNumber The serial number of the foundry.
     * @param tokenSchemeType The tokenSchemeType of the foundry.
     * @returns The tokenId.
     */
    public static constructTokenId(aliasId: string, serialNumber: number, tokenSchemeType: number): string {
        const wsAddress = new WriteStream();
        serializeAliasAddress(wsAddress, {
            type: ALIAS_ADDRESS_TYPE,
            aliasId
        });
        const aliasAddressBytes = wsAddress.finalBytes();

        const wsSerialNumber = new WriteStream();
        wsSerialNumber.writeUInt32("serialNumber", serialNumber);
        const serialNumberBytes = wsSerialNumber.finalBytes();

        const wsToken = new WriteStream();
        wsToken.writeUInt8("tokenSchemeType", tokenSchemeType);
        const tokenSchemeTypeBytes = wsToken.finalBytes();

        const tokenIdBytes = [...aliasAddressBytes, ...serialNumberBytes, ...tokenSchemeTypeBytes];

        return Converter.bytesToHex(new Uint8Array(tokenIdBytes), true);
    }

    /**
     * Calculates the networkId value from the network name.
     * @param networkName The name of the network.
     * @returns The networkId.
     */
    public static networkIdFromNetworkName(networkName: string): string {
        const networkIdBytes = Blake2b.sum256(Converter.utf8ToBytes(networkName));
        return BigIntHelper.read8(networkIdBytes, 0).toString();
    }
}
