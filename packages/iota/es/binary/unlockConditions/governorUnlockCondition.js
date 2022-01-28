import { GOVERNOR_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IGovernorUnlockCondition";
import { deserializeAddress, MIN_ADDRESS_LENGTH, serializeAddress } from "../addresses/addresses";
import { SMALL_TYPE_LENGTH } from "../commonDataTypes";
/**
 * The minimum length of an governor unlock condition binary representation.
 */
export const MIN_GOVERNOR_UNLOCK_CONDITION_LENGTH = SMALL_TYPE_LENGTH + MIN_ADDRESS_LENGTH;
/**
 * Deserialize the governor unlock condition from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeGovernorUnlockCondition(readStream) {
    if (!readStream.hasRemaining(MIN_GOVERNOR_UNLOCK_CONDITION_LENGTH)) {
        throw new Error(`Governor unlock condition data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_GOVERNOR_UNLOCK_CONDITION_LENGTH}`);
    }
    const type = readStream.readUInt8("governorUnlockCondition.type");
    if (type !== GOVERNOR_UNLOCK_CONDITION_TYPE) {
        throw new Error(`Type mismatch in governorUnlockCondition ${type}`);
    }
    const address = deserializeAddress(readStream);
    return {
        type: GOVERNOR_UNLOCK_CONDITION_TYPE,
        address
    };
}
/**
 * Serialize the governor unlock condition to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeGovernorUnlockCondition(writeStream, object) {
    writeStream.writeUInt8("governorUnlockCondition.type", object.type);
    serializeAddress(writeStream, object.address);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ292ZXJub3JVbmxvY2tDb25kaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmluYXJ5L3VubG9ja0NvbmRpdGlvbnMvZ292ZXJub3JVbmxvY2tDb25kaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsT0FBTyxFQUE0Qiw4QkFBOEIsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBQ2xJLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2xHLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRXZEOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sb0NBQW9DLEdBQVcsaUJBQWlCLEdBQUcsa0JBQWtCLENBQUM7QUFFbkc7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxrQ0FBa0MsQ0FBQyxVQUFzQjtJQUNyRSxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxvQ0FBb0MsQ0FBQyxFQUFFO1FBQ2hFLE1BQU0sSUFBSSxLQUFLLENBQ1gscUNBQXFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsZ0VBQWdFLG9DQUFvQyxFQUFFLENBQ2pLLENBQUM7S0FDTDtJQUVELE1BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsOEJBQThCLENBQUMsQ0FBQztJQUNsRSxJQUFJLElBQUksS0FBSyw4QkFBOEIsRUFBRTtRQUN6QyxNQUFNLElBQUksS0FBSyxDQUFDLDRDQUE0QyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQ3ZFO0lBRUQsTUFBTSxPQUFPLEdBQUcsa0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFL0MsT0FBTztRQUNILElBQUksRUFBRSw4QkFBOEI7UUFDcEMsT0FBTztLQUNWLENBQUM7QUFDTixDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxnQ0FBZ0MsQ0FBQyxXQUF3QixFQUFFLE1BQWdDO0lBQ3ZHLFdBQVcsQ0FBQyxVQUFVLENBQUMsOEJBQThCLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BFLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDbEQsQ0FBQyJ9