import { ADDRESS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IAddressUnlockCondition";
import { deserializeAddress, MIN_ADDRESS_LENGTH, serializeAddress } from "../addresses/addresses";
import { SMALL_TYPE_LENGTH } from "../commonDataTypes";
/**
 * The minimum length of an address unlock condition binary representation.
 */
export const MIN_ADDRESS_UNLOCK_CONDITION_LENGTH = SMALL_TYPE_LENGTH + MIN_ADDRESS_LENGTH;
/**
 * Deserialize the address unlock condition from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeAddressUnlockCondition(readStream) {
    if (!readStream.hasRemaining(MIN_ADDRESS_UNLOCK_CONDITION_LENGTH)) {
        throw new Error(`Address unlock condition data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_ADDRESS_UNLOCK_CONDITION_LENGTH}`);
    }
    const type = readStream.readUInt8("addressUnlockCondition.type");
    if (type !== ADDRESS_UNLOCK_CONDITION_TYPE) {
        throw new Error(`Type mismatch in addressUnlockCondition ${type}`);
    }
    const address = deserializeAddress(readStream);
    return {
        type: ADDRESS_UNLOCK_CONDITION_TYPE,
        address
    };
}
/**
 * Serialize the address unlock condition to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeAddressUnlockCondition(writeStream, object) {
    writeStream.writeUInt8("addressUnlockCondition.type", object.type);
    serializeAddress(writeStream, object.address);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzc1VubG9ja0NvbmRpdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iaW5hcnkvdW5sb2NrQ29uZGl0aW9ucy9hZGRyZXNzVW5sb2NrQ29uZGl0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE9BQU8sRUFBMkIsNkJBQTZCLEVBQUUsTUFBTSx1REFBdUQsQ0FBQztBQUMvSCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsa0JBQWtCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNsRyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUV2RDs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLG1DQUFtQyxHQUFXLGlCQUFpQixHQUFHLGtCQUFrQixDQUFDO0FBRWxHOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsaUNBQWlDLENBQUMsVUFBc0I7SUFDcEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsbUNBQW1DLENBQUMsRUFBRTtRQUMvRCxNQUFNLElBQUksS0FBSyxDQUNYLG9DQUFvQyxVQUFVLENBQUMsTUFBTSxFQUFFLGdFQUFnRSxtQ0FBbUMsRUFBRSxDQUMvSixDQUFDO0tBQ0w7SUFFRCxNQUFNLElBQUksR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLDZCQUE2QixDQUFDLENBQUM7SUFDakUsSUFBSSxJQUFJLEtBQUssNkJBQTZCLEVBQUU7UUFDeEMsTUFBTSxJQUFJLEtBQUssQ0FBQywyQ0FBMkMsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUN0RTtJQUVELE1BQU0sT0FBTyxHQUFHLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRS9DLE9BQU87UUFDSCxJQUFJLEVBQUUsNkJBQTZCO1FBQ25DLE9BQU87S0FDVixDQUFDO0FBQ04sQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsK0JBQStCLENBQUMsV0FBd0IsRUFBRSxNQUErQjtJQUNyRyxXQUFXLENBQUMsVUFBVSxDQUFDLDZCQUE2QixFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuRSxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2xELENBQUMifQ==