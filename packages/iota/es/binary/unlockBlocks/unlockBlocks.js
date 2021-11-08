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
    const type = readStream.readByte("unlockBlock.type", false);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5sb2NrQmxvY2tzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2JpbmFyeS91bmxvY2tCbG9ja3MvdW5sb2NrQmxvY2tzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQzlGLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBRTlGLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxpQ0FBaUMsRUFBRSw2QkFBNkIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzNJLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxpQ0FBaUMsRUFBRSw2QkFBNkIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRTNJOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sdUJBQXVCLEdBQ2hDLElBQUksQ0FBQyxHQUFHLENBQ0osaUNBQWlDLEVBQ2pDLGlDQUFpQyxDQUNwQyxDQUFDO0FBRU47Ozs7R0FJRztBQUNILE1BQU0sVUFBVSx1QkFBdUIsQ0FBQyxVQUFzQjtJQUMxRCxNQUFNLGVBQWUsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLG9DQUFvQyxDQUFDLENBQUM7SUFDcEYsTUFBTSxZQUFZLEdBQXVCLEVBQUUsQ0FBQztJQUM1QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBZSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3RDLFlBQVksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztLQUN6RDtJQUNELE9BQU8sWUFBWSxDQUFDO0FBQ3hCLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLHFCQUFxQixDQUNqQyxXQUF3QixFQUN4QixPQUEyQjtJQUUzQixXQUFXLENBQUMsV0FBVyxDQUFDLG9DQUFvQyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUU5RSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNyQyxvQkFBb0IsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDakQ7QUFDTCxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxzQkFBc0IsQ0FBQyxVQUFzQjtJQUN6RCxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFO1FBQ25ELE1BQU0sSUFBSSxLQUFLLENBQ1gsd0JBQXdCLFVBQVUsQ0FBQyxNQUFNLEVBQUUsZ0VBQWdFLHVCQUF1QixFQUFFLENBQ3ZJLENBQUM7S0FDTDtJQUVELE1BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDNUQsSUFBSSxXQUFXLENBQUM7SUFFaEIsSUFBSSxJQUFJLEtBQUssMkJBQTJCLEVBQUU7UUFDdEMsV0FBVyxHQUFHLCtCQUErQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQzdEO1NBQU0sSUFBSSxJQUFJLEtBQUssMkJBQTJCLEVBQUU7UUFDN0MsV0FBVyxHQUFHLCtCQUErQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQzdEO1NBQU07UUFDSCxNQUFNLElBQUksS0FBSyxDQUFDLGtDQUFrQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQzdEO0lBRUQsT0FBTyxXQUFXLENBQUM7QUFDdkIsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsb0JBQW9CLENBQ2hDLFdBQXdCLEVBQ3hCLE1BQXdCO0lBRXhCLElBQUksTUFBTSxDQUFDLElBQUksS0FBSywyQkFBMkIsRUFBRTtRQUM3Qyw2QkFBNkIsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDdEQ7U0FBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssMkJBQTJCLEVBQUU7UUFDcEQsNkJBQTZCLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0tBQ3REO1NBQU07UUFDSCxNQUFNLElBQUksS0FBSyxDQUFDLGtDQUFtQyxNQUE0QixDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7S0FDM0Y7QUFDTCxDQUFDIn0=