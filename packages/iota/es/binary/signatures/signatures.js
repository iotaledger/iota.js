import { ED25519_SIGNATURE_TYPE } from "../../models/signatures/IEd25519Signature";
import { deserializeEd25519Signature, MIN_ED25519_SIGNATURE_LENGTH, serializeEd25519Signature } from "./ed25519Signature";
/**
 * The minimum length of a signature binary representation.
 */
export const MIN_SIGNATURE_LENGTH = MIN_ED25519_SIGNATURE_LENGTH;
/**
 * Deserialize the signature from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeSignature(readStream) {
    if (!readStream.hasRemaining(MIN_SIGNATURE_LENGTH)) {
        throw new Error(`Signature data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_SIGNATURE_LENGTH}`);
    }
    const type = readStream.readUInt8("signature.type", false);
    let signature;
    if (type === ED25519_SIGNATURE_TYPE) {
        signature = deserializeEd25519Signature(readStream);
    }
    else {
        throw new Error(`Unrecognized signature type ${type}`);
    }
    return signature;
}
/**
 * Serialize the signature to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeSignature(writeStream, object) {
    if (object.type === ED25519_SIGNATURE_TYPE) {
        serializeEd25519Signature(writeStream, object);
    }
    else {
        throw new Error(`Unrecognized signature type ${object.type}`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmF0dXJlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iaW5hcnkvc2lnbmF0dXJlcy9zaWduYXR1cmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBRW5GLE9BQU8sRUFDSCwyQkFBMkIsRUFDM0IsNEJBQTRCLEVBQzVCLHlCQUF5QixFQUM1QixNQUFNLG9CQUFvQixDQUFDO0FBRTVCOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBQVcsNEJBQTRCLENBQUM7QUFFekU7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxvQkFBb0IsQ0FBQyxVQUFzQjtJQUN2RCxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFO1FBQ2hELE1BQU0sSUFBSSxLQUFLLENBQ1gscUJBQXFCLFVBQVUsQ0FBQyxNQUFNLEVBQUUsZ0VBQWdFLG9CQUFvQixFQUFFLENBQ2pJLENBQUM7S0FDTDtJQUVELE1BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDM0QsSUFBSSxTQUFTLENBQUM7SUFFZCxJQUFJLElBQUksS0FBSyxzQkFBc0IsRUFBRTtRQUNqQyxTQUFTLEdBQUcsMkJBQTJCLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDdkQ7U0FBTTtRQUNILE1BQU0sSUFBSSxLQUFLLENBQUMsK0JBQStCLElBQUksRUFBRSxDQUFDLENBQUM7S0FDMUQ7SUFFRCxPQUFPLFNBQVMsQ0FBQztBQUNyQixDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxrQkFBa0IsQ0FBQyxXQUF3QixFQUFFLE1BQXNCO0lBQy9FLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxzQkFBc0IsRUFBRTtRQUN4Qyx5QkFBeUIsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDbEQ7U0FBTTtRQUNILE1BQU0sSUFBSSxLQUFLLENBQUMsK0JBQStCLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQ2pFO0FBQ0wsQ0FBQyJ9