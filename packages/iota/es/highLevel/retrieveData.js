// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Converter } from "@iota/util.js";
import { SingleNodeClient } from "../clients/singleNodeClient";
import { INDEXATION_PAYLOAD_TYPE } from "../models/IIndexationPayload";
import { TRANSACTION_PAYLOAD_TYPE } from "../models/ITransactionPayload";
/**
 * Retrieve a data message.
 * @param client The client or node endpoint to retrieve the data with.
 * @param messageId The message id of the data to get.
 * @returns The message index and data.
 */
export async function retrieveData(client, messageId) {
    const localClient = typeof client === "string" ? new SingleNodeClient(client) : client;
    const message = await localClient.message(messageId);
    if (message === null || message === void 0 ? void 0 : message.payload) {
        let indexationPayload;
        if (message.payload.type === TRANSACTION_PAYLOAD_TYPE) {
            indexationPayload = message.payload.essence.payload;
        }
        else if (message.payload.type === INDEXATION_PAYLOAD_TYPE) {
            indexationPayload = message.payload;
        }
        if (indexationPayload) {
            return {
                index: Converter.hexToBytes(indexationPayload.index),
                data: indexationPayload.data ? Converter.hexToBytes(indexationPayload.data) : undefined
            };
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV0cmlldmVEYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hpZ2hMZXZlbC9yZXRyaWV2ZURhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRS9ELE9BQU8sRUFBc0IsdUJBQXVCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMzRixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUV6RTs7Ozs7R0FLRztBQUNILE1BQU0sQ0FBQyxLQUFLLFVBQVUsWUFBWSxDQUM5QixNQUF3QixFQUN4QixTQUFpQjtJQVFqQixNQUFNLFdBQVcsR0FBRyxPQUFPLE1BQU0sS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUV2RixNQUFNLE9BQU8sR0FBRyxNQUFNLFdBQVcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFckQsSUFBSSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsT0FBTyxFQUFFO1FBQ2xCLElBQUksaUJBQWlELENBQUM7UUFFdEQsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyx3QkFBd0IsRUFBRTtZQUNuRCxpQkFBaUIsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7U0FDdkQ7YUFBTSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLHVCQUF1QixFQUFFO1lBQ3pELGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7U0FDdkM7UUFFRCxJQUFJLGlCQUFpQixFQUFFO1lBQ25CLE9BQU87Z0JBQ0gsS0FBSyxFQUFFLFNBQVMsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDO2dCQUNwRCxJQUFJLEVBQUUsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTO2FBQzFGLENBQUM7U0FDTDtLQUNKO0FBQ0wsQ0FBQyJ9