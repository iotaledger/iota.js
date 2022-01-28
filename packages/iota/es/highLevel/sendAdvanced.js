// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable unicorn/no-nested-ternary */
import { Blake2b, Ed25519 } from "@iota/crypto.js";
import { Converter, WriteStream } from "@iota/util.js";
import { EXTENDED_OUTPUT_TYPE } from "..";
import { serializeInput } from "../binary/inputs/inputs";
import { serializeOutput } from "../binary/outputs/outputs";
import { MAX_TAG_LENGTH } from "../binary/payloads/taggedDataPayload";
import { serializeTransactionEssence } from "../binary/transactionEssence";
import { SingleNodeClient } from "../clients/singleNodeClient";
import { ED25519_ADDRESS_TYPE } from "../models/addresses/IEd25519Address";
import { TRANSACTION_ESSENCE_TYPE } from "../models/ITransactionEssence";
import { TAGGED_DATA_PAYLOAD_TYPE } from "../models/payloads/ITaggedDataPayload";
import { TRANSACTION_PAYLOAD_TYPE } from "../models/payloads/ITransactionPayload";
import { ED25519_SIGNATURE_TYPE } from "../models/signatures/IEd25519Signature";
import { REFERENCE_UNLOCK_BLOCK_TYPE } from "../models/unlockBlocks/IReferenceUnlockBlock";
import { SIGNATURE_UNLOCK_BLOCK_TYPE } from "../models/unlockBlocks/ISignatureUnlockBlock";
/**
 * Send a transfer from the balance on the seed.
 * @param client The client or node endpoint to send the transfer with.
 * @param inputsAndSignatureKeyPairs The inputs with the signature key pairs needed to sign transfers.
 * @param outputs The outputs to send.
 * @param taggedData Optional tagged data to associate with the transaction.
 * @param taggedData.tag Optional tag.
 * @param taggedData.data Optional data.
 * @returns The id of the message created and the remainder address if one was needed.
 */
export async function sendAdvanced(client, inputsAndSignatureKeyPairs, outputs, taggedData) {
    const localClient = typeof client === "string" ? new SingleNodeClient(client) : client;
    const transactionPayload = buildTransactionPayload(inputsAndSignatureKeyPairs, outputs, taggedData);
    const message = {
        payload: transactionPayload
    };
    const messageId = await localClient.messageSubmit(message);
    return {
        messageId,
        message
    };
}
/**
 * Build a transaction payload.
 * @param inputsAndSignatureKeyPairs The inputs with the signature key pairs needed to sign transfers.
 * @param outputs The outputs to send.
 * @param taggedData Optional tagged data to associate with the transaction.
 * @param taggedData.tag Optional tag.
 * @param taggedData.data Optional index data.
 * @returns The transaction payload.
 */
