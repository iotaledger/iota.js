import { ALIAS_UNLOCK_BLOCK_TYPE } from "../../models/unlockBlocks/IAliasUnlockBlock";
import { SMALL_TYPE_LENGTH, UINT16_SIZE } from "../commonDataTypes";
/**
 * The minimum length of a alias unlock block binary representation.
 */
export const MIN_ALIAS_UNLOCK_BLOCK_LENGTH = SMALL_TYPE_LENGTH + UINT16_SIZE;
/**
 * Deserialize the alias unlock block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeAliasUnlockBlock(readStream) {
    if (!readStream.hasRemaining(MIN_ALIAS_UNLOCK_BLOCK_LENGTH)) {
        throw new Error(`Alias Unlock Block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_ALIAS_UNLOCK_BLOCK_LENGTH}`);
    }
    const type = readStream.readByte("aliasUnlockBlock.type");
    if (type !== ALIAS_UNLOCK_BLOCK_TYPE) {
        throw new Error(`Type mismatch in aliasUnlockBlock ${type}`);
    }
    const reference = readStream.readUInt16("aliasUnlockBlock.reference");
    return {
        type: ALIAS_UNLOCK_BLOCK_TYPE,
        reference
    };
}
/**
 * Serialize the alias unlock block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeAliasUnlockBlock(writeStream, object) {
    writeStream.writeByte("aliasUnlockBlock.type", object.type);
    writeStream.writeUInt16("aliasUnlockBlock.reference", object.reference);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxpYXNVbmxvY2tCbG9jay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iaW5hcnkvdW5sb2NrQmxvY2tzL2FsaWFzVW5sb2NrQmxvY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsT0FBTyxFQUFxQix1QkFBdUIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3pHLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVwRTs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLDZCQUE2QixHQUFXLGlCQUFpQixHQUFHLFdBQVcsQ0FBQztBQUVyRjs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLDJCQUEyQixDQUFDLFVBQXNCO0lBQzlELElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLDZCQUE2QixDQUFDLEVBQUU7UUFDekQsTUFBTSxJQUFJLEtBQUssQ0FDWCw4QkFBOEIsVUFBVSxDQUFDLE1BQU0sRUFBRSxnRUFBZ0UsNkJBQTZCLEVBQUUsQ0FDbkosQ0FBQztLQUNMO0lBRUQsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQzFELElBQUksSUFBSSxLQUFLLHVCQUF1QixFQUFFO1FBQ2xDLE1BQU0sSUFBSSxLQUFLLENBQUMscUNBQXFDLElBQUksRUFBRSxDQUFDLENBQUM7S0FDaEU7SUFFRCxNQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLDRCQUE0QixDQUFDLENBQUM7SUFFdEUsT0FBTztRQUNILElBQUksRUFBRSx1QkFBdUI7UUFDN0IsU0FBUztLQUNaLENBQUM7QUFDTixDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSx5QkFBeUIsQ0FBQyxXQUF3QixFQUFFLE1BQXlCO0lBQ3pGLFdBQVcsQ0FBQyxTQUFTLENBQUMsdUJBQXVCLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVELFdBQVcsQ0FBQyxXQUFXLENBQUMsNEJBQTRCLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzVFLENBQUMifQ==