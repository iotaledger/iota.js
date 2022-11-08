// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable unicorn/no-nested-ternary */
import { Blake2b, Ed25519 } from "@iota/crypto.js";
import { Converter, HexHelper, WriteStream } from "@iota/util.js";
import type { BigInteger } from "big-integer";
import { TRANSACTION_ID_LENGTH } from "../binary/commonDataTypes";
import { serializeOutput } from "../binary/outputs/outputs";
import { MAX_TAG_LENGTH } from "../binary/payloads/taggedDataPayload";
import { serializeTransactionEssence } from "../binary/transactionEssence";
import { SingleNodeClient } from "../clients/singleNodeClient";
import { ED25519_ADDRESS_TYPE } from "../models/addresses/IEd25519Address";
import type { FeatureTypes } from "../models/features/featureTypes";
import { DEFAULT_PROTOCOL_VERSION, IBlock } from "../models/IBlock";
import type { IClient } from "../models/IClient";
import type { IKeyPair } from "../models/IKeyPair";
import type { INativeToken } from "../models/INativeToken";
import type { IUTXOInput } from "../models/inputs/IUTXOInput";
import { ITransactionEssence, TRANSACTION_ESSENCE_TYPE } from "../models/ITransactionEssence";
import { BASIC_OUTPUT_TYPE, IBasicOutput } from "../models/outputs/IBasicOutput";
import type { OutputTypes } from "../models/outputs/outputTypes";
import { TAGGED_DATA_PAYLOAD_TYPE } from "../models/payloads/ITaggedDataPayload";
import { ITransactionPayload, TRANSACTION_PAYLOAD_TYPE } from "../models/payloads/ITransactionPayload";
import { ED25519_SIGNATURE_TYPE } from "../models/signatures/IEd25519Signature";
import { ADDRESS_UNLOCK_CONDITION_TYPE } from "../models/unlockConditions/IAddressUnlockCondition";
import { REFERENCE_UNLOCK_TYPE } from "../models/unlocks/IReferenceUnlock";
import { SIGNATURE_UNLOCK_TYPE } from "../models/unlocks/ISignatureUnlock";
import type { UnlockTypes } from "../models/unlocks/unlockTypes";

/**
 * Send a transfer from the balance on the seed.
 * @param client The client or node endpoint to send the transfer with.
 * @param inputsAndSignatureKeyPairs The inputs with the signature key pairs needed to sign transfers.
 * @param outputs The outputs to send.
 * @param taggedData Optional tagged data to associate with the transaction.
 * @param taggedData.tag Optional tag.
 * @param taggedData.data Optional data.
 * @param powInterval The time in seconds that pow should work before aborting.
 * @param maxPowAttempts The number of times the pow should be attempted.
 * @returns The id of the block created and the remainder address if one was needed.
 */
export async function sendAdvanced(
    client: IClient | string,
    inputsAndSignatureKeyPairs: {
        input: IUTXOInput;
        addressKeyPair: IKeyPair;
        consumingOutput: OutputTypes;
    }[],
    outputs: {
        address: string;
        addressType: number;
        amount: BigInteger;
        nativeTokens?: INativeToken[];
        fatures?: FeatureTypes[];
    }[],
    taggedData?: {
        tag?: Uint8Array | string;
        data?: Uint8Array | string;
    },
    powInterval?: number,
    maxPowAttempts?: number
): Promise<{
    blockId: string;
    block: IBlock;
}> {
    const localClient = typeof client === "string" ? new SingleNodeClient(client) : client;

    const protocolInfo = await localClient.protocolInfo();

    const transactionPayload = buildTransactionPayload(
        protocolInfo.networkId,
        inputsAndSignatureKeyPairs,
        outputs,
        taggedData
    );

    const block: IBlock = {
        protocolVersion: DEFAULT_PROTOCOL_VERSION,
        parents: [],
        payload: transactionPayload,
        nonce: "0"
    };

    const blockId = await localClient.blockSubmit(block, powInterval, maxPowAttempts);

    return {
        blockId,
        block
    };
}

/**
 * Build a transaction payload.
 * @param networkId The network id we are sending the payload on.
 * @param inputsAndSignatureKeyPairs The inputs with the signature key pairs needed to sign transfers.
 * @param outputs The outputs to send.
 * @param taggedData Optional tagged data to associate with the transaction.
 * @param taggedData.tag Optional tag.
 * @param taggedData.data Optional index data.
 * @returns The transaction payload.
 */
