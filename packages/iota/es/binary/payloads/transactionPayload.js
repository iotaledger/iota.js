import { TRANSACTION_ESSENCE_TYPE } from "../../models/ITransactionEssence";
import { TRANSACTION_PAYLOAD_TYPE } from "../../models/payloads/ITransactionPayload";
import { TYPE_LENGTH, UINT32_SIZE } from "../commonDataTypes";
import { deserializeTransactionEssence, serializeTransactionEssence } from "../transactionEssence";
import { deserializeUnlockBlocks, serializeUnlockBlocks } from "../unlockBlocks/unlockBlocks";
/**
 * The minimum length of a transaction payload binary representation.
 */
export const MIN_TRANSACTION_PAYLOAD_LENGTH = TYPE_LENGTH + // min payload
    UINT32_SIZE; // essence type
/**
 * Deserialize the transaction payload from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeTransactionPayload(readStream) {
    if (!readStream.hasRemaining(MIN_TRANSACTION_PAYLOAD_LENGTH)) {
        throw new Error(`Transaction Payload data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_TRANSACTION_PAYLOAD_LENGTH}`);
    }
    const type = readStream.readUInt32("payloadTransaction.type");
    if (type !== TRANSACTION_PAYLOAD_TYPE) {
        throw new Error(`Type mismatch in payloadTransaction ${type}`);
    }
    const essenceType = readStream.readUInt8("payloadTransaction.essenceType", false);
    let essence;
    let unlockBlocks;
    if (essenceType === TRANSACTION_ESSENCE_TYPE) {
        essence = deserializeTransactionEssence(readStream);
        unlockBlocks = deserializeUnlockBlocks(readStream);
    }
    else {
        throw new Error(`Unrecognized transaction essence type ${type}`);
    }
    return {
        type: TRANSACTION_PAYLOAD_TYPE,
        essence,
        unlockBlocks
    };
}
/**
 * Serialize the transaction payload to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeTransactionPayload(writeStream, object) {
    writeStream.writeUInt32("payloadMilestone.type", object.type);
    if (object.type === TRANSACTION_PAYLOAD_TYPE) {
        serializeTransactionEssence(writeStream, object.essence);
        serializeUnlockBlocks(writeStream, object.unlockBlocks);
    }
    else {
        throw new Error(`Unrecognized transaction type ${object.type}`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNhY3Rpb25QYXlsb2FkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2JpbmFyeS9wYXlsb2Fkcy90cmFuc2FjdGlvblBheWxvYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBSUEsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDNUUsT0FBTyxFQUF1Qix3QkFBd0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQzFHLE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDOUQsT0FBTyxFQUFFLDZCQUE2QixFQUFFLDJCQUEyQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDbkcsT0FBTyxFQUFFLHVCQUF1QixFQUFFLHFCQUFxQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFOUY7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSw4QkFBOEIsR0FDdkMsV0FBVyxHQUFHLGNBQWM7SUFDNUIsV0FBVyxDQUFDLENBQUMsZUFBZTtBQUVoQzs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLDZCQUE2QixDQUFDLFVBQXNCO0lBQ2hFLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLDhCQUE4QixDQUFDLEVBQUU7UUFDMUQsTUFBTSxJQUFJLEtBQUssQ0FDWCwrQkFBK0IsVUFBVSxDQUFDLE1BQU0sRUFBRSxnRUFBZ0UsOEJBQThCLEVBQUUsQ0FDckosQ0FBQztLQUNMO0lBRUQsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQzlELElBQUksSUFBSSxLQUFLLHdCQUF3QixFQUFFO1FBQ25DLE1BQU0sSUFBSSxLQUFLLENBQUMsdUNBQXVDLElBQUksRUFBRSxDQUFDLENBQUM7S0FDbEU7SUFFRCxNQUFNLFdBQVcsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLGdDQUFnQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2xGLElBQUksT0FBTyxDQUFDO0lBQ1osSUFBSSxZQUFZLENBQUM7SUFFakIsSUFBSSxXQUFXLEtBQUssd0JBQXdCLEVBQUU7UUFDMUMsT0FBTyxHQUFHLDZCQUE2QixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3BELFlBQVksR0FBRyx1QkFBdUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUN0RDtTQUFNO1FBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQyx5Q0FBeUMsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUNwRTtJQUVELE9BQU87UUFDSCxJQUFJLEVBQUUsd0JBQXdCO1FBQzlCLE9BQU87UUFDUCxZQUFZO0tBQ2YsQ0FBQztBQUNOLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLDJCQUEyQixDQUFDLFdBQXdCLEVBQUUsTUFBMkI7SUFDN0YsV0FBVyxDQUFDLFdBQVcsQ0FBQyx1QkFBdUIsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFOUQsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLHdCQUF3QixFQUFFO1FBQzFDLDJCQUEyQixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekQscUJBQXFCLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUMzRDtTQUFNO1FBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7S0FDbkU7QUFDTCxDQUFDIn0=