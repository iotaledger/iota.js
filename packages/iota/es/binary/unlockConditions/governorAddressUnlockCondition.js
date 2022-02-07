import { GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IGovernorAddressUnlockCondition";
import { deserializeAddress, MIN_ADDRESS_LENGTH, serializeAddress } from "../addresses/addresses";
import { SMALL_TYPE_LENGTH } from "../commonDataTypes";
/**
 * The minimum length of an governor unlock condition binary representation.
 */
export const MIN_GOVERNOR_ADDRESS_UNLOCK_CONDITION_LENGTH = SMALL_TYPE_LENGTH + MIN_ADDRESS_LENGTH;
/**
 * Deserialize the governor address unlock condition from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeGovernorAddressUnlockCondition(readStream) {
    if (!readStream.hasRemaining(MIN_GOVERNOR_ADDRESS_UNLOCK_CONDITION_LENGTH)) {
        throw new Error(`Governor unlock condition data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_GOVERNOR_ADDRESS_UNLOCK_CONDITION_LENGTH}`);
    }
    const type = readStream.readUInt8("governorUnlockCondition.type");
    if (type !== GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE) {
        throw new Error(`Type mismatch in governorUnlockCondition ${type}`);
    }
    const address = deserializeAddress(readStream);
    return {
        type: GOVERNOR_ADDRESS_UNLOCK_CONDITION_TYPE,
        address
    };
}
/**
 * Serialize the governor address unlock condition to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeGovernorAddressUnlockCondition(writeStream, object) {
    writeStream.writeUInt8("governorUnlockCondition.type", object.type);
    serializeAddress(writeStream, object.address);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ292ZXJub3JBZGRyZXNzVW5sb2NrQ29uZGl0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2JpbmFyeS91bmxvY2tDb25kaXRpb25zL2dvdmVybm9yQWRkcmVzc1VubG9ja0NvbmRpdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLEVBQW1DLHNDQUFzQyxFQUFFLE1BQU0sK0RBQStELENBQUM7QUFDeEosT0FBTyxFQUFFLGtCQUFrQixFQUFFLGtCQUFrQixFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDbEcsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFdkQ7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSw0Q0FBNEMsR0FBVyxpQkFBaUIsR0FBRyxrQkFBa0IsQ0FBQztBQUUzRzs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLHlDQUF5QyxDQUFDLFVBQXNCO0lBQzVFLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLDRDQUE0QyxDQUFDLEVBQUU7UUFDeEUsTUFBTSxJQUFJLEtBQUssQ0FDWCxxQ0FBcUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxnRUFBZ0UsNENBQTRDLEVBQUUsQ0FDekssQ0FBQztLQUNMO0lBRUQsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0lBQ2xFLElBQUksSUFBSSxLQUFLLHNDQUFzQyxFQUFFO1FBQ2pELE1BQU0sSUFBSSxLQUFLLENBQUMsNENBQTRDLElBQUksRUFBRSxDQUFDLENBQUM7S0FDdkU7SUFFRCxNQUFNLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUUvQyxPQUFPO1FBQ0gsSUFBSSxFQUFFLHNDQUFzQztRQUM1QyxPQUFPO0tBQ1YsQ0FBQztBQUNOLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLHVDQUF1QyxDQUNuRCxXQUF3QixFQUFFLE1BQXVDO0lBQ2pFLFdBQVcsQ0FBQyxVQUFVLENBQUMsOEJBQThCLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BFLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDbEQsQ0FBQyJ9