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
    const essenceType = readStream.readByte("payloadTransaction.essenceType", false);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNhY3Rpb25QYXlsb2FkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2JpbmFyeS9wYXlsb2Fkcy90cmFuc2FjdGlvblBheWxvYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBSUEsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDNUUsT0FBTyxFQUF1Qix3QkFBd0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQzFHLE9BQU8sRUFDSCxXQUFXLEVBQUUsV0FBVyxFQUMzQixNQUFNLG9CQUFvQixDQUFDO0FBQzVCLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSwyQkFBMkIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ25HLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRTlGOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sOEJBQThCLEdBQ3ZDLFdBQVcsR0FBRyxjQUFjO0lBQzVCLFdBQVcsQ0FBQyxDQUFDLGVBQWU7QUFFaEM7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSw2QkFBNkIsQ0FBQyxVQUFzQjtJQUNoRSxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyw4QkFBOEIsQ0FBQyxFQUFFO1FBQzFELE1BQU0sSUFBSSxLQUFLLENBQ1gsK0JBQStCLFVBQVUsQ0FBQyxNQUFNLEVBQUUsZ0VBQWdFLDhCQUE4QixFQUFFLENBQ3JKLENBQUM7S0FDTDtJQUVELE1BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUM5RCxJQUFJLElBQUksS0FBSyx3QkFBd0IsRUFBRTtRQUNuQyxNQUFNLElBQUksS0FBSyxDQUFDLHVDQUF1QyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQ2xFO0lBRUQsTUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxnQ0FBZ0MsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNqRixJQUFJLE9BQU8sQ0FBQztJQUNaLElBQUksWUFBWSxDQUFDO0lBRWpCLElBQUksV0FBVyxLQUFLLHdCQUF3QixFQUFFO1FBQzFDLE9BQU8sR0FBRyw2QkFBNkIsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNwRCxZQUFZLEdBQUcsdUJBQXVCLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDdEQ7U0FBTTtRQUNILE1BQU0sSUFBSSxLQUFLLENBQUMseUNBQXlDLElBQUksRUFBRSxDQUFDLENBQUM7S0FDcEU7SUFFRCxPQUFPO1FBQ0gsSUFBSSxFQUFFLHdCQUF3QjtRQUM5QixPQUFPO1FBQ1AsWUFBWTtLQUNmLENBQUM7QUFDTixDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSwyQkFBMkIsQ0FBQyxXQUF3QixFQUFFLE1BQTJCO0lBQzdGLFdBQVcsQ0FBQyxXQUFXLENBQUMsdUJBQXVCLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTlELElBQUksTUFBTSxDQUFDLElBQUksS0FBSyx3QkFBd0IsRUFBRTtRQUMxQywyQkFBMkIsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3pELHFCQUFxQixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDM0Q7U0FBTTtRQUNILE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQWlDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQ25FO0FBQ0wsQ0FBQyJ9