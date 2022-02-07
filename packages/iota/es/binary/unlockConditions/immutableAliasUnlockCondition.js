import { IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IImmutableAliasUnlockCondition";
import { deserializeAddress, MIN_ADDRESS_LENGTH, serializeAddress } from "../addresses/addresses";
import { SMALL_TYPE_LENGTH } from "../commonDataTypes";
/**
 * The minimum length of an immutable alias unlock condition binary representation.
 */
export const MIN_IMMUTABLE_ALIAS_UNLOCK_CONDITION_LENGTH = SMALL_TYPE_LENGTH + MIN_ADDRESS_LENGTH;
/**
 * Deserialize the immutable alias unlock condition from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeImmutableAliasUnlockCondition(readStream) {
    if (!readStream.hasRemaining(MIN_IMMUTABLE_ALIAS_UNLOCK_CONDITION_LENGTH)) {
        throw new Error(`Immutable Alias unlock condition data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_IMMUTABLE_ALIAS_UNLOCK_CONDITION_LENGTH}`);
    }
    const type = readStream.readUInt8("immutableAliasUnlockCondition.type");
    if (type !== IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE) {
        throw new Error(`Type mismatch in immutableAliasUnlockCondition ${type}`);
    }
    const address = deserializeAddress(readStream);
    return {
        type: IMMUTABLE_ALIAS_UNLOCK_CONDITION_TYPE,
        address
    };
}
/**
 * Serialize the immutable alias unlock condition to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeImmutableAliasUnlockCondition(writeStream, object) {
    writeStream.writeUInt8("immutableAliasUnlockCondition.type", object.type);
    serializeAddress(writeStream, object.address);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1tdXRhYmxlQWxpYXNVbmxvY2tDb25kaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmluYXJ5L3VubG9ja0NvbmRpdGlvbnMvaW1tdXRhYmxlQWxpYXNVbmxvY2tDb25kaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsT0FBTyxFQUFrQyxxQ0FBcUMsRUFBRSxNQUFNLDhEQUE4RCxDQUFDO0FBQ3JKLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2xHLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRXZEOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sMkNBQTJDLEdBQVcsaUJBQWlCLEdBQUcsa0JBQWtCLENBQUM7QUFFMUc7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSx3Q0FBd0MsQ0FBQyxVQUFzQjtJQUMzRSxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQywyQ0FBMkMsQ0FBQyxFQUFFO1FBQ3ZFLE1BQU0sSUFBSSxLQUFLLENBQ1gsNENBQTRDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsZ0VBQWdFLDJDQUEyQyxFQUFFLENBQy9LLENBQUM7S0FDTDtJQUVELE1BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsb0NBQW9DLENBQUMsQ0FBQztJQUN4RSxJQUFJLElBQUksS0FBSyxxQ0FBcUMsRUFBRTtRQUNoRCxNQUFNLElBQUksS0FBSyxDQUFDLGtEQUFrRCxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQzdFO0lBRUQsTUFBTSxPQUFPLEdBQUcsa0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFL0MsT0FBTztRQUNILElBQUksRUFBRSxxQ0FBcUM7UUFDM0MsT0FBTztLQUNWLENBQUM7QUFDTixDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxzQ0FBc0MsQ0FDbEQsV0FBd0IsRUFBRSxNQUFzQztJQUNoRSxXQUFXLENBQUMsVUFBVSxDQUFDLG9DQUFvQyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxRSxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2xELENBQUMifQ==