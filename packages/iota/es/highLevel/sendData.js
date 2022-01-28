// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable unicorn/no-nested-ternary */
import { Converter } from "@iota/util.js";
import { MAX_TAG_LENGTH } from "../binary/payloads/taggedDataPayload";
import { SingleNodeClient } from "../clients/singleNodeClient";
import { TAGGED_DATA_PAYLOAD_TYPE } from "../models/payloads/ITaggedDataPayload";
/**
 * Send a data message.
 * @param client The client or node endpoint to send the data with.
 * @param tag The tag for the data.
 * @param data The data as either UTF8 text or Uint8Array bytes.
 * @returns The id of the message created and the message.
 */
export async function sendData(client, tag, data) {
    const localClient = typeof client === "string" ? new SingleNodeClient(client) : client;
    let localTagHex;
    if (tag) {
        localTagHex = typeof tag === "string" ? Converter.utf8ToHex(tag) : Converter.bytesToHex(tag);
        if (localTagHex.length / 2 > MAX_TAG_LENGTH) {
            throw new Error(`The tag length is ${localTagHex.length / 2}, which exceeds the maximum size of ${MAX_TAG_LENGTH}`);
        }
    }
    const taggedDataPayload = {
        type: TAGGED_DATA_PAYLOAD_TYPE,
        tag: localTagHex,
        data: data
            ? typeof data === "string"
                ? Converter.utf8ToHex(data)
                : Converter.bytesToHex(data)
            : undefined
    };
    const message = {
        payload: taggedDataPayload
    };
    const messageId = await localClient.messageSubmit(message);
    return {
        message,
        messageId
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZERhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGlnaExldmVsL3NlbmREYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMsOENBQThDO0FBQzlDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRy9ELE9BQU8sRUFBc0Isd0JBQXdCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUVyRzs7Ozs7O0dBTUc7QUFDSCxNQUFNLENBQUMsS0FBSyxVQUFVLFFBQVEsQ0FDMUIsTUFBd0IsRUFDeEIsR0FBeUIsRUFDekIsSUFBMEI7SUFLMUIsTUFBTSxXQUFXLEdBQUcsT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7SUFFdkYsSUFBSSxXQUFXLENBQUM7SUFFaEIsSUFBSSxHQUFHLEVBQUU7UUFDTCxXQUFXLEdBQUcsT0FBTyxHQUFHLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTdGLElBQUksV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsY0FBYyxFQUFFO1lBQ3pDLE1BQU0sSUFBSSxLQUFLLENBQ1gscUJBQXFCLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FDMUMsdUNBQXVDLGNBQWMsRUFBRSxDQUMxRCxDQUFDO1NBQ0w7S0FDSjtJQUVELE1BQU0saUJBQWlCLEdBQXVCO1FBQzFDLElBQUksRUFBRSx3QkFBd0I7UUFDOUIsR0FBRyxFQUFFLFdBQVc7UUFDaEIsSUFBSSxFQUFFLElBQUk7WUFDTixDQUFDLENBQUMsT0FBTyxJQUFJLEtBQUssUUFBUTtnQkFDdEIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO2dCQUMzQixDQUFDLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDaEMsQ0FBQyxDQUFDLFNBQVM7S0FDbEIsQ0FBQztJQUVGLE1BQU0sT0FBTyxHQUFhO1FBQ3RCLE9BQU8sRUFBRSxpQkFBaUI7S0FDN0IsQ0FBQztJQUVGLE1BQU0sU0FBUyxHQUFHLE1BQU0sV0FBVyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMzRCxPQUFPO1FBQ0gsT0FBTztRQUNQLFNBQVM7S0FDWixDQUFDO0FBQ04sQ0FBQyJ9