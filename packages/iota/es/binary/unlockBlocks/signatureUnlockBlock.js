import { SIGNATURE_UNLOCK_BLOCK_TYPE } from "../../models/unlockBlocks/ISignatureUnlockBlock";
import { SMALL_TYPE_LENGTH } from "../commonDataTypes";
import { deserializeSignature, MIN_SIGNATURE_LENGTH, serializeSignature } from "../signatures/signatures";
/**
 * The minimum length of a signature unlock block binary representation.
 */
export const MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH = SMALL_TYPE_LENGTH + MIN_SIGNATURE_LENGTH;
/**
 * Deserialize the signature unlock block from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeSignatureUnlockBlock(readStream) {
    if (!readStream.hasRemaining(MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH)) {
        throw new Error(`Signature Unlock Block data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_SIGNATURE_UNLOCK_BLOCK_LENGTH}`);
    }
    const type = readStream.readUInt8("signatureUnlockBlock.type");
    if (type !== SIGNATURE_UNLOCK_BLOCK_TYPE) {
        throw new Error(`Type mismatch in signatureUnlockBlock ${type}`);
    }
    const signature = deserializeSignature(readStream);
    return {
        type: SIGNATURE_UNLOCK_BLOCK_TYPE,
        signature
    };
}
/**
 * Serialize the signature unlock block to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeSignatureUnlockBlock(writeStream, object) {
    writeStream.writeUInt8("signatureUnlockBlock.type", object.type);
    serializeSignature(writeStream, object.signature);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmF0dXJlVW5sb2NrQmxvY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYmluYXJ5L3VubG9ja0Jsb2Nrcy9zaWduYXR1cmVVbmxvY2tCbG9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLEVBQXlCLDJCQUEyQixFQUFFLE1BQU0saURBQWlELENBQUM7QUFDckgsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDdkQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLG9CQUFvQixFQUFFLGtCQUFrQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFMUc7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxpQ0FBaUMsR0FBVyxpQkFBaUIsR0FBRyxvQkFBb0IsQ0FBQztBQUVsRzs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLCtCQUErQixDQUFDLFVBQXNCO0lBQ2xFLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLGlDQUFpQyxDQUFDLEVBQUU7UUFDN0QsTUFBTSxJQUFJLEtBQUssQ0FDWCxrQ0FBa0MsVUFBVSxDQUFDLE1BQU0sRUFBRSxnRUFBZ0UsaUNBQWlDLEVBQUUsQ0FDM0osQ0FBQztLQUNMO0lBRUQsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0lBQy9ELElBQUksSUFBSSxLQUFLLDJCQUEyQixFQUFFO1FBQ3RDLE1BQU0sSUFBSSxLQUFLLENBQUMseUNBQXlDLElBQUksRUFBRSxDQUFDLENBQUM7S0FDcEU7SUFFRCxNQUFNLFNBQVMsR0FBRyxvQkFBb0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUVuRCxPQUFPO1FBQ0gsSUFBSSxFQUFFLDJCQUEyQjtRQUNqQyxTQUFTO0tBQ1osQ0FBQztBQUNOLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLDZCQUE2QixDQUFDLFdBQXdCLEVBQUUsTUFBNkI7SUFDakcsV0FBVyxDQUFDLFVBQVUsQ0FBQywyQkFBMkIsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakUsa0JBQWtCLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN0RCxDQUFDIn0=