"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeEd25519Signature = exports.deserializeEd25519Signature = exports.serializeSignature = exports.deserializeSignature = exports.MIN_ED25519_SIGNATURE_LENGTH = exports.MIN_SIGNATURE_LENGTH = void 0;
// Copyright 2020 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0
var ed25519_1 = require("../crypto/ed25519");
var IEd25519Signature_1 = require("../models/IEd25519Signature");
var common_1 = require("./common");
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
        throw new Error("Signature data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_SIGNATURE_LENGTH);
    }
    var type = readStream.readByte("signature.type", false);
    var input;
    if (type === IEd25519Signature_1.ED25519_SIGNATURE_TYPE) {
        input = deserializeEd25519Signature(readStream);
    }
    else {
        throw new Error("Unrecognized signature type " + type);
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
        throw new Error("Unrecognized signature type " + object.type);
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
        throw new Error("Ed25519 signature data is " + readStream.length() + " in length which is less than the minimimum size required of " + exports.MIN_ED25519_SIGNATURE_LENGTH);
    }
    var type = readStream.readByte("ed25519Signature.type");
    if (type !== IEd25519Signature_1.ED25519_SIGNATURE_TYPE) {
        throw new Error("Type mismatch in ed25519Signature " + type);
    }
    var publicKey = readStream.readFixedHex("ed25519Signature.publicKey", ed25519_1.Ed25519.PUBLIC_KEY_SIZE);
    var signature = readStream.readFixedHex("ed25519Signature.signature", ed25519_1.Ed25519.SIGNATURE_SIZE);
    return {
        type: IEd25519Signature_1.ED25519_SIGNATURE_TYPE,
        publicKey: publicKey,
        signature: signature
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmF0dXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2JpbmFyeS9zaWduYXR1cmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0Qyw2Q0FBNEM7QUFDNUMsaUVBQXdGO0FBR3hGLG1DQUE2QztBQUU3Qzs7R0FFRztBQUNVLFFBQUEsb0JBQW9CLEdBQVcsMEJBQWlCLENBQUM7QUFFOUQ7O0dBRUc7QUFDVSxRQUFBLDRCQUE0QixHQUNyQyw0QkFBb0IsR0FBRyxpQkFBTyxDQUFDLGNBQWMsR0FBRyxpQkFBTyxDQUFDLGVBQWUsQ0FBQztBQUU1RTs7OztHQUlHO0FBQ0gsU0FBZ0Isb0JBQW9CLENBQUMsVUFBc0I7SUFDdkQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsNEJBQW9CLENBQUMsRUFBRTtRQUNoRCxNQUFNLElBQUksS0FBSyxDQUFDLHVCQUFxQixVQUFVLENBQUMsTUFBTSxFQUFFLHFFQUNZLDRCQUFzQixDQUFDLENBQUM7S0FDL0Y7SUFFRCxJQUFNLElBQUksR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzFELElBQUksS0FBSyxDQUFDO0lBRVYsSUFBSSxJQUFJLEtBQUssMENBQXNCLEVBQUU7UUFDakMsS0FBSyxHQUFHLDJCQUEyQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ25EO1NBQU07UUFDSCxNQUFNLElBQUksS0FBSyxDQUFDLGlDQUErQixJQUFNLENBQUMsQ0FBQztLQUMxRDtJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFoQkQsb0RBZ0JDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLGtCQUFrQixDQUFDLFdBQXdCLEVBQ3ZELE1BQXlCO0lBQ3pCLElBQUksTUFBTSxDQUFDLElBQUksS0FBSywwQ0FBc0IsRUFBRTtRQUN4Qyx5QkFBeUIsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDbEQ7U0FBTTtRQUNILE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQStCLE1BQU0sQ0FBQyxJQUFNLENBQUMsQ0FBQztLQUNqRTtBQUNMLENBQUM7QUFQRCxnREFPQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQiwyQkFBMkIsQ0FBQyxVQUFzQjtJQUM5RCxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxvQ0FBNEIsQ0FBQyxFQUFFO1FBQ3hELE1BQU0sSUFBSSxLQUFLLENBQUMsK0JBQTZCLFVBQVUsQ0FBQyxNQUFNLEVBQUUscUVBQ0ksb0NBQThCLENBQUMsQ0FBQztLQUN2RztJQUVELElBQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUMxRCxJQUFJLElBQUksS0FBSywwQ0FBc0IsRUFBRTtRQUNqQyxNQUFNLElBQUksS0FBSyxDQUFDLHVDQUFxQyxJQUFNLENBQUMsQ0FBQztLQUNoRTtJQUVELElBQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsNEJBQTRCLEVBQUUsaUJBQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUNqRyxJQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDLDRCQUE0QixFQUFFLGlCQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7SUFFaEcsT0FBTztRQUNILElBQUksRUFBRSwwQ0FBc0I7UUFDNUIsU0FBUyxXQUFBO1FBQ1QsU0FBUyxXQUFBO0tBQ1osQ0FBQztBQUNOLENBQUM7QUFuQkQsa0VBbUJDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLHlCQUF5QixDQUFDLFdBQXdCLEVBQzlELE1BQXlCO0lBQ3pCLFdBQVcsQ0FBQyxTQUFTLENBQUMsdUJBQXVCLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVELFdBQVcsQ0FBQyxhQUFhLENBQUMsNEJBQTRCLEVBQUUsaUJBQU8sQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ25HLFdBQVcsQ0FBQyxhQUFhLENBQUMsNEJBQTRCLEVBQUUsaUJBQU8sQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3RHLENBQUM7QUFMRCw4REFLQyJ9