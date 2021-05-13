"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeEd25519Signature = exports.deserializeEd25519Signature = exports.serializeSignature = exports.deserializeSignature = exports.MIN_ED25519_SIGNATURE_LENGTH = exports.MIN_SIGNATURE_LENGTH = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
const ed25519_1 = require("../crypto/ed25519");
const IEd25519Signature_1 = require("../models/IEd25519Signature");
const common_1 = require("./common");
/**
 * The minimum length of a signature binary representation.
 */
exports.MIN_SIGNATURE_LENGTH = common_1.SMALL_TYPE_LENGTH;
/**
 * The minimum length of an ed25519 signature binary representation.
 */
exports.MIN_ED25519_SIGNATURE_LENGTH = exports.MIN_SIGNATURE_LENGTH + ed25519_1.Ed25519.SIGNATURE_SIZE + ed25519_1.Ed25519.PUBLIC_KEY_SIZE;
/**
 * Deserialize the signature from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
function deserializeSignature(readStream) {
    if (!readStream.hasRemaining(exports.MIN_SIGNATURE_LENGTH)) {
        throw new Error(`Signature data is ${readStream.length()} in length which is less than the minimimum size required of ${exports.MIN_SIGNATURE_LENGTH}`);
    }
    const type = readStream.readByte("signature.type", false);
    let input;
    if (type === IEd25519Signature_1.ED25519_SIGNATURE_TYPE) {
        input = deserializeEd25519Signature(readStream);
    }
    else {
        throw new Error(`Unrecognized signature type ${type}`);
    }
    return input;
}
exports.deserializeSignature = deserializeSignature;
/**
 * Serialize the signature to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
function serializeSignature(writeStream, object) {
    if (object.type === IEd25519Signature_1.ED25519_SIGNATURE_TYPE) {
        serializeEd25519Signature(writeStream, object);
    }
    else {
        throw new Error(`Unrecognized signature type ${object.type}`);
    }
}
exports.serializeSignature = serializeSignature;
/**
 * Deserialize the Ed25519 signature from binary.
 * @param readStream The stream to read the data from.
 * @returns The deserialized object.
 */
function deserializeEd25519Signature(readStream) {
    if (!readStream.hasRemaining(exports.MIN_ED25519_SIGNATURE_LENGTH)) {
        throw new Error(`Ed25519 signature data is ${readStream.length()} in length which is less than the minimimum size required of ${exports.MIN_ED25519_SIGNATURE_LENGTH}`);
    }
    const type = readStream.readByte("ed25519Signature.type");
    if (type !== IEd25519Signature_1.ED25519_SIGNATURE_TYPE) {
        throw new Error(`Type mismatch in ed25519Signature ${type}`);
    }
    const publicKey = readStream.readFixedHex("ed25519Signature.publicKey", ed25519_1.Ed25519.PUBLIC_KEY_SIZE);
    const signature = readStream.readFixedHex("ed25519Signature.signature", ed25519_1.Ed25519.SIGNATURE_SIZE);
    return {
        type: IEd25519Signature_1.ED25519_SIGNATURE_TYPE,
        publicKey,
        signature
    };
}
exports.deserializeEd25519Signature = deserializeEd25519Signature;
/**
 * Serialize the Ed25519 signature to binary.
 * @param writeStream The stream to write the data to.
 * @param object The object to serialize.
 */
function serializeEd25519Signature(writeStream, object) {
    writeStream.writeByte("ed25519Signature.type", object.type);
    writeStream.writeFixedHex("ed25519Signature.publicKey", ed25519_1.Ed25519.PUBLIC_KEY_SIZE, object.publicKey);
    writeStream.writeFixedHex("ed25519Signature.signature", ed25519_1.Ed25519.SIGNATURE_SIZE, object.signature);
}
exports.serializeEd25519Signature = serializeEd25519Signature;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmF0dXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2JpbmFyeS9zaWduYXR1cmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0QywrQ0FBNEM7QUFDNUMsbUVBQXdGO0FBR3hGLHFDQUE2QztBQUU3Qzs7R0FFRztBQUNVLFFBQUEsb0JBQW9CLEdBQVcsMEJBQWlCLENBQUM7QUFFOUQ7O0dBRUc7QUFDVSxRQUFBLDRCQUE0QixHQUNyQyw0QkFBb0IsR0FBRyxpQkFBTyxDQUFDLGNBQWMsR0FBRyxpQkFBTyxDQUFDLGVBQWUsQ0FBQztBQUU1RTs7OztHQUlHO0FBQ0gsU0FBZ0Isb0JBQW9CLENBQUMsVUFBc0I7SUFDdkQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsNEJBQW9CLENBQUMsRUFBRTtRQUNoRCxNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixVQUFVLENBQUMsTUFBTSxFQUNsRCxnRUFBZ0UsNEJBQW9CLEVBQUUsQ0FBQyxDQUFDO0tBQy9GO0lBRUQsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMxRCxJQUFJLEtBQUssQ0FBQztJQUVWLElBQUksSUFBSSxLQUFLLDBDQUFzQixFQUFFO1FBQ2pDLEtBQUssR0FBRywyQkFBMkIsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUNuRDtTQUFNO1FBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQywrQkFBK0IsSUFBSSxFQUFFLENBQUMsQ0FBQztLQUMxRDtJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFoQkQsb0RBZ0JDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLGtCQUFrQixDQUFDLFdBQXdCLEVBQ3ZELE1BQXlCO0lBQ3pCLElBQUksTUFBTSxDQUFDLElBQUksS0FBSywwQ0FBc0IsRUFBRTtRQUN4Qyx5QkFBeUIsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDbEQ7U0FBTTtRQUNILE1BQU0sSUFBSSxLQUFLLENBQUMsK0JBQStCLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQ2pFO0FBQ0wsQ0FBQztBQVBELGdEQU9DO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLDJCQUEyQixDQUFDLFVBQXNCO0lBQzlELElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLG9DQUE0QixDQUFDLEVBQUU7UUFDeEQsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsVUFBVSxDQUFDLE1BQU0sRUFDMUQsZ0VBQWdFLG9DQUE0QixFQUFFLENBQUMsQ0FBQztLQUN2RztJQUVELE1BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUMxRCxJQUFJLElBQUksS0FBSywwQ0FBc0IsRUFBRTtRQUNqQyxNQUFNLElBQUksS0FBSyxDQUFDLHFDQUFxQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0tBQ2hFO0lBRUQsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyw0QkFBNEIsRUFBRSxpQkFBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ2pHLE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsNEJBQTRCLEVBQUUsaUJBQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUVoRyxPQUFPO1FBQ0gsSUFBSSxFQUFFLDBDQUFzQjtRQUM1QixTQUFTO1FBQ1QsU0FBUztLQUNaLENBQUM7QUFDTixDQUFDO0FBbkJELGtFQW1CQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQix5QkFBeUIsQ0FBQyxXQUF3QixFQUM5RCxNQUF5QjtJQUN6QixXQUFXLENBQUMsU0FBUyxDQUFDLHVCQUF1QixFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1RCxXQUFXLENBQUMsYUFBYSxDQUFDLDRCQUE0QixFQUFFLGlCQUFPLENBQUMsZUFBZSxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNuRyxXQUFXLENBQUMsYUFBYSxDQUFDLDRCQUE0QixFQUFFLGlCQUFPLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN0RyxDQUFDO0FBTEQsOERBS0MifQ==