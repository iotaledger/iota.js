import bigInt from "big-integer";
import { DUST_DEPOSIT_RETURN_FEATURE_BLOCK_TYPE } from "../../models/featureBlocks/IDustDepositReturnFeatureBlock";
import { SMALL_TYPE_LENGTH, UINT64_SIZE } from "../commonDataTypes";
/**
 * The minimum length of a return feature block binary representation.
 */
export const MIN_DUST_DEPOSIT_RETURN_FEATURE_BLOCK_LENGTH = SMALL_TYPE_LENGTH + // Type
    UINT64_SIZE; // Amount
/**
 * Deserialize the dust deposit return feature block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeDustDepositReturnFeatureBlock(readStream) {
    if (!readStream.hasRemaining(MIN_DUST_DEPOSIT_RETURN_FEATURE_BLOCK_LENGTH)) {
        throw new Error(`Dust Deposit Return Feature Block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_DUST_DEPOSIT_RETURN_FEATURE_BLOCK_LENGTH}`);
    }
    const type = readStream.readUInt8("dustDepositReturnFeatureBlock.type");
    if (type !== DUST_DEPOSIT_RETURN_FEATURE_BLOCK_TYPE) {
        throw new Error(`Type mismatch in dustDepositReturnFeatureBlock ${type}`);
    }
    const amount = readStream.readUInt64("dustDepositReturnFeatureBlock.amount");
    return {
        type: DUST_DEPOSIT_RETURN_FEATURE_BLOCK_TYPE,
        amount: Number(amount)
    };
}
/**
 * Serialize the dust deposit return feature block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeDustDepositReturnFeatureBlock(writeStream, object) {
    writeStream.writeUInt8("dustDepositReturnFeatureBlock.type", object.type);
    writeStream.writeUInt64("dustDepositReturnFeatureBlock.amount", bigInt(object.amount));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVzdERlcG9zaXRSZXR1cm5GZWF0dXJlQmxvY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmluYXJ5L2ZlYXR1cmVCbG9ja3MvZHVzdERlcG9zaXRSZXR1cm5GZWF0dXJlQmxvY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsT0FBTyxNQUFNLE1BQU0sYUFBYSxDQUFDO0FBQ2pDLE9BQU8sRUFFSCxzQ0FBc0MsRUFDekMsTUFBTSwyREFBMkQsQ0FBQztBQUNuRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFcEU7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSw0Q0FBNEMsR0FDckQsaUJBQWlCLEdBQUcsT0FBTztJQUMzQixXQUFXLENBQUMsQ0FBQyxTQUFTO0FBRTFCOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsd0NBQXdDLENBQUMsVUFBc0I7SUFDM0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsNENBQTRDLENBQUMsRUFBRTtRQUN4RSxNQUFNLElBQUksS0FBSyxDQUNYLDZDQUE2QyxVQUFVLENBQUMsTUFBTSxFQUFFLGdFQUFnRSw0Q0FBNEMsRUFBRSxDQUNqTCxDQUFDO0tBQ0w7SUFFRCxNQUFNLElBQUksR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7SUFDeEUsSUFBSSxJQUFJLEtBQUssc0NBQXNDLEVBQUU7UUFDakQsTUFBTSxJQUFJLEtBQUssQ0FBQyxrREFBa0QsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUM3RTtJQUVELE1BQU0sTUFBTSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsc0NBQXNDLENBQUMsQ0FBQztJQUU3RSxPQUFPO1FBQ0gsSUFBSSxFQUFFLHNDQUFzQztRQUM1QyxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQztLQUN6QixDQUFDO0FBQ04sQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsc0NBQXNDLENBQ2xELFdBQXdCLEVBQ3hCLE1BQXNDO0lBRXRDLFdBQVcsQ0FBQyxVQUFVLENBQUMsb0NBQW9DLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFFLFdBQVcsQ0FBQyxXQUFXLENBQUMsc0NBQXNDLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQzNGLENBQUMifQ==