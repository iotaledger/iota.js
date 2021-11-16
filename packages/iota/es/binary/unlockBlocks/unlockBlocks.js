import { REFERENCE_UNLOCK_BLOCK_TYPE } from "../../models/unlockBlocks/IReferenceUnlockBlock";
import { SIGNATURE_UNLOCK_BLOCK_TYPE } from "../../models/unlockBlocks/ISignatureUnlockBlock";
import { deserializeReferenceUnlockBlock, MIN_REFERENCE_UNLOCK_BLOCK_LENGTH, serializeReferenceUnlockBlock } from "./referenceUnlockBlock";
import { deserializeSignatureUnlockBlock, MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH, serializeSignatureUnlockBlock } from "./signatureUnlockBlock";
/**
 * The minimum length of an unlock block binary representation.
 */
export const MIN_UNLOCK_BLOCK_LENGTH = Math.min(MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH, MIN_REFERENCE_UNLOCK_BLOCK_LENGTH);
/**
 * Deserialize the unlock blocks from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeUnlockBlocks(readStream) {
    const numUnlockBlocks = readStream.readUInt16("transactionEssence.numUnlockBlocks");
    const unlockBlocks = [];
    for (let i = 0; i < numUnlockBlocks; i++) {
        unlockBlocks.push(deserializeUnlockBlock(readStream));
    }
    return unlockBlocks;
}
/**
 * Serialize the unlock blocks to binary.
 * @param writeStream The stream to write the data to.
 * @param objects The objects to serialize.
 */
export function serializeUnlockBlocks(writeStream, objects) {
    writeStream.writeUInt16("transactionEssence.numUnlockBlocks", objects.length);
    for (let i = 0; i < objects.length; i++) {
        serializeUnlockBlock(writeStream, objects[i]);
    }
}
/**
 * Deserialize the unlock block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeUnlockBlock(readStream) {
    if (!readStream.hasRemaining(MIN_UNLOCK_BLOCK_LENGTH)) {
        throw new Error(`Unlock Block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_UNLOCK_BLOCK_LENGTH}`);
    }
    const type = readStream.readUInt8("unlockBlock.type", false);
    let unlockBlock;
    if (type === SIGNATURE_UNLOCK_BLOCK_TYPE) {
        unlockBlock = deserializeSignatureUnlockBlock(readStream);
    }
    else if (type === REFERENCE_UNLOCK_BLOCK_TYPE) {
        unlockBlock = deserializeReferenceUnlockBlock(readStream);
    }
    else {
        throw new Error(`Unrecognized unlock block type ${type}`);
    }
    return unlockBlock;
}
/**
 * Serialize the unlock block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeUnlockBlock(writeStream, object) {
    if (object.type === SIGNATURE_UNLOCK_BLOCK_TYPE) {
        serializeSignatureUnlockBlock(writeStream, object);
    }
    else if (object.type === REFERENCE_UNLOCK_BLOCK_TYPE) {
        serializeReferenceUnlockBlock(writeStream, object);
    }
    else {
        throw new Error(`Unrecognized unlock block type ${object.type}`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5sb2NrQmxvY2tzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2JpbmFyeS91bmxvY2tCbG9ja3MvdW5sb2NrQmxvY2tzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQzlGLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBRTlGLE9BQU8sRUFDSCwrQkFBK0IsRUFDL0IsaUNBQWlDLEVBQ2pDLDZCQUE2QixFQUNoQyxNQUFNLHdCQUF3QixDQUFDO0FBQ2hDLE9BQU8sRUFDSCwrQkFBK0IsRUFDL0IsaUNBQWlDLEVBQ2pDLDZCQUE2QixFQUNoQyxNQUFNLHdCQUF3QixDQUFDO0FBRWhDOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sdUJBQXVCLEdBQVcsSUFBSSxDQUFDLEdBQUcsQ0FDbkQsaUNBQWlDLEVBQ2pDLGlDQUFpQyxDQUNwQyxDQUFDO0FBRUY7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSx1QkFBdUIsQ0FBQyxVQUFzQjtJQUMxRCxNQUFNLGVBQWUsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLG9DQUFvQyxDQUFDLENBQUM7SUFDcEYsTUFBTSxZQUFZLEdBQXVCLEVBQUUsQ0FBQztJQUM1QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBZSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3RDLFlBQVksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztLQUN6RDtJQUNELE9BQU8sWUFBWSxDQUFDO0FBQ3hCLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLHFCQUFxQixDQUFDLFdBQXdCLEVBQUUsT0FBMkI7SUFDdkYsV0FBVyxDQUFDLFdBQVcsQ0FBQyxvQ0FBb0MsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFOUUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDckMsb0JBQW9CLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2pEO0FBQ0wsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsc0JBQXNCLENBQUMsVUFBc0I7SUFDekQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsdUJBQXVCLENBQUMsRUFBRTtRQUNuRCxNQUFNLElBQUksS0FBSyxDQUNYLHdCQUF3QixVQUFVLENBQUMsTUFBTSxFQUFFLGdFQUFnRSx1QkFBdUIsRUFBRSxDQUN2SSxDQUFDO0tBQ0w7SUFFRCxNQUFNLElBQUksR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLGtCQUFrQixFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzdELElBQUksV0FBVyxDQUFDO0lBRWhCLElBQUksSUFBSSxLQUFLLDJCQUEyQixFQUFFO1FBQ3RDLFdBQVcsR0FBRywrQkFBK0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUM3RDtTQUFNLElBQUksSUFBSSxLQUFLLDJCQUEyQixFQUFFO1FBQzdDLFdBQVcsR0FBRywrQkFBK0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUM3RDtTQUFNO1FBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQ0FBa0MsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUM3RDtJQUVELE9BQU8sV0FBVyxDQUFDO0FBQ3ZCLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLG9CQUFvQixDQUFDLFdBQXdCLEVBQUUsTUFBd0I7SUFDbkYsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLDJCQUEyQixFQUFFO1FBQzdDLDZCQUE2QixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztLQUN0RDtTQUFNLElBQUksTUFBTSxDQUFDLElBQUksS0FBSywyQkFBMkIsRUFBRTtRQUNwRCw2QkFBNkIsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDdEQ7U0FBTTtRQUNILE1BQU0sSUFBSSxLQUFLLENBQUMsa0NBQW1DLE1BQTRCLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUMzRjtBQUNMLENBQUMifQ==