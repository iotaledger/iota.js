import { REFERENCE_UNLOCK_BLOCK_TYPE } from "../../models/unlockBlocks/IReferenceUnlockBlock";
import { SMALL_TYPE_LENGTH, UINT16_SIZE } from "../commonDataTypes";
/**
 * The minimum length of a reference unlock block binary representation.
 */
export const MIN_REFERENCE_UNLOCK_BLOCK_LENGTH = SMALL_TYPE_LENGTH + UINT16_SIZE;
/**
 * Deserialize the reference unlock block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeReferenceUnlockBlock(readStream) {
    if (!readStream.hasRemaining(MIN_REFERENCE_UNLOCK_BLOCK_LENGTH)) {
        throw new Error(`Reference Unlock Block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_REFERENCE_UNLOCK_BLOCK_LENGTH}`);
    }
    const type = readStream.readUInt8("referenceUnlockBlock.type");
    if (type !== REFERENCE_UNLOCK_BLOCK_TYPE) {
        throw new Error(`Type mismatch in referenceUnlockBlock ${type}`);
    }
    const reference = readStream.readUInt16("referenceUnlockBlock.reference");
    return {
        type: REFERENCE_UNLOCK_BLOCK_TYPE,
        reference
    };
}
/**
 * Serialize the reference unlock block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeReferenceUnlockBlock(writeStream, object) {
    writeStream.writeUInt8("referenceUnlockBlock.type", object.type);
    writeStream.writeUInt16("referenceUnlockBlock.reference", object.reference);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmZXJlbmNlVW5sb2NrQmxvY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmluYXJ5L3VubG9ja0Jsb2Nrcy9yZWZlcmVuY2VVbmxvY2tCbG9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLEVBQXlCLDJCQUEyQixFQUFFLE1BQU0saURBQWlELENBQUM7QUFDckgsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRXBFOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0saUNBQWlDLEdBQVcsaUJBQWlCLEdBQUcsV0FBVyxDQUFDO0FBRXpGOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsK0JBQStCLENBQUMsVUFBc0I7SUFDbEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsaUNBQWlDLENBQUMsRUFBRTtRQUM3RCxNQUFNLElBQUksS0FBSyxDQUNYLGtDQUFrQyxVQUFVLENBQUMsTUFBTSxFQUFFLGdFQUFnRSxpQ0FBaUMsRUFBRSxDQUMzSixDQUFDO0tBQ0w7SUFFRCxNQUFNLElBQUksR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLDJCQUEyQixDQUFDLENBQUM7SUFDL0QsSUFBSSxJQUFJLEtBQUssMkJBQTJCLEVBQUU7UUFDdEMsTUFBTSxJQUFJLEtBQUssQ0FBQyx5Q0FBeUMsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUNwRTtJQUVELE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztJQUUxRSxPQUFPO1FBQ0gsSUFBSSxFQUFFLDJCQUEyQjtRQUNqQyxTQUFTO0tBQ1osQ0FBQztBQUNOLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLDZCQUE2QixDQUFDLFdBQXdCLEVBQUUsTUFBNkI7SUFDakcsV0FBVyxDQUFDLFVBQVUsQ0FBQywyQkFBMkIsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakUsV0FBVyxDQUFDLFdBQVcsQ0FBQyxnQ0FBZ0MsRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDaEYsQ0FBQyJ9