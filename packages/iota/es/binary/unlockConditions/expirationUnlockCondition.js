import { EXPIRATION_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IExpirationUnlockCondition";
import { deserializeAddress, MIN_ADDRESS_LENGTH, serializeAddress } from "../addresses/addresses";
import { SMALL_TYPE_LENGTH, UINT32_SIZE } from "../commonDataTypes";
/**
 * The minimum length of an expiration unlock condition binary representation.
 */
export const MIN_EXPIRATION_UNLOCK_CONDITION_LENGTH = SMALL_TYPE_LENGTH +
    MIN_ADDRESS_LENGTH +
    UINT32_SIZE +
    UINT32_SIZE;
/**
 * Deserialize the expiration unlock condition from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeExpirationUnlockCondition(readStream) {
    if (!readStream.hasRemaining(MIN_EXPIRATION_UNLOCK_CONDITION_LENGTH)) {
        throw new Error(`Expiration unlock condition data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_EXPIRATION_UNLOCK_CONDITION_LENGTH}`);
    }
    const type = readStream.readUInt8("expirationUnlockCondition.type");
    if (type !== EXPIRATION_UNLOCK_CONDITION_TYPE) {
        throw new Error(`Type mismatch in expirationUnlockCondition ${type}`);
    }
    const returnAddress = deserializeAddress(readStream);
    const milestoneIndex = readStream.readUInt32("expirationUnlockCondition.milestoneIndex");
    const unixTime = readStream.readUInt32("expirationUnlockCondition.unixTime");
    return {
        type: EXPIRATION_UNLOCK_CONDITION_TYPE,
        returnAddress,
        milestoneIndex,
        unixTime
    };
}
/**
 * Serialize the expiration unlock condition to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeExpirationUnlockCondition(writeStream, object) {
    writeStream.writeUInt8("expirationUnlockCondition.type", object.type);
    serializeAddress(writeStream, object.returnAddress);
    writeStream.writeUInt32("expirationUnlockCondition.milestoneIndex", object.milestoneIndex);
    writeStream.writeUInt32("expirationUnlockCondition.unixTime", object.unixTime);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwaXJhdGlvblVubG9ja0NvbmRpdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iaW5hcnkvdW5sb2NrQ29uZGl0aW9ucy9leHBpcmF0aW9uVW5sb2NrQ29uZGl0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE9BQU8sRUFBOEIsZ0NBQWdDLEVBQUUsTUFBTSwwREFBMEQsQ0FBQztBQUN4SSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsa0JBQWtCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNsRyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFcEU7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxzQ0FBc0MsR0FDL0MsaUJBQWlCO0lBQ2pCLGtCQUFrQjtJQUNsQixXQUFXO0lBQ1gsV0FBVyxDQUFDO0FBRWhCOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsb0NBQW9DLENBQUMsVUFBc0I7SUFDdkUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsc0NBQXNDLENBQUMsRUFBRTtRQUNsRSxNQUFNLElBQUksS0FBSyxDQUNYLHVDQUF1QyxVQUFVLENBQUMsTUFBTSxFQUFFLGdFQUFnRSxzQ0FBc0MsRUFBRSxDQUNySyxDQUFDO0tBQ0w7SUFFRCxNQUFNLElBQUksR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7SUFDcEUsSUFBSSxJQUFJLEtBQUssZ0NBQWdDLEVBQUU7UUFDM0MsTUFBTSxJQUFJLEtBQUssQ0FBQyw4Q0FBOEMsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUN6RTtJQUVELE1BQU0sYUFBYSxHQUFHLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRXJELE1BQU0sY0FBYyxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsMENBQTBDLENBQUMsQ0FBQztJQUN6RixNQUFNLFFBQVEsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLG9DQUFvQyxDQUFDLENBQUM7SUFFN0UsT0FBTztRQUNILElBQUksRUFBRSxnQ0FBZ0M7UUFDdEMsYUFBYTtRQUNiLGNBQWM7UUFDZCxRQUFRO0tBQ1gsQ0FBQztBQUNOLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLGtDQUFrQyxDQUM5QyxXQUF3QixFQUFFLE1BQWtDO0lBQzVELFdBQVcsQ0FBQyxVQUFVLENBQUMsZ0NBQWdDLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RFLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDcEQsV0FBVyxDQUFDLFdBQVcsQ0FBQywwQ0FBMEMsRUFBRSxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDM0YsV0FBVyxDQUFDLFdBQVcsQ0FBQyxvQ0FBb0MsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDbkYsQ0FBQyJ9