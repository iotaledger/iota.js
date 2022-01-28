import bigInt from "big-integer";
import { DUST_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE } from "../../models/unlockConditions/IDustDepositReturnUnlockCondition";
import { deserializeAddress, MIN_ADDRESS_LENGTH, serializeAddress } from "../addresses/addresses";
import { SMALL_TYPE_LENGTH, UINT64_SIZE } from "../commonDataTypes";
/**
 * The minimum length of an dust deposit return unlock condition binary representation.
 */
export const MIN_DUST_DEPOSIT_RETURN_UNLOCK_CONDITION_LENGTH = SMALL_TYPE_LENGTH +
    MIN_ADDRESS_LENGTH +
    UINT64_SIZE;
/**
 * Deserialize the dust deposit return unlock condition from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeDustDepositReturnUnlockCondition(readStream) {
    if (!readStream.hasRemaining(MIN_DUST_DEPOSIT_RETURN_UNLOCK_CONDITION_LENGTH)) {
        throw new Error(`Dust deposit return unlock condition data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_DUST_DEPOSIT_RETURN_UNLOCK_CONDITION_LENGTH}`);
    }
    const type = readStream.readUInt8("dustDepositReturnUnlockCondition.type");
    if (type !== DUST_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE) {
        throw new Error(`Type mismatch in dustDepositReturnUnlockCondition ${type}`);
    }
    const returnAddress = deserializeAddress(readStream);
    const amount = readStream.readUInt64("dustDepositReturnUnlockCondition.amount");
    return {
        type: DUST_DEPOSIT_RETURN_UNLOCK_CONDITION_TYPE,
        returnAddress,
        amount: Number(amount)
    };
}
/**
 * Serialize the dust deposit return unlock condition to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeDustDepositReturnUnlockCondition(writeStream, object) {
    writeStream.writeUInt8("dustDepositReturnUnlockCondition.type", object.type);
    serializeAddress(writeStream, object.returnAddress);
    writeStream.writeUInt64("dustDepositReturnUnlockCondition.amount", bigInt(object.amount));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVzdERlcG9zaXRSZXR1cm5VbmxvY2tDb25kaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmluYXJ5L3VubG9ja0NvbmRpdGlvbnMvZHVzdERlcG9zaXRSZXR1cm5VbmxvY2tDb25kaXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsT0FBTyxNQUFNLE1BQU0sYUFBYSxDQUFDO0FBQ2pDLE9BQU8sRUFBcUMseUNBQXlDLEVBQUUsTUFBTSxpRUFBaUUsQ0FBQztBQUMvSixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsa0JBQWtCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNsRyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFcEU7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSwrQ0FBK0MsR0FDeEQsaUJBQWlCO0lBQ2pCLGtCQUFrQjtJQUNsQixXQUFXLENBQUM7QUFFaEI7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSwyQ0FBMkMsQ0FBQyxVQUFzQjtJQUM5RSxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQywrQ0FBK0MsQ0FBQyxFQUFFO1FBQzNFLE1BQU0sSUFBSSxLQUFLLENBQ1gsZ0RBQWdELFVBQVUsQ0FBQyxNQUFNLEVBQUUsZ0VBQWdFLCtDQUErQyxFQUFFLENBQ3ZMLENBQUM7S0FDTDtJQUVELE1BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsdUNBQXVDLENBQUMsQ0FBQztJQUMzRSxJQUFJLElBQUksS0FBSyx5Q0FBeUMsRUFBRTtRQUNwRCxNQUFNLElBQUksS0FBSyxDQUFDLHFEQUFxRCxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQ2hGO0lBRUQsTUFBTSxhQUFhLEdBQUcsa0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDckQsTUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO0lBRWhGLE9BQU87UUFDSCxJQUFJLEVBQUUseUNBQXlDO1FBQy9DLGFBQWE7UUFDYixNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQztLQUN6QixDQUFDO0FBQ04sQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUseUNBQXlDLENBQ3JELFdBQXdCLEVBQUUsTUFBeUM7SUFDbkUsV0FBVyxDQUFDLFVBQVUsQ0FBQyx1Q0FBdUMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0UsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNwRCxXQUFXLENBQUMsV0FBVyxDQUFDLHlDQUF5QyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUM5RixDQUFDIn0=