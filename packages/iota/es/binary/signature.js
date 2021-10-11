// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Ed25519 } from "@iota/crypto.js";
import { ED25519_SIGNATURE_TYPE } from "../models/IEd25519Signature";
import { SMALL_TYPE_LENGTH } from "./common";
/**
 * The minimum length of a signature binary representation.
 */
export const MIN_SIGNATURE_LENGTH = SMALL_TYPE_LENGTH;
/**
 * The minimum length of an ed25519 signature binary representation.
 */
export const MIN_ED25519_SIGNATURE_LENGTH = MIN_SIGNATURE_LENGTH + Ed25519.SIGNATURE_SIZE + Ed25519.PUBLIC_KEY_SIZE;
/**
 * Deserialize the signature from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeSignature(readStream) {
    if (!readStream.hasRemaining(MIN_SIGNATURE_LENGTH)) {
        throw new Error(`Signature data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_SIGNATURE_LENGTH}`);
    }
    const type = readStream.readByte("signature.type", false);
    let input;
    if (type === ED25519_SIGNATURE_TYPE) {
        input = deserializeEd25519Signature(readStream);
    }
    else {
        throw new Error(`Unrecognized signature type ${type}`);
    }
    return input;
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
/**
 * Deserialize the Ed25519 signature from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
export function deserializeEd25519Signature(readStream) {
    if (!readStream.hasRemaining(MIN_ED25519_SIGNATURE_LENGTH)) {
        throw new Error(`Ed25519 signature data is ${readStream.length()} in length which is less than the minimimum size required of ${MIN_ED25519_SIGNATURE_LENGTH}`);
    }
    const type = readStream.readByte("ed25519Signature.type");
    if (type !== ED25519_SIGNATURE_TYPE) {
        throw new Error(`Type mismatch in ed25519Signature ${type}`);
    }
    const publicKey = readStream.readFixedHex("ed25519Signature.publicKey", Ed25519.PUBLIC_KEY_SIZE);
    const signature = readStream.readFixedHex("ed25519Signature.signature", Ed25519.SIGNATURE_SIZE);
    return {
        type: ED25519_SIGNATURE_TYPE,
        publicKey,
        signature
    };
}
/**
 * Serialize the Ed25519 signature to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
export function serializeEd25519Signature(writeStream, object) {
    writeStream.writeByte("ed25519Signature.type", object.type);
    writeStream.writeFixedHex("ed25519Signature.publicKey", Ed25519.PUBLIC_KEY_SIZE, object.publicKey);
    writeStream.writeFixedHex("ed25519Signature.signature", Ed25519.SIGNATURE_SIZE, object.signature);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmF0dXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2JpbmFyeS9zaWduYXR1cmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0QyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFMUMsT0FBTyxFQUFFLHNCQUFzQixFQUFxQixNQUFNLDZCQUE2QixDQUFDO0FBQ3hGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUU3Qzs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFXLGlCQUFpQixDQUFDO0FBRTlEOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sNEJBQTRCLEdBQ3JDLG9CQUFvQixHQUFHLE9BQU8sQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQztBQUU1RTs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLG9CQUFvQixDQUFDLFVBQXNCO0lBQ3ZELElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLEVBQUU7UUFDaEQsTUFBTSxJQUFJLEtBQUssQ0FDWCxxQkFBcUIsVUFBVSxDQUFDLE1BQU0sRUFBRSxnRUFBZ0Usb0JBQW9CLEVBQUUsQ0FDakksQ0FBQztLQUNMO0lBRUQsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMxRCxJQUFJLEtBQUssQ0FBQztJQUVWLElBQUksSUFBSSxLQUFLLHNCQUFzQixFQUFFO1FBQ2pDLEtBQUssR0FBRywyQkFBMkIsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUNuRDtTQUFNO1FBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQywrQkFBK0IsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUMxRDtJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLGtCQUFrQixDQUFDLFdBQXdCLEVBQUUsTUFBeUI7SUFDbEYsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLHNCQUFzQixFQUFFO1FBQ3hDLHlCQUF5QixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztLQUNsRDtTQUFNO1FBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQywrQkFBK0IsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7S0FDakU7QUFDTCxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSwyQkFBMkIsQ0FBQyxVQUFzQjtJQUM5RCxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyw0QkFBNEIsQ0FBQyxFQUFFO1FBQ3hELE1BQU0sSUFBSSxLQUFLLENBQ1gsNkJBQTZCLFVBQVUsQ0FBQyxNQUFNLEVBQUUsZ0VBQWdFLDRCQUE0QixFQUFFLENBQ2pKLENBQUM7S0FDTDtJQUVELE1BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUMxRCxJQUFJLElBQUksS0FBSyxzQkFBc0IsRUFBRTtRQUNqQyxNQUFNLElBQUksS0FBSyxDQUFDLHFDQUFxQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQ2hFO0lBRUQsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyw0QkFBNEIsRUFBRSxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDakcsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyw0QkFBNEIsRUFBRSxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7SUFFaEcsT0FBTztRQUNILElBQUksRUFBRSxzQkFBc0I7UUFDNUIsU0FBUztRQUNULFNBQVM7S0FDWixDQUFDO0FBQ04sQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUseUJBQXlCLENBQUMsV0FBd0IsRUFBRSxNQUF5QjtJQUN6RixXQUFXLENBQUMsU0FBUyxDQUFDLHVCQUF1QixFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1RCxXQUFXLENBQUMsYUFBYSxDQUFDLDRCQUE0QixFQUFFLE9BQU8sQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ25HLFdBQVcsQ0FBQyxhQUFhLENBQUMsNEJBQTRCLEVBQUUsT0FBTyxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDdEcsQ0FBQyJ9