export function buildTransactionPayload(inputsAndSignatureKeyPairs, outputs, taggedData) {
    if (!inputsAndSignatureKeyPairs || inputsAndSignatureKeyPairs.length === 0) {
        throw new Error("You must specify some inputs");
    }
    if (!outputs || outputs.length === 0) {
        throw new Error("You must specify some outputs");
    }
    let localTagHex;
    if (taggedData === null || taggedData === void 0 ? void 0 : taggedData.tag) {
        localTagHex =
            typeof taggedData.tag === "string"
                ? Converter.utf8ToHex(taggedData.tag)
                : Converter.bytesToHex(taggedData.tag);
        if (localTagHex.length / 2 > MAX_TAG_LENGTH) {
            throw new Error(`The tag length is ${localTagHex.length / 2}, which exceeds the maximum size of ${MAX_TAG_LENGTH}`);
        }
    }
    const outputsWithSerialization = [];
    for (const output of outputs) {
        if (output.addressType === ED25519_ADDRESS_TYPE) {
            const o = {
                type: EXTENDED_OUTPUT_TYPE,
                address: {
                    type: output.addressType,
                    address: output.address
                },
                amount: output.amount,
                nativeTokens: [],
                unlockConditions: [],
                blocks: []
            };
            const writeStream = new WriteStream();
            serializeOutput(writeStream, o);
            outputsWithSerialization.push({
                output: o,
                serialized: writeStream.finalHex()
            });
        }
        else {
            throw new Error(`Unrecognized output address type ${output.addressType}`);
        }
    }
    const inputsAndSignatureKeyPairsSerialized = inputsAndSignatureKeyPairs.map(i => {
        const writeStream = new WriteStream();
        serializeInput(writeStream, i.input);
        return {
            ...i,
            serialized: writeStream.finalHex()
        };
    });
    // Lexicographically sort the inputs and outputs
    const sortedInputs = inputsAndSignatureKeyPairsSerialized.sort((a, b) => a.serialized.localeCompare(b.serialized));
    const sortedOutputs = outputsWithSerialization.sort((a, b) => a.serialized.localeCompare(b.serialized));
    const transactionEssence = {
        type: TRANSACTION_ESSENCE_TYPE,
        inputs: sortedInputs.map(i => i.input),
        outputs: sortedOutputs.map(o => o.output),
        payload: taggedData
            ? {
                type: TAGGED_DATA_PAYLOAD_TYPE,
                tag: localTagHex,
                data: (taggedData === null || taggedData === void 0 ? void 0 : taggedData.data)
                    ? typeof taggedData.data === "string"
                        ? Converter.utf8ToHex(taggedData.data)
                        : Converter.bytesToHex(taggedData.data)
                    : undefined
            }
            : undefined
    };
    const binaryEssence = new WriteStream();
    serializeTransactionEssence(binaryEssence, transactionEssence);
    const essenceFinal = binaryEssence.finalBytes();
    const essenceHash = Blake2b.sum256(essenceFinal);
    // Create the unlock blocks
    const unlockBlocks = [];
    const addressToUnlockBlock = {};
    for (const input of sortedInputs) {
        const hexInputAddressPublic = Converter.bytesToHex(input.addressKeyPair.publicKey);
        if (addressToUnlockBlock[hexInputAddressPublic]) {
            unlockBlocks.push({
                type: REFERENCE_UNLOCK_BLOCK_TYPE,
                reference: addressToUnlockBlock[hexInputAddressPublic].unlockIndex
            });
        }
        else {
            unlockBlocks.push({
                type: SIGNATURE_UNLOCK_BLOCK_TYPE,
                signature: {
                    type: ED25519_SIGNATURE_TYPE,
                    publicKey: hexInputAddressPublic,
                    signature: Converter.bytesToHex(Ed25519.sign(input.addressKeyPair.privateKey, essenceHash))
                }
            });
            addressToUnlockBlock[hexInputAddressPublic] = {
                keyPair: input.addressKeyPair,
                unlockIndex: unlockBlocks.length - 1
            };
        }
    }
    const transactionPayload = {
        type: TRANSACTION_PAYLOAD_TYPE,
        essence: transactionEssence,
        unlockBlocks
    };
    return transactionPayload;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZEFkdmFuY2VkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hpZ2hMZXZlbC9zZW5kQWR2YW5jZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0Qyw4Q0FBOEM7QUFDOUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQUUsb0JBQW9CLEVBQW1CLE1BQU0sSUFBSSxDQUFDO0FBQzNELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzNFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBSzNFLE9BQU8sRUFBdUIsd0JBQXdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM5RixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUNqRixPQUFPLEVBQXVCLHdCQUF3QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDdkcsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDaEYsT0FBTyxFQUF5QiwyQkFBMkIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQ2xILE9BQU8sRUFBeUIsMkJBQTJCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUVsSDs7Ozs7Ozs7O0dBU0c7QUFDSCxNQUFNLENBQUMsS0FBSyxVQUFVLFlBQVksQ0FDOUIsTUFBd0IsRUFDeEIsMEJBR0csRUFDSCxPQUlHLEVBQ0gsVUFHQztJQUtELE1BQU0sV0FBVyxHQUFHLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBRXZGLE1BQU0sa0JBQWtCLEdBQUcsdUJBQXVCLENBQUMsMEJBQTBCLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBRXBHLE1BQU0sT0FBTyxHQUFhO1FBQ3RCLE9BQU8sRUFBRSxrQkFBa0I7S0FDOUIsQ0FBQztJQUVGLE1BQU0sU0FBUyxHQUFHLE1BQU0sV0FBVyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUUzRCxPQUFPO1FBQ0gsU0FBUztRQUNULE9BQU87S0FDVixDQUFDO0FBQ04sQ0FBQztBQUVEOzs7Ozs7OztHQVFHO0FBQ0gsTUFBTSxVQUFVLHVCQUF1QixDQUNuQywwQkFHRyxFQUNILE9BSUcsRUFDSCxVQUdDO0lBRUQsSUFBSSxDQUFDLDBCQUEwQixJQUFJLDBCQUEwQixDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDeEUsTUFBTSxJQUFJLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0tBQ25EO0lBQ0QsSUFBSSxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUNsQyxNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7S0FDcEQ7SUFFRCxJQUFJLFdBQVcsQ0FBQztJQUVoQixJQUFJLFVBQVUsYUFBVixVQUFVLHVCQUFWLFVBQVUsQ0FBRSxHQUFHLEVBQUU7UUFDakIsV0FBVztZQUNQLE9BQU8sVUFBVSxDQUFDLEdBQUcsS0FBSyxRQUFRO2dCQUM5QixDQUFDLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDO2dCQUNyQyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFL0MsSUFBSSxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxjQUFjLEVBQUU7WUFDekMsTUFBTSxJQUFJLEtBQUssQ0FDWCxxQkFDSSxXQUFXLENBQUMsTUFBTSxHQUFHLENBQ3pCLHVDQUF1QyxjQUFjLEVBQUUsQ0FDMUQsQ0FBQztTQUNMO0tBQ0o7SUFFRCxNQUFNLHdCQUF3QixHQUd4QixFQUFFLENBQUM7SUFFVCxLQUFLLE1BQU0sTUFBTSxJQUFJLE9BQU8sRUFBRTtRQUMxQixJQUFJLE1BQU0sQ0FBQyxXQUFXLEtBQUssb0JBQW9CLEVBQUU7WUFDN0MsTUFBTSxDQUFDLEdBQW9CO2dCQUN2QixJQUFJLEVBQUUsb0JBQW9CO2dCQUMxQixPQUFPLEVBQUU7b0JBQ0wsSUFBSSxFQUFFLE1BQU0sQ0FBQyxXQUFXO29CQUN4QixPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU87aUJBQzFCO2dCQUNELE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTTtnQkFDckIsWUFBWSxFQUFFLEVBQUU7Z0JBQ2hCLGdCQUFnQixFQUFFLEVBQUU7Z0JBQ3BCLE1BQU0sRUFBRSxFQUFFO2FBQ2IsQ0FBQztZQUNGLE1BQU0sV0FBVyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7WUFDdEMsZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNoQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUM7Z0JBQzFCLE1BQU0sRUFBRSxDQUFDO2dCQUNULFVBQVUsRUFBRSxXQUFXLENBQUMsUUFBUSxFQUFFO2FBQ3JDLENBQUMsQ0FBQztTQUNOO2FBQU07WUFDSCxNQUFNLElBQUksS0FBSyxDQUFDLG9DQUFvQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztTQUM3RTtLQUNKO0lBRUQsTUFBTSxvQ0FBb0MsR0FJcEMsMEJBQTBCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ3JDLE1BQU0sV0FBVyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7UUFDdEMsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckMsT0FBTztZQUNILEdBQUcsQ0FBQztZQUNKLFVBQVUsRUFBRSxXQUFXLENBQUMsUUFBUSxFQUFFO1NBQ3JDLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztJQUVILGdEQUFnRDtJQUNoRCxNQUFNLFlBQVksR0FBRyxvQ0FBb0MsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUNuSCxNQUFNLGFBQWEsR0FBRyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUV4RyxNQUFNLGtCQUFrQixHQUF3QjtRQUM1QyxJQUFJLEVBQUUsd0JBQXdCO1FBQzlCLE1BQU0sRUFBRSxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUN0QyxPQUFPLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDekMsT0FBTyxFQUFFLFVBQVU7WUFDZixDQUFDLENBQUM7Z0JBQ0ksSUFBSSxFQUFFLHdCQUF3QjtnQkFDOUIsR0FBRyxFQUFFLFdBQVc7Z0JBQ2hCLElBQUksRUFBRSxDQUFBLFVBQVUsYUFBVixVQUFVLHVCQUFWLFVBQVUsQ0FBRSxJQUFJO29CQUNsQixDQUFDLENBQUMsT0FBTyxVQUFVLENBQUMsSUFBSSxLQUFLLFFBQVE7d0JBQ2pDLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7d0JBQ3RDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7b0JBQzNDLENBQUMsQ0FBQyxTQUFTO2FBQ2xCO1lBQ0gsQ0FBQyxDQUFDLFNBQVM7S0FDbEIsQ0FBQztJQUVGLE1BQU0sYUFBYSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7SUFDeEMsMkJBQTJCLENBQUMsYUFBYSxFQUFFLGtCQUFrQixDQUFDLENBQUM7SUFDL0QsTUFBTSxZQUFZLEdBQUcsYUFBYSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBRWhELE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7SUFFakQsMkJBQTJCO0lBQzNCLE1BQU0sWUFBWSxHQUFzRCxFQUFFLENBQUM7SUFDM0UsTUFBTSxvQkFBb0IsR0FLdEIsRUFBRSxDQUFDO0lBRVAsS0FBSyxNQUFNLEtBQUssSUFBSSxZQUFZLEVBQUU7UUFDOUIsTUFBTSxxQkFBcUIsR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbkYsSUFBSSxvQkFBb0IsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFO1lBQzdDLFlBQVksQ0FBQyxJQUFJLENBQUM7Z0JBQ2QsSUFBSSxFQUFFLDJCQUEyQjtnQkFDakMsU0FBUyxFQUFFLG9CQUFvQixDQUFDLHFCQUFxQixDQUFDLENBQUMsV0FBVzthQUNyRSxDQUFDLENBQUM7U0FDTjthQUFNO1lBQ0gsWUFBWSxDQUFDLElBQUksQ0FBQztnQkFDZCxJQUFJLEVBQUUsMkJBQTJCO2dCQUNqQyxTQUFTLEVBQUU7b0JBQ1AsSUFBSSxFQUFFLHNCQUFzQjtvQkFDNUIsU0FBUyxFQUFFLHFCQUFxQjtvQkFDaEMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQztpQkFDOUY7YUFDSixDQUFDLENBQUM7WUFDSCxvQkFBb0IsQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHO2dCQUMxQyxPQUFPLEVBQUUsS0FBSyxDQUFDLGNBQWM7Z0JBQzdCLFdBQVcsRUFBRSxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUM7YUFDdkMsQ0FBQztTQUNMO0tBQ0o7SUFFRCxNQUFNLGtCQUFrQixHQUF3QjtRQUM1QyxJQUFJLEVBQUUsd0JBQXdCO1FBQzlCLE9BQU8sRUFBRSxrQkFBa0I7UUFDM0IsWUFBWTtLQUNmLENBQUM7SUFFRixPQUFPLGtCQUFrQixDQUFDO0FBQzlCLENBQUMifQ==