export function buildTransactionPayload(
    networkId: string,
    inputsAndSignatureKeyPairs: {
        input: IUTXOInput;
        addressKeyPair: IKeyPair;
        consumingOutput: OutputTypes;
    }[],
    outputs: {
        address: string;
        addressType: number;
        amount: BigInteger;
        nativeTokens?: INativeToken[];
        fatures?: FeatureTypes[];
    }[],
    taggedData?: {
        tag?: Uint8Array | string;
        data?: Uint8Array | string;
    }
): ITransactionPayload {
    if (!inputsAndSignatureKeyPairs || inputsAndSignatureKeyPairs.length === 0) {
        throw new Error("You must specify some inputs");
    }
    if (!outputs || outputs.length === 0) {
        throw new Error("You must specify some outputs");
    }

    let localTagHex;
    let localDataHex;

    if (taggedData?.tag) {
        localTagHex = typeof taggedData?.tag === "string"
            ? Converter.utf8ToHex(taggedData.tag, true)
            : Converter.bytesToHex(taggedData.tag, true);

        // Length is -2 becuase we have added the 0x prefix
        if ((localTagHex.length - 2) / 2 > MAX_TAG_LENGTH) {
            throw new Error(
                `The tag length is ${localTagHex.length / 2
                }, which exceeds the maximum size of ${MAX_TAG_LENGTH}`
            );
        }
    }

    if (taggedData?.data) {
        localDataHex = HexHelper.addPrefix(typeof taggedData.data === "string"
            ? Converter.utf8ToHex(taggedData.data, true)
            : Converter.bytesToHex(taggedData.data, true));
    }

    const outputsWithSerialization: {
        output: IBasicOutput;
        serializedBytes: Uint8Array;
        serializedHex: string;
    }[] = [];

    for (const output of outputs) {
        if (output.addressType === ED25519_ADDRESS_TYPE) {
            const o: IBasicOutput = {
                type: BASIC_OUTPUT_TYPE,
                amount: output.amount.toString(),
                nativeTokens: output.nativeTokens,
                unlockConditions: [
                    {
                        type: ADDRESS_UNLOCK_CONDITION_TYPE,
                        address: {
                            type: output.addressType,
                            pubKeyHash: output.address
                        }
                    }
                ],
                features: output.fatures
            };
            const writeStream = new WriteStream();
            serializeOutput(writeStream, o);
            const finalBytes = writeStream.finalBytes();
            outputsWithSerialization.push({
                output: o,
                serializedBytes: finalBytes,
                serializedHex: Converter.bytesToHex(finalBytes)
            });
        } else {
            throw new Error(`Unrecognized output address type ${output.addressType}`);
        }
    }

    const inputsAndSignatureKeyPairsSerialized: {
        input: IUTXOInput;
        addressKeyPair: IKeyPair;
        consumingOutputBytes: Uint8Array;
        inputIdHex: string;
    }[] = inputsAndSignatureKeyPairs.map(i => {
        const writeStreamId = new WriteStream();
        writeStreamId.writeFixedHex("transactionId", TRANSACTION_ID_LENGTH, i.input.transactionId);
        writeStreamId.writeUInt16("transactionOutputIndex", i.input.transactionOutputIndex);

        const writeStream = new WriteStream();
        serializeOutput(writeStream, i.consumingOutput);
        return {
            ...i,
            inputIdHex: writeStreamId.finalHex(),
            consumingOutputBytes: writeStream.finalBytes()
        };
    });

    const inputsCommitmentHasher = new Blake2b(Blake2b.SIZE_256);
    for (const input of inputsAndSignatureKeyPairsSerialized) {
        inputsCommitmentHasher.update(Blake2b.sum256(input.consumingOutputBytes));
    }
    const inputsCommitment = Converter.bytesToHex(inputsCommitmentHasher.final(), true);

    const transactionEssence: ITransactionEssence = {
        type: TRANSACTION_ESSENCE_TYPE,
        networkId,
        inputs: inputsAndSignatureKeyPairsSerialized.map(i => i.input),
        inputsCommitment,
        outputs: outputsWithSerialization.map(o => o.output),
        payload: localTagHex && localDataHex
            ? {
                type: TAGGED_DATA_PAYLOAD_TYPE,
                tag: localTagHex,
                data: localDataHex
            }
            : undefined
    };

    const binaryEssence = new WriteStream();
    serializeTransactionEssence(binaryEssence, transactionEssence);
    const essenceFinal = binaryEssence.finalBytes();

    const essenceHash = Blake2b.sum256(essenceFinal);

    // Create the unlocks
    const unlocks: UnlockTypes[] = [];
    const addressToUnlock: {
        [address: string]: {
            keyPair: IKeyPair;
            unlockIndex: number;
        };
    } = {};

    for (const input of inputsAndSignatureKeyPairsSerialized) {
        const hexInputAddressPublic = Converter.bytesToHex(input.addressKeyPair.publicKey, true);
        if (addressToUnlock[hexInputAddressPublic]) {
            unlocks.push({
                type: REFERENCE_UNLOCK_TYPE,
                reference: addressToUnlock[hexInputAddressPublic].unlockIndex
            });
        } else {
            unlocks.push({
                type: SIGNATURE_UNLOCK_TYPE,
                signature: {
                    type: ED25519_SIGNATURE_TYPE,
                    publicKey: hexInputAddressPublic,
                    signature: Converter.bytesToHex(Ed25519.sign(input.addressKeyPair.privateKey, essenceHash), true)
                }
            });
            addressToUnlock[hexInputAddressPublic] = {
                keyPair: input.addressKeyPair,
                unlockIndex: unlocks.length - 1
            };
        }
    }

    const transactionPayload: ITransactionPayload = {
        type: TRANSACTION_PAYLOAD_TYPE,
        essence: transactionEssence,
        unlocks
    };

    return transactionPayload;
}
