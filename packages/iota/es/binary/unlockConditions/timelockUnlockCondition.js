import { TIMELOCK_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/ITimelockUnlockCondition";
import { SMALL_TYPE_LENGTH, UINT32_SIZE } from "../commonDataTypes";
/**
 * The minimum length of an timelock unlock condition binary representation.
 */
export const MIN_TIMELOCK_UNLOCK_CONDITION_LENGTH = SMALL_TYPE_LENGTH +
    UINT32_SIZE +
    UINT32_SIZE;
/**
 * Deserialize the timelock unlock condition from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeTimelockUnlockCondition(readStream) {
    if (!readStream.hasRemaining(MIN_TIMELOCK_UNLOCK_CONDITION_LENGTH)) {
        throw new Error(`Timelock unlock condition data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_TIMELOCK_UNLOCK_CONDITION_LENGTH}`);
    }
    const type = readStream.readUInt8("timelockUnlockCondition.type");
    if (type !== TIMELOCK_UNLOCK_CONDITION_TYPE) {
        throw new Error(`Type mismatch in timelockUnlockCondition ${type}`);
    }
    const milestoneIndex = readStream.readUInt32("timelockUnlockCondition.milestoneIndex");
    const unixTime = readStream.readUInt32("timelockUnlockCondition.unixTime");
    return {
        type: TIMELOCK_UNLOCK_CONDITION_TYPE,
        milestoneIndex,
        unixTime
    };
}
/**
 * Serialize the timelock unlock condition to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeTimelockUnlockCondition(writeStream, object) {
    writeStream.writeUInt8("timelockUnlockCondition.type", object.type);
    writeStream.writeUInt32("timelockUnlockCondition.milestoneIndex", object.milestoneIndex);
    writeStream.writeUInt32("timelockUnlockCondition.unixTime", object.unixTime);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxvY2tVbmxvY2tDb25kaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmluYXJ5L3VubG9ja0NvbmRpdGlvbnMvdGltZWxvY2tVbmxvY2tDb25kaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsT0FBTyxFQUE0Qiw4QkFBOEIsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBQ2xJLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVwRTs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLG9DQUFvQyxHQUM3QyxpQkFBaUI7SUFDakIsV0FBVztJQUNYLFdBQVcsQ0FBQztBQUVoQjs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLGtDQUFrQyxDQUFDLFVBQXNCO0lBQ3JFLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLG9DQUFvQyxDQUFDLEVBQUU7UUFDaEUsTUFBTSxJQUFJLEtBQUssQ0FDWCxxQ0FBcUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxnRUFBZ0Usb0NBQW9DLEVBQUUsQ0FDakssQ0FBQztLQUNMO0lBRUQsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0lBQ2xFLElBQUksSUFBSSxLQUFLLDhCQUE4QixFQUFFO1FBQ3pDLE1BQU0sSUFBSSxLQUFLLENBQUMsNENBQTRDLElBQUksRUFBRSxDQUFDLENBQUM7S0FDdkU7SUFFRCxNQUFNLGNBQWMsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLHdDQUF3QyxDQUFDLENBQUM7SUFDdkYsTUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO0lBRTNFLE9BQU87UUFDSCxJQUFJLEVBQUUsOEJBQThCO1FBQ3BDLGNBQWM7UUFDZCxRQUFRO0tBQ1gsQ0FBQztBQUNOLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLGdDQUFnQyxDQUM1QyxXQUF3QixFQUFFLE1BQWdDO0lBQzFELFdBQVcsQ0FBQyxVQUFVLENBQUMsOEJBQThCLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BFLFdBQVcsQ0FBQyxXQUFXLENBQUMsd0NBQXdDLEVBQUUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ3pGLFdBQVcsQ0FBQyxXQUFXLENBQUMsa0NBQWtDLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2pGLENBQUMifQ==