// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
import { Ed25519 } from "@iota/crypto.js";
import { ED25519_SIGNATURE_TYPE } from "../../models/signatures/IEd25519Signature";
import { SMALL_TYPE_LENGTH } from "../commonDataTypes";
/**
 * The minimum length of an ed25519 signature binary representation.
 */
export const MIN_ED25519_SIGNATURE_LENGTH = SMALL_TYPE_LENGTH + Ed25519.SIGNATURE_SIZE + Ed25519.PUBLIC_KEY_SIZE;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWQyNTUxOVNpZ25hdHVyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iaW5hcnkvc2lnbmF0dXJlcy9lZDI1NTE5U2lnbmF0dXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRTFDLE9BQU8sRUFBRSxzQkFBc0IsRUFBcUIsTUFBTSwyQ0FBMkMsQ0FBQztBQUN0RyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUV2RDs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLDRCQUE0QixHQUNyQyxpQkFBaUIsR0FBRyxPQUFPLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUM7QUFFekU7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSwyQkFBMkIsQ0FBQyxVQUFzQjtJQUM5RCxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyw0QkFBNEIsQ0FBQyxFQUFFO1FBQ3hELE1BQU0sSUFBSSxLQUFLLENBQ1gsNkJBQTZCLFVBQVUsQ0FBQyxNQUFNLEVBQUUsZ0VBQWdFLDRCQUE0QixFQUFFLENBQ2pKLENBQUM7S0FDTDtJQUVELE1BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUMxRCxJQUFJLElBQUksS0FBSyxzQkFBc0IsRUFBRTtRQUNqQyxNQUFNLElBQUksS0FBSyxDQUFDLHFDQUFxQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQ2hFO0lBRUQsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyw0QkFBNEIsRUFBRSxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDakcsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyw0QkFBNEIsRUFBRSxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7SUFFaEcsT0FBTztRQUNILElBQUksRUFBRSxzQkFBc0I7UUFDNUIsU0FBUztRQUNULFNBQVM7S0FDWixDQUFDO0FBQ04sQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUseUJBQXlCLENBQUMsV0FBd0IsRUFBRSxNQUF5QjtJQUN6RixXQUFXLENBQUMsU0FBUyxDQUFDLHVCQUF1QixFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1RCxXQUFXLENBQUMsYUFBYSxDQUFDLDRCQUE0QixFQUFFLE9BQU8sQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ25HLFdBQVcsQ0FBQyxhQUFhLENBQUMsNEJBQTRCLEVBQUUsT0FBTyxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDdEcsQ0FBQyJ9