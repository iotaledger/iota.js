import { STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IStateControllerAddressUnlockCondition";
import { deserializeAddress, MIN_ADDRESS_LENGTH, serializeAddress } from "../addresses/addresses";
import { SMALL_TYPE_LENGTH } from "../commonDataTypes";
/**
 * The minimum length of an state controller address unlock condition binary representation.
 */
export const MIN_STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_LENGTH = SMALL_TYPE_LENGTH + MIN_ADDRESS_LENGTH;
/**
 * Deserialize the state controller address unlock condition from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeStateControllerAddressUnlockCondition(readStream) {
    if (!readStream.hasRemaining(MIN_STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_LENGTH)) {
        throw new Error(`State controller addres unlock condition data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_LENGTH}`);
    }
    const type = readStream.readUInt8("stateControllerAddresUnlockCondition.type");
    if (type !== STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE) {
        throw new Error(`Type mismatch in stateControllerAddresUnlockCondition ${type}`);
    }
    const address = deserializeAddress(readStream);
    return {
        type: STATE_CONTROLLER_ADDRESS_UNLOCK_CONDITION_TYPE,
        address
    };
}
/**
 * Serialize the state controller address unlock condition to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeStateControllerAddressUnlockCondition(writeStream, object) {
    writeStream.writeUInt8("stateControllerAddressUnlockCondition.type", object.type);
    serializeAddress(writeStream, object.address);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGVDb250cm9sbGVyQWRkcmVzc1VubG9ja0NvbmRpdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iaW5hcnkvdW5sb2NrQ29uZGl0aW9ucy9zdGF0ZUNvbnRyb2xsZXJBZGRyZXNzVW5sb2NrQ29uZGl0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE9BQU8sRUFBMEMsOENBQThDLEVBQUUsTUFBTSxzRUFBc0UsQ0FBQztBQUM5SyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsa0JBQWtCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNsRyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUV2RDs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLG9EQUFvRCxHQUFXLGlCQUFpQixHQUFHLGtCQUFrQixDQUFDO0FBRW5IOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsZ0RBQWdELENBQzVELFVBQXNCO0lBQ3RCLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLG9EQUFvRCxDQUFDLEVBQUU7UUFDaEYsTUFBTSxJQUFJLEtBQUssQ0FDWCxvREFBb0QsVUFBVSxDQUFDLE1BQU0sRUFBRSxnRUFBZ0Usb0RBQW9ELEVBQUUsQ0FDaE0sQ0FBQztLQUNMO0lBRUQsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDO0lBQy9FLElBQUksSUFBSSxLQUFLLDhDQUE4QyxFQUFFO1FBQ3pELE1BQU0sSUFBSSxLQUFLLENBQUMseURBQXlELElBQUksRUFBRSxDQUFDLENBQUM7S0FDcEY7SUFFRCxNQUFNLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUUvQyxPQUFPO1FBQ0gsSUFBSSxFQUFFLDhDQUE4QztRQUNwRCxPQUFPO0tBQ1YsQ0FBQztBQUNOLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLDhDQUE4QyxDQUMxRCxXQUF3QixFQUFFLE1BQThDO0lBQ3hFLFdBQVcsQ0FBQyxVQUFVLENBQUMsNENBQTRDLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xGLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDbEQsQ0FBQyJ9