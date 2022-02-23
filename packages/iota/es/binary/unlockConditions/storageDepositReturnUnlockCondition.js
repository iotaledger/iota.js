import bigInt from "big-integer";
import { STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IStorageDepositReturnUnlockCondition";
import { deserializeAddress, MIN_ADDRESS_LENGTH, serializeAddress } from "../addresses/addresses";
import { SMALL_TYPE_LENGTH, UINT64_SIZE } from "../commonDataTypes";
/**
 * The minimum length of an storage deposit return unlock condition binary representation.
 */
export const MIN_STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_LENGTH = SMALL_TYPE_LENGTH +
    MIN_ADDRESS_LENGTH +
    UINT64_SIZE;
/**
 * Deserialize the storage deposit return unlock condition from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeStorageDepositReturnUnlockCondition(readStream) {
    if (!readStream.hasRemaining(MIN_STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_LENGTH)) {
        throw new Error(`Storage deposit return unlock condition data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_LENGTH}`);
    }
    const type = readStream.readUInt8("storageDepositReturnUnlockCondition.type");
    if (type !== STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE) {
        throw new Error(`Type mismatch in storagDepositReturnUnlockCondition ${type}`);
    }
    const returnAddress = deserializeAddress(readStream);
    const amount = readStream.readUInt64("storageDepositReturnUnlockCondition.amount");
    return {
        type: STORAGE_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE,
        returnAddress,
        amount: Number(amount)
    };
}
/**
 * Serialize the storage deposit return unlock condition to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeStorageDepositReturnUnlockCondition(writeStream, object) {
    writeStream.writeUInt8("storageDepositReturnUnlockCondition.type", object.type);
    serializeAddress(writeStream, object.returnAddress);
    writeStream.writeUInt64("storageDepositReturnUnlockCondition.amount", bigInt(object.amount));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZURlcG9zaXRSZXR1cm5VbmxvY2tDb25kaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmluYXJ5L3VubG9ja0NvbmRpdGlvbnMvc3RvcmFnZURlcG9zaXRSZXR1cm5VbmxvY2tDb25kaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsT0FBTyxNQUFNLE1BQU0sYUFBYSxDQUFDO0FBQ2pDLE9BQU8sRUFBd0MsNENBQTRDLEVBQUUsTUFBTSxvRUFBb0UsQ0FBQztBQUN4SyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsa0JBQWtCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNsRyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFcEU7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxrREFBa0QsR0FDM0QsaUJBQWlCO0lBQ2pCLGtCQUFrQjtJQUNsQixXQUFXLENBQUM7QUFFaEI7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSw4Q0FBOEMsQ0FBQyxVQUFzQjtJQUVqRixJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxrREFBa0QsQ0FBQyxFQUFFO1FBQzlFLE1BQU0sSUFBSSxLQUFLLENBQ1gsbURBQW1ELFVBQVUsQ0FBQyxNQUFNLEVBQUUsZ0VBQWdFLGtEQUFrRCxFQUFFLENBQzdMLENBQUM7S0FDTDtJQUVELE1BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsMENBQTBDLENBQUMsQ0FBQztJQUM5RSxJQUFJLElBQUksS0FBSyw0Q0FBNEMsRUFBRTtRQUN2RCxNQUFNLElBQUksS0FBSyxDQUFDLHVEQUF1RCxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQ2xGO0lBRUQsTUFBTSxhQUFhLEdBQUcsa0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDckQsTUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDO0lBRW5GLE9BQU87UUFDSCxJQUFJLEVBQUUsNENBQTRDO1FBQ2xELGFBQWE7UUFDYixNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQztLQUN6QixDQUFDO0FBQ04sQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsNENBQTRDLENBQ3hELFdBQXdCLEVBQUUsTUFBNEM7SUFDdEUsV0FBVyxDQUFDLFVBQVUsQ0FBQywwQ0FBMEMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEYsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNwRCxXQUFXLENBQUMsV0FBVyxDQUFDLDRDQUE0QyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUNqRyxDQUFDIn0=