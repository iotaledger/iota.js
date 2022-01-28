import { STATE_CONTROLLER_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IStateControllerUnlockCondition";
import { deserializeAddress, MIN_ADDRESS_LENGTH, serializeAddress } from "../addresses/addresses";
import { SMALL_TYPE_LENGTH } from "../commonDataTypes";
/**
 * The minimum length of an state controller unlock condition binary representation.
 */
export const MIN_STATE_CONTROLLER_UNLOCK_CONDITION_LENGTH = SMALL_TYPE_LENGTH + MIN_ADDRESS_LENGTH;
/**
 * Deserialize the state controller unlock condition from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeStateControllerUnlockCondition(readStream) {
    if (!readStream.hasRemaining(MIN_STATE_CONTROLLER_UNLOCK_CONDITION_LENGTH)) {
        throw new Error(`State controller unlock condition data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_STATE_CONTROLLER_UNLOCK_CONDITION_LENGTH}`);
    }
    const type = readStream.readUInt8("stateControllerUnlockCondition.type");
    if (type !== STATE_CONTROLLER_UNLOCK_CONDITION_TYPE) {
        throw new Error(`Type mismatch in stateControllerUnlockCondition ${type}`);
    }
    const address = deserializeAddress(readStream);
    return {
        type: STATE_CONTROLLER_UNLOCK_CONDITION_TYPE,
        address
    };
}
/**
 * Serialize the state controller unlock condition to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeStateControllerUnlockCondition(writeStream, object) {
    writeStream.writeUInt8("stateControllerUnlockCondition.type", object.type);
    serializeAddress(writeStream, object.address);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGVDb250cm9sbGVyVW5sb2NrQ29uZGl0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2JpbmFyeS91bmxvY2tDb25kaXRpb25zL3N0YXRlQ29udHJvbGxlclVubG9ja0NvbmRpdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLEVBQW1DLHNDQUFzQyxFQUFFLE1BQU0sK0RBQStELENBQUM7QUFDeEosT0FBTyxFQUFFLGtCQUFrQixFQUFFLGtCQUFrQixFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDbEcsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFdkQ7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSw0Q0FBNEMsR0FBVyxpQkFBaUIsR0FBRyxrQkFBa0IsQ0FBQztBQUUzRzs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLHlDQUF5QyxDQUFDLFVBQXNCO0lBQzVFLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLDRDQUE0QyxDQUFDLEVBQUU7UUFDeEUsTUFBTSxJQUFJLEtBQUssQ0FDWCw2Q0FBNkMsVUFBVSxDQUFDLE1BQU0sRUFBRSxnRUFBZ0UsNENBQTRDLEVBQUUsQ0FDakwsQ0FBQztLQUNMO0lBRUQsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO0lBQ3pFLElBQUksSUFBSSxLQUFLLHNDQUFzQyxFQUFFO1FBQ2pELE1BQU0sSUFBSSxLQUFLLENBQUMsbURBQW1ELElBQUksRUFBRSxDQUFDLENBQUM7S0FDOUU7SUFFRCxNQUFNLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUUvQyxPQUFPO1FBQ0gsSUFBSSxFQUFFLHNDQUFzQztRQUM1QyxPQUFPO0tBQ1YsQ0FBQztBQUNOLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLHVDQUF1QyxDQUNuRCxXQUF3QixFQUFFLE1BQXVDO0lBQ2pFLFdBQVcsQ0FBQyxVQUFVLENBQUMscUNBQXFDLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNFLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDbEQsQ0FBQyJ9