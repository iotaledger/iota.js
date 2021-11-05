// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable unicorn/no-nested-ternary */
import { Blake2b, Ed25519 } from "@iota/crypto.js";
import { Converter, WriteStream } from "@iota/util.js";
import { serializeInput } from "../binary/input";
import { serializeOutput } from "../binary/output";
import { MAX_INDEXATION_KEY_LENGTH, MIN_INDEXATION_KEY_LENGTH } from "../binary/payload";
import { serializeTransactionEssence } from "../binary/transaction";
import { SingleNodeClient } from "../clients/singleNodeClient";
import { ED25519_ADDRESS_TYPE } from "../models/addresses/IEd25519Address";
import { ED25519_SIGNATURE_TYPE } from "../models/IEd25519Signature";
import { TRANSACTION_ESSENCE_TYPE } from "../models/ITransactionEssence";
import { SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE } from "../models/outputs/ISigLockedDustAllowanceOutput";
import { SIMPLE_OUTPUT_TYPE } from "../models/outputs/ISimpleOutput";
import { INDEXATION_PAYLOAD_TYPE } from "../models/payloads/IIndexationPayload";
import { TRANSACTION_PAYLOAD_TYPE } from "../models/payloads/ITransactionPayload";
import { REFERENCE_UNLOCK_BLOCK_TYPE } from "../models/unlockBlocks/IReferenceUnlockBlock";
import { SIGNATURE_UNLOCK_BLOCK_TYPE } from "../models/unlockBlocks/ISignatureUnlockBlock";
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
export async function sendAdvanced(client, inputsAndSignatureKeyPairs, outputs, indexation) {
    const localClient = typeof client === "string" ? new SingleNodeClient(client) : client;
    const transactionPayload = buildTransactionPayload(inputsAndSignatureKeyPairs, outputs, indexation);
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
 * @param indexation Optional indexation data to associate with the transaction.
 * @param indexation.key Indexation key.
 * @param indexation.data Optional index data.
 * @returns The transaction payload.
 */
export function buildTransactionPayload(inputsAndSignatureKeyPairs, outputs, indexation) {
    if (!inputsAndSignatureKeyPairs || inputsAndSignatureKeyPairs.length === 0) {
        throw new Error("You must specify some inputs");
    }
    if (!outputs || outputs.length === 0) {
        throw new Error("You must specify some outputs");
    }
    let localIndexationKeyHex;
    if (indexation === null || indexation === void 0 ? void 0 : indexation.key) {
        localIndexationKeyHex =
            typeof indexation.key === "string"
                ? Converter.utf8ToHex(indexation.key)
                : Converter.bytesToHex(indexation.key);
        if (localIndexationKeyHex.length / 2 < MIN_INDEXATION_KEY_LENGTH) {
            throw new Error(`The indexation key length is ${localIndexationKeyHex.length / 2}, which is below the minimum size of ${MIN_INDEXATION_KEY_LENGTH}`);
        }
        if (localIndexationKeyHex.length / 2 > MAX_INDEXATION_KEY_LENGTH) {
            throw new Error(`The indexation key length is ${localIndexationKeyHex.length / 2}, which exceeds the maximum size of ${MAX_INDEXATION_KEY_LENGTH}`);
        }
    }
    const outputsWithSerialization = [];
    for (const output of outputs) {
        if (output.addressType === ED25519_ADDRESS_TYPE) {
            const o = {
                type: output.isDustAllowance ? SIG_LOCKED_DUST_ALLOWANCE_OUTPUT_TYPE : SIMPLE_OUTPUT_TYPE,
                address: {
                    type: output.addressType,
                    address: output.address
                },
                amount: output.amount
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
        payload: localIndexationKeyHex
            ? {
                type: INDEXATION_PAYLOAD_TYPE,
                index: localIndexationKeyHex,
                data: (indexation === null || indexation === void 0 ? void 0 : indexation.data)
                    ? typeof indexation.data === "string"
                        ? Converter.utf8ToHex(indexation.data)
                        : Converter.bytesToHex(indexation.data)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZEFkdmFuY2VkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hpZ2hMZXZlbC9zZW5kQWR2YW5jZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0Qyw4Q0FBOEM7QUFDOUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDakQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ25ELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSx5QkFBeUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3pGLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBRTNFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBSXJFLE9BQU8sRUFBdUIsd0JBQXdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM5RixPQUFPLEVBRUgscUNBQXFDLEVBQ3hDLE1BQU0saURBQWlELENBQUM7QUFDekQsT0FBTyxFQUFpQixrQkFBa0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ2hGLE9BQU8sRUFBdUIsd0JBQXdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUN2RyxPQUFPLEVBQXlCLDJCQUEyQixFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDbEgsT0FBTyxFQUF5QiwyQkFBMkIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBRWxIOzs7Ozs7Ozs7R0FTRztBQUNILE1BQU0sQ0FBQyxLQUFLLFVBQVUsWUFBWSxDQUM5QixNQUF3QixFQUN4QiwwQkFHRyxFQUNILE9BS0csRUFDSCxVQUdDO0lBS0QsTUFBTSxXQUFXLEdBQUcsT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7SUFFdkYsTUFBTSxrQkFBa0IsR0FBRyx1QkFBdUIsQ0FBQywwQkFBMEIsRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFFcEcsTUFBTSxPQUFPLEdBQWE7UUFDdEIsT0FBTyxFQUFFLGtCQUFrQjtLQUM5QixDQUFDO0lBRUYsTUFBTSxTQUFTLEdBQUcsTUFBTSxXQUFXLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTNELE9BQU87UUFDSCxTQUFTO1FBQ1QsT0FBTztLQUNWLENBQUM7QUFDTixDQUFDO0FBRUQ7Ozs7Ozs7O0dBUUc7QUFDSCxNQUFNLFVBQVUsdUJBQXVCLENBQ25DLDBCQUdHLEVBQ0gsT0FLRyxFQUNILFVBR0M7SUFFRCxJQUFJLENBQUMsMEJBQTBCLElBQUksMEJBQTBCLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUN4RSxNQUFNLElBQUksS0FBSyxDQUFDLDhCQUE4QixDQUFDLENBQUM7S0FDbkQ7SUFDRCxJQUFJLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ2xDLE1BQU0sSUFBSSxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQztLQUNwRDtJQUVELElBQUkscUJBQXFCLENBQUM7SUFFMUIsSUFBSSxVQUFVLGFBQVYsVUFBVSx1QkFBVixVQUFVLENBQUUsR0FBRyxFQUFFO1FBQ2pCLHFCQUFxQjtZQUNqQixPQUFPLFVBQVUsQ0FBQyxHQUFHLEtBQUssUUFBUTtnQkFDOUIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQztnQkFDckMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRS9DLElBQUkscUJBQXFCLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyx5QkFBeUIsRUFBRTtZQUM5RCxNQUFNLElBQUksS0FBSyxDQUNYLGdDQUFnQyxxQkFBcUIsQ0FBQyxNQUFNLEdBQUcsQ0FDL0Qsd0NBQXdDLHlCQUF5QixFQUFFLENBQ3RFLENBQUM7U0FDTDtRQUVELElBQUkscUJBQXFCLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyx5QkFBeUIsRUFBRTtZQUM5RCxNQUFNLElBQUksS0FBSyxDQUNYLGdDQUFnQyxxQkFBcUIsQ0FBQyxNQUFNLEdBQUcsQ0FDL0QsdUNBQXVDLHlCQUF5QixFQUFFLENBQ3JFLENBQUM7U0FDTDtLQUNKO0lBRUQsTUFBTSx3QkFBd0IsR0FHeEIsRUFBRSxDQUFDO0lBRVQsS0FBSyxNQUFNLE1BQU0sSUFBSSxPQUFPLEVBQUU7UUFDMUIsSUFBSSxNQUFNLENBQUMsV0FBVyxLQUFLLG9CQUFvQixFQUFFO1lBQzdDLE1BQU0sQ0FBQyxHQUFrRDtnQkFDckQsSUFBSSxFQUFFLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLHFDQUFxQyxDQUFDLENBQUMsQ0FBQyxrQkFBa0I7Z0JBQ3pGLE9BQU8sRUFBRTtvQkFDTCxJQUFJLEVBQUUsTUFBTSxDQUFDLFdBQVc7b0JBQ3hCLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTztpQkFDMUI7Z0JBQ0QsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNO2FBQ3hCLENBQUM7WUFDRixNQUFNLFdBQVcsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1lBQ3RDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDaEMsd0JBQXdCLENBQUMsSUFBSSxDQUFDO2dCQUMxQixNQUFNLEVBQUUsQ0FBQztnQkFDVCxVQUFVLEVBQUUsV0FBVyxDQUFDLFFBQVEsRUFBRTthQUNyQyxDQUFDLENBQUM7U0FDTjthQUFNO1lBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQ0FBb0MsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7U0FDN0U7S0FDSjtJQUVELE1BQU0sb0NBQW9DLEdBSXBDLDBCQUEwQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUNyQyxNQUFNLFdBQVcsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBQ3RDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLE9BQU87WUFDSCxHQUFHLENBQUM7WUFDSixVQUFVLEVBQUUsV0FBVyxDQUFDLFFBQVEsRUFBRTtTQUNyQyxDQUFDO0lBQ04sQ0FBQyxDQUFDLENBQUM7SUFFSCxnREFBZ0Q7SUFDaEQsTUFBTSxZQUFZLEdBQUcsb0NBQW9DLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDbkgsTUFBTSxhQUFhLEdBQUcsd0JBQXdCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFFeEcsTUFBTSxrQkFBa0IsR0FBd0I7UUFDNUMsSUFBSSxFQUFFLHdCQUF3QjtRQUM5QixNQUFNLEVBQUUsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDdEMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ3pDLE9BQU8sRUFBRSxxQkFBcUI7WUFDMUIsQ0FBQyxDQUFDO2dCQUNFLElBQUksRUFBRSx1QkFBdUI7Z0JBQzdCLEtBQUssRUFBRSxxQkFBcUI7Z0JBQzVCLElBQUksRUFBRSxDQUFBLFVBQVUsYUFBVixVQUFVLHVCQUFWLFVBQVUsQ0FBRSxJQUFJO29CQUNsQixDQUFDLENBQUMsT0FBTyxVQUFVLENBQUMsSUFBSSxLQUFLLFFBQVE7d0JBQ2pDLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7d0JBQ3RDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7b0JBQzNDLENBQUMsQ0FBQyxTQUFTO2FBQ2xCO1lBQ0QsQ0FBQyxDQUFDLFNBQVM7S0FDbEIsQ0FBQztJQUVGLE1BQU0sYUFBYSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7SUFDeEMsMkJBQTJCLENBQUMsYUFBYSxFQUFFLGtCQUFrQixDQUFDLENBQUM7SUFDL0QsTUFBTSxZQUFZLEdBQUcsYUFBYSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBRWhELE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7SUFFakQsMkJBQTJCO0lBQzNCLE1BQU0sWUFBWSxHQUFzRCxFQUFFLENBQUM7SUFDM0UsTUFBTSxvQkFBb0IsR0FLdEIsRUFBRSxDQUFDO0lBRVAsS0FBSyxNQUFNLEtBQUssSUFBSSxZQUFZLEVBQUU7UUFDOUIsTUFBTSxxQkFBcUIsR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbkYsSUFBSSxvQkFBb0IsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFO1lBQzdDLFlBQVksQ0FBQyxJQUFJLENBQUM7Z0JBQ2QsSUFBSSxFQUFFLDJCQUEyQjtnQkFDakMsU0FBUyxFQUFFLG9CQUFvQixDQUFDLHFCQUFxQixDQUFDLENBQUMsV0FBVzthQUNyRSxDQUFDLENBQUM7U0FDTjthQUFNO1lBQ0gsWUFBWSxDQUFDLElBQUksQ0FBQztnQkFDZCxJQUFJLEVBQUUsMkJBQTJCO2dCQUNqQyxTQUFTLEVBQUU7b0JBQ1AsSUFBSSxFQUFFLHNCQUFzQjtvQkFDNUIsU0FBUyxFQUFFLHFCQUFxQjtvQkFDaEMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQztpQkFDOUY7YUFDSixDQUFDLENBQUM7WUFDSCxvQkFBb0IsQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHO2dCQUMxQyxPQUFPLEVBQUUsS0FBSyxDQUFDLGNBQWM7Z0JBQzdCLFdBQVcsRUFBRSxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUM7YUFDdkMsQ0FBQztTQUNMO0tBQ0o7SUFFRCxNQUFNLGtCQUFrQixHQUF3QjtRQUM1QyxJQUFJLEVBQUUsd0JBQXdCO1FBQzlCLE9BQU8sRUFBRSxrQkFBa0I7UUFDM0IsWUFBWTtLQUNmLENBQUM7SUFFRixPQUFPLGtCQUFrQixDQUFDO0FBQzlCLENBQUMifQ==