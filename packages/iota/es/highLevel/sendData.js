// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable unicorn/no-nested-ternary */
import { Converter } from "@iota/util.js";
import { MAX_INDEXATION_KEY_LENGTH, MIN_INDEXATION_KEY_LENGTH } from "../binary/payload";
import { SingleNodeClient } from "../clients/singleNodeClient";
import { INDEXATION_PAYLOAD_TYPE } from "../models/IIndexationPayload";
/**
 * Send a data message.
 * @param client The client or node endpoint to send the data with.
 * @param indexationKey The index name.
 * @param indexationData The index data as either UTF8 text or Uint8Array bytes.
 * @returns The id of the message created and the message.
 */
export async function sendData(client, indexationKey, indexationData) {
    const localClient = typeof client === "string" ? new SingleNodeClient(client) : client;
    if (!indexationKey) {
        throw new Error("indexationKey must not be empty");
    }
    const localIndexationKeyHex = typeof indexationKey === "string" ? Converter.utf8ToHex(indexationKey) : Converter.bytesToHex(indexationKey);
    if (localIndexationKeyHex.length / 2 < MIN_INDEXATION_KEY_LENGTH) {
        throw new Error(`The indexation key length is ${localIndexationKeyHex.length / 2}, which is below the minimum size of ${MIN_INDEXATION_KEY_LENGTH}`);
    }
    if (localIndexationKeyHex.length / 2 > MAX_INDEXATION_KEY_LENGTH) {
        throw new Error(`The indexation key length is ${localIndexationKeyHex.length / 2}, which exceeds the maximum size of ${MAX_INDEXATION_KEY_LENGTH}`);
    }
    const indexationPayload = {
        type: INDEXATION_PAYLOAD_TYPE,
        index: localIndexationKeyHex,
        data: indexationData
            ? typeof indexationData === "string"
                ? Converter.utf8ToHex(indexationData)
                : Converter.bytesToHex(indexationData)
            : undefined
    };
    const message = {
        payload: indexationPayload
    };
    const messageId = await localClient.messageSubmit(message);
    return {
        message,
        messageId
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZERhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGlnaExldmVsL3NlbmREYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMsOENBQThDO0FBQzlDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLHlCQUF5QixFQUFFLHlCQUF5QixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDekYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFL0QsT0FBTyxFQUFzQix1QkFBdUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRzNGOzs7Ozs7R0FNRztBQUNILE1BQU0sQ0FBQyxLQUFLLFVBQVUsUUFBUSxDQUMxQixNQUF3QixFQUN4QixhQUFrQyxFQUNsQyxjQUFvQztJQUtwQyxNQUFNLFdBQVcsR0FBRyxPQUFPLE1BQU0sS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUV2RixJQUFJLENBQUMsYUFBYSxFQUFFO1FBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztLQUN0RDtJQUVELE1BQU0scUJBQXFCLEdBQ3ZCLE9BQU8sYUFBYSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUVqSCxJQUFJLHFCQUFxQixDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcseUJBQXlCLEVBQUU7UUFDOUQsTUFBTSxJQUFJLEtBQUssQ0FDWCxnQ0FDSSxxQkFBcUIsQ0FBQyxNQUFNLEdBQUcsQ0FDbkMsd0NBQXdDLHlCQUF5QixFQUFFLENBQ3RFLENBQUM7S0FDTDtJQUVELElBQUkscUJBQXFCLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyx5QkFBeUIsRUFBRTtRQUM5RCxNQUFNLElBQUksS0FBSyxDQUNYLGdDQUNJLHFCQUFxQixDQUFDLE1BQU0sR0FBRyxDQUNuQyx1Q0FBdUMseUJBQXlCLEVBQUUsQ0FDckUsQ0FBQztLQUNMO0lBRUQsTUFBTSxpQkFBaUIsR0FBdUI7UUFDMUMsSUFBSSxFQUFFLHVCQUF1QjtRQUM3QixLQUFLLEVBQUUscUJBQXFCO1FBQzVCLElBQUksRUFBRSxjQUFjO1lBQ2hCLENBQUMsQ0FBQyxPQUFPLGNBQWMsS0FBSyxRQUFRO2dCQUNoQyxDQUFDLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUM7Z0JBQ3JDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQztZQUMxQyxDQUFDLENBQUMsU0FBUztLQUNsQixDQUFDO0lBRUYsTUFBTSxPQUFPLEdBQWE7UUFDdEIsT0FBTyxFQUFFLGlCQUFpQjtLQUM3QixDQUFDO0lBRUYsTUFBTSxTQUFTLEdBQUcsTUFBTSxXQUFXLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzNELE9BQU87UUFDSCxPQUFPO1FBQ1AsU0FBUztLQUNaLENBQUM7QUFDTixDQUFDIn0=